import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  userId: string; // 'all' or specific user ID
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'event' | 'approval';
  isRead: boolean;
  link?: string;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema(
  {
    userId: { type: String, required: true, default: 'all' },
    title: { type: String, required: true },
    message: { type: String, required: true },
    type: { type: String, enum: ['info', 'success', 'warning', 'event', 'approval'], default: 'info' },
    isRead: { type: Boolean, default: false },
    link: { type: String, default: '' },
  },
  { timestamps: true }
);

export default mongoose.model<INotification>('Notification', NotificationSchema);
