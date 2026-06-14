import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser, FiPhone, FiArrowRight } from 'react-icons/fi';

// ── Design tokens ─────────────────────────────────────────
const T = {
  indigo:     '#1A1060',
  indigoDeep: '#0D0830',
  indigoMid:  '#2D2080',
  cyan:       '#00C6C2',
  cyanLight:  '#4DEFF0',
  rose:       '#C8956B',
  roseLight:  '#E8B890',
  offWhite:   '#F8F6FF',
  text:       '#3B3260',
  textMuted:  '#7A7098',
};

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600&family=Inter:wght@300;400;500;600&display=swap');

  .auth-input {
    width: 100%; padding: 12px 16px 12px 42px; border-radius: 10px;
    border: 1.5px solid rgba(26,16,96,0.12); background: #fff;
    font-family: 'Inter',sans-serif; font-size: 14px; color: ${T.indigo};
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    box-sizing: border-box;
  }
  .auth-input:focus { border-color: ${T.cyan}; box-shadow: 0 0 0 3px rgba(0,198,194,0.12); }
  .auth-input::placeholder { color: rgba(122,112,152,0.50); }

  .input-icon {
    position: absolute; left: 14px; top: 50%; transform: translateY(-50%);
    color: ${T.textMuted}; pointer-events: none;
  }
  .toggle-icon {
    position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
    color: ${T.textMuted}; cursor: pointer; background: none; border: none; padding: 0;
    display: flex; align-items: center; transition: color 0.2s;
  }
  .toggle-icon:hover { color: ${T.cyan}; }

  .btn-submit {
    width: 100%; padding: 14px; border-radius: 12px; border: none; cursor: pointer;
    font-family: 'Inter',sans-serif; font-size: 15px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    background: linear-gradient(135deg,#E8B890,#C8956B);
    color: ${T.indigoDeep};
    transition: transform 0.2s, box-shadow 0.2s;
  }
  .btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 28px rgba(200,149,107,0.40); }
  .btn-submit:disabled { opacity: 0.6; cursor: not-allowed; }

  .spin {
    width: 18px; height: 18px; border-radius: 50%;
    border: 2px solid rgba(13,8,48,0.20); border-top-color: ${T.indigoDeep};
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .auth-link { color: ${T.cyan}; font-weight: 600; text-decoration: none; }
  .auth-link:hover { text-decoration: underline; }
  .legal-link { color: ${T.rose}; text-decoration: none; }
  .legal-link:hover { text-decoration: underline; }
`;

const RegisterPage = () => {
  const [form, setForm] = useState({ name:'', email:'', phone:'', password:'', confirmPassword:'' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
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
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight:'100vh', background: T.offWhite, display:'flex', alignItems:'center', justifyContent:'center', padding:'80px 24px' }}>
      <style>{styles}</style>

      <div style={{ width:'100%', maxWidth:420 }}>

        {/* Logo / heading */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{
            width:64, height:64, borderRadius:'50%',
            background:'linear-gradient(135deg,#00C6C2,#009E9B)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:'Cormorant Garamond,serif', fontWeight:700, fontSize:28, color: T.indigoDeep,
            margin:'0 auto 18px', boxShadow:'0 8px 24px rgba(0,198,194,0.35)',
          }}>A</div>
          <h1 style={{ fontFamily:'Cormorant Garamond,serif', fontSize:32, fontWeight:600, color: T.indigoDeep, margin:'0 0 6px' }}>
            Create Account
          </h1>
          <p style={{ fontFamily:'Inter,sans-serif', fontSize:14, color: T.textMuted, margin:0 }}>
            Join Adyant and start exploring
          </p>
        </div>

        {/* Form */}
        <form onSubmit={submit} style={{
          background:'#fff', border:'1px solid rgba(26,16,96,0.08)',
          borderRadius:18, padding:'32px 32px',
          boxShadow:'0 8px 40px rgba(13,8,48,0.07)',
          display:'flex', flexDirection:'column', gap:16,
        }}>
          {/* Full Name */}
          <div>
            <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, display:'block', marginBottom:6 }}>
              Full Name <span style={{ color:'#E05252' }}>*</span>
            </label>
            <div style={{ position:'relative' }}>
              <FiUser size={16} className="input-icon"/>
              <input type="text" className="auth-input" placeholder="Your full name"
                value={form.name} onChange={e => setForm(p=>({...p,name:e.target.value}))} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, display:'block', marginBottom:6 }}>
              Email Address <span style={{ color:'#E05252' }}>*</span>
            </label>
            <div style={{ position:'relative' }}>
              <FiMail size={16} className="input-icon"/>
              <input type="email" className="auth-input" placeholder="your@email.com" autoComplete="email"
                value={form.email} onChange={e => setForm(p=>({...p,email:e.target.value}))} />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, display:'block', marginBottom:6 }}>
              Phone Number
            </label>
            <div style={{ position:'relative' }}>
              <FiPhone size={16} className="input-icon"/>
              <input type="tel" className="auth-input" placeholder="+91 98765 43210"
                value={form.phone} onChange={e => setForm(p=>({...p,phone:e.target.value}))} />
            </div>
          </div>

          {/* Password */}
          <div>
            <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, display:'block', marginBottom:6 }}>
              Password <span style={{ color:'#E05252' }}>*</span>
            </label>
            <div style={{ position:'relative' }}>
              <FiLock size={16} className="input-icon"/>
              <input type={showPass ? 'text' : 'password'} className="auth-input" style={{ paddingRight:42 }} placeholder="Min. 6 characters" autoComplete="new-password"
                value={form.password} onChange={e => setForm(p=>({...p,password:e.target.value}))} />
              <button type="button" className="toggle-icon" onClick={() => setShowPass(!showPass)}>
                {showPass ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label style={{ fontFamily:'Inter,sans-serif', fontSize:12, fontWeight:600, color: T.text, display:'block', marginBottom:6 }}>
              Confirm Password <span style={{ color:'#E05252' }}>*</span>
            </label>
            <div style={{ position:'relative' }}>
              <FiLock size={16} className="input-icon"/>
              <input type="password" className="auth-input" placeholder="Repeat your password" autoComplete="new-password"
                value={form.confirmPassword} onChange={e => setForm(p=>({...p,confirmPassword:e.target.value}))} />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? <><div className="spin"/>&nbsp;Creating account…</> : <>Create Account <FiArrowRight size={16}/></>}
          </button>

          <p style={{ textAlign:'center', fontFamily:'Inter,sans-serif', fontSize:11, color: T.textMuted, lineHeight:1.6, margin:0 }}>
            By signing up, you agree to our{' '}
            <a href="#" className="legal-link">Terms of Service</a> and{' '}
            <a href="#" className="legal-link">Privacy Policy</a>
          </p>
        </form>

        <p style={{ textAlign:'center', fontFamily:'Inter,sans-serif', fontSize:13, color: T.textMuted, marginTop:24 }}>
          Already have an account? <Link to="/login" className="auth-link">Sign in here</Link>
        </p>
        <p style={{ textAlign:'center', marginTop:10 }}>
          <Link to="/" style={{ fontFamily:'Inter,sans-serif', fontSize:12, color: T.textMuted, textDecoration:'none' }}>
            ← Back to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;