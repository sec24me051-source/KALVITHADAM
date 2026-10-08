import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { studentService, dropoutService } from '../../services/api';

export default function TeacherDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ total: 0, atRisk: 0, dropout: 0, active: 0 });
  const [caseStats, setCaseStats] = useState({ total: 0, active: 0, resolved: 0 });
  const [recentStudents, setRecentStudents] = useState([]);
  const [recentCases, setRecentCases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [statsRes, caseStatsRes, studentsRes, casesRes] = await Promise.all([
        studentService.getStats(),
        dropoutService.getStats(),
        studentService.getAll(),
        dropoutService.getAll(),
      ]);
      setStats(statsRes.data);
      setCaseStats(caseStatsRes.data);
      setRecentStudents(studentsRes.data.slice(0, 5));
      setRecentCases(casesRes.data.slice(0, 5));
    } catch {}
    finally { setLoading(false); }
  };

  const statusStyle = (status) => {
    const map = { 'Reported': 'status-reported', 'Under Review': 'status-review', 'Intervention Planned': 'status-planned', 'Counselling Provided': 'status-counselling', 'Support Provided': 'status-support', 'Follow-Up Required': 'status-followup', 'Education Continued': 'status-continued', 'Case Closed': 'status-closed' };
    return `badge ${map[status] || 'badge-gray'}`;
  };

  const riskStyle = (risk) => {
    const map = { 'Low': 'risk-low', 'Medium': 'risk-medium', 'High': 'risk-high' };
    return `badge ${map[risk] || 'badge-gray'}`;
  };

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <div>
          <div className="page-title">Teacher Dashboard</div>
          <div className="page-subtitle">Welcome back, {user?.name} — {user?.school}</div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link to="/teacher/add-student" className="btn btn-primary btn-sm" id="add-student-header-btn">+ Add Student</Link>
          <Link to="/teacher/report-dropout" className="btn btn-outline btn-sm" id="report-dropout-header-btn">⚠️ Report Case</Link>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="stats-cards">
          {[
            { icon: '👥', label: 'Total Students', val: stats.total, color: 'purple' },
            { icon: '✅', label: 'Active Students', val: stats.active, color: 'green' },
            { icon: '⚠️', label: 'At-Risk Students', val: stats.atRisk, color: 'orange' },
            { icon: '📋', label: 'Cases Reported', val: caseStats.total, color: 'red' },
          ].map((s, i) => (
            <div key={i} className="stat-card">
              <div className={`stat-card-icon ${s.color}`}>{s.icon}</div>
              <div className="stat-card-val">{loading ? '...' : s.val}</div>
              <div className="stat-card-label">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { icon: '➕', label: 'Add Student', to: '/teacher/add-student', color: 'var(--primary)' },
            { icon: '👥', label: 'View Students', to: '/teacher/students', color: 'var(--secondary)' },
            { icon: '⚠️', label: 'Report Dropout', to: '/teacher/report-dropout', color: '#c2410c' },
            { icon: '📊', label: 'View Cases', to: '/teacher/dropout-cases', color: '#1d4ed8' },
          ].map((a, i) => (
            <Link key={i} to={a.to} id={`quick-action-${i}`} style={{ background: 'white', borderRadius: 'var(--radius)', padding: '1.25rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', border: `2px solid ${a.color}20`, transition: '0.2s', textDecoration: 'none' }}
              onMouseEnter={e => e.currentTarget.style.borderColor = a.color}
              onMouseLeave={e => e.currentTarget.style.borderColor = `${a.color}20`}>
              <div style={{ fontSize: '1.5rem' }}>{a.icon}</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: a.color, textAlign: 'center' }}>{a.label}</div>
            </Link>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          {/* Recent Students */}
          <div className="table-container">
            <div className="table-header">
              <div className="table-title">👥 Recent Students</div>
              <Link to="/teacher/students" className="btn btn-ghost btn-sm">View All →</Link>
            </div>
            {loading ? <div className="loading" style={{ padding: '2rem' }}><div className="spinner"></div></div> :
              recentStudents.length === 0 ? <div className="empty-state"><div className="icon">👥</div><p>No students yet</p></div> :
              <table className="table">
                <thead><tr><th>Name</th><th>Class</th><th>Risk</th><th>Status</th></tr></thead>
                <tbody>
                  {recentStudents.map(s => (
                    <tr key={s._id}>
                      <td><strong>{s.name}</strong></td>
                      <td>{s.class}</td>
                      <td><span className={riskStyle(s.riskLevel)}>{s.riskLevel}</span></td>
                      <td><span className={`badge ${s.educationStatus === 'Active' ? 'badge-green' : s.educationStatus === 'At-Risk' ? 'badge-orange' : 'badge-red'}`}>{s.educationStatus}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          </div>

          {/* Recent Cases */}
          <div className="table-container">
            <div className="table-header">
              <div className="table-title">⚠️ Recent Dropout Cases</div>
              <Link to="/teacher/dropout-cases" className="btn btn-ghost btn-sm">View All →</Link>
            </div>
            {loading ? <div className="loading" style={{ padding: '2rem' }}><div className="spinner"></div></div> :
              recentCases.length === 0 ? <div className="empty-state"><div className="icon">⚠️</div><p>No cases reported</p></div> :
              <table className="table">
                <thead><tr><th>Student</th><th>Reason</th><th>Status</th></tr></thead>
                <tbody>
                  {recentCases.map(c => (
                    <tr key={c._id}>
                      <td><strong>{c.studentId?.name}</strong></td>
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-medium)' }}>{c.reason.slice(0, 20)}...</td>
                      <td><span className={statusStyle(c.status)} style={{ fontSize: '0.72rem' }}>{c.status}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            }
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
