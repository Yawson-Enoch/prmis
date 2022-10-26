import { StatusCodes } from 'http-status-codes';
import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/db-connect';
import Patient from '../../../models/patient';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
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
        await Patient.findOneAndDelete({ _id: patientId });
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