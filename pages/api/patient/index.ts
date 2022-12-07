import path from 'path';
import fs from 'fs';
import dbConnect from '@/lib/db-connect';
import Patient from '@/models/patient';
import multer from 'multer';
import nextConnect from 'next-connect';
import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';

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

export const config = {
  api: {
    bodyParser: false,
  },
};

interface MulterRequest extends NextApiRequest {
  file: any;
}

const dirPath = path.join(process.cwd(), 'public', 'uploads', 'images');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    cb(null, dirPath);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

export default nextConnect<MulterRequest, NextApiResponse<IAllPatientsResData>>(
  {
    onError(err, req, res) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: err.message });
    },
    onNoMatch(req, res) {
      res.status(StatusCodes.FORBIDDEN).json({
        message: `Method ${req.method} Not Allowed!`,
      });
    },
  }
)
  .get(async (req, res) => {
    await dbConnect();
    const allPatients = await Patient.find({});
    res.status(StatusCodes.OK).json({
      message: 'Success.',
      patients: allPatients,
    });
  })
  .use(upload.single('image'))
  .post(async (req, res) => {
    await dbConnect();

    const { firstName, lastName, email, age, phone, gender } = req.body;
    const imgUrl = `/uploads/images/${req.file.filename}`;

    if (!firstName || !lastName || !email || !age || !phone || !gender) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid user data.' });
    }

    try {
      await Patient.create({ ...req.body, image: imgUrl });
      res.status(StatusCodes.OK).json({
        message: 'Patient added successfully.',
      });
    } catch (error: any) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  });
