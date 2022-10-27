import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db-connect';
import Patient from '../../../models/patient';

interface IAllPatients {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  gender: string;
  image: string;
}

type IAllPatientsResData =
  | {
      message: string;
      patients: IAllPatients[];
    }
  | {
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IAllPatientsResData>
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
        await Patient.create({ ...req.body });
        res.status(StatusCodes.OK).json({
          message: 'Patient added successfully.',
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
