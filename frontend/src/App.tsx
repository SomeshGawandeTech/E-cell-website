import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ChatbotWidget } from './components/ChatbotWidget';

import { LandingPage } from './pages/LandingPage';
import { AuthPage } from './pages/AuthPage';
import { EventsPage } from './pages/EventsPage';
import { StartupShowcase } from './pages/StartupShowcase';
import { MentorshipPage } from './pages/MentorshipPage';
import { BlogsPage } from './pages/BlogsPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { AIStartupHub } from './pages/AIStartupHub';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { CoreTeamDashboard } from './pages/CoreTeamDashboard';

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#0b0f19] text-slate-100">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/startups" element={<StartupShowcase />} />
              <Route path="/mentors" element={<MentorshipPage />} />
              <Route path="/blogs" element={<BlogsPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/ai-hub" element={<AIStartupHub />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/core-dashboard" element={<CoreTeamDashboard />} />
            </Routes>
          </main>
          <ChatbotWidget />
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
