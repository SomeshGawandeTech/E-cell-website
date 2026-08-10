import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = 'Visitor' | 'Student Member' | 'Core Team Member' | 'Admin';

export interface IUser extends Document {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  department?: string;
  year?: string;
  phone?: string;
  otp?: string;
  otpExpiresAt?: Date;
  isVerified: boolean;
  points: number;
  xp: number;
  level: number;
  badges: string[];
  bookmarkedResources: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    role: {
      type: String,
      enum: ['Visitor', 'Student Member', 'Core Team Member', 'Admin'],
      default: 'Student Member',
    },
    avatar: { type: String, default: '' },
    bio: { type: String, default: '' },
    department: { type: String, default: 'Computer Science' },
    year: { type: String, default: '3rd Year' },
    phone: { type: String, default: '' },
    otp: { type: String },
    otpExpiresAt: { type: Date },
    isVerified: { type: Boolean, default: false },
    points: { type: Number, default: 50 },
    xp: { type: Number, default: 100 },
    level: { type: Number, default: 1 },
    badges: [{ type: String }],
    bookmarkedResources: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
