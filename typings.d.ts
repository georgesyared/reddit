 type Post = {
    body: string
    created_at: string
    id: number
    image: String
    subreddit_id: number
    title: String
    username: String
    vote: Vote[]
    comments: Comments[]
    subreddit: Subreddit[]
  }  

  type Comments = {
    created_at: string
    id: number
    post_id: number
    text: String
    username: String
  }

  type Subreddit = {
    created_at: string
    id: number
    topic: String
  }
  
  type Vote = {
    created_at: string
    id: number
    post_id: number
    upvote: boolean
    username: String
  }