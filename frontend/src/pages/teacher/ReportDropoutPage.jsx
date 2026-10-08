import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { studentService, dropoutService } from '../../services/api';

const REASONS = [
  'Financial difficulties',
  'Family circumstances',
  'Need to work',
  'Lack of awareness about education',
  'Migration',
  'Poor academic performance',
  'Health-related barriers',
  'Disability/accessibility barriers',
  'Geographical barriers',
  'Other'
];

export default function ReportDropoutPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({
    studentId: searchParams.get('studentId') || '',
    reason: '',
    remarks: '',
    riskLevel: 'High',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    studentService.getAll().then(({ data }) => setStudents(data));
  }, []);

  const validate = () => {
    const e = {};
    if (!form.studentId) e.studentId = 'Please select a student';
    if (!form.reason) e.reason = 'Please select a reason';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await dropoutService.create(form);
      setSuccess(true);
      setTimeout(() => navigate('/teacher/dropout-cases'), 2000);
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to submit report');
    } finally { setLoading(false); }
  };

  const selectedStudent = students.find(s => s._id === form.studentId);

  if (success) return (
    <DashboardLayout>
      <div className="dashboard-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div style={{ textAlign: 'center', padding: '3rem', background: 'white', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)', maxWidth: '400px' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
          <h2 style={{ color: 'var(--secondary)' }}>Case Reported Successfully</h2>
          <p style={{ color: 'var(--text-medium)', marginTop: '0.75rem' }}>The dropout case has been submitted and will be reviewed by the education department.</p>
          <div style={{ marginTop: '1.5rem', color: 'var(--text-light)', fontSize: '0.85rem' }}>Redirecting to cases list...</div>
        </div>
      </div>
    </DashboardLayout>
  );

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <div>
          <div className="page-title">Report Dropout Case</div>
          <div className="page-subtitle">Submit a dropout or at-risk report for a student</div>
        </div>
      </div>
      <div className="dashboard-content">
        <div style={{ maxWidth: '650px' }}>
          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 'var(--radius)', padding: '1rem 1.25rem', marginBottom: '1.5rem', fontSize: '0.88rem', color: '#c2410c' }}>
            ⚠️ <strong>Note:</strong> Only report cases for genuine dropout or at-risk situations. This information is confidential and will only be reviewed by authorized education officers.
          </div>

          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            {apiError && <div className="alert alert-error">{apiError}</div>}
            <form onSubmit={handleSubmit} id="report-dropout-form">
              <div className="form-group">
                <label className="form-label" htmlFor="report-student">Select Student *</label>
                <select id="report-student" className={`form-control ${errors.studentId ? 'error' : ''}`}
                  value={form.studentId} onChange={e => setForm({ ...form, studentId: e.target.value })}>
                  <option value="">-- Select a student --</option>
                  {students.map(s => <option key={s._id} value={s._id}>{s.name} — Class {s.class}, {s.school}</option>)}
                </select>
                {errors.studentId && <div className="form-error">{errors.studentId}</div>}
              </div>

              {/* Student preview */}
              {selectedStudent && (
                <div style={{ padding: '1rem', background: 'var(--purple-50)', borderRadius: '10px', border: '1px solid var(--purple-200)', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', fontSize: '0.85rem' }}>
                    <div><span style={{ color: 'var(--text-light)' }}>Name: </span><strong>{selectedStudent.name}</strong></div>
                    <div><span style={{ color: 'var(--text-light)' }}>Class: </span><strong>{selectedStudent.class}</strong></div>
                    <div><span style={{ color: 'var(--text-light)' }}>Age: </span><strong>{selectedStudent.age}</strong></div>
                    <div><span style={{ color: 'var(--text-light)' }}>Attendance: </span><strong style={{ color: selectedStudent.attendancePercentage < 50 ? '#dc2626' : '#15803d' }}>{selectedStudent.attendancePercentage}%</strong></div>
                    <div><span style={{ color: 'var(--text-light)' }}>Status: </span><strong>{selectedStudent.educationStatus}</strong></div>
                    <div><span style={{ color: 'var(--text-light)' }}>Current Risk: </span><strong>{selectedStudent.riskLevel}</strong></div>
                  </div>
                </div>
              )}

              <div className="form-group">
                <label className="form-label" htmlFor="report-reason">Reason for Dropout / At-Risk *</label>
                <select id="report-reason" className={`form-control ${errors.reason ? 'error' : ''}`}
                  value={form.reason} onChange={e => setForm({ ...form, reason: e.target.value })}>
                  <option value="">-- Select reason --</option>
                  {REASONS.map(r => <option key={r}>{r}</option>)}
                </select>
                {errors.reason && <div className="form-error">{errors.reason}</div>}
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="report-risk">Risk Level</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {['Low', 'Medium', 'High'].map(r => (
                    <label key={r} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', padding: '0.5rem 1rem', borderRadius: '8px', border: `2px solid ${form.riskLevel === r ? (r === 'High' ? '#dc2626' : r === 'Medium' ? '#f59e0b' : '#16a34a') : 'var(--border)'}`, background: form.riskLevel === r ? (r === 'High' ? '#fee2e2' : r === 'Medium' ? '#fef9c3' : '#dcfce7') : 'white', fontSize: '0.9rem', fontWeight: 600 }}>
                      <input type="radio" name="riskLevel" value={r} checked={form.riskLevel === r} onChange={() => setForm({ ...form, riskLevel: r })} style={{ display: 'none' }} />
                      {r === 'High' ? '🔴' : r === 'Medium' ? '🟡' : '🟢'} {r}
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="report-remarks">Additional Remarks</label>
                <textarea id="report-remarks" className="form-control" rows={4}
                  placeholder="Describe the situation, context, any observations that will help the education department understand and plan intervention..."
                  value={form.remarks} onChange={e => setForm({ ...form, remarks: e.target.value })} />
                <div className="form-hint">Provide as much context as possible to help plan effective intervention.</div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-ghost" onClick={() => navigate('/teacher/students')}>Cancel</button>
                <button type="submit" className="btn btn-danger" disabled={loading} id="submit-dropout-btn">
                  {loading ? 'Submitting...' : '⚠️ Submit Dropout Report'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
