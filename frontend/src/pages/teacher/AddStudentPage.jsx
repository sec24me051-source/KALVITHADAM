import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import { studentService } from '../../services/api';

export default function AddStudentPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', age: '', class: '', school: '', location: '', district: '', gender: 'Male',
    guardianName: '', guardianContact: '', attendancePercentage: 90, riskLevel: 'Low',
    educationStatus: 'Active', preferredLanguage: 'Tamil', hasDigitalAccess: false, notes: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Student name is required';
    if (!form.age || isNaN(form.age) || form.age < 5 || form.age > 25) e.age = 'Valid age (5-25) is required';
    if (!form.class.trim()) e.class = 'Class is required';
    if (!form.school.trim()) e.school = 'School name is required';
    if (!form.location.trim()) e.location = 'Location is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      await studentService.create({ ...form, age: Number(form.age), attendancePercentage: Number(form.attendancePercentage) });
      navigate('/teacher/students');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Failed to add student');
    } finally { setLoading(false); }
  };

  const f = (k) => ({ value: form[k], onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <DashboardLayout>
      <div className="dashboard-header">
        <div>
          <div className="page-title">Add New Student</div>
          <div className="page-subtitle">Add a student to your class management</div>
        </div>
      </div>
      <div className="dashboard-content">
        <div className="container-sm" style={{ margin: 0, maxWidth: '700px' }}>
          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)' }}>
            {apiError && <div className="alert alert-error">{apiError}</div>}
            <form onSubmit={handleSubmit} id="add-student-form">
              <h4 style={{ marginBottom: '1.25rem', color: 'var(--purple-700)' }}>📋 Basic Information</h4>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="st-name">Full Name *</label>
                  <input id="st-name" type="text" className={`form-control ${errors.name ? 'error' : ''}`} placeholder="Student's full name" {...f('name')} />
                  {errors.name && <div className="form-error">{errors.name}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="st-age">Age *</label>
                  <input id="st-age" type="number" className={`form-control ${errors.age ? 'error' : ''}`} placeholder="Age" min={5} max={25} {...f('age')} />
                  {errors.age && <div className="form-error">{errors.age}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="st-class">Class *</label>
                  <select id="st-class" className={`form-control ${errors.class ? 'error' : ''}`} {...f('class')}>
                    <option value="">Select Class</option>
                    {['1st','2nd','3rd','4th','5th','6th','7th','8th','9th','10th','11th','12th'].map(c => <option key={c}>{c}</option>)}
                  </select>
                  {errors.class && <div className="form-error">{errors.class}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="st-gender">Gender</label>
                  <select id="st-gender" className="form-control" {...f('gender')}>
                    <option>Male</option><option>Female</option><option>Other</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="st-school">School Name *</label>
                <input id="st-school" type="text" className={`form-control ${errors.school ? 'error' : ''}`} placeholder="Full school name" {...f('school')} />
                {errors.school && <div className="form-error">{errors.school}</div>}
              </div>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="st-location">Location *</label>
                  <input id="st-location" type="text" className={`form-control ${errors.location ? 'error' : ''}`} placeholder="Town/Village" {...f('location')} />
                  {errors.location && <div className="form-error">{errors.location}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="st-district">District</label>
                  <input id="st-district" type="text" className="form-control" placeholder="District" {...f('district')} />
                </div>
              </div>

              <hr className="divider" />
              <h4 style={{ marginBottom: '1.25rem', color: 'var(--purple-700)' }}>👨‍👩‍👦 Guardian Information</h4>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="st-guardian">Guardian Name</label>
                  <input id="st-guardian" type="text" className="form-control" placeholder="Parent/Guardian name" {...f('guardianName')} />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="st-contact">Contact Number</label>
                  <input id="st-contact" type="tel" className="form-control" placeholder="Mobile number" {...f('guardianContact')} />
                </div>
              </div>

              <hr className="divider" />
              <h4 style={{ marginBottom: '1.25rem', color: 'var(--purple-700)' }}>📊 Academic & Risk Assessment</h4>
              <div className="grid grid-2">
                <div className="form-group">
                  <label className="form-label" htmlFor="st-attendance">Attendance % *</label>
                  <input id="st-attendance" type="number" className="form-control" min={0} max={100} {...f('attendancePercentage')} />
                  <div className="form-hint">Current attendance percentage</div>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="st-risk">Risk Level</label>
                  <select id="st-risk" className="form-control" {...f('riskLevel')}>
                    <option>Low</option><option>Medium</option><option>High</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="st-lang">Preferred Language</label>
                  <select id="st-lang" className="form-control" {...f('preferredLanguage')}>
                    <option>Tamil</option><option>English</option><option>Tamil & English</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Digital Access</label>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', paddingTop: '0.4rem' }}>
                    {[{ val: true, label: 'Yes' }, { val: false, label: 'No' }].map(opt => (
                      <label key={opt.label} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.9rem' }}>
                        <input type="radio" name="digitalAccess" checked={form.hasDigitalAccess === opt.val} onChange={() => setForm({ ...form, hasDigitalAccess: opt.val })} />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="st-notes">Notes / Observations</label>
                <textarea id="st-notes" className="form-control" placeholder="Any additional observations about the student..." {...f('notes')} />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-ghost" onClick={() => navigate('/teacher/students')}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading} id="submit-student-btn">
                  {loading ? 'Adding Student...' : '+ Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
