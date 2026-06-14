import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiChevronDown } from 'react-icons/fi';
import { GiDiamondRing } from 'react-icons/gi';
import { MdFlight } from 'react-icons/md';

/* ─────────────────────────────────────────────
   Inject Google Fonts + global navbar styles
───────────────────────────────────────────── */
const NavStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

    :root {
      --navy:      #0A0F1E;
      --navy-mid:  #111827;
      --ivory:     #F5EDD6;
      --gold:      #C9A84C;
      --gold-lt:   #E2C97E;
      --rose:      #E8C4B8;
      --glass:     rgba(10,15,30,0.72);
      --border:    rgba(201,168,76,0.18);
      --pill-glow: 0 0 0 1px rgba(201,168,76,0.25), 0 8px 40px rgba(0,0,0,0.55);
    }

    /* pill wrapper */
    .adyant-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 9999;
      display: flex;
      justify-content: center;
      padding: 14px 16px;
      transition: padding 0.35s ease;
      pointer-events: none;
    }
    .adyant-nav.scrolled { padding: 8px 16px; }

    .adyant-pill {
      pointer-events: all;
      width: 100%;
      max-width: 1160px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: var(--glass);
      backdrop-filter: blur(22px) saturate(1.4);
      -webkit-backdrop-filter: blur(22px) saturate(1.4);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 0 28px;
      height: 62px;
      box-shadow: var(--pill-glow);
      transition: border-color 0.35s, box-shadow 0.35s, height 0.35s;
    }
    .adyant-nav.scrolled .adyant-pill {
      height: 54px;
      border-color: rgba(201,168,76,0.35);
      box-shadow: 0 0 0 1px rgba(201,168,76,0.35), 0 12px 48px rgba(0,0,0,0.7);
    }

    /* shimmer border animation */
    @keyframes shimmer-border {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .adyant-pill::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: 21px;
      background: linear-gradient(120deg, transparent 30%, rgba(201,168,76,0.4) 50%, transparent 70%);
      background-size: 200% 200%;
      animation: shimmer-border 4s ease infinite;
      pointer-events: none;
      z-index: -1;
    }
    .adyant-pill { position: relative; overflow: visible; }

    /* ── Logo ── */
    .adyant-logo {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      flex-shrink: 0;
    }
    .adyant-logo-mark {
      width: 38px;
      height: 38px;
      border-radius: 12px;
      background: linear-gradient(135deg, #C9A84C 0%, #E2C97E 50%, #A07830 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 18px;
      color: var(--navy);
      box-shadow: 0 2px 16px rgba(201,168,76,0.45);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }
    .adyant-logo:hover .adyant-logo-mark {
      transform: rotate(-6deg) scale(1.08);
      box-shadow: 0 4px 24px rgba(201,168,76,0.65);
    }
    .adyant-logo-text { line-height: 1; }
    .adyant-logo-name {
      font-family: 'Playfair Display', serif;
      font-size: 17px;
      font-weight: 600;
      color: var(--ivory);
      letter-spacing: 0.02em;
      transition: color 0.2s;
    }
    .adyant-logo:hover .adyant-logo-name { color: var(--gold-lt); }
    .adyant-logo-sub {
      font-family: 'Inter', sans-serif;
      font-size: 9.5px;
      font-weight: 500;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--gold);
      margin-top: 2px;
    }

    /* ── Desktop links ── */
    .adyant-links {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .adyant-link {
      position: relative;
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 6px 13px;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 500;
      letter-spacing: 0.03em;
      color: rgba(245,237,214,0.72);
      text-decoration: none;
      border-radius: 10px;
      transition: color 0.2s, background 0.2s;
    }
    .adyant-link:hover {
      color: var(--ivory);
      background: rgba(245,237,214,0.06);
    }
    .adyant-link.active {
      color: var(--gold-lt);
    }
    .adyant-link-underline {
      position: absolute;
      bottom: 3px;
      left: 13px;
      right: 13px;
      height: 1.5px;
      background: linear-gradient(90deg, var(--gold), var(--gold-lt));
      border-radius: 2px;
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.28s cubic-bezier(.4,0,.2,1);
    }
    .adyant-link:hover .adyant-link-underline,
    .adyant-link.active .adyant-link-underline {
      transform: scaleX(1);
    }
    /* CTA button */
    .adyant-cta {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 20px;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      color: var(--navy);
      background: linear-gradient(135deg, var(--gold) 0%, var(--gold-lt) 100%);
      border-radius: 10px;
      text-decoration: none;
      box-shadow: 0 2px 14px rgba(201,168,76,0.4);
      transition: transform 0.2s, box-shadow 0.2s;
      margin-left: 8px;
    }
    .adyant-cta:hover {
      transform: translateY(-1px);
      box-shadow: 0 6px 22px rgba(201,168,76,0.55);
    }

    /* ── Right controls ── */
    .adyant-controls {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .adyant-icon-btn {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      background: rgba(245,237,214,0.07);
      border: 1px solid rgba(245,237,214,0.1);
      color: rgba(245,237,214,0.75);
      cursor: pointer;
      transition: background 0.2s, color 0.2s, border-color 0.2s;
    }
    .adyant-icon-btn:hover {
      background: rgba(201,168,76,0.15);
      border-color: rgba(201,168,76,0.35);
      color: var(--gold-lt);
    }

    /* User pill */
    .adyant-user-pill {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 4px 12px 4px 4px;
      background: rgba(201,168,76,0.1);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 50px;
      cursor: pointer;
      transition: background 0.2s, border-color 0.2s;
    }
    .adyant-user-pill:hover {
      background: rgba(201,168,76,0.2);
      border-color: rgba(201,168,76,0.4);
    }
    .adyant-avatar {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--gold), var(--gold-lt));
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Playfair Display', serif;
      font-weight: 700;
      font-size: 12px;
      color: var(--navy);
    }
    .adyant-user-name {
      font-family: 'Inter', sans-serif;
      font-size: 12.5px;
      font-weight: 500;
      color: var(--ivory);
    }

    /* Dropdown */
    .adyant-dropdown {
      position: absolute;
      top: calc(100% + 10px);
      right: 0;
      width: 200px;
      background: rgba(10,15,30,0.97);
      border: 1px solid rgba(201,168,76,0.2);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0,0,0,0.6);
      animation: dropIn 0.2s cubic-bezier(.4,0,.2,1);
    }
    @keyframes dropIn {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .adyant-dropdown-divider {
      height: 1px;
      background: rgba(245,237,214,0.08);
      margin: 0;
    }
    .adyant-dropdown a,
    .adyant-dropdown button {
      display: flex;
      align-items: center;
      gap: 10px;
      width: 100%;
      padding: 12px 18px;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: rgba(245,237,214,0.75);
      background: transparent;
      border: none;
      text-decoration: none;
      cursor: pointer;
      transition: background 0.2s, color 0.2s;
      text-align: left;
    }
    .adyant-dropdown a:hover {
      background: rgba(245,237,214,0.07);
      color: var(--gold-lt);
    }
    .adyant-dropdown button:hover {
      background: rgba(232,80,80,0.08);
      color: #f87171;
    }

    /* Login link */
    .adyant-login {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 7px 16px;
      font-family: 'Inter', sans-serif;
      font-size: 13px;
      font-weight: 500;
      color: rgba(245,237,214,0.7);
      text-decoration: none;
      border: 1px solid rgba(245,237,214,0.12);
      border-radius: 10px;
      transition: color 0.2s, border-color 0.2s, background 0.2s;
    }
    .adyant-login:hover {
      color: var(--gold-lt);
      border-color: rgba(201,168,76,0.4);
      background: rgba(201,168,76,0.06);
    }

    /* Mobile toggle */
    .adyant-mobile-btn {
      display: none;
    }

    /* ── Mobile menu drawer ── */
    .adyant-mobile-drawer {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: 9998;
      pointer-events: none;
    }
    .adyant-mobile-overlay {
      position: absolute;
      inset: 0;
      background: rgba(5,8,16,0.75);
      backdrop-filter: blur(4px);
      opacity: 0;
      transition: opacity 0.3s;
      pointer-events: none;
    }
    .adyant-mobile-drawer.open .adyant-mobile-overlay {
      opacity: 1;
      pointer-events: all;
    }
    .adyant-mobile-panel {
      position: absolute;
      top: 0; right: 0; bottom: 0;
      width: min(320px, 85vw);
      background: var(--navy);
      border-left: 1px solid var(--border);
      padding: 24px 20px;
      display: flex;
      flex-direction: column;
      gap: 6px;
      transform: translateX(100%);
      transition: transform 0.35s cubic-bezier(.4,0,.2,1);
      pointer-events: all;
      overflow-y: auto;
    }
    .adyant-mobile-drawer.open .adyant-mobile-panel {
      transform: translateX(0);
    }
    .adyant-mobile-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      padding-bottom: 18px;
      border-bottom: 1px solid rgba(245,237,214,0.08);
    }
    .adyant-mobile-logo-name {
      font-family: 'Playfair Display', serif;
      font-size: 18px;
      font-weight: 700;
      color: var(--ivory);
    }
    .adyant-mobile-logo-sub {
      font-family: 'Inter', sans-serif;
      font-size: 10px;
      font-weight: 500;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--gold);
      margin-top: 2px;
    }
    .adyant-mobile-link {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 13px 16px;
      border-radius: 12px;
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: rgba(245,237,214,0.75);
      text-decoration: none;
      transition: background 0.2s, color 0.2s;
    }
    .adyant-mobile-link:hover,
    .adyant-mobile-link.active {
      background: rgba(201,168,76,0.1);
      color: var(--gold-lt);
    }
    .adyant-mobile-link .icon {
      width: 32px;
      height: 32px;
      border-radius: 8px;
      background: rgba(245,237,214,0.06);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      flex-shrink: 0;
    }
    .adyant-mobile-link.active .icon {
      background: rgba(201,168,76,0.15);
      color: var(--gold);
    }
    .adyant-mobile-cta {
      margin-top: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      padding: 14px;
      border-radius: 12px;
      background: linear-gradient(135deg, var(--gold) 0%, var(--gold-lt) 100%);
      font-family: 'Inter', sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--navy);
      text-decoration: none;
      box-shadow: 0 4px 20px rgba(201,168,76,0.4);
    }
    .adyant-mobile-divider {
      height: 1px;
      background: rgba(245,237,214,0.07);
      margin: 8px 0;
    }

    /* ── Responsive ── */
    @media (max-width: 900px) {
      .adyant-links { display: none; }
      .adyant-mobile-btn { display: flex; }
      .adyant-login { display: none; }
    }
    @media (max-width: 520px) {
      .adyant-pill { padding: 0 16px; }
      .adyant-user-name { display: none; }
    }
  `}</style>
);

/* ─────────────────────────────────────────────
   Icon mapping for mobile menu
───────────────────────────────────────────── */
const LinkIcon = ({ to }) => {
  const map = {
    '/':        '🏠',
    '/travel':  '✈️',
    '/wedding': '💍',
    '/booking': '📅',
    '/about':   '🌟',
    '/contact': '📩',
  };
  return <span>{map[to] || '→'}</span>;
};

/* ─────────────────────────────────────────────
   Navbar
───────────────────────────────────────────── */
const Navbar = () => {
  const [scrolled,     setScrolled]     = useState(false);
  const [mobileOpen,   setMobileOpen]   = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location  = useLocation();
  const navigate  = useNavigate();
  const userRef   = useRef(null);

  /* scroll detection */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* close on route change */
  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  /* close user menu on outside click */
  useEffect(() => {
    const handler = (e) => {
      if (userRef.current && !userRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* body scroll lock when mobile open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { to: '/',        label: 'Home'    },
    { to: '/travel',  label: 'Travel', icon: <MdFlight size={13} /> },
    { to: '/wedding', label: 'Wedding',icon: <GiDiamondRing size={13} /> },
    { to: '/about',   label: 'About'  },
    { to: '/contact', label: 'Contact'},
  ];

  return (
    <>
      <NavStyles />

      <nav className={`adyant-nav ${scrolled ? 'scrolled' : ''}`} aria-label="Main navigation">
        <div className="adyant-pill">

          {/* ── Logo ── */}
          <Link to="/" className="adyant-logo" aria-label="Adyant Travells & Weddings">
            <div className="adyant-logo-mark">A</div>
            <div className="adyant-logo-text">
              <div className="adyant-logo-name">Adyant</div>
              <div className="adyant-logo-sub">Travells & Weddings</div>
            </div>
          </Link>

          {/* ── Desktop links ── */}
          <div className="adyant-links" role="list">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                role="listitem"
                className={`adyant-link ${isActive(link.to) ? 'active' : ''}`}
                aria-current={isActive(link.to) ? 'page' : undefined}
              >
                {link.icon}
                {link.label}
                <span className="adyant-link-underline" aria-hidden="true" />
              </Link>
            ))}

            <Link to="/booking" className="adyant-cta">
              Book Now
            </Link>
          </div>

          {/* ── Right controls ── */}
          <div className="adyant-controls">

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="adyant-icon-btn"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <FiSun size={15} /> : <FiMoon size={15} />}
            </button>

            {/* User menu / Login */}
            {user ? (
              <div style={{ position: 'relative' }} ref={userRef}>
                <button
                  className="adyant-user-pill"
                  onClick={() => setUserMenuOpen(v => !v)}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="true"
                >
                  <div className="adyant-avatar">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="adyant-user-name">
                    {user.name?.split(' ')[0]}
                  </span>
                  <FiChevronDown
                    size={13}
                    style={{
                      color: 'rgba(245,237,214,0.5)',
                      transform: userMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s',
                    }}
                  />
                </button>

                {userMenuOpen && (
                  <div className="adyant-dropdown" role="menu">
                    {user.role === 'admin' && (
                      <>
                        <Link to="/admin" role="menuitem">
                          <FiSettings size={13} /> Dashboard
                        </Link>
                        <div className="adyant-dropdown-divider" />
                      </>
                    )}
                    <button onClick={handleLogout} role="menuitem">
                      <FiLogOut size={13} /> Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="adyant-login">
                <FiUser size={14} /> Login
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="adyant-icon-btn adyant-mobile-btn"
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <FiX size={17} /> : <FiMenu size={17} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div className={`adyant-mobile-drawer ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        <div
          className="adyant-mobile-overlay"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        />
        <div className="adyant-mobile-panel" role="dialog" aria-modal="true" aria-label="Navigation menu">
          {/* header */}
          <div className="adyant-mobile-header">
            <div>
              <div className="adyant-mobile-logo-name">Adyant</div>
              <div className="adyant-mobile-logo-sub">Travells & Weddings</div>
            </div>
            <button
              className="adyant-icon-btn"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <FiX size={17} />
            </button>
          </div>

          {/* links */}
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`adyant-mobile-link ${isActive(link.to) ? 'active' : ''}`}
            >
              <div className="icon"><LinkIcon to={link.to} /></div>
              {link.label}
            </Link>
          ))}

          <div className="adyant-mobile-divider" />

          <Link to="/booking" className="adyant-mobile-cta" onClick={() => setMobileOpen(false)}>
            ✦ Book Now
          </Link>

          {!user && (
            <Link
              to="/login"
              className="adyant-mobile-link"
              style={{ marginTop: 8 }}
              onClick={() => setMobileOpen(false)}
            >
              <div className="icon">👤</div>
              Login / Register
            </Link>
          )}

          {/* theme toggle in drawer */}
          <div className="adyant-mobile-divider" />
          <button
            onClick={toggleTheme}
            className="adyant-mobile-link"
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', width: '100%', textAlign: 'left' }}
          >
            <div className="icon">{isDark ? '☀️' : '🌙'}</div>
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;