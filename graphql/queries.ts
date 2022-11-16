import { gql } from '@apollo/client'


export const GET_ALL_POSTS = gql`
    query MyQuery {
    getPostList{
    body
    created_at
    id
    image
    title
    subreddit_id
    username
    comments {
      created_at
      id
      post_id
      text
      username
    }
    subreddit {
      created_at
      id
      topic
    }
    vote {
      created_at
      id
      post_id
      upvote
      username
    }
  }
}
      `

export const GET_ALL_POSTS_BY_ID = gql`
    query MyQuery($post_id: ID!) {
    getPostListById(post_id: $post_id){
    body
    created_at
    id
    image
    title
    subreddit_id
    username
    comments {
      created_at
      id
      post_id
      text
      username
    }
    subreddit {
      created_at
      id
      topic
    }
    vote {
      created_at
      id
      post_id
      upvote
      username
    }
  }
}
      `


export const GET_ALL_POSTS_BY_TOPIC = gql`
    query MyQuery($topic: String) {
    getPostListByTopic(topic: $topic){
    body
    created_at
    id
    image
    title
    subreddit_id
    username
    comments {
      created_at
      id
      post_id
      text
      username
    }
    subreddit {
      created_at
      id
      topic
    }
    vote {
      created_at
      id
      post_id
      upvote
      username
    }
  }
}
      `



export const GET_SUBREDDIT_BY_TOPIC = gql `

query MyQuery($topic:String!) {
  getSubredditListByTopic(topic: $topic){
    topic 
    created_at
    id
  }
}

`

export const GET_SUBREDDIT_WITH_LIMITS = gql `

query MyQuery($limit:Int!) {
  getSubredditListLimit(limit: $limit){
    topic
    created_at
    id
  }
}

`


export const GET_ALL_VOTES_BY_POST_ID = gql `

query MyQuery($post_id:ID!) {
  getVotesByPostId(post_id: $post_id){
    upvote
    created_at
    post_id
    username
    id
  }
}

`