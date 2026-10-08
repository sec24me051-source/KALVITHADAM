import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { studentService } from '../../services/api';

const RISK_LEVELS = ['Low', 'Medium', 'High'];
const EDU_STATUSES = ['Active', 'At-Risk', 'Dropout', 'Resumed'];

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [riskFilter, setRiskFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [editStudent, setEditStudent] = useState(null);
  const [alert, setAlert] = useState(null);

  useEffect(() => { loadStudents(); }, []);

  const loadStudents = async () => {
    try {
      const { data } = await studentService.getAll();
      setStudents(data);
    } catch {}
    finally { setLoading(false); }
  };

  const filtered = students.filter(s => {
    const matchSearch = !search || s.name.toLowerCase().includes(search.toLowerCase()) || s.school.toLowerCase().includes(search.toLowerCase());
    const matchRisk = riskFilter === 'All' || s.riskLevel === riskFilter;
    const matchStatus = statusFilter === 'All' || s.educationStatus === statusFilter;
    return matchSearch && matchRisk && matchStatus;
  });

  const handleUpdateRisk = async (id, riskLevel) => {
    try {
      await studentService.update(id, { riskLevel });
      setStudents(prev => prev.map(s => s._id === id ? { ...s, riskLevel } : s));
      showAlert('Risk level updated successfully', 'success');
    } catch { showAlert('Update failed', 'error'); }
  };

  const showAlert = (msg, type) => { setAlert({ msg, type }); setTimeout(() => setAlert(null), 3000); };

  const riskStyle = (r) => ({ 'Low': 'risk-low', 'Medium': 'risk-medium', 'High': 'risk-high' }[r] || 'badge-gray');
  const statusStyle = (s) => ({ 'Active': 'badge-green', 'At-Risk': 'badge-orange', 'Dropout': 'badge-red', 'Resumed': 'badge-blue' }[s] || 'badge-gray');

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <div>
          <div className="page-title">Student Management</div>
          <div className="page-subtitle">{students.length} students in your school</div>
        </div>
        <Link to="/teacher/add-student" className="btn btn-primary" id="add-student-btn">+ Add Student</Link>
      </div>
      <div className="dashboard-content">
        {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}

        <div className="table-container">
          <div className="table-header">
            <div className="search-bar" style={{ minWidth: '240px' }}>
              <span className="search-icon">🔍</span>
              <input placeholder="Search students..." value={search} onChange={e => setSearch(e.target.value)} id="student-search" />
            </div>
            <div className="filters">
              <select className="filter-select" value={riskFilter} onChange={e => setRiskFilter(e.target.value)} id="risk-filter">
                <option value="All">All Risk Levels</option>
                {RISK_LEVELS.map(r => <option key={r}>{r}</option>)}
              </select>
              <select className="filter-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} id="status-filter">
                <option value="All">All Statuses</option>
                {EDU_STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
              <div className="table-title" style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{filtered.length} students</div>
            </div>
          </div>

          {loading ? <div className="loading"><div className="spinner"></div></div> :
            filtered.length === 0 ? <div className="empty-state"><div className="icon">👥</div><h3>No students found</h3></div> :
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Class</th>
                    <th>School</th>
                    <th>Age</th>
                    <th>Location</th>
                    <th>Attendance</th>
                    <th>Risk Level</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(s => (
                    <tr key={s._id}>
                      <td>
                        <div style={{ fontWeight: 600 }}>{s.name}</div>
                        <div style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>{s.gender}</div>
                      </td>
                      <td>{s.class}</td>
                      <td style={{ maxWidth: '180px', fontSize: '0.85rem' }}>{s.school}</td>
                      <td>{s.age}</td>
                      <td>{s.location}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: 50, height: 6, borderRadius: 3, background: 'var(--gray-200)' }}>
                            <div style={{ width: `${s.attendancePercentage}%`, height: '100%', borderRadius: 3, background: s.attendancePercentage >= 75 ? 'var(--secondary)' : s.attendancePercentage >= 50 ? '#f59e0b' : '#dc2626' }}></div>
                          </div>
                          <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{s.attendancePercentage}%</span>
                        </div>
                      </td>
                      <td>
                        <select value={s.riskLevel} onChange={e => handleUpdateRisk(s._id, e.target.value)}
                          className={`badge ${riskStyle(s.riskLevel)}`}
                          style={{ border: 'none', cursor: 'pointer', background: 'transparent', fontWeight: 600 }}
                          id={`risk-select-${s._id}`}>
                          {RISK_LEVELS.map(r => <option key={r}>{r}</option>)}
                        </select>
                      </td>
                      <td><span className={`badge ${statusStyle(s.educationStatus)}`}>{s.educationStatus}</span></td>
                      <td>
                        <div className="table-actions">
                          <Link to={`/teacher/report-dropout?studentId=${s._id}`} className="btn btn-sm btn-outline" style={{ fontSize: '0.78rem' }} id={`report-btn-${s._id}`}>⚠️ Report</Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>
    </DashboardLayout>
  );
}
