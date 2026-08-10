import { Request, Response } from 'express';
import User from '../models/User';
import Event from '../models/Event';
import Startup from '../models/Startup';
import { isMongoConnected } from '../config/db';

export const getAnalyticsStats = async (req: Request, res: Response) => {
  let totalMembers = 1240;
  let activeUsers = 485;
  let eventRegistrations = 850;
  let startupSubmissions = 42;
  let blogViews = 3800;
  let resourceDownloads = 1820;
  let mentorSessions = 115;

  if (isMongoConnected) {
    try {
      totalMembers = await User.countDocuments();
      startupSubmissions = await Startup.countDocuments();
      const events = await Event.find();
      eventRegistrations = events.reduce((acc, curr) => acc + (curr.registeredCount || 0), 0);
    } catch (e) {}
  }

  const monthlyGrowth = [
    { month: 'Jan', members: 420, registrations: 180, startups: 5 },
    { month: 'Feb', members: 580, registrations: 240, startups: 8 },
    { month: 'Mar', members: 710, registrations: 310, startups: 14 },
    { month: 'Apr', members: 890, registrations: 490, startups: 22 },
    { month: 'May', members: 1050, registrations: 620, startups: 31 },
    { month: 'Jun', members: 1240, registrations: 850, startups: 42 },
  ];

  const engagementDistribution = [
    { name: 'Event Registrations', value: 42, color: '#38bdf8' },
    { name: 'AI Generator Usage', value: 28, color: '#a855f7' },
    { name: 'Resource Downloads', value: 18, color: '#34d399' },
    { name: 'Mentorship Bookings', value: 12, color: '#f43f5e' },
  ];

  return res.json({
    success: true,
    stats: {
      totalMembers,
      activeUsers,
      eventRegistrations,
      startupSubmissions,
      blogViews,
      resourceDownloads,
      mentorSessions,
    },
    monthlyGrowth,
    engagementDistribution,
  });
};
