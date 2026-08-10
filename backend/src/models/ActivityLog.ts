import mongoose, { Schema, Document } from 'mongoose';

export interface IActivityLog extends Document {
  userId: mongoose.Types.ObjectId | string;
  action: string;
  pointsEarned: number;
  xpEarned: number;
  metadata?: string;
  createdAt: Date;
}

const ActivityLogSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    action: { type: String, required: true },
    pointsEarned: { type: Number, default: 0 },
    xpEarned: { type: Number, default: 0 },
    metadata: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
