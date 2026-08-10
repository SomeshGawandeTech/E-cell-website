import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const chatWithAI = async (message: string, history: { role: string; content: string }[]) => {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `You are COETA E-Cell's AI Assistant, an expert in entrepreneurship, startup incubation, business modeling, funding options, and student innovation. 
User input: ${message}
Keep the tone empowering, structured, and insightful.`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      if (text) return text;
    } catch (error: any) {
      console.warn('[Gemini AI Warning] API call failed, falling back:', error.message);
    }
  }

  // Smart Contextual Fallback Response
  const lowerMsg = message.toLowerCase();
  if (lowerMsg.includes('incubat') || lowerMsg.includes('coeta')) {
    return `At COETA E-Cell, incubation provides seed funding up to ₹5 Lakhs, dedicated 1-on-1 mentorship from industry veterans, free cloud credits, IP filing assistance, and office space at the campus Innovation Lab!`;
  } else if (lowerMsg.includes('fund') || lowerMsg.includes('grant') || lowerMsg.includes('money')) {
    return `Startup funding stages include:
1. **Bootstrapping**: Initial self-funding.
2. **Grants**: NITI Aayog's NISA, Startup India Seed Fund Scheme (SISFS up to ₹20L for prototype).
3. **Angel Investment**: HNI angel networks.
4. **Venture Capital**: Institutional Series A+ funding.
Our E-Cell connects student startups directly with regional angel networks!`;
  } else if (lowerMsg.includes('business model') || lowerMsg.includes('revenue')) {
    return `A solid business model defines your Value Proposition, Customer Segments, Revenue Streams (SaaS subscription, marketplace commission, freemium, transactional), Cost Structure, and Key Distribution Channels.`;
  }

  return `Welcome to COETA E-Cell AI Assistant! I can help you with startup ideation, pitch deck creation, incubation requirements, government grants (like SISFS), and business model validation. What specific aspect of your startup are you working on today?`;
};

export const generateStartupIdea = async (params: {
  skills: string;
  interests: string;
  industry: string;
  budget: string;
  teamSize: string;
  techStack: string;
}) => {
  const { skills, interests, industry, budget, teamSize, techStack } = params;

  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Generate a unique startup idea JSON based on:
Skills: ${skills}, Interests: ${interests}, Industry: ${industry}, Budget: ${budget}, Team Size: ${teamSize}, Tech: ${techStack}.
Return JSON only:
{
  "title": "Startup Name",
  "tagline": "Catchy tagline",
  "problem": "Detailed problem statement",
  "solution": "Detailed solution description",
  "targetAudience": "Target audience",
  "revenueModel": "Monetization strategy",
  "mvpRoadmap": [
    {"phase": "Phase 1: Month 1-2", "title": "Wireframing & Core Engine", "detail": "Deliverable details"},
    {"phase": "Phase 2: Month 3-4", "title": "Beta Testing & Feedback Loop", "detail": "Deliverable details"},
    {"phase": "Phase 3: Month 5-6", "title": "Public Launch & Traction", "detail": "Deliverable details"}
  ]
}`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err: any) {
      console.warn('[Gemini AI Idea Warning] Fallback triggered:', err.message);
    }
  }

  // Realistic Fallback
  return {
    title: `${industry || 'Tech'}Pulse AI`,
    tagline: `Next-gen automated ${interests || 'workflow'} solution tailored for modern teams.`,
    problem: `Current ${industry || 'education'} markets suffer from manual inefficiency, high operational costs, and poor user adoption.`,
    solution: `An intelligent platform leveraging ${techStack || 'AI & Cloud'} to automate core processes using ${skills || 'full-stack automation'}.`,
    targetAudience: `Small to medium enterprises, college startups, and domain professionals.`,
    revenueModel: `B2B SaaS monthly subscriptions + transaction-based API usage pricing.`,
    mvpRoadmap: [
      { phase: 'Phase 1: Weeks 1-4', title: 'Prototype & User Validation', detail: 'Develop landing page, core workflows, and conduct 20 customer interviews.' },
      { phase: 'Phase 2: Weeks 5-10', title: 'MVP Build & Pilot', detail: 'Deploy core functional features to 5 pilot client teams.' },
      { phase: 'Phase 3: Month 3-6', title: 'Monetization & Incubation Pitch', detail: 'Pitch to COETA E-Cell incubation panel for seed funding.' }
    ]
  };
};

export const generatePitchDeck = async (params: {
  startupName: string;
  industry: string;
  problem: string;
  solution: string;
  targetMarket: string;
  businessModel: string;
  fundingAsk: string;
}) => {
  if (genAI) {
    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
      const prompt = `Create a 10-slide pitch deck structure in JSON format for startup "${params.startupName}" in ${params.industry}.
Problem: ${params.problem}
Solution: ${params.solution}
Target Market: ${params.targetMarket}
Business Model: ${params.businessModel}
Funding Ask: ${params.fundingAsk}

Return JSON with format:
{
  "slides": [
    { "slideNumber": 1, "title": "Slide Title", "subtitle": "Subtitle", "bulletPoints": ["point 1", "point 2", "point 3"] }
  ]
}`;
      const result = await model.generateContent(prompt);
      const text = result.response.text();
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (err: any) {
      console.warn('[Gemini AI Pitch Warning] Fallback triggered:', err.message);
    }
  }

  // Realistic Fallback Slides
  return {
    slides: [
      { slideNumber: 1, title: `${params.startupName || 'NovaTech'}`, subtitle: `Transforming ${params.industry || 'Technology'} with Innovation`, bulletPoints: ['COETA E-Cell Incubated Startup', 'Confidential Pitch Deck 2026'] },
      { slideNumber: 2, title: 'The Problem', subtitle: 'Understanding Pain Points', bulletPoints: [params.problem || 'Outdated legacy systems cause 40% loss in productivity.', 'High cost of scaling for small teams.', 'Lack of real-time insights.'] },
      { slideNumber: 3, title: 'The Solution', subtitle: 'Our Revolutionary Approach', bulletPoints: [params.solution || 'Automated AI-driven platform reducing latency by 70%.', 'Intuitive self-serve dashboard.', 'Seamless API integrations.'] },
      { slideNumber: 4, title: 'Market Opportunity', subtitle: 'TAM, SAM & SOM', bulletPoints: [`Total Addressable Market: $12B global market in ${params.industry || 'Tech'}.`, 'Serviceable Addressable Market: $1.8B regional segment.', 'Target Initial SOM: $15M within Year 2.'] },
      { slideNumber: 5, title: 'Business Model', subtitle: 'Monetization Strategy', bulletPoints: [params.businessModel || 'Tiered SaaS Subscription ($49/mo - $299/mo).', 'Enterprise custom deployment contracts.', '92% projected gross margins.'] },
      { slideNumber: 6, title: 'Competitive Advantage', subtitle: 'Why We Win', bulletPoints: ['First-mover advantage in campus ecosystem.', 'Proprietary IP and automated workflows.', '10x faster implementation speed.'] },
      { slideNumber: 7, title: 'Go-to-Market Strategy', subtitle: 'Acquisition Channels', bulletPoints: ['Campus ambassador network & E-Cell hackathons.', 'Direct B2B sales outreach.', 'Content marketing & SEO funnel.'] },
      { slideNumber: 8, title: 'Traction & Milestones', subtitle: 'Current Progress', bulletPoints: ['500+ active beta signups.', '3 pilot enterprise LOIs signed.', 'Won 1st prize at COETA Annual Business Plan Competition.'] },
      { slideNumber: 9, title: 'Financial Projections', subtitle: 'Growth Forecast', bulletPoints: ['Year 1 ARR: $120,000', 'Year 2 ARR: $850,000', 'Break-even projected at Month 14.'] },
      { slideNumber: 10, title: 'Funding Ask & Use of Funds', subtitle: 'Investment Request', bulletPoints: [`Seeking: ${params.fundingAsk || '₹25,000,000 (Seed Round)'}`, '40% Product & R&D Engineering', '35% Marketing & Sales Acquisition', '25% Operational Reserve & IP filing'] }
    ]
  };
};
