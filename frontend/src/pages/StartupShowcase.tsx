import React, { useState, useEffect } from 'react';
import { Rocket, ThumbsUp, ExternalLink, Plus, CheckCircle2, ShieldCheck, Search, Loader2 } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const StartupShowcase: React.FC = () => {
  const { user } = useAuth();
  const [startups, setStartups] = useState<any[]>([]);
  const [stageFilter, setStageFilter] = useState('All');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [newStartup, setNewStartup] = useState({
    name: '',
    tagline: '',
    description: '',
    industry: '',
    stage: 'Ideation',
    fundingStatus: 'Bootstrapped',
    founders: '',
    demoUrl: '',
  });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStartups();
  }, []);

  const fetchStartups = async () => {
    try {
      const res = await api.get('/startups');
      if (res.data.success) setStartups(res.data.startups);
    } catch (e) {}
  };

  const handleUpvote = async (id: string) => {
    try {
      const res = await api.put(`/startups/${id}/upvote`);
      if (res.data.success) {
        setStartups((prev) => prev.map((s) => (s._id === id ? { ...s, upvotes: s.upvotes + 1 } : s)));
      }
    } catch (e) {}
  };

  const handleSubmitStartup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setMsg('Please login to submit your startup proposal.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/startups/submit', {
        ...newStartup,
        founders: newStartup.founders.split(',').map((f) => f.trim()),
      });
      if (res.data.success) {
        setMsg('Startup submitted successfully! Under core team moderation.');
        setShowSubmitModal(false);
        fetchStartups();
      }
    } catch (err: any) {
      setMsg(err.response?.data?.message || 'Submission failed.');
    } finally {
      setLoading(false);
    }
  };

  const filtered = startups.filter((s) => stageFilter === 'All' || s.stage === stageFilter);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">Campus Startup Showcase</h1>
          <p className="text-slate-400 text-sm">Discover and upvote student-led innovations incubated at COETA.</p>
        </div>

        <button
          onClick={() => setShowSubmitModal(true)}
          className="gradient-btn text-white px-6 py-3.5 rounded-2xl font-bold text-xs shadow-xl flex items-center space-x-2 hover:scale-105 transition-transform shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Submit Your Startup (+100 XP)</span>
        </button>
      </div>

      {msg && <div className="p-4 rounded-xl bg-purple-950 text-purple-300 text-center text-xs font-bold">{msg}</div>}

      {/* FILTER BUTTONS */}
      <div className="flex space-x-2 overflow-x-auto text-xs font-semibold pb-2">
        {['All', 'Ideation', 'MVP', 'Early Traction'].map((stg) => (
          <button
            key={stg}
            onClick={() => setStageFilter(stg)}
            className={`px-4 py-2 rounded-xl transition-colors ${
              stageFilter === stg ? 'bg-cyan-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {stg}
          </button>
        ))}
      </div>

      {/* STARTUPS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((st) => (
          <div key={st._id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={st.logo} alt={st.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center space-x-1.5">
                      <span>{st.name}</span>
                      {st.status === 'Approved' && <ShieldCheck className="w-4 h-4 text-cyan-400 inline" />}
                    </h3>
                    <p className="text-[11px] text-cyan-300 font-semibold">{st.industry}</p>
                  </div>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-purple-950 text-purple-300 border border-purple-800">
                  {st.stage}
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-200">{st.tagline}</p>
              <p className="text-xs text-slate-400 leading-relaxed">{st.description}</p>
            </div>

            <div className="space-y-3 pt-3 border-t border-slate-800/80">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Founders: <strong className="text-slate-200">{st.founders?.join(', ')}</strong></span>
                <span>Funding: <strong className="text-emerald-400">{st.fundingStatus}</strong></span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => handleUpvote(st._id)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-200 hover:border-cyan-500/50 text-xs font-bold"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Upvote ({st.upvotes})</span>
                </button>

                {st.demoUrl && st.demoUrl !== '#' && (
                  <a
                    href={st.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 text-xs text-cyan-400 hover:underline font-semibold"
                  >
                    <span>View Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SUBMIT STARTUP MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/40 w-full max-w-lg space-y-4 bg-slate-950 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">Submit Campus Startup Proposal</h3>

            <form onSubmit={handleSubmitStartup} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Startup Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NovaPulse AI"
                  value={newStartup.name}
                  onChange={(e) => setNewStartup({ ...newStartup, name: e.target.value })}
                  className="w-full glass-input p-3 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Catchy Tagline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Automated microgrid energy management"
                  value={newStartup.tagline}
                  onChange={(e) => setNewStartup({ ...newStartup, tagline: e.target.value })}
                  className="w-full glass-input p-3 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Description & Value Proposition</label>
                <textarea
                  required
                  rows={3}
                  value={newStartup.description}
                  onChange={(e) => setNewStartup({ ...newStartup, description: e.target.value })}
                  className="w-full glass-input p-3 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Industry</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CleanTech"
                    value={newStartup.industry}
                    onChange={(e) => setNewStartup({ ...newStartup, industry: e.target.value })}
                    className="w-full glass-input p-3 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Founders (Comma separated)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aarav Mehta (CSE), Priya (ECE)"
                    value={newStartup.founders}
                    onChange={(e) => setNewStartup({ ...newStartup, founders: e.target.value })}
                    className="w-full glass-input p-3 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="w-1/2 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 gradient-btn text-white py-3 rounded-xl font-bold shadow-lg"
                >
                  Submit Proposal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
