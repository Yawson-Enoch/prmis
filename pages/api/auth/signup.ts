import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db-connect';
import Admin from '../../../models/admin';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET': {
      try {
        const allAdmins = await Admin.find({});
        res.status(StatusCodes.OK).json({
          message: 'Success.',
          admins: allAdmins,
          nbOfHits: allAdmins.length,
        });
      } catch (error: any) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      break;
    }

    case 'POST': {
      const { firstName, lastName, email, phone, password } = req.body;

      if (!firstName || !lastName || !email || !phone || !password) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Invalid admin data.' });
      }

      try {
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
          return res.status(StatusCodes.UNAUTHORIZED).json({
            message: 'Admin already exists, you may have to try another email.',
          });
        }

        const admin = await Admin.create({
          firstName,
          lastName,
          email,
          phone,
          password,
        });
        res.status(StatusCodes.OK).json({
          message: 'Successfully created admin.',
          admin,
        });
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