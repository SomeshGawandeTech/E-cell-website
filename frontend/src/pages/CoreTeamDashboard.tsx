import React, { useState } from 'react';
import { Shield, Calendar, BookOpen, Users, CheckCircle2 } from 'lucide-react';

export const CoreTeamDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <div className="glass-panel p-8 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-950 via-cyan-950/20 to-slate-950">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Core Team Management Workspace</h1>
        <p className="text-xs text-slate-400 mt-1">Manage assigned campus events, publish blog insights, and curate student startup submissions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-700 space-y-3">
          <Calendar className="w-8 h-8 text-purple-400" />
          <h3 className="text-base font-bold text-white">Assigned Events</h3>
          <p className="text-xs text-slate-400">Monitor attendee list, scan QR tickets at gate entry, and record attendance points.</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-700 space-y-3">
          <BookOpen className="w-8 h-8 text-cyan-400" />
          <h3 className="text-base font-bold text-white">Blog Moderation</h3>
          <p className="text-xs text-slate-400">Review student articles on fundraising, market research, and technical frameworks.</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-700 space-y-3">
          <Users className="w-8 h-8 text-emerald-400" />
          <h3 className="text-base font-bold text-white">Mentorship Desk</h3>
          <p className="text-xs text-slate-400">Coordinate calendar availability between visiting VCs and student incubatees.</p>
        </div>
      </div>
    </div>
  );
};
