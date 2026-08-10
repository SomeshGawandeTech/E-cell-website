import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'demo',
  api_key: process.env.CLOUDINARY_API_KEY || '123456789',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'secret',
});

export const uploadToCloudinary = async (fileBase64: string, folder = 'coeta_ecell'): Promise<string> => {
  try {
    if (process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_KEY !== '123456789') {
      const res = await cloudinary.uploader.upload(fileBase64, { folder });
      return res.secure_url;
    }
  } catch (error: any) {
    console.warn('[Cloudinary Warning] Upload failed, returning input/placeholder:', error.message);
  }
  return fileBase64.startsWith('http') ? fileBase64 : 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80';
};
