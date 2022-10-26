import NextAuth from 'next-auth';
import dbConnect from '../../../lib/db-connect';
import Admin from '../../../models/admin';
import CredentialsProvider from 'next-auth/providers/credentials';
import { compare } from 'bcryptjs';

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        await dbConnect();

        const user = await Admin.findOne({
          email: credentials?.email,
        });

        if (!user) {
          throw new Error('Email is not registered.');
        }

        const isPasswordCorrect = await compare(
          credentials!.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error('Password is incorrect.');
        }

        return { email: user.email, name: user.firstName };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
});
