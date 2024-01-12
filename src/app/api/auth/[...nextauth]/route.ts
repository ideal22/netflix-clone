import NextAuth, { NextAuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GithubProvider from 'next-auth/providers/github'

type CallbackParamsType = {
  session: Session
  token: JWT
}

const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }: CallbackParamsType) {
      const newSession = JSON.parse(JSON.stringify(session))
      newSession.user.username = newSession.user.name
        .split(' ')
        .join('')
        .toLowerCase()
      newSession.user.uid = token.sub
      return newSession
    },
  },
  secret: process.env.SECRET_KEY,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
