import mongoose, { Schema, Document } from 'mongoose';

export interface IBadge extends Document {
  code: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  xpRequired: number;
}

const BadgeSchema: Schema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    category: { type: String, default: 'Achievement' },
    xpRequired: { type: Number, default: 100 },
  },
  { timestamps: true }
);

export default mongoose.model<IBadge>('Badge', BadgeSchema);
