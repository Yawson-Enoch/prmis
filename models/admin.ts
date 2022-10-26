import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// use regex patterns to validate input both on the front-end and back-end
const AdminSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please provide first name.'],
      lowercase: true,
      trim: true,
      minlength: 2,
      match: [/^[a-z0-9_-]{2,15}$/, 'First name must be 2-16 characters long.'],
    },
    lastName: {
      type: String,
      required: [true, 'Please provide last name.'],
      lowercase: true,
      trim: true,
      minlength: 2,
      match: [/^[a-z0-9_-]{2,15}$/, 'Last name must be 2-16 characters long.'],
    },
    email: {
      type: String,
      required: [true, 'Please provide email.'],
      lowercase: true,
      minlength: 10,
      unique: true,
      match: [/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/, 'Invalid email!'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide phone number.'],
      minlength: 10,
      match: [
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        `Incorrect format! Example: 000-000-0000.`,
      ],
    },
    password: {
      type: String,
      required: [true, 'Please provide password.'],
      minlength: 8,
      match: [
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/,
        `Minimum eight characters, at least one upper case English letter,
        one lower case English letter, one number and one special character.`,
      ],
    },
  },
  { timestamps: true }
);

// Mongoose middleware
// mongoose middleware to hash password before saving to db. triggers: create and update
AdminSchema.pre('save', async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
