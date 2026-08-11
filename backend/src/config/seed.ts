import User from '../models/User';
import Event from '../models/Event';
import Startup from '../models/Startup';
import Mentor from '../models/Mentor';
import Blog from '../models/Blog';
import Resource from '../models/Resource';
import Notification from '../models/Notification';

export const seedDatabase = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount === 0) {
      console.log('🌱 Seeding initial database data...');

      // Seed Users
      await User.insertMany([
        {
          name: 'Dr. S. K. Sharma (Admin)',
          email: 'admin@coetaecell.org',
          role: 'Admin',
          points: 500,
          xp: 2500,
          level: 5,
          badges: ['Founding Mentor', 'E-Cell Pioneer', 'Grand Director'],
          department: 'Administration & Incubation',
          year: 'Faculty Lead',
          isVerified: true,
        },
        {
          name: 'Aarav Mehta',
          email: 'student@coetaecell.org',
          role: 'Student Member',
          points: 180,
          xp: 650,
          level: 3,
          badges: ['Hackathon Star', 'Idea Submitter'],
          department: 'Computer Engineering',
          year: '3rd Year',
          isVerified: true,
        },
        {
          name: 'Priya Verma',
          email: 'core@coetaecell.org',
          role: 'Core Team Member',
          points: 340,
          xp: 1400,
          level: 4,
          badges: ['Event Manager', 'Content Maestro'],
          department: 'Information Technology',
          year: '4th Year',
          isVerified: true,
        },
      ]);

      // Seed Events
      await Event.insertMany([
        {
          title: 'COETA E-Summit 2026: Genesis of Titans',
          slug: 'coeta-e-summit-2026',
          description: 'Flagship annual entrepreneurship summit featuring keynote speakers and startup pitch contests.',
          fullDetails: 'Join over 1,500 students, founders, and investors for two days of inspirational talks, live pitching competitions with prize pools over ₹2 Lakhs.',
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
          title: 'AI Startup Bootcamp: From Idea to MVP',
          slug: 'ai-startup-bootcamp',
          description: 'Hands-on intensive weekend workshop on leveraging LLMs and rapid UI prototyping in 48 hours.',
          fullDetails: 'Master prompt engineering, API integrations, pitch deck design, and rapid UI development.',
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
      ]);

      // Seed Startups
      await Startup.insertMany([
        {
          name: 'EcoGrid Dynamics',
          tagline: 'AI-driven Microgrid Energy Optimization for Rural Campuses',
          description: 'EcoGrid uses IoT smart meters and predictive machine learning algorithms to distribute renewable solar energy dynamically.',
          industry: 'CleanTech & Energy',
          stage: 'MVP',
          fundingStatus: 'Grant Funded',
          founders: ['Rahul Deshmukh (CSE)', 'Sneha Kulkarni (EE)'],
          logo: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=400&q=80',
          status: 'Approved',
          upvotes: 142,
          featured: true,
        },
        {
          name: 'Medibot Labs',
          tagline: 'Autonomous Hospital Logistics & Medicine Delivery Robotics',
          description: 'Compact self-navigating robotics designed for multi-floor hospital wards to deliver prescribed medicines.',
          industry: 'HealthTech & Robotics',
          stage: 'Early Traction',
          fundingStatus: 'Seed',
          founders: ['Vikramaditya Rao (Robotics)', 'Dr. Neha Sharma (Biomedical)'],
          logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
          status: 'Approved',
          upvotes: 98,
          featured: true,
        },
      ]);

      // Seed Mentors
      await Mentor.insertMany([
        {
          name: 'Rajesh Kulkarni',
          title: 'Managing Partner',
          company: 'Apex Venture Capital',
          bio: 'Ex-Google Product Director turned VC investor with 15+ years experience funding early-stage SaaS and AI startups.',
          expertise: ['Venture Capital', 'Fundraising', 'B2B Product Strategy'],
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          rating: 4.95,
          sessionsCount: 34,
          availableDays: ['Tuesdays', 'Thursdays'],
          isAvailable: true,
        },
        {
          name: 'Dr. Sunita Deshpande',
          title: 'Head of Innovation & Patents',
          company: 'TechCorp India',
          bio: 'IP Attorney & Innovation Strategist specializing in deep-tech patent drafting and government grant compliance.',
          expertise: ['IP & Patents', 'Grant Proposals', 'Legal Compliance'],
          avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
          rating: 4.88,
          sessionsCount: 28,
          availableDays: ['Mondays', 'Wednesdays'],
          isAvailable: true,
        },
      ]);

      console.log('✅ Database successfully seeded!');
    }
  } catch (err: any) {
    console.warn('Seed database notice:', err.message);
  }
};
