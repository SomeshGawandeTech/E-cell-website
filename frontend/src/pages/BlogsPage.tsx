import { useState, useEffect } from 'react';
import { BookOpen, ThumbsUp, MessageSquare, Tag, Search } from 'lucide-react';
import api from '../services/api';

export const BlogsPage: React.FC = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedBlog, setSelectedBlog] = useState<any | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await api.get('/blogs');
      if (res.data.success) setBlogs(res.data.blogs);
    } catch (e) {}
  };

  const handleLike = async (id: string) => {
    try {
      const res = await api.put(`/blogs/${id}/like`);
      if (res.data.success) {
        setBlogs((prev) => prev.map((b) => (b._id === id ? { ...b, likes: b.likes + 1 } : b)));
      }
    } catch (e) {}
  };

  const filtered = blogs.filter((b) => b.title.toLowerCase().includes(search.toLowerCase()) || b.excerpt.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-white">Startup Knowledge & Insights</h1>
        <p className="text-slate-400 text-sm">Frameworks, grant guides, and validation strategies written by mentors and founders.</p>
      </div>

      <div className="glass-panel p-4 rounded-2xl border border-slate-800 max-w-md mx-auto relative">
        <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
        <input
          type="text"
          placeholder="Search articles & guides..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full glass-input text-xs pl-10 pr-4 py-2.5 rounded-xl"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((b) => (
          <div key={b._id} className="glass-card rounded-2xl overflow-hidden border border-slate-800 flex flex-col justify-between">
            <img src={b.bannerImage} alt={b.title} className="w-full h-48 object-cover" />
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-purple-950 text-purple-300 border border-purple-800">
                  {b.category}
                </span>
                <h3 className="text-lg font-bold text-white leading-snug">{b.title}</h3>
                <p className="text-xs text-slate-400 line-clamp-3">{b.excerpt}</p>
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span>By <strong className="text-slate-200">{b.authorName}</strong></span>
                <div className="flex items-center space-x-3">
                  <button onClick={() => handleLike(b._id)} className="flex items-center space-x-1 hover:text-cyan-400">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{b.likes}</span>
                  </button>
                  <button onClick={() => setSelectedBlog(b)} className="text-cyan-400 font-bold hover:underline">
                    Read Article →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* READING MODAL */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-purple-500/40 w-full max-w-2xl space-y-4 bg-slate-950 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-cyan-400">{selectedBlog.category} • {selectedBlog.readTime}</span>
              <button onClick={() => setSelectedBlog(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <h2 className="text-2xl font-extrabold text-white">{selectedBlog.title}</h2>
            <p className="text-xs text-slate-400">Written by <strong className="text-slate-200">{selectedBlog.authorName}</strong></p>

            <img src={selectedBlog.bannerImage} alt={selectedBlog.title} className="w-full h-56 object-cover rounded-xl border border-slate-800" />

            <div className="text-xs text-slate-300 leading-relaxed space-y-3 whitespace-pre-line pt-2">
              {selectedBlog.content}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
