import mongoose, { Schema, Document } from 'mongoose';

export interface IMentorshipApplication extends Document {
  mentorId: mongoose.Types.ObjectId | string;
  studentId: mongoose.Types.ObjectId | string;
  startupName: string;
  topic: string;
  message: string;
  preferredDate: string;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Completed';
  meetingLink?: string;
  createdAt: Date;
}

const MentorshipApplicationSchema: Schema = new Schema(
  {
    mentorId: { type: Schema.Types.ObjectId, ref: 'Mentor', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    startupName: { type: String, required: true },
    topic: { type: String, required: true },
    message: { type: String, required: true },
    preferredDate: { type: String, required: true },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected', 'Completed'], default: 'Pending' },
    meetingLink: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IMentorshipApplication>('MentorshipApplication', MentorshipApplicationSchema);
