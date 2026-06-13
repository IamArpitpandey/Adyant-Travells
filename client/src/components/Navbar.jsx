import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiLogOut, FiSettings } from 'react-icons/fi';
import { GiDiamondRing } from 'react-icons/gi';
import { MdFlight } from 'react-icons/md';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navLinks = [
    { to: '/', label: 'Home' },
    { 
      to: '/travel', 
      label: 'Travel', 
      icon: <MdFlight className="inline mr-1 text-white/90 dark:text-white/80 group-hover:text-gold-DEFAULT transition" /> 
    },
    { 
      to: '/wedding', 
      label: 'Wedding', 
      icon: <GiDiamondRing className="inline mr-1 text-white/90 dark:text-white/80 group-hover:text-gold-DEFAULT transition" /> 
    },
    { to: '/booking', label: 'Book Now' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-md transition-all duration-300
      ${scrolled 
        ? 'bg-royal/90 dark:bg-black/80 shadow-lg' 
        : 'bg-royal/70 dark:bg-black/50'}
    `}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-royal font-bold text-lg">
              A
            </div>
            <div>
              <div className="text-white text-lg font-semibold leading-none">Adyant</div>
              <div className="text-gold-DEFAULT text-sm leading-none">Travells & Weddings</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center text-sm font-medium transition-all duration-300 relative group
                  ${isActive(link.to) 
                    ? 'text-gold-DEFAULT' 
                    : 'text-white/90 dark:text-white/80 hover:text-gold-DEFAULT'}
                  ${link.to === '/booking' 
                    ? 'btn-gold px-5 py-2 text-royal rounded-lg ml-2 shadow-md hover:scale-105' 
                    : ''}
                `}
              >
                {link.icon}{link.label}

                {link.to !== '/booking' && (
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-gold-DEFAULT transition-all duration-300 rounded-full
                    ${isActive(link.to) ? 'w-full' : 'w-0 group-hover:w-full'}
                  `} />
                )}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-white/10 dark:bg-white/5 
              flex items-center justify-center 
              text-white dark:text-white/80 
              hover:bg-gold-DEFAULT hover:text-royal 
              transition-all duration-300"
            >
              {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
            </button>

            {/* User Menu */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center gap-2 bg-gold-DEFAULT/20 rounded-full pl-2 pr-4 py-1.5 text-white hover:bg-gold-DEFAULT/30 transition-all"
                >
                  <div className="w-7 h-7 rounded-full bg-gold-gradient flex items-center justify-center text-royal text-xs font-bold">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium hidden sm:block">
                    {user.name?.split(' ')[0]}
                  </span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 top-12 w-48 bg-royal-purple dark:bg-gray-900 rounded-xl shadow-2xl border border-gold-DEFAULT/20 overflow-hidden z-50">
                    {user.role === 'admin' && (
                      <Link to="/admin" className="flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-gold-DEFAULT/10 hover:text-gold-DEFAULT text-sm transition-all">
                        <FiSettings size={14} /> Admin Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-white/80 hover:bg-red-500/10 hover:text-red-400 text-sm transition-all"
                    >
                      <FiLogOut size={14} /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden md:flex items-center gap-2 text-white/80 hover:text-gold-DEFAULT text-sm font-medium transition-all"
              >
                <FiUser size={16} /> Login
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-9 h-9 rounded-full bg-white/10 dark:bg-white/5 flex items-center justify-center text-white"
            >
              {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 pt-4">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-2 py-3 px-3 text-sm font-medium transition-all rounded-lg mb-1
                  ${isActive(link.to) 
                    ? 'text-gold-DEFAULT bg-gold-DEFAULT/10' 
                    : 'text-white/90 dark:text-white/80 hover:text-gold-DEFAULT hover:bg-white/5'}
                `}
              >
                {link.icon}{link.label}
              </Link>
            ))}

            {!user && (
              <Link to="/login" className="flex items-center gap-2 py-3 px-3 text-white/80 hover:text-gold-DEFAULT text-sm">
                <FiUser size={16} /> Login / Register
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;