import mongoose, { Schema, Document } from 'mongoose';

export interface IResource extends Document {
  title: string;
  description: string;
  category: 'E-Books' | 'Pitch Templates' | 'Legal & Compliance' | 'Government Schemes' | 'Video Tutorials';
  fileUrl: string;
  fileSize: string;
  downloadsCount: number;
  tags: string[];
  createdAt: Date;
}

const ResourceSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: {
      type: String,
      enum: ['E-Books', 'Pitch Templates', 'Legal & Compliance', 'Government Schemes', 'Video Tutorials'],
      required: true,
    },
    fileUrl: { type: String, required: true },
    fileSize: { type: String, default: '2.4 MB' },
    downloadsCount: { type: Number, default: 0 },
    tags: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model<IResource>('Resource', ResourceSchema);
