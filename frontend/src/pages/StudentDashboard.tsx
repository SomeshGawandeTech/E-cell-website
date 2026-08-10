import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Award, Zap, Calendar, Rocket, Users, Download, QrCode, CheckCircle2, Clock, X, ExternalLink, ShieldCheck } from 'lucide-react';
import api from '../services/api';

export const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any | null>(null);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const regRes = await api.get('/events/registrations/me');
      if (regRes.data.success) setRegistrations(regRes.data.registrations);

      const appRes = await api.get('/mentors/applications');
      if (appRes.data.success) setApplications(appRes.data.applications);
    } catch (err) {
      console.warn('Failed to load user dashboard data');
    }
  };

  const xpProgress = user ? Math.min(((user.xp % 500) / 500) * 100, 100) : 50;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* USER GAMIFICATION HEADER */}
      <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center space-x-5 text-center md:text-left">
            <img
              src={user?.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300'}
              alt={user?.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-purple-500 shadow-xl"
            />
            <div className="space-y-1">
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user?.name || 'Student Innovator'}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-900 text-purple-200 border border-purple-700">
                  {user?.role || 'Student Member'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {user?.department || 'Computer Engineering'} • {user?.year || '3rd Year'}
              </p>
              
              {/* Level & Points Summary */}
              <div className="flex items-center space-x-4 pt-1 text-xs font-bold text-cyan-300">
                <span className="flex items-center space-x-1">
                  <Award className="w-4 h-4 text-purple-400" />
                  <span>Level {user?.level || 2} Creator</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>{user?.points || 180} Points</span>
                </span>
              </div>
            </div>
          </div>

          {/* XP Progress Card */}
          <div className="w-full md:w-80 glass-card p-4 rounded-2xl border border-slate-700/80 space-y-2">
            <div className="flex justify-between text-xs font-bold">
              <span className="text-slate-300">XP Progress to Level {(user?.level || 2) + 1}</span>
              <span className="text-cyan-400">{user?.xp || 300} / 500 XP</span>
            </div>
            <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden p-0.5 border border-slate-800">
              <div
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
            <p className="text-[10px] text-slate-400 text-right">Earn 200 XP more by registering for events & pitch contests!</p>
          </div>

        </div>
      </div>

      {/* EARNED BADGES SHOWCASE */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Award className="w-5 h-5 text-purple-400" />
          <span>Earned Badges & Milestones</span>
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="glass-card p-4 rounded-2xl border border-purple-500/40 flex items-center space-x-3 bg-purple-950/20">
            <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center text-xl">🚀</div>
            <div>
              <p className="text-xs font-bold text-white">Portal Pioneer</p>
              <p className="text-[10px] text-purple-300">Joined E-Cell Ecosystem</p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-cyan-500/40 flex items-center space-x-3 bg-cyan-950/20">
            <div className="w-10 h-10 rounded-xl bg-cyan-600/30 flex items-center justify-center text-xl">💡</div>
            <div>
              <p className="text-xs font-bold text-white">Idea Submitter</p>
              <p className="text-[10px] text-cyan-300">Submitted Startup Proposal</p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-amber-500/40 flex items-center space-x-3 bg-amber-950/20">
            <div className="w-10 h-10 rounded-xl bg-amber-600/30 flex items-center justify-center text-xl">🏆</div>
            <div>
              <p className="text-xs font-bold text-white">Hackathon Veteran</p>
              <p className="text-[10px] text-amber-300">Attended 3+ Workshops</p>
            </div>
          </div>

          <div className="glass-card p-4 rounded-2xl border border-slate-800 opacity-60 flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl">🔒</div>
            <div>
              <p className="text-xs font-bold text-slate-400">Grant Winner</p>
              <p className="text-[10px] text-slate-500">Locked (Requires Seed Award)</p>
            </div>
          </div>
        </div>
      </div>

      {/* REGISTERED EVENTS & TICKETS */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-cyan-400" />
          <span>My Event Passes & QR Tickets</span>
        </h2>

        {registrations.length === 0 ? (
          <div className="glass-panel p-8 rounded-2xl text-center border border-slate-800 space-y-3">
            <Calendar className="w-10 h-10 text-slate-600 mx-auto" />
            <p className="text-slate-400 text-sm">You haven't registered for any upcoming events yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {registrations.map((reg) => (
              <div key={reg._id} className="glass-card p-5 rounded-2xl space-y-3 border border-slate-700">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                      Pass #{reg.ticketCode}
                    </span>
                    <h3 className="text-base font-bold text-white mt-1">{reg.event?.title || 'COETA Event'}</h3>
                  </div>
                  <button
                    onClick={() => setSelectedTicket(reg)}
                    className="p-2 rounded-xl bg-purple-950/60 border border-purple-800 text-purple-300 hover:bg-purple-900 transition-colors flex items-center space-x-1.5 text-xs font-bold"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>View QR Pass</span>
                  </button>
                </div>
                <div className="text-xs text-slate-400 flex items-center justify-between pt-2 border-t border-slate-800">
                  <span>📍 {reg.event?.venue || 'Campus Auditorium'}</span>
                  <span>Status: <strong className="text-emerald-400">Confirmed</strong></span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MENTORSHIP APPLICATIONS */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white flex items-center space-x-2">
          <Users className="w-5 h-5 text-emerald-400" />
          <span>My Mentorship Bookings</span>
        </h2>

        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Startup</th>
                <th className="p-4">Topic</th>
                <th className="p-4">Preferred Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {applications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-6 text-center text-slate-500">No active mentorship booking requests found.</td>
                </tr>
              ) : (
                applications.map((app) => (
                  <tr key={app._id} className="hover:bg-slate-900/50">
                    <td className="p-4 font-bold text-white">{app.startupName}</td>
                    <td className="p-4">{app.topic}</td>
                    <td className="p-4">{app.preferredDate}</td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                        {app.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR PASS MODAL */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/40 w-full max-w-sm text-center space-y-4 bg-slate-950 relative">
            <button
              onClick={() => setSelectedTicket(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-cyan-400">Digital Entry Ticket</span>
              <h3 className="text-lg font-bold text-white">{selectedTicket.event?.title}</h3>
            </div>

            {/* Simulated QR Code Visual */}
            <div className="p-4 bg-white rounded-2xl inline-block mx-auto shadow-xl">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${selectedTicket.ticketCode}`}
                alt="Ticket QR Code"
                className="w-44 h-44 mx-auto"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 font-mono">
              Ticket Code: <strong className="text-cyan-400">{selectedTicket.ticketCode}</strong>
            </div>

            <p className="text-[11px] text-slate-400">Present this QR code at the event gate scanner for entry.</p>
          </div>
        </div>
      )}

    </div>
  );
};
