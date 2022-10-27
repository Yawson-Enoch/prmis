import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db-connect';
import Patient from '../../../models/patient';

// interface IUser {
//   firstName: string;
//   lastName: string;
//   age: number;
//   email: string;
//   phone: string;
// }

// type IResData =
//   | {
//       message: string;
//       patients: IUser[];
//       nbOfHits: number;
//     }
//   | {
//       message: string;
//       patient: IUser;
//     }
//   | {
//       message: string;
//     };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET': {
      try {
        const allPatients = await Patient.find({});
        res.status(StatusCodes.OK).json({
          message: 'Success.',
          patients: allPatients,
          nbOfHits: allPatients.length,
        });
      } catch (error: any) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      break;
    }
    case 'POST': {
      const { firstName, lastName, email, age, phone, gender } = req.body;

      if (!firstName || !lastName || !email || !age || !phone || !gender) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Invalid user data.' });
      }

      try {
        const patient = await Patient.create({ ...req.body });
        res.status(StatusCodes.OK).json({
          message: 'Patient added successfully.',
          patient,
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
