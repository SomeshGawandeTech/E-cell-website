import { Request, Response } from 'express';
import Notification from '../models/Notification';
import { isMongoConnected } from '../config/db';

const initialNotifications = [
  {
    _id: 'notif_1',
    userId: 'all',
    title: '🚀 E-Summit 2026 Registration Open!',
    message: 'Early bird registration is now live for COETA E-Summit 2026. Claim your seat today and earn 50 XP.',
    type: 'event',
    isRead: false,
    link: '/events',
    createdAt: new Date(),
  },
  {
    _id: 'notif_2',
    userId: 'all',
    title: '🏆 Idea Submission Reward',
    message: 'Submit your startup proposal this week to get reviewed by our Venture Capital panel and win direct entry to incubation.',
    type: 'info',
    isRead: false,
    link: '/startup-showcase',
    createdAt: new Date(),
  },
];

export const getNotifications = async (req: any, res: Response) => {
  const userId = req.user.id;
  if (isMongoConnected) {
    try {
      const notifs = await Notification.find({ $or: [{ userId: 'all' }, { userId }] }).sort({ createdAt: -1 });
      if (notifs.length > 0) return res.json({ success: true, notifications: notifs });
    } catch (e) {}
  }
  return res.json({ success: true, notifications: initialNotifications });
};

export const createNotification = async (req: any, res: Response) => {
  const { title, message, type, link, targetUserId } = req.body;
  const userId = targetUserId || 'all';

  if (isMongoConnected) {
    try {
      const notif = new Notification({ userId, title, message, type: type || 'info', link });
      await notif.save();
      return res.status(201).json({ success: true, message: 'Notification broadcasted!', notification: notif });
    } catch (e: any) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }

  const newNotif = {
    _id: 'notif_' + Date.now(),
    userId,
    title,
    message,
    type: type || 'info',
    isRead: false,
    link: link || '',
    createdAt: new Date(),
  };
  initialNotifications.unshift(newNotif as any);

  return res.status(201).json({ success: true, message: 'Notification sent!', notification: newNotif });
};
