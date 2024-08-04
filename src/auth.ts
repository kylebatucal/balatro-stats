import NextAuth from 'next-auth'
import discord from 'next-auth/providers/discord'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [discord],
})
