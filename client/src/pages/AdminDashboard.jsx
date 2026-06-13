import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext.jsx';
import {
  FiGrid, FiCalendar, FiMail, FiUsers, FiLogOut,
  FiCheck, FiX, FiClock, FiTrendingUp, FiEye, FiMenu
} from 'react-icons/fi';

// ===== SIDEBAR =====
const Sidebar = ({ open, setOpen }) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: <FiGrid size={18} />, exact: true },
    { to: '/admin/bookings', label: 'Bookings', icon: <FiCalendar size={18} /> },
    { to: '/admin/contacts', label: 'Contacts', icon: <FiMail size={18} /> },
    { to: '/admin/users', label: 'Users', icon: <FiUsers size={18} /> },
  ];

  const handleLogout = () => { logout(); navigate('/'); };
  const isActive = (to, exact) => exact ? location.pathname === to : location.pathname.startsWith(to) && !(exact && location.pathname !== to);

  return (
    <>
      {/* Overlay */}
      {open && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setOpen(false)} />}

      <aside className={`fixed top-0 left-0 h-full w-64 bg-royal-DEFAULT z-50 flex flex-col transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        {/* Brand */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gold-gradient flex items-center justify-center text-royal font-bold font-display">A</div>
            <div>
              <div className="text-white font-semibold text-sm">Admin Panel</div>
              <div className="text-gold-DEFAULT text-xs">Adyant Travells</div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-white/50 text-xs">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Logged in as {user?.name}
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(item => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all
                ${isActive(item.to, item.exact)
                  ? 'bg-gold-DEFAULT/20 text-gold-DEFAULT border border-gold-DEFAULT/30'
                  : 'text-white/60 hover:bg-white/5 hover:text-white'}`}
            >
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-3 px-4 py-2 text-white/40 hover:text-white text-sm transition-all mb-1">
            ← Back to Website
          </Link>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg text-sm transition-all">
            <FiLogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>
    </>
  );
};

// ===== DASHBOARD HOME =====
const DashboardHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await axios.get('/api/admin/dashboard');
      setStats(res.data.stats);
    } catch {
      setStats({ totalBookings: 12, pendingBookings: 5, confirmedBookings: 6, totalContacts: 8, newContacts: 3, totalUsers: 24, totalRevenue: 1250000, recentBookings: [] });
    } finally {
      setLoading(false);
    }
  };

  const statCards = stats ? [
    { label: 'Total Bookings', value: stats.totalBookings, icon: <FiCalendar size={22} />, color: '#C9A84C', bg: '#C9A84C15' },
    { label: 'Pending', value: stats.pendingBookings, icon: <FiClock size={22} />, color: '#F59E0B', bg: '#F59E0B15' },
    { label: 'Confirmed', value: stats.confirmedBookings, icon: <FiCheck size={22} />, color: '#10B981', bg: '#10B98115' },
    { label: 'New Contacts', value: stats.newContacts, icon: <FiMail size={22} />, color: '#8B5CF6', bg: '#8B5CF615' },
    { label: 'Total Users', value: stats.totalUsers, icon: <FiUsers size={22} />, color: '#3B82F6', bg: '#3B82F615' },
    { label: 'Revenue (Est.)', value: `₹${(stats.totalRevenue/100000).toFixed(1)}L`, icon: <FiTrendingUp size={22} />, color: '#EC4899', bg: '#EC489915' },
  ] : [];

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-10 h-10 border-2 border-gold-DEFAULT/30 border-t-gold-DEFAULT rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-3xl font-semibold text-text-dark dark:text-white">Dashboard Overview</h2>
        <p className="text-text-medium dark:text-white/50 mt-1">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statCards.map((card, i) => (
          <div key={i} className="card-elegant p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: card.bg, color: card.color }}>
                {card.icon}
              </div>
            </div>
            <div className="font-display text-3xl font-bold text-text-dark dark:text-white">{card.value}</div>
            <div className="text-text-medium dark:text-white/50 text-sm mt-1">{card.label}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-elegant p-6">
          <h3 className="font-semibold text-text-dark dark:text-white mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link to="/admin/bookings" className="flex items-center justify-between p-3 rounded-lg hover:bg-gold-DEFAULT/5 transition-all group">
              <span className="text-text-medium dark:text-white/60 text-sm">View all bookings</span>
              <FiCalendar className="text-gold-DEFAULT group-hover:scale-110 transition-transform" size={16} />
            </Link>
            <Link to="/admin/contacts" className="flex items-center justify-between p-3 rounded-lg hover:bg-gold-DEFAULT/5 transition-all group">
              <span className="text-text-medium dark:text-white/60 text-sm">Check new inquiries</span>
              <FiMail className="text-gold-DEFAULT group-hover:scale-110 transition-transform" size={16} />
            </Link>
            <Link to="/admin/users" className="flex items-center justify-between p-3 rounded-lg hover:bg-gold-DEFAULT/5 transition-all group">
              <span className="text-text-medium dark:text-white/60 text-sm">Manage users</span>
              <FiUsers className="text-gold-DEFAULT group-hover:scale-110 transition-transform" size={16} />
            </Link>
          </div>
        </div>
        <div className="card-elegant p-6">
          <h3 className="font-semibold text-text-dark dark:text-white mb-4">System Info</h3>
          <div className="space-y-3">
            {[
              { label: 'Booking Approval Rate', value: '87%', color: 'text-green-500' },
              { label: 'Customer Satisfaction', value: '4.9/5', color: 'text-gold-DEFAULT' },
              { label: 'Response Time (avg)', value: '< 2 hrs', color: 'text-blue-400' },
              { label: 'Active Packages', value: '6 Travel + 3 Wedding', color: 'text-purple-400' },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="text-text-medium dark:text-white/50 text-sm">{item.label}</span>
                <span className={`font-semibold text-sm ${item.color}`}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ===== BOOKINGS MANAGEMENT =====
const BookingsManagement = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => { fetchBookings(); }, [filter]);

  const fetchBookings = async () => {
    try {
      const params = filter !== 'all' ? `?status=${filter}` : '';
      const res = await axios.get(`/api/admin/bookings${params}`);
      setBookings(res.data.bookings || []);
    } catch {
      setBookings([
        { _id:'1', bookingId:'TRV-DEMO-001', name:'Rahul Sharma', email:'rahul@email.com', phone:'+91 9876543210', serviceType:'tour-package', serviceCategory:'travel', date:'2024-03-15', budget:45000, status:'pending', createdAt: new Date().toISOString() },
        { _id:'2', bookingId:'WED-DEMO-001', name:'Priya Singh', email:'priya@email.com', phone:'+91 8765432109', serviceType:'wedding', serviceCategory:'wedding', date:'2024-04-20', budget:550000, status:'confirmed', createdAt: new Date().toISOString() },
        { _id:'3', bookingId:'TRV-DEMO-002', name:'Amit Kumar', email:'amit@email.com', phone:'+91 7654321098', serviceType:'hotel', serviceCategory:'travel', date:'2024-02-28', budget:28000, status:'completed', createdAt: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    setUpdating(true);
    try {
      await axios.put(`/api/admin/bookings/${id}`, { status });
      toast.success(`Booking ${status}`);
      setSelected(null);
      fetchBookings();
    } catch {
      toast.error('Update failed (Demo mode - API not connected)');
      setSelected(null);
    } finally {
      setUpdating(false);
    }
  };

  const statusBadge = (s) => {
    const map = { pending: 'status-pending', confirmed: 'status-confirmed', cancelled: 'status-cancelled', completed: 'status-completed' };
    return <span className={`${map[s] || ''} px-2 py-0.5 rounded text-xs font-semibold capitalize`}>{s}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="font-display text-3xl font-semibold text-text-dark dark:text-white">Bookings</h2>
        <div className="flex gap-2">
          {['all','pending','confirmed','completed','cancelled'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all
              ${filter === s ? 'bg-gold-DEFAULT text-royal' : 'bg-white dark:bg-white/10 text-text-medium dark:text-white/50 hover:bg-gold-DEFAULT/20'}`}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-10 h-10 border-2 border-gold-DEFAULT/30 border-t-gold-DEFAULT rounded-full animate-spin" /></div>
      ) : (
        <div className="card-elegant overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold-DEFAULT/10">
                  <th className="text-left p-4 text-text-medium dark:text-white/50 font-medium">Booking ID</th>
                  <th className="text-left p-4 text-text-medium dark:text-white/50 font-medium">Client</th>
                  <th className="text-left p-4 text-text-medium dark:text-white/50 font-medium">Service</th>
                  <th className="text-left p-4 text-text-medium dark:text-white/50 font-medium">Date</th>
                  <th className="text-left p-4 text-text-medium dark:text-white/50 font-medium">Budget</th>
                  <th className="text-left p-4 text-text-medium dark:text-white/50 font-medium">Status</th>
                  <th className="text-left p-4 text-text-medium dark:text-white/50 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b, i) => (
                  <tr key={b._id} className={`border-b border-gold-DEFAULT/5 hover:bg-gold-DEFAULT/5 transition-colors ${i % 2 === 0 ? '' : 'bg-black/2'}`}>
                    <td className="p-4 font-mono text-gold-DEFAULT text-xs">{b.bookingId}</td>
                    <td className="p-4">
                      <div className="font-medium text-text-dark dark:text-white">{b.name}</div>
                      <div className="text-text-light dark:text-white/30 text-xs">{b.email}</div>
                    </td>
                    <td className="p-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${b.serviceCategory === 'travel' ? 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300' : 'bg-pink-100 dark:bg-pink-500/20 text-pink-700 dark:text-pink-300'}`}>
                        {b.serviceCategory === 'travel' ? '✈️' : '💍'} {b.serviceType?.replace('-', ' ')}
                      </span>
                    </td>
                    <td className="p-4 text-text-medium dark:text-white/60">{new Date(b.date).toLocaleDateString('en-IN')}</td>
                    <td className="p-4 font-semibold text-text-dark dark:text-white">₹{Number(b.budget).toLocaleString()}</td>
                    <td className="p-4">{statusBadge(b.status)}</td>
                    <td className="p-4">
                      <button onClick={() => setSelected(b)} className="text-gold-DEFAULT hover:underline text-xs flex items-center gap-1">
                        <FiEye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {bookings.length === 0 && (
              <div className="text-center py-12 text-text-medium dark:text-white/40">No bookings found</div>
            )}
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-royal-purple w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-royal-gradient p-6 flex items-center justify-between">
              <div>
                <div className="font-mono text-gold-DEFAULT text-sm">{selected.bookingId}</div>
                <div className="text-white font-semibold text-lg">{selected.name}</div>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/60 hover:text-white"><FiX size={24} /></button>
            </div>
            <div className="p-6 space-y-3">
              {[
                ['Email', selected.email],
                ['Phone', selected.phone],
                ['Service', selected.serviceType?.replace('-', ' ')],
                ['Category', selected.serviceCategory],
                ['Date', new Date(selected.date).toLocaleDateString('en-IN', { dateStyle: 'long' })],
                ['Budget', `₹${Number(selected.budget).toLocaleString()}`],
                ['Status', selected.status],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between py-1 border-b border-gold-DEFAULT/10">
                  <span className="text-text-medium dark:text-white/50 text-sm">{k}</span>
                  <span className="text-text-dark dark:text-white text-sm font-medium capitalize">{v}</span>
                </div>
              ))}
              {selected.details && Object.entries(selected.details).filter(([,v]) => v).map(([k,v]) => (
                <div key={k} className="flex justify-between py-1 border-b border-gold-DEFAULT/10">
                  <span className="text-text-medium dark:text-white/50 text-sm capitalize">{k.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="text-text-dark dark:text-white text-sm">{v}</span>
                </div>
              ))}
            </div>
            {selected.status === 'pending' && (
              <div className="px-6 pb-6 flex gap-3">
                <button onClick={() => updateStatus(selected._id, 'confirmed')} disabled={updating} className="flex-1 bg-green-500 text-white py-2.5 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center gap-2">
                  <FiCheck size={16} /> {updating ? 'Updating...' : 'Confirm'}
                </button>
                <button onClick={() => updateStatus(selected._id, 'cancelled')} disabled={updating} className="flex-1 bg-red-500 text-white py-2.5 rounded-lg font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2">
                  <FiX size={16} /> Reject
                </button>
              </div>
            )}
            {selected.status === 'confirmed' && (
              <div className="px-6 pb-6">
                <button onClick={() => updateStatus(selected._id, 'completed')} disabled={updating} className="w-full bg-blue-500 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                  Mark as Completed
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ===== CONTACTS MANAGEMENT =====
const ContactsManagement = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => { fetchContacts(); }, []);

  const fetchContacts = async () => {
    try {
      const res = await axios.get('/api/admin/contacts');
      setContacts(res.data.contacts || []);
    } catch {
      setContacts([
        { _id:'1', name:'Anjali Gupta', email:'anjali@email.com', phone:'+91 9876543210', subject:'Wedding Inquiry', message:'I want to plan my wedding for December 2024. Please share your packages.', status:'new', createdAt: new Date().toISOString() },
        { _id:'2', name:'Rohan Verma', email:'rohan@email.com', phone:'+91 8765432109', subject:'Travel Package', message:'Looking for a family trip to Kerala for 5 people in April.', status:'read', createdAt: new Date().toISOString() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const markRead = async (id) => {
    try {
      await axios.put(`/api/admin/contacts/${id}`, { status: 'read' });
      fetchContacts();
    } catch {
      setContacts(prev => prev.map(c => c._id === id ? { ...c, status: 'read' } : c));
    }
  };

  const statusBadge = (s) => {
    const map = { new: 'status-new', read: 'bg-gray-100 text-gray-600', replied: 'status-confirmed', closed: 'bg-gray-100 text-gray-400' };
    return <span className={`${map[s] || ''} px-2 py-0.5 rounded text-xs font-semibold capitalize`}>{s}</span>;
  };

  return (
    <div className="space-y-6">
      <h2 className="font-display text-3xl font-semibold text-text-dark dark:text-white">Contact Inquiries</h2>
      {loading ? (
        <div className="flex justify-center py-12"><div className="w-10 h-10 border-2 border-gold-DEFAULT/30 border-t-gold-DEFAULT rounded-full animate-spin" /></div>
      ) : (
        <div className="space-y-4">
          {contacts.map(c => (
            <div key={c._id} className={`card-elegant p-5 cursor-pointer hover:border-gold-DEFAULT/40 transition-all ${c.status === 'new' ? 'border-l-4 border-l-gold-DEFAULT' : ''}`} onClick={() => { setSelected(c); markRead(c._id); }}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-text-dark dark:text-white">{c.name}</span>
                    {statusBadge(c.status)}
                  </div>
                  <div className="text-text-medium dark:text-white/50 text-xs mb-2">{c.email} {c.phone && `• ${c.phone}`}</div>
                  <div className="text-gold-DEFAULT text-sm font-medium mb-1">{c.subject || 'General Inquiry'}</div>
                  <p className="text-text-medium dark:text-white/60 text-sm truncate">{c.message}</p>
                </div>
                <div className="text-text-light dark:text-white/30 text-xs whitespace-nowrap">{new Date(c.createdAt).toLocaleDateString('en-IN')}</div>
              </div>
            </div>
          ))}
          {contacts.length === 0 && <div className="text-center py-12 text-text-medium dark:text-white/40">No contact inquiries found</div>}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-royal-purple w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="bg-royal-gradient p-6 flex items-center justify-between">
              <div>
                <div className="text-gold-DEFAULT text-sm">{selected.subject || 'General Inquiry'}</div>
                <div className="text-white font-semibold text-lg">{selected.name}</div>
              </div>
              <button onClick={() => setSelected(null)} className="text-white/60 hover:text-white"><FiX size={24} /></button>
            </div>
            <div className="p-6">
              <div className="space-y-2 mb-5">
                <div className="text-text-medium dark:text-white/50 text-sm">📧 {selected.email}</div>
                {selected.phone && <div className="text-text-medium dark:text-white/50 text-sm">📞 {selected.phone}</div>}
                <div className="text-text-light dark:text-white/30 text-xs">{new Date(selected.createdAt).toLocaleString('en-IN')}</div>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4">
                <div className="font-medium text-text-dark dark:text-white text-sm mb-2">Message:</div>
                <p className="text-text-medium dark:text-white/60 text-sm leading-relaxed">{selected.message}</p>
              </div>
              <div className="mt-4 flex gap-3">
                <a href={`mailto:${selected.email}?subject=Re: ${selected.subject}`} className="flex-1 btn-gold text-center py-2.5 text-sm">Reply via Email</a>
                <a href={`https://wa.me/${selected.phone?.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="flex-1 bg-green-500 text-white py-2.5 rounded-lg text-sm font-semibold text-center hover:bg-green-600 transition-colors">WhatsApp</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ===== USERS MANAGEMENT =====
const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/admin/users');
        setUsers(res.data.users || []);
      } catch {
        setUsers([
          { _id:'1', name:'Rahul Sharma', email:'rahul@email.com', phone:'+91 9876543210', role:'user', isActive:true, createdAt: new Date().toISOString() },
          { _id:'2', name:'Priya Singh', email:'priya@email.com', phone:'+91 8765432109', role:'user', isActive:true, createdAt: new Date().toISOString() },
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="font-display text-3xl font-semibold text-text-dark dark:text-white">Users</h2>
      {loading ? (
        <div className="flex justify-center py-12"><div className="w-10 h-10 border-2 border-gold-DEFAULT/30 border-t-gold-DEFAULT rounded-full animate-spin" /></div>
      ) : (
        <div className="card-elegant overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gold-DEFAULT/10">
                  <th className="text-left p-4 text-text-medium dark:text-white/50 font-medium">Name</th>
                  <th className="text-left p-4 text-text-medium dark:text-white/50 font-medium">Email</th>
                  <th className="text-left p-4 text-text-medium dark:text-white/50 font-medium">Phone</th>
                  <th className="text-left p-4 text-text-medium dark:text-white/50 font-medium">Role</th>
                  <th className="text-left p-4 text-text-medium dark:text-white/50 font-medium">Status</th>
                  <th className="text-left p-4 text-text-medium dark:text-white/50 font-medium">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id} className="border-b border-gold-DEFAULT/5 hover:bg-gold-DEFAULT/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gold-gradient flex items-center justify-center text-royal text-xs font-bold">{u.name?.charAt(0)}</div>
                        <span className="font-medium text-text-dark dark:text-white">{u.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-text-medium dark:text-white/60">{u.email}</td>
                    <td className="p-4 text-text-medium dark:text-white/60">{u.phone || '—'}</td>
                    <td className="p-4"><span className={`px-2 py-0.5 rounded text-xs font-semibold capitalize ${u.role === 'admin' ? 'bg-gold-DEFAULT/20 text-gold-DEFAULT' : 'bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300'}`}>{u.role}</span></td>
                    <td className="p-4"><span className={`px-2 py-0.5 rounded text-xs font-semibold ${u.isActive ? 'status-confirmed' : 'status-cancelled'}`}>{u.isActive ? 'Active' : 'Inactive'}</span></td>
                    <td className="p-4 text-text-medium dark:text-white/50 text-xs">{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {users.length === 0 && <div className="text-center py-12 text-text-medium dark:text-white/40">No users found</div>}
          </div>
        </div>
      )}
    </div>
  );
};

// ===== MAIN ADMIN DASHBOARD =====
const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream dark:bg-royal-DEFAULT flex">
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Bar */}
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-royal-DEFAULT/80 backdrop-blur-sm border-b border-gold-DEFAULT/10 px-6 py-4 flex items-center gap-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center text-text-medium dark:text-white">
            <FiMenu size={18} />
          </button>
          <div className="flex-1 text-text-medium dark:text-white/50 text-sm">Admin Dashboard</div>
          <div className="text-gold-DEFAULT text-sm font-medium">Adyant Travells</div>
        </div>

        {/* Page Content */}
        <div className="p-6">
          <Routes>
            <Route index element={<DashboardHome />} />
            <Route path="bookings" element={<BookingsManagement />} />
            <Route path="contacts" element={<ContactsManagement />} />
            <Route path="users" element={<UsersManagement />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
