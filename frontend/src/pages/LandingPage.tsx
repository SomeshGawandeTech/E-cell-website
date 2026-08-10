import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { Rocket, Sparkles, Trophy, Users, ArrowRight, ShieldCheck, Zap, Lightbulb, Calendar, CheckCircle2, ChevronRight, Award } from 'lucide-react';

export const LandingPage: React.FC = () => {
  useEffect(() => {
    // GSAP floating animation for hero illustration badges
    gsap.to('.gsap-float', {
      y: -12,
      duration: 2.5,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
      stagger: 0.3,
    });
  }, []);

  const stats = [
    { number: '40+', label: 'Student Startups Incubated' },
    { number: '₹75L+', label: 'Funding & Grants Raised' },
    { number: '2,500+', label: 'Active Student Innovators' },
    { number: '35+', label: 'Eminence Mentors & VCs' },
  ];

  const highlights = [
    { title: 'Campus Incubation Lab', desc: 'State-of-the-art office spaces, high-speed 5G WiFi, cloud credits, and prototyping hardware.', icon: Rocket },
    { title: 'Mentorship Network', desc: 'Direct 1-on-1 access to venture capitalists, patent attorneys, and serial tech founders.', icon: Users },
    { title: 'Seed Grants &SISFS', desc: 'Direct assistance applying for government schemes with seed grants up to ₹20 Lakhs.', icon: Trophy },
    { title: 'AI Entrepreneur Copilot', desc: 'Instant AI startup idea validation, MVP roadmap generation, and pitch deck builder.', icon: Sparkles },
  ];

  return (
    <div className="min-h-screen space-y-24 pb-20 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 lg:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Background Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-600/20 to-cyan-500/20 blur-[130px] rounded-full pointer-events-none -z-10" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 space-y-8 text-center lg:text-left"
          >
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass-panel border border-purple-500/30 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide shadow-lg">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
              <span>COETA Entrepreneurship & Innovation Hub 2026</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.15]">
              Turn Your Campus <br />
              <span className="gradient-text-purple">Ideas Into Unicorn</span> Startups
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Join COETA’s official E-Cell ecosystem. Pitch groundbreaking ideas, secure government seed grants, connect with veteran mentors, and leverage cutting-edge AI tools to build your MVP.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Link
                to="/auth"
                className="w-full sm:w-auto gradient-btn text-white px-8 py-4 rounded-2xl font-bold text-base shadow-xl shadow-purple-600/30 flex items-center justify-center space-x-3 hover:scale-105 transition-transform"
              >
                <span>Join E-Cell Ecosystem</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              
              <Link
                to="/ai-hub"
                className="w-full sm:w-auto glass-card text-slate-200 hover:text-white px-7 py-4 rounded-2xl font-bold text-base border border-slate-700/80 flex items-center justify-center space-x-2.5 hover:border-cyan-500/50"
              >
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Explore AI Startup Tools</span>
              </Link>
            </div>

            {/* Quick Badges */}
            <div className="pt-4 flex items-center justify-center lg:justify-start space-x-6 text-xs text-slate-400">
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>OTP Secure Access</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Zero Fee Membership</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>XP & Badges Rewards</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Floating Illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md">
              
              {/* Main Card Graphic */}
              <div className="glass-panel p-6 rounded-3xl border border-slate-700/80 shadow-2xl relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Students Collaborating"
                  className="rounded-2xl w-full h-72 object-cover"
                />
                
                <div className="mt-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">Incubated Startup Spotlight</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 font-bold border border-emerald-800">₹20L Seed Funded</span>
                  </div>
                  <h3 className="text-xl font-bold text-white">EcoGrid Dynamics</h3>
                  <p className="text-xs text-slate-300">AI Microgrid Optimization by 3rd Year CSE Students</p>
                </div>
              </div>

              {/* Floating Badge 1 (GSAP Animated) */}
              <div className="gsap-float absolute -top-6 -left-6 glass-panel p-3.5 rounded-2xl border border-purple-500/40 shadow-xl flex items-center space-x-3 bg-slate-900/90">
                <div className="w-10 h-10 rounded-xl bg-purple-600/30 flex items-center justify-center border border-purple-500/50">
                  <Trophy className="w-5 h-5 text-purple-300" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">E-Summit 2026</p>
                  <p className="text-[10px] text-purple-300 font-semibold">₹2,00,000 Prize Pool</p>
                </div>
              </div>

              {/* Floating Badge 2 (GSAP Animated) */}
              <div className="gsap-float absolute -bottom-6 -right-6 glass-panel p-3.5 rounded-2xl border border-cyan-500/40 shadow-xl flex items-center space-x-3 bg-slate-900/90">
                <div className="w-10 h-10 rounded-xl bg-cyan-600/30 flex items-center justify-center border border-cyan-500/50">
                  <Zap className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white">AI Pitch Deck Builder</p>
                  <p className="text-[10px] text-cyan-300 font-semibold">Generate in 30 Seconds</p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* STATISTICS STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel rounded-3xl p-8 border border-slate-800 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((st, i) => (
            <div key={i} className="space-y-1">
              <p className="text-3xl sm:text-5xl font-extrabold gradient-text-purple tracking-tight">{st.number}</p>
              <p className="text-xs sm:text-sm font-semibold text-slate-300">{st.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HIGHLIGHT FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Everything You Need To Build A <span className="gradient-text-cyan">High-Growth Startup</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            From raw idea validation to legal agreements, investor pitch sessions, and incubations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="glass-card p-6 rounded-2xl space-y-4 hover:border-purple-500/50">
                <div className="w-12 h-12 rounded-xl gradient-btn flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FEATURED EVENTS BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-purple-500/30 relative overflow-hidden bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-bold border border-cyan-800">
                <Calendar className="w-3.5 h-3.5" />
                <span>Flagship Event</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white">COETA E-Summit 2026: Genesis of Titans</h2>
              <p className="text-slate-300 text-sm sm:text-base">
                2-Day Annual Entrepreneurship Summit featuring keynote addresses from unicorn founders, angel investor pitching panels, and hands-on workshops.
              </p>
              <div className="flex items-center space-x-6 text-xs text-slate-300 pt-2">
                <span>📍 Main Auditorium, COETA</span>
                <span>📅 August 2026</span>
                <span>🎟️ Free Student Pass</span>
              </div>
            </div>
            
            <div className="lg:col-span-4 flex justify-start lg:justify-end">
              <Link
                to="/events"
                className="gradient-btn text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl flex items-center space-x-2 hover:scale-105 transition-transform"
              >
                <span>Register For Event</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl font-extrabold text-white">What Founder Students Say</h2>
          <p className="text-slate-400 text-sm">Real stories from students who launched companies right from COETA campus.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="glass-card p-6 rounded-2xl space-y-4">
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "The E-Cell mentorship and pitch deck tools were instrumental in helping us secure ₹20L in seed grants from SISFS. The portal makes event registrations and mentor bookings seamless!"
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120" alt="Aarav" className="w-10 h-10 rounded-full object-cover border border-purple-500/40" />
              <div>
                <p className="text-sm font-bold text-white">Aarav Mehta</p>
                <p className="text-[11px] text-cyan-400">Founder, EcoGrid Dynamics</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "Building an AI prototype in college felt daunting until I used the E-Cell AI Idea Generator and connected with IP mentors. We drafted our patent within 3 weeks of joining!"
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120" alt="Priya" className="w-10 h-10 rounded-full object-cover border border-purple-500/40" />
              <div>
                <p className="text-sm font-bold text-white">Ananya Sharma</p>
                <p className="text-[11px] text-cyan-400">Co-Founder, Medibot Labs</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-4">
            <p className="text-xs text-slate-300 italic leading-relaxed">
              "The gamification XP points and badges keep students motivated to attend hackathons. The portal is world-class in design and functionality!"
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120" alt="Rohan" className="w-10 h-10 rounded-full object-cover border border-purple-500/40" />
              <div>
                <p className="text-sm font-bold text-white">Rohan Deshmukh</p>
                <p className="text-[11px] text-cyan-400">Lead, Core Committee</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="glass-panel p-12 rounded-3xl border border-cyan-500/30 space-y-6 relative overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Ready To Launch Your Startup?</h2>
          <p className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base">
            Create your account in seconds using OTP authentication. No password memory required!
          </p>
          <Link
            to="/auth"
            className="inline-flex gradient-btn text-white px-10 py-4 rounded-2xl font-extrabold text-base shadow-2xl shadow-purple-500/30 hover:scale-105 transition-transform"
          >
            Get Started Now
          </Link>
        </div>
      </section>

    </div>
  );
};
