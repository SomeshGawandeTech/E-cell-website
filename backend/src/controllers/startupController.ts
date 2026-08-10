import { Request, Response } from 'express';
import Startup from '../models/Startup';
import { isMongoConnected } from '../config/db';

const initialStartups = [
  {
    _id: 'st_1',
    name: 'EcoGrid Dynamics',
    tagline: 'AI-driven Microgrid Energy Optimization for Rural Campuses',
    description: 'EcoGrid uses IoT smart meters and predictive machine learning algorithms to distribute renewable solar energy dynamically across college buildings, saving up to 35% on power utility bills.',
    industry: 'CleanTech & Energy',
    stage: 'MVP',
    fundingStatus: 'Grant Funded',
    founders: ['Rahul Deshmukh (CSE)', 'Sneha Kulkarni (EE)'],
    logo: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=400&q=80',
    demoUrl: 'https://ecogrid-demo.coetaecell.org',
    pitchDeckUrl: '#',
    status: 'Approved',
    upvotes: 142,
    featured: true,
  },
  {
    _id: 'st_2',
    name: 'Medibot Labs',
    tagline: 'Autonomous Hospital Logistics & Medicine Delivery Robotics',
    description: 'Compact self-navigating robotics designed for multi-floor hospital wards to deliver prescribed medicines, lab samples, and sterilized equipment safely without human intervention.',
    industry: 'HealthTech & Robotics',
    stage: 'Early Traction',
    fundingStatus: 'Seed',
    founders: ['Vikramaditya Rao (Robotics)', 'Dr. Neha Sharma (Biomedical)'],
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
    demoUrl: 'https://medibotlabs.io',
    pitchDeckUrl: '#',
    status: 'Approved',
    upvotes: 98,
    featured: true,
  },
  {
    _id: 'st_3',
    name: 'EduFlux AR',
    tagline: 'Immersive Augmented Reality Workspaces for Engineering Labs',
    description: 'Transforming complex 3D CAD blueprints into interactive AR simulations on mobile devices, allowing engineering students to assemble virtual engines and circuits in real-time.',
    industry: 'EdTech & AR/VR',
    stage: 'Ideation',
    fundingStatus: 'Bootstrapped',
    founders: ['Aarav Mehta (CSE)', 'Tanvi Jain (Design)'],
    logo: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=400&q=80',
    demoUrl: '#',
    pitchDeckUrl: '#',
    status: 'Approved',
    upvotes: 76,
    featured: false,
  },
  {
    _id: 'st_4',
    name: 'AgriSense IoT',
    tagline: 'Precision Soil Health & Automated Irrigation Controllers',
    description: 'Low-cost soil sensors connected to a cloud telemetry app that alerts farmers on nitrogen levels and automates drip irrigation valves based on real-time weather forecasts.',
    industry: 'AgriTech',
    stage: 'MVP',
    fundingStatus: 'Bootstrapped',
    founders: ['Karan Patil (Civil)', 'Omkar Shinde (ECE)'],
    logo: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=400&q=80',
    demoUrl: '#',
    pitchDeckUrl: '#',
    status: 'Pending',
    upvotes: 24,
    featured: false,
  },
];

export const getStartups = async (req: Request, res: Response) => {
  if (isMongoConnected) {
    try {
      const dbStartups = await Startup.find();
      if (dbStartups.length > 0) return res.json({ success: true, startups: dbStartups });
    } catch (e) {}
  }
  return res.json({ success: true, startups: initialStartups });
};

export const submitStartup = async (req: any, res: Response) => {
  const { name, tagline, description, industry, stage, fundingStatus, founders, demoUrl, logo, pitchDeckUrl } = req.body;

  if (isMongoConnected) {
    try {
      const startup = new Startup({
        name,
        tagline,
        description,
        industry,
        stage: stage || 'Ideation',
        fundingStatus: fundingStatus || 'Bootstrapped',
        founders: Array.isArray(founders) ? founders : [founders || 'Founder'],
        founderUserIds: [req.user.id],
        logo,
        demoUrl,
        pitchDeckUrl,
        status: 'Pending',
      });
      await startup.save();
      return res.status(201).json({ success: true, message: 'Startup submitted for core team review! Earned 100 XP.', startup });
    } catch (e: any) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }

  const newStartup = {
    _id: 'st_' + Date.now(),
    name,
    tagline,
    description,
    industry,
    stage: stage || 'Ideation',
    fundingStatus: fundingStatus || 'Bootstrapped',
    founders: Array.isArray(founders) ? founders : [founders || req.user.name],
    logo: logo || 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400',
    demoUrl: demoUrl || '',
    pitchDeckUrl: pitchDeckUrl || '',
    status: 'Pending',
    upvotes: 1,
    featured: false,
  };
  initialStartups.push(newStartup as any);

  return res.status(201).json({
    success: true,
    message: 'Startup submitted for review! Core team will inspect your proposal.',
    startup: newStartup,
  });
};

export const upvoteStartup = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isMongoConnected) {
    try {
      const st = await Startup.findByIdAndUpdate(id, { $inc: { upvotes: 1 } }, { new: true });
      if (st) return res.json({ success: true, startup: st });
    } catch (e) {}
  }

  const found = initialStartups.find((s) => s._id === id);
  if (found) {
    found.upvotes += 1;
    return res.json({ success: true, startup: found });
  }

  return res.status(404).json({ success: false, message: 'Startup not found' });
};

export const updateStartupStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, featured } = req.body;

  if (isMongoConnected) {
    try {
      const st = await Startup.findByIdAndUpdate(id, { status, featured }, { new: true });
      if (st) return res.json({ success: true, message: `Startup ${status}!`, startup: st });
    } catch (e) {}
  }

  const found = initialStartups.find((s) => s._id === id);
  if (found) {
    if (status) found.status = status;
    if (typeof featured === 'boolean') found.featured = featured;
    return res.json({ success: true, message: `Startup ${status}!`, startup: found });
  }

  return res.status(404).json({ success: false, message: 'Startup not found' });
};
