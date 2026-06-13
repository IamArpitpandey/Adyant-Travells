import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser, FiPhone } from 'react-icons/fi';

const RegisterPage = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password) { toast.error('Please fill all required fields'); return; }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return; }
    if (form.password !== form.confirmPassword) { toast.error('Passwords do not match'); return; }
    setLoading(true);
    try {
      const res = await register(form.name, form.email, form.password, form.phone);
      toast.success(`Welcome, ${res.user.name}! Account created successfully.`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-cream dark:bg-royal-DEFAULT flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center text-royal font-display font-bold text-2xl mx-auto mb-4">A</div>
          <h1 className="font-display text-3xl font-semibold text-text-dark dark:text-white">Create Account</h1>
          <p className="text-text-medium dark:text-white/50 mt-2">Join Adyant and start exploring</p>
        </div>

        <form onSubmit={handleSubmit} className="card-elegant p-8 space-y-5">
          <div>
            <label className="text-text-medium dark:text-white/60 text-sm mb-1.5 block">Full Name *</label>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} />
              <input type="text" className="form-input pl-10" placeholder="Your full name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className="text-text-medium dark:text-white/60 text-sm mb-1.5 block">Email Address *</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} />
              <input type="email" className="form-input pl-10" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} autoComplete="email" />
            </div>
          </div>

          <div>
            <label className="text-text-medium dark:text-white/60 text-sm mb-1.5 block">Phone Number</label>
            <div className="relative">
              <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} />
              <input type="tel" className="form-input pl-10" placeholder="+91 98765 43210" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
            </div>
          </div>

          <div>
            <label className="text-text-medium dark:text-white/60 text-sm mb-1.5 block">Password *</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} />
              <input type={showPass ? 'text' : 'password'} className="form-input pl-10 pr-10" placeholder="Min. 6 characters" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} autoComplete="new-password" />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-gold-DEFAULT">
                {showPass ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div>
            <label className="text-text-medium dark:text-white/60 text-sm mb-1.5 block">Confirm Password *</label>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light" size={18} />
              <input type="password" className="form-input pl-10" placeholder="Repeat your password" value={form.confirmPassword} onChange={e => setForm(p => ({ ...p, confirmPassword: e.target.value }))} autoComplete="new-password" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-gold w-full py-3.5 text-base flex items-center justify-center gap-2">
            {loading ? <><div className="w-5 h-5 border-2 border-royal/30 border-t-royal rounded-full animate-spin" /> Creating account...</> : 'Create Account'}
          </button>

          <p className="text-center text-text-light dark:text-white/30 text-xs">
            By signing up, you agree to our{' '}
            <a href="#" className="text-gold-DEFAULT hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-gold-DEFAULT hover:underline">Privacy Policy</a>
          </p>
        </form>

        <p className="text-center text-text-medium dark:text-white/50 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-gold-DEFAULT hover:underline font-medium">Sign in here</Link>
        </p>
        <p className="text-center mt-3">
          <Link to="/" className="text-text-light dark:text-white/30 text-xs hover:text-gold-DEFAULT transition-colors">← Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
