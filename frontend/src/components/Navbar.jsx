import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return null;
    if (user.role === 'admin') return '/admin/dashboard';
    if (user.role === 'teacher') return '/teacher/dashboard';
    return '/student/dashboard';
  };

  const publicLinks = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/learning', label: 'Learning' },
    { to: '/opportunities', label: 'Opportunities' },
    { to: '/digital-skills', label: 'Digital Skills' },
  ];

  const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard' },
    { to: '/learning', label: 'Learning' },
    { to: '/opportunities', label: 'Opportunities' },
    { to: '/digital-skills', label: 'Digital Skills' },
    { to: '/student/profile', label: 'Profile' },
  ];

  const teacherLinks = [
    { to: '/teacher/dashboard', label: 'Dashboard' },
    { to: '/teacher/students', label: 'Students' },
    { to: '/teacher/dropout-cases', label: 'Cases' },
  ];

  const adminLinks = [
    { to: '/admin/dashboard', label: 'Dashboard' },
    { to: '/admin/students', label: 'Students' },
    { to: '/admin/dropout-cases', label: 'Cases' },
    { to: '/admin/opportunities', label: 'Opportunities' },
    { to: '/admin/courses', label: 'Courses' },
  ];

  const links = !user ? publicLinks : user.role === 'admin' ? adminLinks : user.role === 'teacher' ? teacherLinks : studentLinks;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <Link to="/" className="nav-logo" onClick={() => setMenuOpen(false)}>
            <img src="/logo.png" alt="Logo" className="nav-logo-icon" />
            <div className="nav-logo-text">
              KALVITHADAM
              <span>Digital Education Platform</span>
            </div>
          </Link>

          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {links.map(l => (
              <NavLink key={l.to} to={l.to} className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} onClick={() => setMenuOpen(false)} end={l.to === '/'}>
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="nav-actions">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-outline btn-sm" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-primary btn-sm" onClick={() => setMenuOpen(false)}>Register</Link>
              </>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Link to={getDashboardLink()} className="btn btn-outline btn-sm" onClick={() => setMenuOpen(false)}>
                  {user.name.split(' ')[0]}
                </Link>
                <button className="btn btn-ghost btn-sm" onClick={handleLogout} id="logout-btn">Logout</button>
              </div>
            )}
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} id="hamburger-btn" aria-label="Toggle menu">
              <span></span><span></span><span></span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
