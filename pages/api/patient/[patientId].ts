import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/db-connect';
import Patient from '@/models/patient';
import fs from 'fs';

interface ISinglePatient {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  phone: string;
  gender: string;
  image: string;
}

type ISinglePatientResData =
  | {
      message: string;
      patient: ISinglePatient;
    }
  | {
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ISinglePatientResData>
) {
  const { method } = req;
  const { patientId } = req.query;

  await dbConnect();

  switch (method) {
    case 'GET': {
      try {
        const singlePatient = await Patient.findOne({ _id: patientId });
        res.status(StatusCodes.OK).json({
          message: 'Patient added successfully.',
          patient: singlePatient,
        });
      } catch (error: any) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      break;
    }

    case 'PATCH': {
      const { firstName, lastName, email, phone } = req.body;

      if (!firstName || !lastName || !email || !phone) {
        return res
          .status(StatusCodes.BAD_REQUEST)
          .json({ message: 'Invalid user data.' });
      }

      try {
        await Patient.findOneAndUpdate(
          { _id: patientId },
          { ...req.body },
          {
            new: true,
            runValidators: true,
          }
        );
        res.status(StatusCodes.OK).json({
          message: 'Patient info updated successfully.',
        });
      } catch (error: any) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json({ message: error.message });
      }
      break;
    }

    case 'DELETE': {
      try {
        // await Patient.findOneAndDelete({ _id: patientId });
        const patient = await Patient.findById({ _id: patientId });
        patient.remove();
        fs.unlinkSync(`public${patient.image}`);
        res.status(StatusCodes.OK).json({
          message: 'Patient deleted.',
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
