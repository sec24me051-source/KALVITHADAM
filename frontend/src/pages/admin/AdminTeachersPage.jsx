import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { adminService } from '../../services/api';

export default function AdminTeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const res = await adminService.getTeachers();
      setTeachers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load teachers');
    } finally {
      setLoading(false);
    }
  };

  const filteredTeachers = teachers.filter((t) =>
    t.name?.toLowerCase().includes(search.toLowerCase()) ||
    t.email?.toLowerCase().includes(search.toLowerCase()) ||
    t.school?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="dashboard-title">School Teachers Registry</h1>
            <p className="dashboard-subtitle">Monitor and verify teachers supporting students across partnered schools.</p>
          </div>
          <span className="badge badge-purple" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
            {filteredTeachers.length} Registered Teachers
          </span>
        </div>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-body" style={{ padding: '1rem' }}>
            <div className="search-box" style={{ maxWidth: '400px' }}>
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search by teacher name, email, or school..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
                id="search-teachers-input"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="spinner-container"><div className="spinner"></div></div>
        ) : (
          <div className="card">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Teacher Name</th>
                    <th>Email Address</th>
                    <th>Affiliated School</th>
                    <th>Contact Phone</th>
                    <th>Joined On</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>
                        No teachers found matching your search.
                      </td>
                    </tr>
                  ) : (
                    filteredTeachers.map((t) => (
                      <tr key={t._id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div
                              style={{
                                width: '36px',
                                height: '36px',
                                borderRadius: '50%',
                                background: '#e0e7ff',
                                color: '#4338ca',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 700,
                                fontSize: '0.9rem',
                              }}
                            >
                              {t.name?.charAt(0).toUpperCase()}
                            </div>
                            <span style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{t.name}</span>
                          </div>
                        </td>
                        <td>{t.email}</td>
                        <td style={{ fontWeight: 500 }}>{t.school || 'Government Higher Secondary School'}</td>
                        <td>{t.phone || 'N/A'}</td>
                        <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                        <td>
                          <span className="badge badge-success">Active Teacher</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
