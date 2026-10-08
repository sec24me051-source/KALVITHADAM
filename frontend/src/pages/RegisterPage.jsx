import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '', role: 'student', school: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email is required';
    if (form.password.length < 6) e.password = 'Password must be at least 6 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    setLoading(true);
    try {
      const user = await register({ name: form.name, email: form.email, password: form.password, role: form.role, school: form.school });
      if (user.role === 'teacher') navigate('/teacher/dashboard');
      else navigate('/student/dashboard');
    } catch (err) {
      setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally { setLoading(false); }
  };

  const f = (k) => ({ value: form[k], onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div className="auth-page">
      <div className="auth-card" style={{ maxWidth: '500px' }}>
        <div className="auth-logo">
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <div className="nav-logo-icon">DE</div>
            <div className="nav-logo-text">KALVITHADAM<span>Education Platform</span></div>
          </Link>
        </div>
        <h2 className="auth-title">Create Account</h2>
        <p className="auth-subtitle">Join the Digital Education Platform — it's free</p>
        <hr className="divider" style={{ margin: '1.25rem 0' }} />

        {apiError && <div className="alert alert-error">{apiError}</div>}

        <form onSubmit={handleSubmit} id="register-form">
          <div className="form-group">
            <label className="form-label" htmlFor="reg-name">Full Name</label>
            <input id="reg-name" type="text" className={`form-control ${errors.name ? 'error' : ''}`} placeholder="Your full name" {...f('name')} />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-email">Email Address</label>
            <input id="reg-email" type="email" className={`form-control ${errors.email ? 'error' : ''}`} placeholder="Your email" {...f('email')} />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-role">I am a</label>
            <select id="reg-role" className="form-control" {...f('role')}>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-school">School / Institution</label>
            <input id="reg-school" type="text" className="form-control" placeholder="Your school name" {...f('school')} />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-password">Password</label>
            <input id="reg-password" type="password" className={`form-control ${errors.password ? 'error' : ''}`} placeholder="Minimum 6 characters" {...f('password')} />
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="reg-confirm">Confirm Password</label>
            <input id="reg-confirm" type="password" className={`form-control ${errors.confirmPassword ? 'error' : ''}`} placeholder="Re-enter password" {...f('confirmPassword')} />
            {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} disabled={loading} id="register-submit-btn">
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-medium)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>Sign in</Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: '0.75rem' }}>
          <Link to="/" style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
