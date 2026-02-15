import Snoowrap from 'snoowrap'

// Rate limiting map
const rateLimits = new Map<string, { count: number; resetTime: number }>()

export interface RedditPost {
  id: string
  title: string
  selftext: string
  subreddit: string
  url: string
  score: number
  numComments: number
  createdUtc: number
  permalink: string
  author: string
}

export interface RedditComment {
  id: string
  body: string
  author: string
  score: number
  parentId: string
  permalink: string
  createdUtc: number
}

export class RedditService {
  private client: Snoowrap

  constructor(accessToken: string, refreshToken: string, clientId: string, clientSecret: string) {
    this.client = new Snoowrap({
      accessToken,
      refreshToken,
      clientId,
      clientSecret,
      userAgent: 'RedditAutoMarket/1.0',
    })
  }

  // Search for posts matching keywords in subreddits
  async searchPosts(query: string, subreddits: string[], limit: number = 25): Promise<RedditPost[]> {
    const posts: RedditPost[] = []

    for (const subreddit of subreddits) {
      try {
        const results = await this.client.getSubreddit(subreddit).search({
          query,
          limit,
          sort: 'relevance',
          time: 'month',
        })

        for (const post of results) {
          posts.push({
            id: post.id,
            title: post.title,
            selftext: post.selftext || '',
            subreddit: post.subreddit?.display_name || subreddit,
            url: post.url,
            score: post.score,
            numComments: post.num_comments,
            createdUtc: post.created_utc,
            permalink: post.permalink,
            author: post.author?.name || '[deleted]',
          })
        }
      } catch (error) {
        console.error(`Error searching r/${subreddit}:`, error)
      }
    }

    return posts
  }

  // Get comments from a post
  async getPostComments(postId: string): Promise<RedditComment[]> {
    try {
      const post = await this.client.getSubmission(postId).fetch()
      const comments = await post.comments.fetchAll({ limit: 100 })

      return comments.map((comment: any) => ({
        id: comment.id,
        body: comment.body,
        author: comment.author?.name || '[deleted]',
        score: comment.score,
        parentId: comment.parent_id,
        permalink: comment.permalink,
        createdUtc: comment.created_utc,
      }))
    } catch (error) {
      console.error(`Error getting comments for ${postId}:`, error)
      return []
    }
  }

  // Post a comment
  async postComment(postId: string, content: string): Promise<string | null> {
    // Check rate limit
    if (!this.checkRateLimit('comment')) {
      throw new Error('Rate limit exceeded')
    }

    try {
      const post = await this.client.getSubmission(postId)
      const comment = await post.reply(content)
      this.incrementRateLimit('comment')
      return comment.id
    } catch (error) {
      console.error(`Error posting comment on ${postId}:`, error)
      return null
    }
  }

  // Check if account can post (karma requirements)
  async checkAccountHealth(): Promise<{ karma: number; canPost: boolean }> {
    try {
      const me = await this.client.getMe()
      const karma = (me.link_karma || 0) + (me.comment_karma || 0)
      return {
        karma,
        canPost: karma >= 10, // Minimum 10 karma to post
      }
    } catch (error) {
      console.error('Error checking account health:', error)
      return { karma: 0, canPost: false }
    }
  }

  private checkRateLimit(type: string): boolean {
    const now = Date.now()
    const limit = rateLimits.get(type)

    if (!limit) return true
    if (now > limit.resetTime) return true

    return limit.count < 10 // Max 10 posts per minute
  }

  private incrementRateLimit(type: string) {
    const now = Date.now()
    const limit = rateLimits.get(type) || { count: 0, resetTime: now + 60000 }

    limit.count++
    limit.resetTime = now + 60000
    rateLimits.set(type, limit)
  }
}

// Factory function to create RedditService from stored tokens
export async function createRedditService(userId: string): Promise<RedditService | null> {
  const { prisma } = await import('@/lib/prisma')

  const account = await prisma.redditAccount.findFirst({
    where: { userId, isActive: true },
  })

  if (!account) return null

  return new RedditService(
    account.accessToken,
    account.refreshToken,
    process.env.REDDIT_CLIENT_ID!,
    process.env.REDDIT_CLIENT_SECRET!
  )
}
