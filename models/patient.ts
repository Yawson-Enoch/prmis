import mongoose from 'mongoose';

const PatientSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide first name.'],
      lowercase: true,
      trim: true,
      minlength: 2,
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name.'],
      lowercase: true,
      trim: true,
      minlength: 2,
    },
    age: {
      type: Number,
      required: [true, 'Please provide your age.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide email.'],
      lowercase: true,
      minlength: 10,
      unique: true,
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number.'],
      minlength: 10,
    },
    gender: {
      type: String,
      required: [true, 'Please provide your gender.'],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Patient ||
  mongoose.model('Patient', PatientSchema);
