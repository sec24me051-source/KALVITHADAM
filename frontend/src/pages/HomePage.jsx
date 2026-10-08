import { Link } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import puzzle from '../assets/puzzle.png';

const features = [
  {
    icon: '🏫',
    colorClass: 'purple',
    title: 'School Dropout Prevention',
    desc: 'Identify students at risk of dropping out, securely report cases through teachers, and enable authorized education departments to provide appropriate support and intervention.',
    link: '/login',
    linkLabel: 'Learn More',
  },
  {
    icon: '📚',
    colorClass: 'green',
    title: 'Education & Skill Support',
    desc: 'Access digital learning materials, recorded lessons, practice resources, communication skills, digital skills, career awareness and essential life skills.',
    link: '/learning',
    linkLabel: 'Explore Learning',
  },
  {
    icon: '🎯',
    colorClass: 'blue',
    title: 'Opportunity Access',
    desc: 'Discover relevant government scholarships, educational schemes and NGO-supported opportunities with eligibility, benefits, documents and application guidance.',
    link: '/opportunities',
    linkLabel: 'Find Opportunities',
  },
];

const howStepsStudent = [
  { num: '1', label: 'Register', desc: 'Create your free account', color: 'purple' },
  { num: '2', label: 'Access Learning', desc: 'Explore courses & materials', color: 'purple' },
  { num: '3', label: 'Develop Skills', desc: 'Build life & career skills', color: 'green' },
  { num: '4', label: 'Find Opportunities', desc: 'Discover scholarships', color: 'green' },
  { num: '5', label: 'Apply', desc: 'Apply with guided steps', color: 'green' },
  { num: '6', label: 'Continue Education', desc: 'Never stop learning', color: 'purple' },
];

export default function HomePage() {
  return (
    <PublicLayout>
      {/* Hero */}
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div>
              <div className="hero-badge">🇮🇳 Inclusive Digital Education Platform</div>
              <h1 className="hero-title">
                Dropout Prevention<br />
                <span>Skill Building</span> &{' '}
                <span className="green">Opportunity</span><br />
                Access
              </h1>
              <p className="hero-desc">
                Connecting students with education, skills, support and opportunities — so that <strong>no student is left behind</strong>.
              </p>
              <div className="hero-actions">
                <Link to="/opportunities" className="btn btn-primary btn-lg" id="hero-explore-btn">
                  🎯 Explore Opportunities
                </Link>
                <Link to="/about" className="btn btn-outline btn-lg" id="hero-learn-btn">
                  Learn More
                </Link>
              </div>
              <div className="hero-stats">
                <div className="hero-stat">
                  <div className="hero-stat-label">Dropout Prevention</div>
                </div>

                <div className="hero-stat">
                  <div className="hero-stat-label">Education Continuity</div>
                </div>

                <div className="hero-stat">
                  <div className="hero-stat-label">Opportunity Access</div>
                </div>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-card">
                <div className="hero-card-icon purple">🏫</div>
                <div className="hero-card-text">
                  <h4>Dropout Prevention</h4>
                  <p>Teacher-reported early intervention system</p>
                </div>
              </div>
              <div className="hero-card">
                <div className="hero-card-icon green">📚</div>
                <div className="hero-card-text">
                  <h4>Skill Development</h4>
                  <p>Life skills, digital skills , career courses , Communication skills,Study Materials</p>
                </div>
              </div>
              <div className="hero-card">
                <div className="hero-card-icon blue">🎓</div>
                <div className="hero-card-text">
                  <h4>Scholarship Access</h4>
                  <p>Government schemes & NGO opportunities</p>
                </div>
              </div>
              <div className="hero-card">
                <div className="hero-card-icon purple">🌐</div>
                <div className="hero-card-text">
                  <h4>Accessible & Inclusive</h4>
                  <p>Low-data mode, Reduced Data Usage, Compressed Images, Downloable Study Materials</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <div className="puzzle-background">
        <img
          src={puzzle}
          alt="Education, Upskilling and Opportunity"
          className="puzzle-image"
        />
      </div>

      {/* Thirukkural */}
      <section className="thirukkural-section">
        <div className="container">
          <div className="thirukkural-card">
            <div className="thirukkural-tag">திருக்குறள் · Thirukkural</div>
            <div className="thirukkural-text">
              "கற்க கசடறக் கற்பவை கற்றபின்<br />
              நிற்க அதற்குத் தக."
            </div>
            <div className="thirukkural-meaning">
              "Learn thoroughly what should be learned, and after learning,<br />
              live according to what you have learned."
            </div>
            <div className="thirukkural-motto">
              <span>Learn</span>
              <div className="dot"></div>
              <span>Grow</span>
              <div className="dot"></div>
              <span>Apply</span>
            </div>
          </div>
        </div>
      </section>

      {/* Project Introduction */}
      <section className="section" style={{ background: 'white', paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div className="container text-center">
          <div className="section-tag">Our Mission</div>
          <h2 className="section-title">Every Student Deserves an Opportunity to<br /><span style={{ color: 'var(--primary)' }}>Learn, Grow and Succeed.</span></h2>
          <p className="section-subtitle" style={{ margin: '0 auto 1.5rem' }}>
            KALVITHADAM is an inclusive digital education platform that helps students overcome barriers to continuous education, access relevant opportunities, and develop academic, digital, career and life skills. We serve all students — with special focus on those facing financial, health, geographical or social challenges.
          </p>
          <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', margin: '2rem 0' }}>
            {[
              { icon: '🎓', label: 'Inclusive for All Students' },
              { icon: '💜', label: 'Supporting Underserved Communities' },
              { icon: '🌐', label: 'Tamil & English Language' },
              { icon: '📶', label: 'Low-Data Friendly' },
            ].map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--purple-50)', padding: '0.6rem 1.2rem', borderRadius: '20px', fontSize: '0.88rem', fontWeight: 600, color: 'var(--purple-700)' }}>
                <span>{item.icon}</span>{item.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">Core Features</div>
            <h2 className="section-title">Three Pillars of Educational Support</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>A comprehensive system designed to keep every student on their educational journey.</p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <div key={i} className={`feature-card ${f.colorClass === 'purple' ? 'purple-card' : f.colorClass === 'green' ? 'green-card' : 'blue-card'}`}>
                <div className={`feature-icon ${f.colorClass}`}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <Link to={f.link} className={`btn btn-sm ${f.colorClass === 'green' ? 'btn-secondary' : f.colorClass === 'blue' ? 'btn-outline' : 'btn-primary'}`} id={`feature-btn-${i}`}>
                  {f.linkLabel} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <div className="container">
          <div className="text-center">
            <div className="section-tag">How It Works</div>
            <h2 className="section-title">Simple Steps to Empower Your Future</h2>
          </div>
          <div className="how-steps" style={{ marginTop: '3rem' }}>
            {howStepsStudent.map((s, i) => (
              <div key={i} className="how-step">
                <div className={`how-step-num ${s.color}`}>{s.num}</div>
                <h4>{s.label}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Dropout Prevention Flow */}
          <div style={{ marginTop: '3rem', background: 'white', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--border)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--purple-700)' }}>🚨 Dropout Prevention Flow</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {['Teacher Identifies Risk', 'Reports Case', 'Admin Reviews', 'Intervention Planned', 'Counselling & Support', 'Follow-Up', 'Education Continues ✓'].map((step, i) => (
                <>
                  <div key={i} style={{ background: 'var(--purple-50)', border: '1px solid var(--purple-200)', borderRadius: '8px', padding: '0.5rem 1rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--purple-800)', textAlign: 'center' }}>{step}</div>
                  {i < 6 && <span style={{ color: 'var(--purple-300)', fontWeight: 700, fontSize: '1.2rem' }}>→</span>}
                </>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <h2 className="section-title">Beneficiary Students</h2>

        <div className="container">
          <div className="stats-grid">
            {[
              { label: '🏘️ Slum Community Students' },
              { label: '🌾 Rural Students' },
              { label: '⛰️ Hill & Remote Area Students' },
              { label: '♿ Students with Disabilities' },
              { label: '💰 Low-Income Students' },
              { label: '🏫 School Dropout / At-Risk Students' }
            ].map((s, i) => (
              <div key={i} className="stat-item">
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accessibility Section */}
      <section className="section" style={{ background: 'var(--green-50)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <div className="section-tag section-tag-green">Accessibility</div>
              <h2 className="section-title">Designed for <span style={{ color: 'var(--secondary)' }}>Every Student</span></h2>
              <p style={{ color: 'var(--text-medium)', marginBottom: '1.5rem', lineHeight: 1.7 }}>
                We believe accessibility is not an add-on — it's a foundation. Our platform includes built-in features to serve students across different abilities, languages and internet connectivity levels.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  { icon: '🔤', label: 'Large text mode for easier reading' },
                  { icon: '🌗', label: 'High contrast for visual accessibility' },
                  { icon: '📶', label: 'Low-data mode for limited connectivity' },
                  { icon: '🗣️', label: 'Tamil & English language support' },
                  { icon: '🌿', label: 'Reduce animation option' },
                  { icon: '⌨️', label: 'Keyboard-friendly navigation' },
                ].map(a => (
                  <div key={a.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.92rem' }}>
                    <span style={{ fontSize: '1.1rem' }}>{a.icon}</span>
                    <span style={{ color: 'var(--text-dark)' }}>{a.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '2rem', boxShadow: 'var(--shadow-md)', border: '1px solid var(--green-200)' }}>
                <h4 style={{ marginBottom: '1.25rem', color: 'var(--text-dark)', fontSize: '1rem' }}>♿ Accessibility Panel</h4>
                {[
                  { icon: '🔤', label: 'Large Text', active: false },
                  { icon: '🌗', label: 'High Contrast', active: false },
                  { icon: '📶', label: 'Low Data Mode', active: true },
                  { icon: '🌿', label: 'Reduce Motion', active: false },
                ].map(opt => (
                  <div key={opt.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.65rem 0', borderBottom: '1px solid var(--border)', fontSize: '0.9rem' }}>
                    <span>{opt.icon} {opt.label}</span>
                    <div style={{ width: 38, height: 22, borderRadius: 11, background: opt.active ? 'var(--secondary)' : 'var(--gray-200)', position: 'relative', transition: '0.2s' }}>
                      <div style={{ position: 'absolute', top: 3, left: opt.active ? 19 : 3, width: 16, height: 16, borderRadius: '50%', background: 'white', transition: '0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
                    </div>
                  </div>
                ))}
                <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--green-50)', borderRadius: '8px', fontSize: '0.82rem', color: 'var(--green-700)', fontWeight: 600 }}>
                  📶 Low Data Mode Active — Images reduced, faster loading
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Preview */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <div className="section-tag">Learning & Skills</div>
            <h2 className="section-title">Courses for Every Student</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>From academic revision to life skills — completely free, in Tamil and English.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
            {[
              { icon: '🗣️', cat: 'Skill Development', title: 'Communication Skills', level: 'Beginner', lessons: 8, bg: '#f5f3ff' },
              { icon: '💻', cat: 'Digital Literacy', title: 'Digital Skills', level: 'Beginner', lessons: 10, bg: '#ede9fe' },
              { icon: '⏰', cat: 'Life Skills', title: 'Time Management', level: 'Beginner', lessons: 6, bg: '#dcfce7' },
              { icon: '🎓', cat: 'Career Skills', title: 'Resume & Interview Prep', level: 'Intermediate', lessons: 7, bg: '#dbeafe' },
            ].map((c, i) => (
              <div key={i} className="card card-hover">
                <div className="course-card-top" style={{ background: c.bg }}>{c.icon}</div>
                <div className="course-card-body">
                  <div className="course-card-category">{c.cat}</div>
                  <div className="course-card-title">{c.title}</div>
                  <div className="course-meta">
                    <span>📘 {c.lessons} Lessons</span>
                    <span className={`badge ${c.level === 'Beginner' ? 'badge-green' : 'badge-orange'}`}>{c.level}</span>
                  </div>
                  <Link to="/learning" className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }}>Start Learning</Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/learning" className="btn btn-outline btn-lg" id="view-all-courses-btn">View All Courses →</Link>
          </div>
        </div>
      </section>

      {/* Opportunity Preview */}
      <section className="section" style={{ background: 'var(--purple-50)' }}>
        <div className="container">
          <div className="text-center" style={{ marginBottom: '3rem' }}>
            <div className="section-tag">Opportunities</div>
            <h2 className="section-title">Government Schemes & Support Programs</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>Find scholarships, schemes and support programs you may be eligible for.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.25rem' }}>
            {[
              { badge: 'Government Scheme', title: "Chief Minister's Special Scholarship", provider: 'Government of Tamil Nadu', eligibility: 'Classes 6-12, Family income below ₹2 lakh', benefit: '₹1000–₹2000 per year', color: 'badge-purple' },
              { badge: 'Scholarship', title: 'Pre-Matric Scholarship for SC/ST', provider: 'Ministry of Social Justice, GOI', eligibility: 'Classes 9-10, SC/ST students', benefit: '₹150–₹350 per month', color: 'badge-blue' },
              { badge: 'NGO Support', title: 'Nanhi Kali – Girl Child Education', provider: 'K.C. Mahindra Education Trust', eligibility: 'Girl students, Classes 5-10', benefit: 'School kit, materials & mentoring', color: 'badge-green' },
            ].map((o, i) => (
              <div key={i} className="opp-card">
                <div className="opp-card-header">
                  <div>
                    <span className={`badge ${o.color}`} style={{ marginBottom: '0.5rem', display: 'inline-block' }}>{o.badge}</span>
                    <div className="opp-card-title">{o.title}</div>
                  </div>
                </div>
                <div className="opp-card-provider">📌 {o.provider}</div>
                <div className="opp-detail"><div className="opp-detail-label">Eligibility</div><div className="opp-detail-val">{o.eligibility}</div></div>
                <div className="opp-detail"><div className="opp-detail-label">Benefit</div><div className="opp-detail-val" style={{ color: 'var(--secondary)', fontWeight: 600 }}>{o.benefit}</div></div>
                <Link to="/opportunities" className="btn btn-outline btn-sm" style={{ marginTop: '0.75rem' }}>View Details →</Link>
              </div>
            ))}
          </div>
          <div className="text-center" style={{ marginTop: '2rem' }}>
            <Link to="/opportunities" className="btn btn-primary btn-lg" id="explore-opp-btn">Explore All Opportunities →</Link>
          </div>
        </div>
      </section>

      {/* Mission / Impact */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container text-center">
          <div className="section-tag">Our Impact</div>
          <h2 className="section-title">Building <span style={{ color: 'var(--primary)' }}>Digital Inclusion</span> Through Education</h2>
          <p className="section-subtitle" style={{ margin: '0 auto 3rem' }}>
            We believe that geography, financial difficulty, disability or social circumstances should never determine a student's educational destiny.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
            {[
              { icon: '🌐', title: 'Digital Inclusion', desc: 'Bridging the digital divide through guided learning and low-data platform design.' },
              { icon: '🤝', title: 'Community Support', desc: 'Connecting students to government, NGO and community support systems easily.' },
              { icon: '📋', title: 'Transparent Governance', desc: 'Authorized tracking of dropout cases with proper intervention and follow-up systems.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '2rem', background: 'var(--purple-50)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--purple-100)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{item.icon}</div>
                <h3 style={{ marginBottom: '0.75rem', fontSize: '1.1rem' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-medium)', fontSize: '0.92rem', lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '4rem 0', background: 'linear-gradient(135deg, var(--purple-700), var(--purple-600))' }}>
        <div className="container text-center">
          <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1rem' }}>Start Your Learning Journey Today</h2>
          <p style={{ color: 'rgba(255,255,255,0.85)', marginBottom: '2rem', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto 2rem' }}>
            Join thousands of students accessing education, skills and opportunities — completely free.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" className="btn btn-lg" style={{ background: 'white', color: 'var(--primary)', fontWeight: 700 }} id="cta-register-btn">
              Create Free Account
            </Link>
            <Link to="/learning" className="btn btn-lg" style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.6)' }}>
              Browse Learning
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
