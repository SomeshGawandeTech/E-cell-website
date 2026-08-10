import { Request, Response } from 'express';
import Resource from '../models/Resource';
import { isMongoConnected } from '../config/db';

const initialResources = [
  {
    _id: 'res_1',
    title: 'Ultimate 10-Slide Pitch Deck Master Template',
    description: 'Battle-tested pitch deck template used by Y Combinator and Sequoia-backed campus startups. Includes guidance notes for TAM/SAM/SOM calculation.',
    category: 'Pitch Templates',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '4.8 MB',
    downloadsCount: 382,
    tags: ['Pitch Deck', 'YC Template', 'Fundraising'],
  },
  {
    _id: 'res_2',
    title: 'Founders Agreement & Equity Split Agreement Template',
    description: 'Standard legal contract template for co-founders covering vesting schedules, IP transfer, cliff periods, and exit clauses.',
    category: 'Legal & Compliance',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '1.2 MB',
    downloadsCount: 290,
    tags: ['Legal', 'Co-Founders', 'Vesting', 'Equity'],
  },
  {
    _id: 'res_3',
    title: 'Startup India Seed Fund Scheme (SISFS) Official Application Handbook',
    description: 'Step-by-step documentation manual detailing application eligibility criteria, required documents, financial forecast models, and evaluation rubrics.',
    category: 'Government Schemes',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '6.5 MB',
    downloadsCount: 512,
    tags: ['Grants', 'Government', 'SISFS', 'Incubation'],
  },
  {
    _id: 'res_4',
    title: 'The Student Founder Playbook 2026 Edition',
    description: 'An end-to-end guidebook written by COETA E-Cell alumni covering customer discovery, product design, marketing, and fundraising.',
    category: 'E-Books',
    fileUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    fileSize: '8.1 MB',
    downloadsCount: 640,
    tags: ['E-Book', 'Playbook', 'Guide'],
  },
];

export const getResources = async (req: Request, res: Response) => {
  if (isMongoConnected) {
    try {
      const resources = await Resource.find().sort({ createdAt: -1 });
      if (resources.length > 0) return res.json({ success: true, resources });
    } catch (e) {}
  }
  return res.json({ success: true, resources: initialResources });
};

export const createResource = async (req: any, res: Response) => {
  const { title, description, category, fileUrl, fileSize, tags } = req.body;

  if (isMongoConnected) {
    try {
      const resource = new Resource({
        title,
        description,
        category,
        fileUrl,
        fileSize: fileSize || '2.5 MB',
        tags: Array.isArray(tags) ? tags : [tags || 'Resource'],
      });
      await resource.save();
      return res.status(201).json({ success: true, message: 'Resource published!', resource });
    } catch (e: any) {
      return res.status(400).json({ success: false, message: e.message });
    }
  }

  const newResource = {
    _id: 'res_' + Date.now(),
    title,
    description,
    category,
    fileUrl,
    fileSize: fileSize || '3.0 MB',
    downloadsCount: 0,
    tags: Array.isArray(tags) ? tags : ['Resource'],
  };
  initialResources.push(newResource as any);

  return res.status(201).json({ success: true, message: 'Resource added successfully!', resource: newResource });
};

export const incrementDownload = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (isMongoConnected) {
    try {
      await Resource.findByIdAndUpdate(id, { $inc: { downloadsCount: 1 } });
    } catch (e) {}
  }
  const found = initialResources.find((r) => r._id === id);
  if (found) found.downloadsCount += 1;

  return res.json({ success: true, message: 'Download tracked!' });
};
