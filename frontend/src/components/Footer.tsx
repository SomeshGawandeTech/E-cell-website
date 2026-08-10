import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Mail, Phone, MapPin, Github, Linkedin, Twitter, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">
                COETA <span className="gradient-text-cyan">E-CELL</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Fostering innovation, nurturing student startups, and building a world-class entrepreneurship ecosystem at COETA.
            </p>
            <div className="flex space-x-3 pt-2">
              <a href="#" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/events" className="hover:text-cyan-400 transition-colors">Upcoming Events</Link></li>
              <li><Link to="/startups" className="hover:text-cyan-400 transition-colors">Startup Showcase</Link></li>
              <li><Link to="/mentors" className="hover:text-cyan-400 transition-colors">Mentor Network</Link></li>
              <li><Link to="/ai-hub" className="hover:text-cyan-400 transition-colors">AI Startup Hub</Link></li>
              <li><Link to="/blogs" className="hover:text-cyan-400 transition-colors">Knowledge Blogs</Link></li>
              <li><Link to="/resources" className="hover:text-cyan-400 transition-colors">Resource Library</Link></li>
            </ul>
          </div>

          {/* Col 3: Programs & AI */}
          <div>
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Core Programs</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Campus Incubation Lab</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Seed Grant Accelerator</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Patent & IP Support Cell</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Pitch Deck Generator</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Annual Business Plan Contest</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wider uppercase mb-4">Contact E-Cell</h3>
            <div className="flex items-start space-x-3 text-sm">
              <MapPin className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
              <span>Innovation & Incubation Hub, COETA Campus, Maharashtra, India</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>ecell@coeta.edu.in</span>
            </div>
            <div className="flex items-center space-x-3 text-sm">
              <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>+91 98765 43210</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800/80 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
          <p>© 2026 COETA E-Cell. All Rights Reserved. Production-Grade Enterprise Platform.</p>
          <p className="flex items-center space-x-1 mt-4 md:mt-0">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>for Student Founders & Innovators</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
