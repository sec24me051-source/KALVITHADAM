import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { dropoutService } from '../../services/api';

const STATUSES = ['Reported', 'Under Review', 'Intervention Planned', 'Counselling Provided', 'Support Provided', 'Follow-Up Required', 'Education Continued', 'Case Closed'];

const statusStyle = (status) => {
  const map = { 'Reported': 'status-reported', 'Under Review': 'status-review', 'Intervention Planned': 'status-planned', 'Counselling Provided': 'status-counselling', 'Support Provided': 'status-support', 'Follow-Up Required': 'status-followup', 'Education Continued': 'status-continued', 'Case Closed': 'status-closed' };
  return `badge ${map[status] || 'badge-gray'}`;
};

export default function DropoutCasesPage({ isAdmin = false }) {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [updateForm, setUpdateForm] = useState({ status: '', intervention: '', counsellingInfo: '', adminNotes: '', followUpDate: '', isResolved: false });
  const [alert, setAlert] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => { loadCases(); }, []);

  const loadCases = async () => {
    try {
      const { data } = await dropoutService.getAll();
      setCases(data);
    } catch {}
    finally { setLoading(false); }
  };

  const openCase = (c) => {
    setSelected(c);
    setUpdateForm({ status: c.status, intervention: c.intervention || '', counsellingInfo: c.counsellingInfo || '', adminNotes: c.adminNotes || '', followUpDate: c.followUpDate ? c.followUpDate.slice(0, 10) : '', isResolved: c.isResolved || false });
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      const updated = await dropoutService.update(selected._id, updateForm);
      setCases(prev => prev.map(c => c._id === selected._id ? updated.data : c));
      setSelected(null);
      showAlert('Case updated successfully', 'success');
    } catch { showAlert('Update failed', 'error'); }
    finally { setUpdating(false); }
  };

  const showAlert = (msg, type) => { setAlert({ msg, type }); setTimeout(() => setAlert(null), 3000); };

  const filtered = cases.filter(c => !search || (c.studentId?.name || '').toLowerCase().includes(search.toLowerCase()) || c.reason.toLowerCase().includes(search.toLowerCase()));

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <div>
          <div className="page-title">{isAdmin ? 'All Dropout Cases' : 'Dropout Cases'}</div>
          <div className="page-subtitle">{cases.length} total cases</div>
        </div>
      </div>
      <div className="dashboard-content">
        {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}

        <div className="table-container">
          <div className="table-header">
            <div className="search-bar" style={{ minWidth: '240px' }}>
              <span className="search-icon">🔍</span>
              <input placeholder="Search by student name..." value={search} onChange={e => setSearch(e.target.value)} id="cases-search" />
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{filtered.length} cases</div>
          </div>

          {loading ? <div className="loading"><div className="spinner"></div></div> :
            filtered.length === 0 ? <div className="empty-state"><div className="icon">⚠️</div><h3>No cases found</h3></div> :
            <div style={{ overflowX: 'auto' }}>
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Class / School</th>
                    <th>Reason</th>
                    <th>Risk</th>
                    <th>Status</th>
                    {isAdmin && <th>Teacher</th>}
                    <th>Reported</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(c => (
                    <tr key={c._id}>
                      <td><strong>{c.studentId?.name || 'N/A'}</strong></td>
                      <td style={{ fontSize: '0.82rem' }}>
                        <div>{c.studentId?.class}</div>
                        <div style={{ color: 'var(--text-light)' }}>{c.studentId?.school?.slice(0, 25)}...</div>
                      </td>
                      <td style={{ fontSize: '0.85rem', maxWidth: '160px' }}>{c.reason}</td>
                      <td><span className={`badge ${c.riskLevel === 'High' ? 'risk-high' : c.riskLevel === 'Medium' ? 'risk-medium' : 'risk-low'}`}>{c.riskLevel}</span></td>
                      <td><span className={statusStyle(c.status)}>{c.status}</span></td>
                      {isAdmin && <td style={{ fontSize: '0.82rem' }}>{c.teacherId?.name}</td>}
                      <td style={{ fontSize: '0.82rem', color: 'var(--text-light)' }}>{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
                      <td>
                        <button className="btn btn-sm btn-outline" onClick={() => openCase(c)} id={`view-case-${c._id}`}>View / Update</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
      </div>

      {/* Case Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" style={{ maxWidth: '650px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Case: {selected.studentId?.name}</h2>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              {/* Student Info */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', padding: '1rem', background: 'var(--purple-50)', borderRadius: '10px', marginBottom: '1.25rem', fontSize: '0.85rem' }}>
                <div><span style={{ color: 'var(--text-light)' }}>Student:</span><br /><strong>{selected.studentId?.name}</strong></div>
                <div><span style={{ color: 'var(--text-light)' }}>Class:</span><br /><strong>{selected.studentId?.class}</strong></div>
                <div><span style={{ color: 'var(--text-light)' }}>Age:</span><br /><strong>{selected.studentId?.age}</strong></div>
                <div><span style={{ color: 'var(--text-light)' }}>Reason:</span><br /><strong>{selected.reason}</strong></div>
                <div><span style={{ color: 'var(--text-light)' }}>Risk:</span><br /><span className={`badge ${selected.riskLevel === 'High' ? 'risk-high' : selected.riskLevel === 'Medium' ? 'risk-medium' : 'risk-low'}`}>{selected.riskLevel}</span></div>
                <div><span style={{ color: 'var(--text-light)' }}>Reported by:</span><br /><strong>{selected.teacherId?.name}</strong></div>
              </div>
              {selected.remarks && (
                <div style={{ padding: '0.75rem 1rem', background: 'var(--bg-soft)', borderRadius: '8px', marginBottom: '1.25rem', fontSize: '0.88rem', color: 'var(--text-medium)' }}>
                  <strong>Teacher's Remarks:</strong> {selected.remarks}
                </div>
              )}

              {/* Update Form */}
              <div className="form-group">
                <label className="form-label">Update Status</label>
                <select className="form-control" value={updateForm.status} onChange={e => setUpdateForm({ ...updateForm, status: e.target.value })} id="case-status-select">
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Intervention Details</label>
                <textarea className="form-control" rows={3} placeholder="What intervention was planned or taken?" value={updateForm.intervention} onChange={e => setUpdateForm({ ...updateForm, intervention: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Counselling / Support Information</label>
                <textarea className="form-control" rows={2} placeholder="Counselling or support provided..." value={updateForm.counsellingInfo} onChange={e => setUpdateForm({ ...updateForm, counsellingInfo: e.target.value })} />
              </div>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label">Follow-Up Date</label>
                  <input type="date" className="form-control" value={updateForm.followUpDate} onChange={e => setUpdateForm({ ...updateForm, followUpDate: e.target.value })} />
                </div>
                <div className="form-group">
                  <label className="form-label">Case Resolved?</label>
                  <div style={{ display: 'flex', gap: '1rem', paddingTop: '0.4rem' }}>
                    {[{ val: false, label: 'No' }, { val: true, label: 'Yes' }].map(opt => (
                      <label key={opt.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }}>
                        <input type="radio" name="resolved" checked={updateForm.isResolved === opt.val} onChange={() => setUpdateForm({ ...updateForm, isResolved: opt.val })} />
                        {opt.val ? '✅' : '❌'} {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Admin Notes</label>
                <textarea className="form-control" rows={2} placeholder="Internal notes..." value={updateForm.adminNotes} onChange={e => setUpdateForm({ ...updateForm, adminNotes: e.target.value })} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Close</button>
              <button className="btn btn-primary" onClick={handleUpdate} disabled={updating} id="update-case-btn">
                {updating ? 'Updating...' : '✓ Update Case'}
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
