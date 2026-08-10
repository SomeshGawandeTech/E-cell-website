import React, { useState, useEffect } from 'react';
import { Lightbulb, Download, FileText, Search, Tag, ExternalLink } from 'lucide-react';
import api from '../services/api';

export const ResourcesPage: React.FC = () => {
  const [resources, setResources] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await api.get('/resources');
      if (res.data.success) setResources(res.data.resources);
    } catch (e) {}
  };

  const handleDownload = async (id: string, url: string) => {
    try {
      await api.put(`/resources/${id}/download`);
      setResources((prev) => prev.map((r) => (r._id === id ? { ...r, downloadsCount: r.downloadsCount + 1 } : r)));
    } catch (e) {}
    window.open(url, '_blank');
  };

  const filtered = resources.filter((r) => r.title.toLowerCase().includes(search.toLowerCase()) || r.description.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-white">Entrepreneurship Resource Library</h1>
        <p className="text-slate-400 text-sm">Download official pitch deck templates, co-founder legal agreements, and SISFS grant handbooks.</p>
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-slate-800 max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Search templates & e-books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full glass-input text-xs pl-10 pr-4 py-2.5 rounded-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((r) => (
          <div key={r._id} className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2.5 py-0.5 rounded font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                  {r.category}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{r.fileSize}</span>
              </div>
              <h3 className="text-lg font-bold text-white leading-snug">{r.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{r.description}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">Downloads: <strong className="text-white">{r.downloadsCount}</strong></span>
              <button
                onClick={() => handleDownload(r._id, r.fileUrl)}
                className="gradient-btn text-white px-4 py-2 rounded-xl font-bold text-xs shadow-lg flex items-center space-x-1.5 hover:scale-105 transition-transform"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
