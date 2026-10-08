import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.email || !form.password) return setError('Please fill all fields');
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      if (user.role === 'admin') navigate('/admin/dashboard');
      else if (user.role === 'teacher') navigate('/teacher/dashboard');
      else navigate('/student/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { role: 'Admin', email: 'admin@decp.edu', pass: 'admin123', color: 'var(--purple-600)' },
    { role: 'Teacher', email: 'meena@decp.edu', pass: 'teacher123', color: 'var(--secondary)' },
    { role: 'Student', email: 'priya@decp.edu', pass: 'student123', color: '#2563eb' },
  ];

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
            <div className="nav-logo-icon">DE</div>
            <div className="nav-logo-text">KALVITHADAM<span>Education Platform</span></div>
          </Link>
        </div>
        <h2 className="auth-title">Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your account to continue</p>
        <hr className="divider" style={{ margin: '1.25rem 0' }} />

        {/* Demo accounts */}
        <div style={{ marginBottom: '1.25rem' }}>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-light)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>Demo Accounts</p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {demoAccounts.map(acc => (
              <button key={acc.role} onClick={() => setForm({ email: acc.email, password: acc.pass })}
                style={{ flex: 1, padding: '0.4rem', borderRadius: '6px', border: `1px solid ${acc.color}`, color: acc.color, background: 'transparent', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
                id={`demo-${acc.role.toLowerCase()}-btn`}>
                {acc.role}
              </button>
            ))}
          </div>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} id="login-form">
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email Address</label>
            <input id="email" type="email" className="form-control" placeholder="Enter your email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <input id="password" type="password" className="form-control" placeholder="Enter your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem' }} disabled={loading} id="login-submit-btn">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-medium)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', fontWeight: 600 }}>Register here</Link>
        </p>
        <p style={{ textAlign: 'center', marginTop: '0.75rem' }}>
          <Link to="/" style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>← Back to Home</Link>
        </p>
      </div>
    </div>
  );
}
