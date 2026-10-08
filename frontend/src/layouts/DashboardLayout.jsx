import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccessibilityWidget from '../components/AccessibilityWidget';

const TeacherSidebar = () => (
  <>
    <div className="sidebar-section-label">Teacher Portal</div>
    <NavLink to="/teacher/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} end><span className="icon">📊</span>Dashboard</NavLink>
    <NavLink to="/teacher/students" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">👥</span>My Students</NavLink>
    <NavLink to="/teacher/add-student" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">➕</span>Add Student</NavLink>
    <NavLink to="/teacher/dropout-cases" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">⚠️</span>Dropout Cases</NavLink>
    <NavLink to="/teacher/report-dropout" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">📝</span>Report Case</NavLink>
    <div className="sidebar-section-label" style={{ marginTop: '1rem' }}>Account</div>
    <NavLink to="/teacher/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">👤</span>Profile</NavLink>
  </>
);

const AdminSidebar = () => (
  <>
    <div className="sidebar-section-label">Administration</div>
    <NavLink to="/admin/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} end><span className="icon">📊</span>Dashboard</NavLink>
    <NavLink to="/admin/students" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">👥</span>Students</NavLink>
    <NavLink to="/admin/teachers" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">👨‍🏫</span>Teachers</NavLink>
    <NavLink to="/admin/dropout-cases" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">⚠️</span>Dropout Cases</NavLink>
    <div className="sidebar-section-label" style={{ marginTop: '0.5rem' }}>Content</div>
    <NavLink to="/admin/opportunities" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">🎯</span>Opportunities</NavLink>
    <NavLink to="/admin/courses" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">📚</span>Courses</NavLink>
    <div className="sidebar-section-label" style={{ marginTop: '0.5rem' }}>Account</div>
    <NavLink to="/admin/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">👤</span>Profile</NavLink>
  </>
);

const StudentSidebarLinks = () => (
  <>
    <div className="sidebar-section-label">Student Portal</div>
    <NavLink to="/student/dashboard" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`} end><span className="icon">🏠</span>Dashboard</NavLink>
    <NavLink to="/learning" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">📚</span>Learning</NavLink>
    <NavLink to="/opportunities" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">🎯</span>Opportunities</NavLink>
    <NavLink to="/digital-skills" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">💻</span>Digital Skills</NavLink>
    <div className="sidebar-section-label" style={{ marginTop: '0.5rem' }}>Account</div>
    <NavLink to="/student/profile" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}><span className="icon">👤</span>Profile</NavLink>
  </>
);

export default function DashboardLayout({ children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">

        <div className="sidebar-logo">
          <Link to="/" className="nav-logo">
            <img src="/logo.png" alt="Logo" className="nav-logo-icon" />
            <div className="nav-logo-text">
              KALVITHADAM
              <span>Education Platform</span>
            </div>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {user?.role === 'admin' && <AdminSidebar />}
          {user?.role === 'teacher' && <TeacherSidebar />}
          {user?.role === 'student' && <StudentSidebarLinks />}
        </nav>

        <div
          style={{
            padding: '1rem',
            borderTop: '1px solid var(--border)'
          }}
        >
          <div
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-dark)',
              marginBottom: '0.25rem'
            }}
          >
            {user?.name}
          </div>

          <div
            style={{
              fontSize: '0.75rem',
              color: 'var(--text-light)',
              textTransform: 'capitalize',
              marginBottom: '0.75rem'
            }}
          >
            {user?.role}
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-ghost btn-sm"
            style={{
              width: '100%',
              justifyContent: 'center'
            }}
            id="sidebar-logout-btn"
          >
            Logout
          </button>
        </div>

      </aside>

      <div className="dashboard-main">
        {children}
      </div>

      <AccessibilityWidget />
    </div>
  );
}
