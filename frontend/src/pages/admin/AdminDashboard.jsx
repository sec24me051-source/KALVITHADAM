import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { adminService, dropoutService, studentService } from '../../services/api';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [recentCases, setRecentCases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [adminRes, casesRes] = await Promise.all([
        adminService.getStats(),
        dropoutService.getAll(),
      ]);
      setStats(adminRes.data);
      setRecentCases(casesRes.data.slice(0, 5));
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="dashboard-title">System Administration</h1>
            <p className="dashboard-subtitle">Platform-wide analytics, intervention monitoring, and educational resource management.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link to="/admin/opportunities" className="btn btn-secondary btn-sm">
              Manage Opportunities
            </Link>
            <Link to="/admin/courses" className="btn btn-primary btn-sm">
              Manage Courses
            </Link>
          </div>
        </div>

        {error && <div className="alert alert-danger" style={{ marginBottom: '1.5rem' }}>{error}</div>}

        {loading ? (
          <div className="spinner-container"><div className="spinner"></div></div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="stats-grid" style={{ marginBottom: '2rem' }}>
              <div className="stat-card">
                <div className="stat-card-header">
                  <div>
                    <div className="stat-value">{stats?.totalStudents ?? 0}</div>
                    <div className="stat-label">Total Enrolled Students</div>
                  </div>
                  <div className="stat-icon-wrap" style={{ background: '#ede9fe', color: '#6366f1' }}>
                    👥
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <div>
                    <div className="stat-value">{stats?.totalTeachers ?? 0}</div>
                    <div className="stat-label">Active Field Teachers</div>
                  </div>
                  <div className="stat-icon-wrap" style={{ background: '#e0e7ff', color: '#4f46e5' }}>
                    👨‍🏫
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <div>
                    <div className="stat-value" style={{ color: '#f59e0b' }}>{stats?.atRisk ?? 0}</div>
                    <div className="stat-label">Students At-Risk</div>
                  </div>
                  <div className="stat-icon-wrap" style={{ background: '#fef3c7', color: '#d97706' }}>
                    ⚠️
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <div>
                    <div className="stat-value" style={{ color: '#ef4444' }}>{stats?.activeCases ?? 0}</div>
                    <div className="stat-label">Active Dropout Cases</div>
                  </div>
                  <div className="stat-icon-wrap" style={{ background: '#fee2e2', color: '#dc2626' }}>
                    🚨
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <div>
                    <div className="stat-value" style={{ color: '#10b981' }}>{stats?.resolvedCases ?? 0}</div>
                    <div className="stat-label">Resolved / Re-enrolled</div>
                  </div>
                  <div className="stat-icon-wrap" style={{ background: '#d1fae5', color: '#059669' }}>
                    ✅
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-card-header">
                  <div>
                    <div className="stat-value">{stats?.totalCases ?? 0}</div>
                    <div className="stat-label">Total Incident Reports</div>
                  </div>
                  <div className="stat-icon-wrap" style={{ background: '#f1f5f9', color: '#475569' }}>
                    📋
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Navigation Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
              <Link to="/admin/teachers" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="feature-card-icon" style={{ background: '#e0e7ff', color: '#4338ca' }}>👨‍🏫</div>
                <h3 className="feature-card-title">Manage Teachers</h3>
                <p className="feature-card-desc">Review registered teachers, assignments, and support activity.</p>
              </Link>
              <Link to="/admin/students" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="feature-card-icon" style={{ background: '#ecfdf5', color: '#047857' }}>👥</div>
                <h3 className="feature-card-title">All Students Registry</h3>
                <p className="feature-card-desc">Monitor student retention, attendance status, and risk flags.</p>
              </Link>
              <Link to="/admin/dropout-cases" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="feature-card-icon" style={{ background: '#fffbeb', color: '#b45309' }}>⚠️</div>
                <h3 className="feature-card-title">Dropout Interventions</h3>
                <p className="feature-card-desc">Coordinate counseling, financial aid, and re-entry workflows.</p>
              </Link>
              <Link to="/admin/opportunities" className="feature-card" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="feature-card-icon" style={{ background: '#fdf2f8', color: '#be185d' }}>🎯</div>
                <h3 className="feature-card-title">Opportunity Directory</h3>
                <p className="feature-card-desc">Publish schemes, state scholarships, and higher education aid.</p>
              </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              {/* Dropout Reasons Aggregation */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Dropout Reasons Analysis</h3>
                  <span className="badge badge-purple">Aggregated Data</span>
                </div>
                <div className="card-body">
                  {stats?.byReason && stats.byReason.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {stats.byReason.map((item, idx) => {
                        const total = stats.totalCases || 1;
                        const pct = Math.round((item.count / total) * 100);
                        return (
                          <div key={idx}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                              <span style={{ fontWeight: 500, color: 'var(--text-dark)' }}>{item._id || 'Unspecified'}</span>
                              <span style={{ color: 'var(--text-light)', fontWeight: 600 }}>{item.count} cases ({pct}%)</span>
                            </div>
                            <div className="attendance-track" style={{ height: '8px' }}>
                              <div
                                className="attendance-fill"
                                style={{
                                  width: `${pct}%`,
                                  background: idx === 0 ? 'var(--primary)' : idx === 1 ? 'var(--warning)' : 'var(--info)',
                                }}
                              ></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p style={{ color: 'var(--text-light)', textAlign: 'center', padding: '1.5rem' }}>No case reason statistics recorded yet.</p>
                  )}
                </div>
              </div>

              {/* Recent Dropout Intervention Cases */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">Recent Intervention Cases</h3>
                  <Link to="/admin/dropout-cases" className="btn btn-ghost btn-sm">View All →</Link>
                </div>
                <div className="card-body" style={{ padding: 0 }}>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Student</th>
                          <th>Reason</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentCases.length === 0 ? (
                          <tr>
                            <td colSpan="4" style={{ textAlign: 'center', color: 'var(--text-light)', padding: '2rem' }}>
                              No dropout cases reported.
                            </td>
                          </tr>
                        ) : (
                          recentCases.map((c) => (
                            <tr key={c._id}>
                              <td style={{ fontWeight: 600 }}>{c.student?.name || 'Unknown Student'}</td>
                              <td style={{ fontSize: '0.85rem' }}>{c.reason}</td>
                              <td>
                                <span className={`badge ${c.isResolved ? 'badge-success' : 'badge-warning'}`}>
                                  {c.status}
                                </span>
                              </td>
                              <td>
                                <Link to="/admin/dropout-cases" className="btn btn-ghost btn-sm">
                                  Review
                                </Link>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}
