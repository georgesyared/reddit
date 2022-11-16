import { useQuery } from '@apollo/client'
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Feed from '../components/Feed'
import Header from '../components/Header'
import PostBox from '../components/PostBox'
import SubredditRow from '../components/SubredditRow'
import { GET_SUBREDDIT_WITH_LIMITS } from '../graphql/queries'

const Home: NextPage = () => {


  const {data} = useQuery(GET_SUBREDDIT_WITH_LIMITS,{
    variables:{
      limit:10,
    }
  })

  const subreddits : Subreddit[] = data?.getSubredditListLimit

  return (
    <div className="my-7 max-w-5xl mx-auto">
      <Head>
        <title>Reddit</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* {PostBox} */}
      <PostBox />

      <div className='flex'>
        <Feed />

        <div className='stick top-36 mx-5 mt-5 hidden h-fit min-w-[300px] rounded-md
        border border-gray-300 bg-white lg:inline'>
          <p>Top Comments</p>

          <div>
             {subreddits?.map((subreddit,i) => (
               <SubredditRow key={subreddit.id} topic={subreddit.topic} index={i} />
             ))}
          </div>

        </div>
      </div>     
    </div>
  )
}

export default Home
