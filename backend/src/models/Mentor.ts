import mongoose, { Schema, Document } from 'mongoose';

export interface IMentor extends Document {
  name: string;
  title: string;
  company: string;
  bio: string;
  expertise: string[];
  avatar: string;
  linkedin: string;
  rating: number;
  sessionsCount: number;
  availableDays: string[];
  isAvailable: boolean;
}

const MentorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    company: { type: String, required: true },
    bio: { type: String, required: true },
    expertise: [{ type: String }],
    avatar: { type: String, default: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80' },
    linkedin: { type: String, default: '#' },
    rating: { type: Number, default: 4.9 },
    sessionsCount: { type: Number, default: 12 },
    availableDays: [{ type: String }],
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model<IMentor>('Mentor', MentorSchema);
