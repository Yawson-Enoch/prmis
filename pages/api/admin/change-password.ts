import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db-connect';
import Admin from '../../../models/admin';
import { getSession } from 'next-auth/react';
import { compare, hash } from 'bcryptjs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'PATCH': {
      const session = await getSession({ req });

      if (!session) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
          message: 'Not authorized!',
        });
      }

      const adminEmail = session.user?.email;
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Invalid user data.' });
      }

      try {
        const existingAdmin = await Admin.findOne({ email: adminEmail });

        if (!existingAdmin) {
          return res.status(StatusCodes.NOT_FOUND).json({
            message: 'Admin not found.',
          });
        }

        const currentPassword = existingAdmin.password;

        const isPasswordCorrect = await compare(oldPassword, currentPassword);

        if (!isPasswordCorrect) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            message: 'Wrong old password.',
          });
        }

        const hashedPassword = await hash(newPassword, 12);

        const updatedPost = await Admin.findOneAndUpdate(
          { email: adminEmail },
          { password: hashedPassword },
          {
            new: true,
            runValidators: true,
          }
        );
        res
          .status(StatusCodes.OK)
          .json({ admin: updatedPost, message: 'Password updated.' });
      } catch (error: any) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      break;
    }

    default: {
      res.status(StatusCodes.FORBIDDEN).json({
        message: `Method ${method} Not Allowed!`,
      });
      break;
    }
  }
}
