import { describe, it, expect, vi, beforeEach } from 'vitest'
import { RedditService } from '@/lib/reddit'

// Mock snoowrap
vi.mock('snoowrap', () => {
  const mockSearchResults = [
    {
      id: 'post1',
      title: 'Need help with project management',
      selftext: 'Looking for tools for my team',
      subreddit: { display_name: 'smallbusiness' },
      url: 'https://reddit.com/r/smallbusiness/post1',
      score: 42,
      num_comments: 15,
      created_utc: Date.now() / 1000,
      permalink: '/r/smallbusiness/comments/post1/',
      author: { name: 'testuser' },
    },
  ]

  return {
    default: vi.fn().mockImplementation(() => ({
      getSubreddit: vi.fn().mockReturnValue({
        search: vi.fn().mockResolvedValue(mockSearchResults),
      }),
      getSubmission: vi.fn().mockReturnValue({
        fetch: vi.fn().mockResolvedValue({
          comments: {
            fetchAll: vi.fn().mockResolvedValue([
              {
                id: 'comment1',
                body: 'Test comment',
                author: { name: 'commenter' },
                score: 5,
                parent_id: 't3_post1',
                permalink: '/r/test/comments/post1/comment1/',
                created_utc: Date.now() / 1000,
              },
            ]),
          },
        }),
        reply: vi.fn().mockResolvedValue({ id: 'newcomment1' }),
      }),
      getMe: vi.fn().mockResolvedValue({
        link_karma: 100,
        comment_karma: 500,
      }),
    })),
  }
})

describe('RedditService', () => {
  let service: RedditService

  beforeEach(() => {
    service = new RedditService('access', 'refresh', 'clientId', 'clientSecret')
  })

  describe('searchPosts', () => {
    it('should search posts in given subreddits', async () => {
      const posts = await service.searchPosts('project management', ['smallbusiness'])
      expect(posts).toHaveLength(1)
      expect(posts[0].id).toBe('post1')
      expect(posts[0].title).toBe('Need help with project management')
      expect(posts[0].subreddit).toBe('smallbusiness')
    })

    it('should search multiple subreddits', async () => {
      const posts = await service.searchPosts('tools', ['smallbusiness', 'startups'])
      expect(posts).toHaveLength(2) // one per subreddit
    })

    it('should handle search errors gracefully', async () => {
      const Snoowrap = (await import('snoowrap')).default
      vi.mocked(Snoowrap).mockImplementationOnce(() => ({
        getSubreddit: vi.fn().mockReturnValue({
          search: vi.fn().mockRejectedValue(new Error('Forbidden')),
        }),
      } as any))

      const badService = new RedditService('access', 'refresh', 'id', 'secret')
      const posts = await badService.searchPosts('test', ['private_sub'])
      expect(posts).toHaveLength(0)
    })
  })

  describe('getPostComments', () => {
    it('should fetch comments for a post', async () => {
      const comments = await service.getPostComments('post1')
      expect(comments).toHaveLength(1)
      expect(comments[0].id).toBe('comment1')
      expect(comments[0].body).toBe('Test comment')
    })
  })

  describe('postComment', () => {
    it('should post a comment and return its ID', async () => {
      const commentId = await service.postComment('post1', 'Great tip!')
      expect(commentId).toBe('newcomment1')
    })
  })

  describe('checkAccountHealth', () => {
    it('should return karma and posting ability', async () => {
      const health = await service.checkAccountHealth()
      expect(health.karma).toBe(600) // 100 + 500
      expect(health.canPost).toBe(true)
    })
  })
})
