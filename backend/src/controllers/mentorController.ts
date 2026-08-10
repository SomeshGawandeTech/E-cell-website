import { Request, Response } from 'express';
import Mentor from '../models/Mentor';
import MentorshipApplication from '../models/MentorshipApplication';
import { isMongoConnected } from '../config/db';

const initialMentors = [
  {
    _id: 'm_1',
    name: 'Rajesh Kulkarni',
    title: 'Managing Partner',
    company: 'Apex Venture Capital',
    bio: 'Ex-Google Product Director turned VC investor with 15+ years experience funding early-stage SaaS, AI, and DeepTech startups across Asia-Pacific.',
    expertise: ['Venture Capital', 'Fundraising', 'B2B Product Strategy', 'Go-To-Market'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    rating: 4.95,
    sessionsCount: 34,
    availableDays: ['Tuesdays', 'Thursdays'],
    isAvailable: true,
  },
  {
    _id: 'm_2',
    name: 'Dr. Sunita Deshpande',
    title: 'Head of Innovation & Patents',
    company: 'TechCorp India',
    bio: 'IP Attorney & Innovation Strategist specializing in deep-tech patent drafting, copyright licensing, and government grant compliance for university spin-offs.',
    expertise: ['IP & Patents', 'Grant Proposals', 'Legal Compliance', 'R&D Commercialization'],
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    rating: 4.88,
    sessionsCount: 28,
    availableDays: ['Mondays', 'Wednesdays'],
    isAvailable: true,
  },
  {
    _id: 'm_3',
    name: 'Siddharth Varma',
    title: 'Serial Entrepreneur & Co-Founder',
    company: 'CloudPulse (Acquired by Cisco)',
    bio: 'Built and scaled two SaaS startups from zero to $10M ARR. Expert in rapid prototyping, growth marketing funnels, and customer acquisition execution.',
    expertise: ['Growth Hacking', 'SaaS Metrics', 'Pitching', 'Team Building'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    linkedin: 'https://linkedin.com',
    rating: 4.92,
    sessionsCount: 45,
    availableDays: ['Fridays', 'Saturdays'],
    isAvailable: true,
  },
];

const memoryApplications: any[] = [];

export const getMentors = async (req: Request, res: Response) => {
  if (isMongoConnected) {
    try {
      const mentors = await Mentor.find();
      if (mentors.length > 0) return res.json({ success: true, mentors });
    } catch (e) {}
  }
  return res.json({ success: true, mentors: initialMentors });
};

export const applyForMentorship = async (req: any, res: Response) => {
  const studentId = req.user.id;
  const { mentorId, startupName, topic, message, preferredDate } = req.body;

  if (isMongoConnected) {
    try {
      const app = new MentorshipApplication({
        mentorId,
        studentId,
        startupName,
        topic,
        message,
        preferredDate,
        status: 'Pending',
      });
      await app.save();
      return res.status(201).json({ success: true, message: 'Mentorship request submitted! +30 XP awarded.', application: app });
    } catch (e: any) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }

  const mentor = initialMentors.find((m) => m._id === mentorId) || initialMentors[0];
  const newApp = {
    _id: 'ma_' + Date.now(),
    mentorId,
    mentorName: mentor.name,
    studentId,
    studentName: req.user.name,
    startupName,
    topic,
    message,
    preferredDate,
    status: 'Pending',
    createdAt: new Date(),
  };
  memoryApplications.push(newApp);

  return res.status(201).json({
    success: true,
    message: `Mentorship session request sent to ${mentor.name}! You earned 30 XP.`,
    application: newApp,
  });
};

export const getMentorshipApplications = async (req: any, res: Response) => {
  const userId = req.user.id;
  const userRole = req.user.role;

  if (isMongoConnected) {
    try {
      const filter = userRole === 'Admin' ? {} : { studentId: userId };
      const apps = await MentorshipApplication.find(filter).populate('mentorId studentId');
      return res.json({ success: true, applications: apps });
    } catch (e) {}
  }

  const apps = userRole === 'Admin' ? memoryApplications : memoryApplications.filter((a) => a.studentId === userId);
  return res.json({ success: true, applications: apps });
};
