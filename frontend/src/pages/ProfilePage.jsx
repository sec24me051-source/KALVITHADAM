import { useAuth } from '../context/AuthContext';
import { useAccessibility } from '../context/AccessibilityContext';
import DashboardLayout from '../layouts/DashboardLayout';

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const { settings, toggle } = useAccessibility();

  return (
    <DashboardLayout>
      <div className="dashboard-content" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1 className="dashboard-title">User Profile & Settings</h1>
        <p className="dashboard-subtitle">Manage your account information and interface accessibility preferences.</p>

        {/* Profile Card */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-body" style={{ padding: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: '#fff',
                  fontSize: '2.5rem',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                }}
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 0.25rem 0', color: 'var(--text-dark)' }}>
                  {user?.name}
                </h2>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                  <span className="badge badge-purple" style={{ textTransform: 'capitalize' }}>
                    {user?.role} Account
                  </span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    • Active Platform Member
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
                  Email Address
                </div>
                <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{user?.email}</div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
                  User Role
                </div>
                <div style={{ fontWeight: 600, color: 'var(--text-dark)', textTransform: 'capitalize' }}>{user?.role}</div>
              </div>

              {user?.school && (
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
                    Assigned School
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{user.school}</div>
                </div>
              )}

              {user?.phone && (
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-light)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '0.25rem' }}>
                    Contact Number
                  </div>
                  <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{user.phone}</div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Accessibility Preferences Card */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <div className="card-header">
            <h3 className="card-title">Accessibility Customization</h3>
          </div>
          <div className="card-body">
            <p style={{ fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '1.5rem' }}>
              Adjust visual and reading settings according to your preference and accessibility needs:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <button
                type="button"
                onClick={() => toggle('highContrast')}
                className={`btn ${settings.highContrast ? 'btn-primary' : 'btn-outline'}`}
                style={{ justifyContent: 'space-between' }}
              >
                <span>🌓 High Contrast</span>
                <span>{settings.highContrast ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggle('largeFont')}
                className={`btn ${settings.largeFont ? 'btn-primary' : 'btn-outline'}`}
                style={{ justifyContent: 'space-between' }}
              >
                <span>🔍 Large Font Size</span>
                <span>{settings.largeFont ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggle('dyslexiaFont')}
                className={`btn ${settings.dyslexiaFont ? 'btn-primary' : 'btn-outline'}`}
                style={{ justifyContent: 'space-between' }}
              >
                <span>📖 Dyslexia-Friendly</span>
                <span>{settings.dyslexiaFont ? 'ON' : 'OFF'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggle('screenReaderGuide')}
                className={`btn ${settings.screenReaderGuide ? 'btn-primary' : 'btn-outline'}`}
                style={{ justifyContent: 'space-between' }}
              >
                <span>📢 Screen Reader Hints</span>
                <span>{settings.screenReaderGuide ? 'ON' : 'OFF'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Logout Section */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button onClick={logout} className="btn btn-danger" id="profile-logout-btn">
            🚪 Sign Out of Account
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
}
