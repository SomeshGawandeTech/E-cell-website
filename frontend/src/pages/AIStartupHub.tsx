import React, { useState, useRef } from 'react';
import { Bot, Sparkles, Lightbulb, FileText, Download, Loader2, ArrowRight, CheckCircle2, Zap, Layers, RefreshCw } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import api from '../services/api';

export const AIStartupHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'idea' | 'pitch' | 'chat'>('idea');

  // IDEA GENERATOR STATE
  const [ideaForm, setIdeaForm] = useState({
    skills: 'React, Express & Machine Learning',
    interests: 'Clean Energy & Smart Cities',
    industry: 'CleanTech',
    budget: '< ₹50,000',
    teamSize: '2-4 Members',
    techStack: 'TypeScript & Cloud APIs',
  });
  const [ideaResult, setIdeaResult] = useState<any | null>(null);
  const [ideaLoading, setIdeaLoading] = useState(false);

  // PITCH DECK GENERATOR STATE
  const [pitchForm, setPitchForm] = useState({
    startupName: 'EcoGrid Dynamics',
    industry: 'CleanTech',
    problem: 'College campuses waste 35% electricity due to manual HVAC & lighting switches.',
    solution: 'IoT microgrid sensors + predictive AI energy distribution software.',
    targetMarket: '$12B global Smart Campus Energy Infrastructure market',
    businessModel: 'B2B SaaS subscription + 15% revenue share on saved utility bills.',
    fundingAsk: '₹20,000,000 (Seed Round)',
  });
  const [pitchDeck, setPitchDeck] = useState<any | null>(null);
  const [pitchLoading, setPitchLoading] = useState(false);

  const pitchExportRef = useRef<HTMLDivElement>(null);

  // Handle Idea Generation
  const handleGenerateIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    setIdeaLoading(true);
    try {
      const res = await api.post('/ai/generate-idea', ideaForm);
      if (res.data.success) {
        setIdeaResult(res.data.idea);
      }
    } catch (err) {
      console.warn('Idea generation error');
    } finally {
      setIdeaLoading(false);
    }
  };

  // Handle Pitch Deck Generation
  const handleGeneratePitchDeck = async (e: React.FormEvent) => {
    e.preventDefault();
    setPitchLoading(true);
    try {
      const res = await api.post('/ai/generate-pitch-deck', pitchForm);
      if (res.data.success) {
        setPitchDeck(res.data.deck);
      }
    } catch (err) {
      console.warn('Pitch deck generation error');
    } finally {
      setPitchLoading(false);
    }
  };

  // Export Pitch Deck to PDF
  const handleExportPDF = async () => {
    if (!pitchExportRef.current) return;
    try {
      const canvas = await html2canvas(pitchExportRef.current, { scale: 2 });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${pitchForm.startupName || 'Pitch_Deck'}_COETA_ECell.pdf`);
    } catch (err) {
      console.error('PDF export failed', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* HEADER BANNER */}
      <div className="glass-panel p-8 rounded-3xl border border-purple-500/40 bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-bold border border-cyan-800">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Gemini AI Entrepreneurial Suite</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">AI Startup Innovation Studio</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Generate startup ideas, construct complete 10-slide pitch decks, and validate MVP roadmaps.
          </p>
        </div>

        {/* TAB NAVIGATION */}
        <div className="flex space-x-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800 shrink-0">
          <button
            onClick={() => setActiveTab('idea')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-colors ${
              activeTab === 'idea' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Idea Generator</span>
          </button>
          
          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-colors ${
              activeTab === 'pitch' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Pitch Deck Builder</span>
          </button>
        </div>
      </div>

      {/* TAB 1: STARTUP IDEA GENERATOR */}
      {activeTab === 'idea' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Input Form Column */}
          <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Zap className="w-4 h-4 text-purple-400" />
              <span>Configure Idea Parameters</span>
            </h3>

            <form onSubmit={handleGenerateIdea} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Skills & Strengths</label>
                <input
                  type="text"
                  required
                  value={ideaForm.skills}
                  onChange={(e) => setIdeaForm({ ...ideaForm, skills: e.target.value })}
                  className="w-full glass-input p-3 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Personal Interests</label>
                <input
                  type="text"
                  required
                  value={ideaForm.interests}
                  onChange={(e) => setIdeaForm({ ...ideaForm, interests: e.target.value })}
                  className="w-full glass-input p-3 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Industry</label>
                  <input
                    type="text"
                    required
                    value={ideaForm.industry}
                    onChange={(e) => setIdeaForm({ ...ideaForm, industry: e.target.value })}
                    className="w-full glass-input p-3 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Budget Horizon</label>
                  <select
                    value={ideaForm.budget}
                    onChange={(e) => setIdeaForm({ ...ideaForm, budget: e.target.value })}
                    className="w-full glass-input p-3 rounded-xl bg-slate-900"
                  >
                    <option value="< ₹10,000">Zero Budget (&lt; ₹10,000)</option>
                    <option value="< ₹50,000">Low Budget (&lt; ₹50,000)</option>
                    <option value="₹1 Lakh+">Grant Funded (₹1 Lakh+)</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={ideaLoading}
                className="w-full gradient-btn text-white py-3.5 rounded-xl font-bold shadow-xl flex items-center justify-center space-x-2"
              >
                {ideaLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Synthesize Startup Blueprint</span>}
              </button>
            </form>
          </div>

          {/* Results Output Column */}
          <div className="lg:col-span-7 space-y-6">
            {!ideaResult && !ideaLoading && (
              <div className="glass-panel p-12 rounded-2xl text-center border border-slate-800 space-y-3">
                <Lightbulb className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-base font-bold text-white">No Idea Generated Yet</h4>
                <p className="text-slate-400 text-xs">Fill out your skills and industry parameters on the left to generate an AI blueprint.</p>
              </div>
            )}

            {ideaResult && (
              <div className="glass-panel p-6 rounded-2xl border border-purple-500/40 space-y-6 bg-slate-950">
                <div className="border-b border-slate-800 pb-4 space-y-1">
                  <span className="text-[10px] px-2.5 py-0.5 rounded font-bold bg-purple-950 text-purple-300 border border-purple-800">
                    Generated Blueprint
                  </span>
                  <h2 className="text-2xl font-extrabold text-white">{ideaResult.title}</h2>
                  <p className="text-xs text-cyan-300 font-semibold">{ideaResult.tagline}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-rose-400 font-bold">The Problem:</strong>
                    <p className="text-slate-300 leading-relaxed">{ideaResult.problem}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-emerald-400 font-bold">The Solution:</strong>
                    <p className="text-slate-300 leading-relaxed">{ideaResult.solution}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-purple-400 font-bold">Target Audience:</strong>
                    <p className="text-slate-300 leading-relaxed">{ideaResult.targetAudience}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                    <strong className="text-cyan-400 font-bold">Revenue Model:</strong>
                    <p className="text-slate-300 leading-relaxed">{ideaResult.revenueModel}</p>
                  </div>
                </div>

                {/* MVP Timeline Roadmap */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">MVP Execution Roadmap</h4>
                  <div className="space-y-2">
                    {ideaResult.mvpRoadmap?.map((phase: any, i: number) => (
                      <div key={i} className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-0.5">
                        <div className="flex justify-between font-bold text-purple-300">
                          <span>{phase.phase}</span>
                          <span>{phase.title}</span>
                        </div>
                        <p className="text-[11px] text-slate-400">{phase.detail}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      )}

      {/* TAB 2: PITCH DECK BUILDER */}
      {activeTab === 'pitch' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-5 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Pitch Deck Details</span>
            </h3>

            <form onSubmit={handleGeneratePitchDeck} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Startup Name</label>
                <input
                  type="text"
                  required
                  value={pitchForm.startupName}
                  onChange={(e) => setPitchForm({ ...pitchForm, startupName: e.target.value })}
                  className="w-full glass-input p-3 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Problem Statement</label>
                <textarea
                  required
                  rows={2}
                  value={pitchForm.problem}
                  onChange={(e) => setPitchForm({ ...pitchForm, problem: e.target.value })}
                  className="w-full glass-input p-3 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Solution Description</label>
                <textarea
                  required
                  rows={2}
                  value={pitchForm.solution}
                  onChange={(e) => setPitchForm({ ...pitchForm, solution: e.target.value })}
                  className="w-full glass-input p-3 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Business Model</label>
                  <input
                    type="text"
                    required
                    value={pitchForm.businessModel}
                    onChange={(e) => setPitchForm({ ...pitchForm, businessModel: e.target.value })}
                    className="w-full glass-input p-3 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Funding Ask</label>
                  <input
                    type="text"
                    required
                    value={pitchForm.fundingAsk}
                    onChange={(e) => setPitchForm({ ...pitchForm, fundingAsk: e.target.value })}
                    className="w-full glass-input p-3 rounded-xl"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={pitchLoading}
                className="w-full gradient-btn text-white py-3.5 rounded-xl font-bold shadow-xl flex items-center justify-center space-x-2"
              >
                {pitchLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span>Build 10-Slide Pitch Deck</span>}
              </button>
            </form>
          </div>

          {/* Slide Deck Preview & PDF Download */}
          <div className="lg:col-span-7 space-y-4">
            {pitchDeck && (
              <div className="flex justify-end">
                <button
                  onClick={handleExportPDF}
                  className="gradient-btn text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg flex items-center space-x-2 hover:scale-105 transition-transform"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Deck to PDF</span>
                </button>
              </div>
            )}

            {!pitchDeck && !pitchLoading && (
              <div className="glass-panel p-12 rounded-2xl text-center border border-slate-800 space-y-3">
                <FileText className="w-12 h-12 text-slate-600 mx-auto" />
                <h4 className="text-base font-bold text-white">No Pitch Deck Generated</h4>
                <p className="text-slate-400 text-xs">Complete the pitch details on the left to generate investor slides.</p>
              </div>
            )}

            {pitchDeck && (
              <div ref={pitchExportRef} className="space-y-4 p-4 bg-slate-950 rounded-2xl border border-slate-800">
                {pitchDeck.slides?.map((slide: any) => (
                  <div key={slide.slideNumber} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3 bg-slate-900/90">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <span className="text-[10px] font-bold text-cyan-400 uppercase">Slide {slide.slideNumber}</span>
                      <span className="text-[10px] text-slate-400 font-mono">COETA E-CELL INCUBATION</span>
                    </div>
                    <h3 className="text-lg font-extrabold text-white">{slide.title}</h3>
                    <p className="text-xs text-purple-300 font-semibold">{slide.subtitle}</p>

                    <ul className="space-y-1.5 pt-2">
                      {slide.bulletPoints?.map((pt: string, idx: number) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-start space-x-2">
                          <span className="text-cyan-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
