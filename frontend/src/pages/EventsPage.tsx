import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, Users, ArrowRight, CheckCircle2, Search, Filter } from 'lucide-react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export const EventsPage: React.FC = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState<any[]>([]);
  const [category, setCategory] = useState<string>('All');
  const [search, setSearch] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get('/events');
      if (res.data.success) setEvents(res.data.events);
    } catch (e) {}
  };

  const handleRegister = async (eventId: string) => {
    if (!user) {
      setMsg('Please login to register for events.');
      return;
    }
    try {
      const res = await api.post('/events/register', { eventId });
      if (res.data.success) {
        setMsg(`Registered! Pass Code: ${res.data.ticketCode} (Points +50)`);
      }
    } catch (err: any) {
      setMsg(err.response?.data?.message || 'Registration failed.');
    }
  };

  const filtered = events.filter((e) => {
    const matchesCat = category === 'All' || e.category === category;
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-white">E-Cell Events, Summits & Workshops</h1>
        <p className="text-slate-400 text-sm sm:text-base">
          Participate in pitching competitions, technical hackathons, and VC panel discussions to gain XP and seed grant access.
        </p>
      </div>

      {msg && (
        <div className="p-4 rounded-xl bg-purple-950/80 border border-purple-800 text-purple-300 text-center text-sm font-bold">
          {msg}
        </div>
      )}

      {/* SEARCH & FILTER BAR */}
      <div className="glass-panel p-4 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full glass-input text-xs pl-10 pr-4 py-2.5 rounded-xl"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto w-full sm:w-auto text-xs font-semibold">
          {['All', 'Summit', 'Workshop', 'Pitching'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl transition-colors ${
                category === cat ? 'bg-purple-600 text-white' : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* EVENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filtered.map((ev) => (
          <div key={ev._id} className="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col">
            <img src={ev.image} alt={ev.title} className="w-full h-48 object-cover" />
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] px-2.5 py-0.5 rounded font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 uppercase">
                  {ev.category}
                </span>
                <h3 className="text-lg font-bold text-white leading-snug">{ev.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-3">{ev.description}</p>
              </div>

              <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-3.5 h-3.5 text-purple-400" />
                  <span>{ev.venue}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{ev.time}</span>
                </div>
              </div>

              <button
                onClick={() => handleRegister(ev._id)}
                className="w-full gradient-btn text-white py-3 rounded-xl font-bold text-xs shadow-lg flex items-center justify-center space-x-2 hover:scale-[1.02] transition-transform"
              >
                <span>Register Pass (50 XP)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
