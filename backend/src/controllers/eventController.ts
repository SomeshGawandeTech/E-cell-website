import { Request, Response } from 'express';
import Event from '../models/Event';
import Registration from '../models/Registration';
import { isMongoConnected } from '../config/db';

const initialEvents = [
  {
    _id: 'ev_1',
    title: 'COETA E-Summit 2026: Genesis of Titans',
    slug: 'coeta-e-summit-2026',
    description: 'The flagship annual entrepreneurship summit featuring keynote speakers, startup pitching competitions, VC panel discussions, and networking dinners.',
    fullDetails: 'Join over 1,500 students, founders, and investors for two days of inspirational talks, live pitching competitions with prize pools over ₹2 Lakhs, and exclusive networking sessions.',
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    time: '09:30 AM - 05:30 PM',
    venue: 'Main Auditorium, COETA Campus',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    category: 'Summit',
    capacity: 500,
    registeredCount: 342,
    isFeatured: true,
    status: 'Upcoming',
  },
  {
    _id: 'ev_2',
    title: 'AI Startup Bootcamp: From Idea to MVP',
    slug: 'ai-startup-bootcamp',
    description: 'Hands-on intensive weekend workshop on leveraging LLMs, LangChain, and Vercel to ship a functional AI prototype in 48 hours.',
    fullDetails: 'Master prompt engineering, API integrations, pitch deck design, and rapid UI development. Mentored by lead engineers from tech unicorns.',
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    time: '10:00 AM - 04:00 PM',
    venue: 'Innovation Lab 3, Department of CSE',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    category: 'Workshop',
    capacity: 80,
    registeredCount: 65,
    isFeatured: true,
    status: 'Upcoming',
  },
  {
    _id: 'ev_3',
    title: 'Pitch Perfect: Angel Investor Demo Day',
    slug: 'pitch-perfect-demo-day',
    description: 'Top 10 shortlisted campus startups present their business models to regional Angel Investors for seed funding consideration.',
    fullDetails: 'Watch live pitches and Q&A sessions. Network with founders, incubators, and government startup advisors.',
    date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
    time: '02:00 PM - 06:00 PM',
    venue: 'Seminar Hall B, Admin Block',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    category: 'Pitching',
    capacity: 150,
    registeredCount: 110,
    isFeatured: false,
    status: 'Upcoming',
  },
];

const memoryRegistrations: Map<string, any[]> = new Map();

export const getEvents = async (req: Request, res: Response) => {
  if (isMongoConnected) {
    try {
      const dbEvents = await Event.find().sort({ date: 1 });
      if (dbEvents.length > 0) return res.json({ success: true, events: dbEvents });
    } catch (e) {}
  }
  return res.json({ success: true, events: initialEvents });
};

export const getEventBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (isMongoConnected) {
    try {
      const event = await Event.findOne({ slug });
      if (event) return res.json({ success: true, event });
    } catch (e) {}
  }
  const found = initialEvents.find((e) => e.slug === slug || e._id === slug);
  if (found) return res.json({ success: true, event: found });
  return res.status(404).json({ success: false, message: 'Event not found' });
};

export const createEvent = async (req: any, res: Response) => {
  const { title, description, fullDetails, date, time, venue, image, category, capacity, isFeatured } = req.body;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  if (isMongoConnected) {
    try {
      const newEvent = new Event({
        title,
        slug,
        description,
        fullDetails,
        date: new Date(date),
        time,
        venue,
        image,
        category,
        capacity: Number(capacity) || 100,
        isFeatured: Boolean(isFeatured),
        createdBy: req.user.id,
      });
      await newEvent.save();
      return res.status(201).json({ success: true, message: 'Event created successfully!', event: newEvent });
    } catch (e: any) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }

  const created = {
    _id: 'ev_' + Date.now(),
    title,
    slug,
    description,
    fullDetails: fullDetails || description,
    date: new Date(date),
    time: time || '10:00 AM',
    venue,
    image: image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    category: category || 'Workshop',
    capacity: Number(capacity) || 100,
    registeredCount: 0,
    isFeatured: Boolean(isFeatured),
    status: 'Upcoming',
  };
  initialEvents.push(created as any);
  return res.status(201).json({ success: true, message: 'Event created!', event: created });
};

export const registerForEvent = async (req: any, res: Response) => {
  const userId = req.user.id;
  const { eventId } = req.body;

  const ticketCode = 'COETA-' + Math.random().toString(36).substring(2, 8).toUpperCase();

  if (isMongoConnected) {
    try {
      const existing = await Registration.findOne({ eventId, userId });
      if (existing) {
        return res.status(400).json({ success: false, message: 'You have already registered for this event!' });
      }
      const reg = new Registration({ eventId, userId, ticketCode, attendanceStatus: 'Registered' });
      await reg.save();
      await Event.findByIdAndUpdate(eventId, { $inc: { registeredCount: 1 } });
      return res.status(201).json({ success: true, message: 'Registration confirmed! Points +50 Awarded.', registration: reg, ticketCode });
    } catch (e: any) {
      console.error('[Event Reg Error]', e.message);
    }
  }

  const userRegs = memoryRegistrations.get(userId) || [];
  const already = userRegs.find((r) => r.eventId === eventId);
  if (already) {
    return res.status(400).json({ success: false, message: 'You are already registered for this event!' });
  }

  const newReg = {
    _id: 'reg_' + Date.now(),
    eventId,
    userId,
    ticketCode,
    attendanceStatus: 'Registered',
    registeredAt: new Date(),
  };
  userRegs.push(newReg);
  memoryRegistrations.set(userId, userRegs);

  return res.status(201).json({
    success: true,
    message: 'Event registration successful! You earned 50 XP.',
    registration: newReg,
    ticketCode,
  });
};

export const getUserRegistrations = async (req: any, res: Response) => {
  const userId = req.user.id;
  if (isMongoConnected) {
    try {
      const regs = await Registration.find({ userId }).populate('eventId');
      return res.json({ success: true, registrations: regs });
    } catch (e) {}
  }

  const regs = memoryRegistrations.get(userId) || [];
  const populated = regs.map((r) => {
    const ev = initialEvents.find((e) => e._id === r.eventId) || initialEvents[0];
    return { ...r, event: ev };
  });

  return res.json({ success: true, registrations: populated });
};
