import dbConnect from '@/lib/db-connect';
import Admin from '@/models/admin';
import { compare } from 'bcryptjs';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

interface ICredentials {
  email: string;
  password: string;
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      type: 'credentials',
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
      async authorize(credentials): Promise<any> {
        await dbConnect();

        const { email, password } = credentials as ICredentials;

        const user = await Admin.findOne({
          email,
        });

        if (!user) {
          throw new Error('Email is not registered.');
        }

        const isPasswordCorrect = await compare(password, user.password);

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
