import mongoose from 'mongoose';
// use regex patterns to validate input both on the front-end and back-end
const helloSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name.'],
      lowercase: true,
      minlength: 2,
    },
    email: {
      type: String,
      required: [true, 'Please provide email.'],
      lowercase: true,
      minlength: [10, 'Email length should be more than 10'],
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please provide a valid email',
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Hello || mongoose.model('Hello', helloSchema);
