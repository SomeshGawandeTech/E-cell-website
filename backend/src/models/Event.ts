import mongoose, { Schema, Document } from 'mongoose';

export interface IEvent extends Document {
  title: string;
  slug: string;
  description: string;
  fullDetails?: string;
  date: Date;
  time: string;
  venue: string;
  image: string;
  category: string;
  capacity: number;
  registeredCount: number;
  isFeatured: boolean;
  status: 'Upcoming' | 'Ongoing' | 'Completed' | 'Cancelled';
  createdBy: mongoose.Types.ObjectId | string;
  createdAt: Date;
}

const EventSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    fullDetails: { type: String, default: '' },
    date: { type: Date, required: true },
    time: { type: String, default: '10:00 AM' },
    venue: { type: String, required: true },
    image: { type: String, default: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80' },
    category: { type: String, default: 'Workshop' },
    capacity: { type: Number, default: 100 },
    registeredCount: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    status: { type: String, enum: ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'], default: 'Upcoming' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model<IEvent>('Event', EventSchema);
