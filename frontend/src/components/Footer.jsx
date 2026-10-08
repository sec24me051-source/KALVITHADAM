import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="nav-logo">
              <div className="nav-logo-icon">DE</div>
              <div className="nav-logo-text" style={{ color: 'white' }}>
                DECP
                <span>Digital Education Platform</span>
              </div>
            </div>
            <p style={{ marginTop: '1rem' }}>
              An inclusive digital education platform connecting students with learning, skills, support and opportunities — so no student is left behind.
            </p>
          </div>
          <div className="footer-col">
            <h4>Platform</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/learning">Learning</Link></li>
              <li><Link to="/opportunities">Opportunities</Link></li>
              <li><Link to="/digital-skills">Digital Skills</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="#">Accessibility</a></li>
              <li><a href="#">Low-Data Mode</a></li>
              <li><a href="#">Tamil Language</a></li>
              <li><a href="#">Help Center</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Institution</h4>
            <ul>
              <li><Link to="/login">Teacher Login</Link></li>
              <li><Link to="/login">Admin Login</Link></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Use</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Digital Education Continuity Platform. Designed for inclusive education.</p>
          <p style={{ color: '#9ca3af', fontSize: '0.82rem' }}>
            🇮🇳 Serving Tamil Nadu's students with dignity and opportunity.
          </p>
        </div>
      </div>
    </footer>
  );
}
