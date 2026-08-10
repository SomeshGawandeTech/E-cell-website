import React, { useState, useEffect } from 'react';
import { Users, Star, Linkedin, Calendar, CheckCircle2, MessageSquare, X } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const MentorshipPage: React.FC = () => {
  const { user } = useAuth();
  const [mentors, setMentors] = useState<any[]>([]);
  const [selectedMentor, setSelectedMentor] = useState<any | null>(null);

  // Booking Form State
  const [startupName, setStartupName] = useState('');
  const [topic, setTopic] = useState('Pitch Deck Feedback');
  const [message, setMessage] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [statusMsg, setStatusMsg] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMentors();
  }, []);

  const fetchMentors = async () => {
    try {
      const res = await api.get('/mentors');
      if (res.data.success) setMentors(res.data.mentors);
    } catch (e) {}
  };

  const handleBookSession = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setStatusMsg('Please login to book a 1-on-1 mentorship session.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/mentors/apply', {
        mentorId: selectedMentor._id,
        startupName,
        topic,
        message,
        preferredDate,
      });
      if (res.data.success) {
        setStatusMsg(`Booking request sent to ${selectedMentor.name}! Earned 30 XP.`);
        setSelectedMentor(null);
        setStartupName('');
        setMessage('');
      }
    } catch (err: any) {
      setStatusMsg(err.response?.data?.message || 'Booking failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-white">E-Cell Mentor Network</h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Connect 1-on-1 with serial entrepreneurs, venture capitalists, and IP attorneys to scale your student startup.
        </p>
      </div>

      {statusMsg && <div className="p-4 rounded-xl bg-emerald-950 text-emerald-300 text-center text-xs font-bold">{statusMsg}</div>}

      {/* MENTORS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mentors.map((m) => (
          <div key={m._id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <img src={m.avatar} alt={m.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500/40" />
                <div className="space-y-0.5">
                  <h3 className="text-lg font-bold text-white">{m.name}</h3>
                  <p className="text-xs text-cyan-300 font-semibold">{m.title}</p>
                  <p className="text-[11px] text-slate-400 font-medium">{m.company}</p>
                  <div className="flex items-center space-x-1 pt-1 text-xs text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span className="font-bold">{m.rating}</span>
                    <span className="text-slate-400 text-[10px]">({m.sessionsCount} sessions)</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">{m.bio}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {m.expertise?.map((exp: string, idx: number) => (
                  <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-purple-300 border border-slate-700">
                    {exp}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="text-[11px] text-slate-400 flex items-center justify-between">
                <span>Available Days:</span>
                <strong className="text-slate-200">{m.availableDays?.join(', ')}</strong>
              </div>

              <button
                onClick={() => setSelectedMentor(m)}
                className="w-full gradient-btn text-white py-3 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center space-x-2 hover:scale-[1.02] transition-transform"
              >
                <Calendar className="w-4 h-4" />
                <span>Book 1-on-1 Session (30 XP)</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING MODAL */}
      {selectedMentor && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/40 w-full max-w-md space-y-4 bg-slate-950">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white">Book Session with {selectedMentor.name}</h3>
              <button onClick={() => setSelectedMentor(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleBookSession} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Your Startup / Project Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. EcoGrid Dynamics"
                  value={startupName}
                  onChange={(e) => setStartupName(e.target.value)}
                  className="w-full glass-input p-3 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Discussion Topic</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full glass-input p-3 rounded-xl bg-slate-900 text-white"
                >
                  <option value="Pitch Deck Review">Pitch Deck Review</option>
                  <option value="Seed Funding & SISFS Grants">Seed Funding & SISFS Grants</option>
                  <option value="Product Architecture">Product Architecture</option>
                  <option value="Patents & IP Filing">Patents & IP Filing</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Preferred Date & Time Slot</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next Tuesday at 4:00 PM"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full glass-input p-3 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Brief Description of Your Question</label>
                <textarea
                  required
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full glass-input p-3 rounded-xl"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-btn text-white py-3.5 rounded-xl font-bold shadow-lg"
              >
                Confirm Mentorship Request
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
