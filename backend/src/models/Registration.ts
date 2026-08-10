import mongoose, { Schema, Document } from 'mongoose';

export interface IRegistration extends Document {
  eventId: mongoose.Types.ObjectId | string;
  userId: mongoose.Types.ObjectId | string;
  ticketCode: string;
  attendanceStatus: 'Registered' | 'Attended' | 'Absent';
  registeredAt: Date;
}

const RegistrationSchema: Schema = new Schema(
  {
    eventId: { type: Schema.Types.ObjectId, ref: 'Event', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ticketCode: { type: String, required: true, unique: true },
    attendanceStatus: { type: String, enum: ['Registered', 'Attended', 'Absent'], default: 'Registered' },
    registeredAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model<IRegistration>('Registration', RegistrationSchema);
