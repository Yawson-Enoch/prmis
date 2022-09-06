// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db-connect';
import Hello from '../../../models/hello-model';

interface IUser {
  name: string;
  email: string;
}

type IResData =
  | {
      message: string;
      users: IUser[];
      nbOfHits: number;
    }
  | {
      message: string;
      user: IUser;
    }
  | {
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IResData>
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET': {
      try {
        const allUsers = await Hello.find({});
        res.status(StatusCodes.OK).json({
          message: 'Success.',
          users: allUsers,
          nbOfHits: allUsers.length,
        });
      } catch (error: any) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      break;
    }
    case 'POST': {
      const { name, email } = req.body;

      try {
        const user = await Hello.create({ name, email });
        res.status(StatusCodes.OK).json({
          message: 'Successfully created user.',
          user: user,
        });
      } catch (error: any) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      break;
    }

    default: {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: 'Unhandled request',
      });
      break;
    }
  }
}
