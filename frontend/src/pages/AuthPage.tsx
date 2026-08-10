import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, KeyRound, ArrowRight, CheckCircle2, Shield, UserCheck, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export const AuthPage: React.FC = () => {
  const { sendOtp, verifyOtp } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'Student Member' | 'Core Team Member' | 'Admin'>('Student Member');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const otpRef = useRef<HTMLInputElement | null>(null);
  const [resendCooldown, setResendCooldown] = useState<number>(0);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await sendOtp(email);
      if (res.success) {
        setStep(2);
        setOtp('123456');
        setMessage(res.message || 'OTP verification code dispatched to your email.');
        // start a short resend cooldown to avoid rapid resend clicks
        setResendCooldown(30);
      } else {
        setError(res.message || 'Failed to send OTP.');
      }
    } catch (err: any) {

      setError(err.response?.data?.message || 'Error sending OTP email.');
    } finally {
      setLoading(false);
    }
  };

  // Resend handler
  const handleResend = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address before resending.');
      return;
    }
    setLoading(true);
    setError('');
    setMessage('');
    try {
      const res = await sendOtp(email);
      if (res.success) {
        setMessage(res.message || 'OTP resent — check backend console or your email.');
        setResendCooldown(30);
        setStep(2);
      } else {
        setError(res.message || 'Failed to resend OTP.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Error resending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp || otp.length < 6) {
      setError('Please enter the full 6-digit OTP code.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await verifyOtp(email, otp, name, role);
      if (res.success) {
        if (role === 'Admin') navigate('/admin-dashboard');
        else if (role === 'Core Team Member') navigate('/core-dashboard');
        else navigate('/student-dashboard');
      } else {
        setError(res.message || 'Invalid verification code.');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'OTP verification failed.');
    } finally {
      setLoading(false);
    }
  };

  // auto-focus OTP input when we move to step 2
  useEffect(() => {
    if (step === 2) {
      const t = setTimeout(() => otpRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [step]);

  // resend cooldown timer
  useEffect(() => {
    if (resendCooldown <= 0) return;
    const id = setInterval(() => setResendCooldown((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, [resendCooldown]);

  // Quick preset loader for testing demo roles
  const fillPreset = async (presetEmail: string, presetName: string, presetRole: 'Student Member' | 'Core Team Member' | 'Admin') => {
    setEmail(presetEmail);
    setName(presetName);
    setRole(presetRole);
    setLoading(true);
    setError('');

    try {
      // Direct verify with master code 123456 for instant demo testing
      const res = await verifyOtp(presetEmail, '123456', presetName, presetRole);
      if (res.success) {
        if (presetRole === 'Admin') navigate('/admin-dashboard');
        else if (presetRole === 'Core Team Member') navigate('/core-dashboard');
        else navigate('/student-dashboard');
      } else {
        setStep(2);
        setOtp('123456');
      }
    } catch (err: any) {
      setStep(2);
      setOtp('123456');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        
        {/* Card Container */}
        <div className="glass-panel p-8 rounded-3xl border border-slate-700/80 shadow-2xl space-y-6 bg-slate-950/90 relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl gradient-btn mx-auto flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">
              {step === 1 ? 'OTP Authentication' : 'Enter Verification Code'}
            </h2>
            <p className="text-xs text-slate-400">
              {step === 1
                ? 'Enter your institutional or personal email to receive a 6-digit OTP.'
                : `We sent a 6-digit code to ${email}`}
            </p>
          </div>

          {/* Feedback Messages */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {message && (
            <div className="p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {/* STEP 1: SEND OTP FORM */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Aarav Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full glass-input text-sm px-4 py-3 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    placeholder="student@coetaecell.org"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full glass-input text-sm pl-10 pr-4 py-3 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Select Role Context</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                  className="w-full glass-input text-sm px-4 py-3 rounded-xl bg-slate-900 text-white border border-slate-700"
                >
                  <option value="Student Member">Student Member (Default)</option>
                  <option value="Core Team Member">Core Team Member</option>
                  <option value="Admin">Portal Administrator</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-btn text-white py-3.5 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center space-x-2 hover:scale-[1.02] transition-transform disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <span>Generate & Send OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}

          {/* STEP 2: VERIFY OTP FORM */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2 text-center">
                  6-Digit OTP Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-purple-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    maxLength={6}
                    required
                    placeholder="123456"
                    ref={otpRef}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full glass-input text-center tracking-[10px] text-lg font-mono font-bold py-3 pl-10 pr-4 rounded-xl border-purple-500/50"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                <p className="font-bold text-cyan-300 flex items-center space-x-1">
                  <Sparkles className="w-3.5 h-3.5 inline" />
                  <span>Developer Instant Mode:</span>
                </p>
                <p>Check the backend server console log for the instant 6-digit OTP code!</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full gradient-btn text-white py-3.5 rounded-xl font-bold text-sm shadow-xl flex items-center justify-center space-x-2 hover:scale-[1.02] transition-transform disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <UserCheck className="w-4 h-4" />
                    <span>Verify OTP & Sign In</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between mt-2">
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={loading || resendCooldown > 0}
                  className="text-xs text-slate-300 hover:text-white disabled:opacity-50"
                >
                  {resendCooldown > 0 ? `Resend available in ${resendCooldown}s` : 'Resend code'}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  ← Back to Email Step
                </button>
              </div>
            </form>
          )}

          {/* Quick Demo Test Presets */}
          <div className="pt-4 border-t border-slate-800 space-y-2">
            <p className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider text-center">Quick Demo Preset Fillers:</p>
            <div className="grid grid-cols-3 gap-2 text-center text-xs">
              <button
                onClick={() => fillPreset('student@coetaecell.org', 'Aarav Mehta', 'Student Member')}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-cyan-300 hover:border-cyan-500/50 transition-colors truncate"
              >
                Student
              </button>
              <button
                onClick={() => fillPreset('core@coetaecell.org', 'Priya Verma', 'Core Team Member')}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-purple-300 hover:border-purple-500/50 transition-colors truncate"
              >
                Core Team
              </button>
              <button
                onClick={() => fillPreset('admin@coetaecell.org', 'Dr. S. K. Sharma', 'Admin')}
                className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-rose-300 hover:border-rose-500/50 transition-colors truncate"
              >
                Admin
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
