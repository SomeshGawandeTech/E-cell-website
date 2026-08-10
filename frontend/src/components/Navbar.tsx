import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Rocket, Calendar, Lightbulb, Users, BookOpen, Bot, Award, LogIn, LogOut, Menu, X, Shield, ChevronDown, Bell } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Events', path: '/events', icon: Calendar },
    { name: 'Startups', path: '/startups', icon: Rocket },
    { name: 'Mentors', path: '/mentors', icon: Users },
    { name: 'Blogs', path: '/blogs', icon: BookOpen },
    { name: 'Resources', path: '/resources', icon: Lightbulb },
    { name: 'AI Hub', path: '/ai-hub', icon: Bot, badge: 'AI' },
  ];

  const getDashboardPath = () => {
    if (!user) return '/auth';
    if (user.role === 'Admin') return '/admin-dashboard';
    if (user.role === 'Core Team Member') return '/core-dashboard';
    return '/student-dashboard';
  };

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-slate-800/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-11 h-11 rounded-xl gradient-btn flex items-center justify-center shadow-lg shadow-purple-500/20 group-hover:scale-105 transition-transform duration-300">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white group-hover:text-purple-400 transition-colors">
                COETA <span className="gradient-text-cyan">E-CELL</span>
              </span>
              <p className="text-[10px] text-slate-400 tracking-wider font-semibold uppercase">Entrepreneurship Portal</p>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              const Icon = link.icon;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1.5 ${
                    isActive
                      ? 'text-white bg-slate-800/90 border border-purple-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  {Icon && <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />}
                  <span>{link.name}</span>
                  {link.badge && (
                    <span className="ml-1 text-[10px] px-1.5 py-0.5 rounded font-bold bg-gradient-to-r from-purple-500 to-cyan-500 text-white">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Section / Login */}
          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-3 p-1.5 pr-3 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-purple-500/50 transition-all"
                >
                  <img
                    src={user.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200'}
                    alt={user.name}
                    className="w-9 h-9 rounded-lg object-cover border border-purple-500/30"
                  />
                  <div className="text-left">
                    <div className="text-xs font-bold text-white flex items-center space-x-1">
                      <span>{user.name}</span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-800">
                        {user.role}
                      </span>
                    </div>
                    <div className="text-[11px] text-cyan-400 font-medium flex items-center space-x-1">
                      <Award className="w-3 h-3 inline" />
                      <span>Lvl {user.level || 1} • {user.xp || 100} XP</span>
                    </div>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl glass-panel bg-slate-900/95 border border-slate-800 shadow-2xl py-2 z-50">
                    <Link
                      to={getDashboardPath()}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2.5 text-sm text-slate-200 hover:bg-purple-950/40 hover:text-purple-300"
                    >
                      <Shield className="w-4 h-4 text-purple-400" />
                      <span>{user.role} Dashboard</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setUserDropdownOpen(false);
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-2.5 text-sm text-rose-400 hover:bg-rose-950/30 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="gradient-btn text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-md flex items-center space-x-2 hover:scale-105 transition-transform"
              >
                <LogIn className="w-4 h-4" />
                <span>Join E-Cell / Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/95 px-4 pt-3 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-base font-medium text-slate-200 hover:bg-slate-800"
            >
              {link.name}
            </Link>
          ))}
          {user ? (
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <Link
                to={getDashboardPath()}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-base font-medium bg-purple-950/40 text-purple-300 border border-purple-800/50"
              >
                {user.role} Dashboard
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-base font-medium text-rose-400 hover:bg-rose-950/30"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center gradient-btn text-white py-3 rounded-xl font-bold"
            >
              Join E-Cell / Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
