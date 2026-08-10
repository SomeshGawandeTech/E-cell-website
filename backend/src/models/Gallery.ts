import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  category: string;
  imageUrl: string;
  date: string;
  uploadedBy: string;
  createdAt: Date;
}

const GallerySchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, default: 'Event' },
    imageUrl: { type: String, required: true },
    date: { type: String, default: '2026' },
    uploadedBy: { type: String, default: 'E-Cell Core Team' },
  },
  { timestamps: true }
);

export default mongoose.model<IGallery>('Gallery', GallerySchema);
