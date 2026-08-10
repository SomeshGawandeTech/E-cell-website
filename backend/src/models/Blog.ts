import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  authorName: string;
  authorAvatar?: string;
  category: string;
  tags: string[];
  bannerImage: string;
  readTime: string;
  likes: number;
  isFeatured: boolean;
  comments: {
    userName: string;
    userAvatar?: string;
    content: string;
    createdAt: Date;
  }[];
  createdAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    authorName: { type: String, required: true },
    authorAvatar: { type: String, default: '' },
    category: { type: String, default: 'Startup Insights' },
    tags: [{ type: String }],
    bannerImage: { type: String, default: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80' },
    readTime: { type: String, default: '5 min read' },
    likes: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false },
    comments: [
      {
        userName: { type: String, required: true },
        userAvatar: { type: String, default: '' },
        content: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model<IBlog>('Blog', BlogSchema);
