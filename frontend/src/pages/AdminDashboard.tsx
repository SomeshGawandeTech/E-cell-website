import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar, Rocket, BookOpen, Download, Bell, Plus, CheckCircle2, XCircle, Shield, AlertCircle, Loader2 } from 'lucide-react';
import api from '../services/api';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [monthlyGrowth, setMonthlyGrowth] = useState<any[]>([]);
  const [distribution, setDistribution] = useState<any[]>([]);
  const [startups, setStartups] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'analytics' | 'events' | 'startups' | 'broadcast'>('analytics');

  // New Event Form State
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    fullDetails: '',
    date: '',
    time: '10:00 AM',
    venue: '',
    category: 'Workshop',
    capacity: 100,
  });

  // Broadcast Notification Form State
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const statsRes = await api.get('/analytics/stats');
      if (statsRes.data.success) {
        setStats(statsRes.data.stats);
        setMonthlyGrowth(statsRes.data.monthlyGrowth);
        setDistribution(statsRes.data.engagementDistribution);
      }

      const stRes = await api.get('/startups');
      if (stRes.data.success) setStartups(stRes.data.startups);
    } catch (err) {
      console.warn('Failed to load admin telemetry data');
    }
  };

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/events', newEvent);
      if (res.data.success) {
        setStatusMsg('Event published successfully!');
        setShowEventModal(false);
        setNewEvent({ title: '', description: '', fullDetails: '', date: '', time: '10:00 AM', venue: '', category: 'Workshop', capacity: 100 });
      }
    } catch (err: any) {
      setStatusMsg(err.response?.data?.message || 'Error creating event.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStartupStatus = async (id: string, status: 'Approved' | 'Rejected') => {
    try {
      const res = await api.put(`/startups/${id}/status`, { status });
      if (res.data.success) {
        setStartups((prev) => prev.map((s) => (s._id === id ? { ...s, status } : s)));
      }
    } catch (err) {
      console.warn('Error updating startup status');
    }
  };

  const handleSendBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMsg) return;
    setLoading(true);
    try {
      const res = await api.post('/notifications/broadcast', { title: broadcastTitle, message: broadcastMsg, type: 'event' });
      if (res.data.success) {
        setStatusMsg('Broadcast notification sent to all members!');
        setBroadcastTitle('');
        setBroadcastMsg('');
      }
    } catch (err) {
      setStatusMsg('Failed to send broadcast.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* ADMIN HEADER */}
      <div className="glass-panel p-8 rounded-3xl border border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-slate-950 via-purple-950/30 to-slate-950">
        <div className="space-y-1 text-center md:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-950 text-purple-300 text-xs font-bold border border-purple-800">
            <Shield className="w-3.5 h-3.5" />
            <span>Root Admin Control Center</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">COETA E-Cell Portal Analytics & Management</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowEventModal(true)}
            className="gradient-btn text-white px-5 py-3 rounded-xl font-bold text-xs shadow-lg flex items-center space-x-2 hover:scale-105 transition-transform"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Event</span>
          </button>
        </div>
      </div>

      {statusMsg && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-sm flex items-center justify-between">
          <span>{statusMsg}</span>
          <button onClick={() => setStatusMsg('')} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* STAT CARDS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card p-5 rounded-2xl border border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Members</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{stats?.totalMembers || 1240}</p>
          <p className="text-[10px] text-emerald-400 font-bold">↑ 18% monthly growth</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Event Registrations</span>
            <Calendar className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{stats?.eventRegistrations || 850}</p>
          <p className="text-[10px] text-cyan-400 font-bold">3 Active Events</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Startup Submissions</span>
            <Rocket className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{stats?.startupSubmissions || 42}</p>
          <p className="text-[10px] text-amber-400 font-bold">4 Pending Moderation</p>
        </div>

        <div className="glass-card p-5 rounded-2xl border border-slate-700 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Resource Downloads</span>
            <Download className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">{stats?.resourceDownloads || 1820}</p>
          <p className="text-[10px] text-emerald-400 font-bold">12 E-Books & Templates</p>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex space-x-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors ${
            activeTab === 'analytics' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          Analytics & Telemetry
        </button>
        <button
          onClick={() => setActiveTab('startups')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors ${
            activeTab === 'startups' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          Moderate Startups ({startups.filter((s) => s.status === 'Pending').length})
        </button>
        <button
          onClick={() => setActiveTab('broadcast')}
          className={`px-4 py-2.5 rounded-xl font-bold text-xs transition-colors ${
            activeTab === 'broadcast' ? 'bg-purple-600 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800'
          }`}
        >
          Broadcast Announcements
        </button>
      </div>

      {/* TAB 1: ANALYTICS CHARTS */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Growth Area Chart */}
          <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">Monthly Portal Growth & Registrations</h3>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyGrowth}>
                  <defs>
                    <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }} />
                  <Area type="monotone" dataKey="members" stroke="#a855f7" fillOpacity={1} fill="url(#colorMembers)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Engagement Pie Chart */}
          <div className="lg:col-span-4 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white">User Engagement Ratio</h3>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={distribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                    {distribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STARTUPS MODERATION TABLE */}
      {activeTab === 'startups' && (
        <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Startup Name</th>
                <th className="p-4">Industry</th>
                <th className="p-4">Founders</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {startups.map((st) => (
                <tr key={st._id} className="hover:bg-slate-900/50">
                  <td className="p-4 font-bold text-white">{st.name}</td>
                  <td className="p-4">{st.industry}</td>
                  <td className="p-4">{st.founders?.join(', ')}</td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        st.status === 'Approved'
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : st.status === 'Rejected'
                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                          : 'bg-amber-950 text-amber-300 border border-amber-800'
                      }`}
                    >
                      {st.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button
                      onClick={() => handleUpdateStartupStatus(st._id, 'Approved')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-950 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 font-bold"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleUpdateStartupStatus(st._id, 'Rejected')}
                      className="px-3 py-1.5 rounded-lg bg-rose-950 text-rose-300 border border-rose-800 hover:bg-rose-900 font-bold"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: BROADCAST ANNOUNCEMENTS */}
      {activeTab === 'broadcast' && (
        <div className="glass-panel p-6 rounded-2xl border border-slate-800 max-w-xl mx-auto space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center space-x-2">
            <Bell className="w-5 h-5 text-purple-400" />
            <span>Send Announcement Broadcast</span>
          </h3>

          <form onSubmit={handleSendBroadcast} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Title</label>
              <input
                type="text"
                required
                placeholder="e.g. Hackathon Registration Deadline Extended!"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                className="w-full glass-input text-xs px-4 py-3 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Notification Body Message</label>
              <textarea
                required
                rows={4}
                placeholder="Message body visible to all student members..."
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                className="w-full glass-input text-xs p-4 rounded-xl"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full gradient-btn text-white py-3 rounded-xl font-bold text-xs shadow-lg"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Broadcast Notification'}
            </button>
          </form>
        </div>
      )}

      {/* CREATE EVENT MODAL */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border border-purple-500/40 w-full max-w-lg space-y-4 bg-slate-950 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-bold text-white">Create & Publish New Event</h3>

            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Product Discovery Workshop"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  className="w-full glass-input p-3 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Description</label>
                <textarea
                  required
                  rows={2}
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  className="w-full glass-input p-3 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                    className="w-full glass-input p-3 rounded-xl bg-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Venue</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Auditorium B"
                    value={newEvent.venue}
                    onChange={(e) => setNewEvent({ ...newEvent, venue: e.target.value })}
                    className="w-full glass-input p-3 rounded-xl"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="w-1/2 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 gradient-btn text-white py-3 rounded-xl font-bold shadow-lg"
                >
                  Publish Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
