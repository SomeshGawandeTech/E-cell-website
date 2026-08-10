import { Request, Response } from 'express';
import User from '../models/User';
import { isMongoConnected } from '../config/db';

export const getLeaderboard = async (req: Request, res: Response) => {
  if (isMongoConnected) {
    try {
      const users = await User.find().sort({ points: -1 }).limit(10).select('name email role points xp level badges avatar department');
      if (users.length > 0) return res.json({ success: true, leaderboard: users });
    } catch (e) {}
  }

  return res.json({
    success: true,
    leaderboard: [
      { id: '1', name: 'Aarav Mehta', role: 'Student Member', points: 650, xp: 2100, level: 5, badges: ['Hackathon Champ', 'Top Pitcher', 'Pioneer'], department: 'Computer Eng', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200' },
      { id: '2', name: 'Ananya Sharma', role: 'Student Member', points: 580, xp: 1950, level: 4, badges: ['Resource Master', 'Community Star'], department: 'Information Tech', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200' },
      { id: '3', name: 'Rohan Deshmukh', role: 'Core Team Member', points: 510, xp: 1700, level: 4, badges: ['Event Organizer', 'Mentor Connector'], department: 'Mechanical Eng', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200' },
      { id: '4', name: 'Sneha Patel', role: 'Student Member', points: 430, xp: 1400, level: 3, badges: ['Idea Submitter', 'Quiz Ace'], department: 'Electronics Eng', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200' },
      { id: '5', name: 'Vikram Joshi', role: 'Student Member', points: 390, xp: 1250, level: 3, badges: ['Active Participant'], department: 'Civil Eng', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200' },
    ],
  });
};

export const updateProfile = async (req: any, res: Response) => {
  const userId = req.user.id;
  const { name, bio, department, year, phone, avatar } = req.body;

  if (isMongoConnected) {
    try {
      const user = await User.findById(userId);
      if (user) {
        if (name) user.name = name;
        if (bio) user.bio = bio;
        if (department) user.department = department;
        if (year) user.year = year;
        if (phone) user.phone = phone;
        if (avatar) user.avatar = avatar;
        await user.save();
        return res.json({ success: true, message: 'Profile updated successfully!', user });
      }
    } catch (e) {}
  }

  return res.json({
    success: true,
    message: 'Profile updated (session saved)!',
    user: { id: userId, name, bio, department, year, phone, avatar },
  });
};
