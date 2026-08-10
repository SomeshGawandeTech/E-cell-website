import mongoose, { Schema, Document } from 'mongoose';

export interface IStartup extends Document {
  name: string;
  tagline: string;
  description: string;
  industry: string;
  stage: 'Ideation' | 'MVP' | 'Early Traction' | 'Growth' | 'Scaled';
  fundingStatus: 'Bootstrapped' | 'Grant Funded' | 'Seed' | 'Series A+';
  founders: string[];
  founderUserIds?: mongoose.Types.ObjectId[] | string[];
  logo?: string;
  demoUrl?: string;
  pitchDeckUrl?: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  upvotes: number;
  featured: boolean;
  createdAt: Date;
}

const StartupSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    description: { type: String, required: true },
    industry: { type: String, required: true },
    stage: {
      type: String,
      enum: ['Ideation', 'MVP', 'Early Traction', 'Growth', 'Scaled'],
      default: 'Ideation',
    },
    fundingStatus: {
      type: String,
      enum: ['Bootstrapped', 'Grant Funded', 'Seed', 'Series A+'],
      default: 'Bootstrapped',
    },
    founders: [{ type: String }],
    founderUserIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    logo: { type: String, default: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=400&q=80' },
    demoUrl: { type: String, default: '' },
    pitchDeckUrl: { type: String, default: '' },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    upvotes: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IStartup>('Startup', StartupSchema);
