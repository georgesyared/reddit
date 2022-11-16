import NextAuth from "next-auth"
import RedditProvider from "next-auth/providers/reddit"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    RedditProvider({
      clientId: process.env.REDDIT_ID,
      clientSecret: process.env.REDDIT_SECRET,
    }),
    // ...add more providers here
  ],
}
export default NextAuth(authOptions)