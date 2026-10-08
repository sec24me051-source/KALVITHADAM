import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { courseService, opportunityService } from '../../services/api';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cRes, oRes] = await Promise.all([
          courseService.getAll(),
          opportunityService.getAll(),
        ]);
        setCourses(cRes.data.slice(0, 4));
        setOpportunities(oRes.data.slice(0, 3));
      } catch (err) {
        console.error('Failed to load student dashboard resources', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        {/* Welcome Banner */}
        <div
          style={{
            background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4338ca 100%)',
            color: '#fff',
            borderRadius: '16px',
            padding: '2rem 2.5rem',
            marginBottom: '2rem',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div style={{ position: 'relative', zIndex: 1, maxWidth: '650px' }}>
            <span className="badge" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', marginBottom: '0.75rem' }}>
              Student Learning Space
            </span>
            <h1 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '0.5rem 0' }}>
              Welcome back, {user?.name || 'Student'}! 👋
            </h1>
            <p style={{ opacity: 0.9, lineHeight: 1.6, fontSize: '0.95rem' }}>
              "Learning is excellence in action." Access your courses, explore educational scholarships, and master essential digital skills anytime.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
              <Link to="/learning" className="btn btn-primary" style={{ background: '#fff', color: '#312e81', border: 'none' }}>
                Explore Courses
              </Link>
              <Link to="/opportunities" className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }}>
                View Scholarships
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Highlights Grid */}
        <div className="stats-grid" style={{ marginBottom: '2rem' }}>
          <div className="stat-card">
            <div className="stat-card-header">
              <div>
                <div className="stat-value">{courses.length > 0 ? '12+' : '0'}</div>
                <div className="stat-label">Free Learning Modules</div>
              </div>
              <div className="stat-icon-wrap" style={{ background: '#ede9fe', color: '#6366f1' }}>📚</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div>
                <div className="stat-value">{opportunities.length > 0 ? '8+' : '0'}</div>
                <div className="stat-label">Active Govt Schemes</div>
              </div>
              <div className="stat-icon-wrap" style={{ background: '#dcfce7', color: '#16a34a' }}>🎯</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div>
                <div className="stat-value">100%</div>
                <div className="stat-label">Free & Open Access</div>
              </div>
              <div className="stat-icon-wrap" style={{ background: '#fef3c7', color: '#d97706' }}>✨</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-header">
              <div>
                <div className="stat-value">24/7</div>
                <div className="stat-label">Student Support Helpline</div>
              </div>
              <div className="stat-icon-wrap" style={{ background: '#fee2e2', color: '#dc2626' }}>📞</div>
            </div>
          </div>
        </div>

        {/* Learning & Opportunities Split Section */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          {/* Recommended Learning Modules */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Recommended Modules</h2>
              <Link to="/learning" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                All Courses →
              </Link>
            </div>
            {loading ? (
              <div className="spinner-container"><div className="spinner"></div></div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {courses.map((course) => (
                  <div key={course._id} className="card" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span className="badge badge-purple">{course.category}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>⏱️ {course.duration}</span>
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--text-dark)' }}>
                      {course.title}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
                      {course.description.substring(0, 100)}...
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>
                        📖 {course.lessons?.length || course.lessonCount || 0} Lessons
                      </span>
                      <Link to="/learning" className="btn btn-ghost btn-sm">
                        Start Learning →
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Scholarships & Opportunities */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>Financial Schemes & Aid</h2>
              <Link to="/opportunities" style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600, textDecoration: 'none' }}>
                All Opportunities →
              </Link>
            </div>
            {loading ? (
              <div className="spinner-container"><div className="spinner"></div></div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {opportunities.map((opp) => (
                  <div key={opp._id} className="card" style={{ padding: '1.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <span className="badge badge-success">{opp.type}</span>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>📅 {opp.deadline}</span>
                    </div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem', color: 'var(--text-dark)' }}>
                      {opp.title}
                    </h3>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, marginBottom: '0.5rem' }}>
                      Provider: {opp.provider}
                    </div>
                    <div style={{ fontSize: '0.85rem', background: '#ecfdf5', padding: '0.5rem 0.75rem', borderRadius: '6px', color: '#047857', marginBottom: '0.75rem' }}>
                      💰 {opp.benefits}
                    </div>
                    <Link to="/opportunities" className="btn btn-ghost btn-sm" style={{ width: '100%', justifyContent: 'center' }}>
                      Check Eligibility & Apply →
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Student Welfare & Support Helpline Banner */}
        <div className="card" style={{ background: 'linear-gradient(to right, #eff6ff, #f5f3ff)', border: '1px solid #c7d2fe', padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <div style={{ fontSize: '2.5rem' }}>🤝</div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#1e1b4b', marginBottom: '0.25rem' }}>
                Need Help Staying in School or Facing Financial Difficulties?
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0, lineHeight: 1.5 }}>
                You are never alone. Reach out to our dedicated student counseling team, your school teacher coordinator, or call the 14417 Tamil Nadu Education Helpline.
              </p>
            </div>
            <a href="tel:14417" className="btn btn-primary" style={{ textDecoration: 'none' }}>
              📞 Call Helpline (14417)
            </a>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
