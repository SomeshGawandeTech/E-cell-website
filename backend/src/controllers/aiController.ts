import { Request, Response } from 'express';
import { chatWithAI, generateStartupIdea, generatePitchDeck } from '../services/geminiService';

export const handleAIChat = async (req: Request, res: Response) => {
  const { message, history } = req.body;
  if (!message) {
    return res.status(400).json({ success: false, message: 'Message field is required.' });
  }

  const reply = await chatWithAI(message, history || []);
  return res.json({ success: true, reply });
};

export const handleGenerateIdea = async (req: Request, res: Response) => {
  const { skills, interests, industry, budget, teamSize, techStack } = req.body;
  const ideaResult = await generateStartupIdea({
    skills: skills || 'Full-stack engineering',
    interests: interests || 'Sustainability & AI',
    industry: industry || 'Tech',
    budget: budget || '< ₹50,000',
    teamSize: teamSize || '2-4 Members',
    techStack: techStack || 'React, Express & AI APIs',
  });

  return res.json({ success: true, idea: ideaResult });
};

export const handleGeneratePitchDeck = async (req: Request, res: Response) => {
  const { startupName, industry, problem, solution, targetMarket, businessModel, fundingAsk } = req.body;
  const deck = await generatePitchDeck({
    startupName: startupName || 'InnovateAI',
    industry: industry || 'Tech',
    problem: problem || 'Manual workflows cost 30+ hours weekly.',
    solution: solution || 'AI agents automate data extraction in seconds.',
    targetMarket: targetMarket || '$5B Global Enterprise Automation market',
    businessModel: businessModel || 'B2B SaaS Subscription ($99/mo per seat)',
    fundingAsk: fundingAsk || '₹20 Lakhs Seed Round',
  });

  return res.json({ success: true, deck });
};
