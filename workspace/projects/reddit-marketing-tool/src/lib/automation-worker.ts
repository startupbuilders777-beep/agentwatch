// Reddit automation worker - runs as a cron job
import { prisma } from '@/lib/prisma'
import { RedditService } from '@/lib/reddit'
import { generateComment } from '@/lib/ai-comment'

interface CampaignTask {
  id: string
  name: string
  keywords: string[]
  subreddits: string[]
  dailyLimit: number
  tone: string
  userId: string
}

export async function runCampaignAutomation() {
  console.log('🤖 Starting campaign automation...')

  // Get all active campaigns
  const campaigns = await prisma.campaign.findMany({
    where: { status: 'ACTIVE' },
    include: {
      user: true,
    },
  })

  console.log(`Found ${campaigns.length} active campaigns`)

  for (const campaign of campaigns) {
    await processCampaign(campaign)
  }

  console.log('✅ Campaign automation complete')
}

async function processCampaign(campaign: CampaignTask) {
  console.log(`Processing campaign: ${campaign.name}`)

  // Get an active Reddit account for this user
  const account = await prisma.redditAccount.findFirst({
    where: { userId: campaign.userId, isActive: true },
  })

  if (!account) {
    console.log(`No active Reddit account for user ${campaign.userId}`)
    return
  }

  // Check daily limit
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)

  const commentsPostedToday = await prisma.comment.count({
    where: {
      campaignId: campaign.id,
      postedAt: { gte: todayStart },
    },
  })

  if (commentsPostedToday >= campaign.dailyLimit) {
    console.log(`Daily limit reached for campaign ${campaign.name}`)
    return
  }

  // Create Reddit service
  const reddit = new RedditService(
    account.accessToken,
    account.refreshToken,
    process.env.REDDIT_CLIENT_ID!,
    process.env.REDDIT_CLIENT_SECRET!
  )

  // Search for relevant posts
  const posts = await reddit.searchPosts(
    campaign.keywords.join(' OR '),
    campaign.subreddits,
    20
  )

  console.log(`Found ${posts.length} posts for campaign ${campaign.name}`)

  // Filter out posts we've already commented on
  const existingComments = await prisma.comment.findMany({
    where: { campaignId: campaign.id },
    select: { redditPostId: true },
  })

  const commentedPostIds = new Set(existingComments.map(c => c.redditPostId))
  const newPosts = posts.filter(p => !commentedPostIds.has(p.id))

  // Process each post
  for (const post of newPosts) {
    if (commentsPostedToday >= campaign.dailyLimit) break

    try {
      // Generate comment
      const commentContent = await generateComment({
        postTitle: post.title,
        postContent: post.selftext,
        subreddit: post.subreddit,
        tone: campaign.tone as 'helpful' | 'casual' | 'professional',
      })

      if (!commentContent) {
        console.log(`Failed to generate comment for post ${post.id}`)
        continue
      }

      // Post comment
      const commentId = await reddit.postComment(post.id, commentContent)

      if (commentId) {
        // Save to database
        await prisma.comment.create({
          data: {
            campaignId: campaign.id,
            redditAccountId: account.id,
            redditPostId: post.id,
            content: commentContent,
            redditCommentId: commentId,
            postedAt: new Date(),
            status: 'POSTED',
          },
        })

        console.log(`Posted comment on ${post.id}`)
      } else {
        // Save failed attempt
        await prisma.comment.create({
          data: {
            campaignId: campaign.id,
            redditAccountId: account.id,
            redditPostId: post.id,
            content: commentContent,
            status: 'FAILED',
          },
        })
      }
    } catch (error) {
      console.error(`Error processing post ${post.id}:`, error)
    }
  }
}

// Run if called directly
runCampaignAutomation()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
