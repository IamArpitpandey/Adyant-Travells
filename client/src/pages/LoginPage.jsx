import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff, FiLock, FiMail } from 'react-icons/fi';

const LoginPage = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return; }
    setLoading(true);
    try {
      const res = await login(form.email, form.password);
      toast.success(`Welcome back, ${res.user.name}!`);
      if (res.user.role === 'admin') navigate('/admin');
      else navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-cream dark:bg-royal-DEFAULT flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center text-royal font-display font-bold text-2xl mx-auto mb-4">A</div>
          <h1 className="font-display text-3xl font-semibold text-text-dark dark:text-white">Welcome Back</h1>
          <p className="text-text-medium dark:text-white/50 mt-2">Sign in to your Adyant account</p>
        </div>

        <form onSubmit={handleSubmit} className="card-elegant p-8 space-y-5">
          {/* Email */}
          <div>
            <label className="text-text-medium dark:text-white/60 text-sm mb-1.5 block">Email Address</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} />
              <input
                type="email"
                className="form-input pl-10"
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-text-medium dark:text-white/60 text-sm mb-1.5 block">Password</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} />
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input pl-10 pr-10"
                placeholder="Your password"
                value={form.password}
                onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                autoComplete="current-password"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-gold-DEFAULT transition-colors">
                {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-gold w-full py-3.5 text-base flex items-center justify-center gap-2">
            {loading ? <><div className="w-5 h-5 border-2 border-royal/30 border-t-royal rounded-full animate-spin" /> Signing in...</> : 'Sign In'}
          </button>

          {/* Demo credentials hint */}
          <div className="bg-blue-50 dark:bg-blue-500/10 rounded-lg p-3 border border-blue-200 dark:border-blue-500/20">
            <div className="text-blue-700 dark:text-blue-300 text-xs font-semibold mb-1">Demo Admin Credentials</div>
            <div className="text-blue-600 dark:text-blue-400 text-xs">Email: admin@adyanttravells.com</div>
            <div className="text-blue-600 dark:text-blue-400 text-xs">Password: Admin@123</div>
            <div className="text-blue-500/70 text-xs mt-1">(Run /api/admin/seed first to create admin)</div>
          </div>
        </form>

        <p className="text-center text-text-medium dark:text-white/50 text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-gold-DEFAULT hover:underline font-medium">Create one for free</Link>
        </p>

        <p className="text-center mt-3">
          <Link to="/" className="text-text-light dark:text-white/30 text-xs hover:text-gold-DEFAULT transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
