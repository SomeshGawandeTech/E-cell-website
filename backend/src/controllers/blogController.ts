import { Request, Response } from 'express';
import Blog from '../models/Blog';
import { isMongoConnected } from '../config/db';

const initialBlogs = [
  {
    _id: 'b_1',
    title: 'How to Validate Your Student Startup Idea Before Writing Code',
    slug: 'validate-student-startup-idea',
    excerpt: 'Building an MVP without speaking to potential users is the #1 mistake student founders make. Here is our step-by-step 7-day validation framework.',
    content: `
### Why Early Validation Matters

Over 90% of student startups fail not because their technology was weak, but because they built something nobody actually wanted.

#### Step 1: Define the Core Hypothesis
Identify your target user and write down your fundamental assumption: *"We believe [target group] experiences [pain point] when doing [task], and would pay [amount] to fix it."*

#### Step 2: Conduct 20 Problem Interviews
Never ask friends or family: *"Would you buy this?"* (They will lie to be nice). Instead ask about past behavior: *"When was the last time you struggled with X? How did you solve it? How much did it cost?"*

#### Step 3: Smoke Test Landing Page
Build a sleek single-page website with a clear headline, value proposition, and a "Join Waitlist" or "Request Early Access" CTA button before writing a single line of backend logic.
    `,
    authorName: 'Dr. S. K. Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200',
    category: 'Guides & Frameworks',
    tags: ['Validation', 'MVP', 'Ideation', 'Growth'],
    bannerImage: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1200&q=80',
    readTime: '6 min read',
    likes: 89,
    isFeatured: true,
    comments: [
      { userName: 'Aarav Mehta', userAvatar: '', content: 'Super actionable advice! The landing page smoke test helped us get 120 waitlist signups in 48 hours.', createdAt: new Date() }
    ]
  },
  {
    _id: 'b_2',
    title: 'Navigating Government Startup Grants: SISFS & NITI Aayog Schemes Explained',
    slug: 'navigating-government-startup-grants',
    excerpt: 'A comprehensive guide for college founders on securing up to ₹20 Lakhs in seed grants under official Indian government incubation programs.',
    content: `
### Government Funding Opportunities for College Incubatees

Indian university startups have access to unprecedented government grant opportunities designed to foster innovation at the grassroots level.

#### Startup India Seed Fund Scheme (SISFS)
- **Grant Capital**: Up to ₹20 Lakhs for prototype development & proof of concept.
- **Convertible Debentures**: Up to ₹50 Lakhs for commercialization & market entry.
- **Eligibility**: Must be a registered entity incubated at a recognized university E-Cell.

#### NITI Aayog Atal Incubation Centers (AIC)
Provides co-working infrastructure, mentor pools, IP support, and seed funding support.
    `,
    authorName: 'Priya Verma',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
    category: 'Funding & Grants',
    tags: ['Grants', 'Government', 'Funding', 'Compliance'],
    bannerImage: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1200&q=80',
    readTime: '8 min read',
    likes: 124,
    isFeatured: true,
    comments: []
  }
];

export const getBlogs = async (req: Request, res: Response) => {
  if (isMongoConnected) {
    try {
      const blogs = await Blog.find().sort({ createdAt: -1 });
      if (blogs.length > 0) return res.json({ success: true, blogs });
    } catch (e) {}
  }
  return res.json({ success: true, blogs: initialBlogs });
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  if (isMongoConnected) {
    try {
      const blog = await Blog.findOne({ slug });
      if (blog) return res.json({ success: true, blog });
    } catch (e) {}
  }

  const found = initialBlogs.find((b) => b.slug === slug || b._id === slug);
  if (found) return res.json({ success: true, blog: found });
  return res.status(404).json({ success: false, message: 'Article not found' });
};

export const createBlog = async (req: any, res: Response) => {
  const { title, excerpt, content, category, tags, bannerImage } = req.body;
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

  if (isMongoConnected) {
    try {
      const blog = new Blog({
        title,
        slug,
        excerpt,
        content,
        authorName: req.user.name,
        category,
        tags: Array.isArray(tags) ? tags : [tags || 'Startup'],
        bannerImage,
      });
      await blog.save();
      return res.status(201).json({ success: true, message: 'Blog article published!', blog });
    } catch (e: any) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }

  const newBlog = {
    _id: 'b_' + Date.now(),
    title,
    slug,
    excerpt,
    content,
    authorName: req.user.name,
    authorAvatar: '',
    category: category || 'Insights',
    tags: Array.isArray(tags) ? tags : ['Startup'],
    bannerImage: bannerImage || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800',
    readTime: '5 min read',
    likes: 1,
    isFeatured: false,
    comments: [],
  };
  initialBlogs.push(newBlog as any);

  return res.status(201).json({ success: true, message: 'Article published!', blog: newBlog });
};

export const likeBlog = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isMongoConnected) {
    try {
      const blog = await Blog.findByIdAndUpdate(id, { $inc: { likes: 1 } }, { new: true });
      if (blog) return res.json({ success: true, blog });
    } catch (e) {}
  }

  const found = initialBlogs.find((b) => b._id === id);
  if (found) {
    found.likes += 1;
    return res.json({ success: true, blog: found });
  }

  return res.status(404).json({ success: false, message: 'Article not found' });
};
