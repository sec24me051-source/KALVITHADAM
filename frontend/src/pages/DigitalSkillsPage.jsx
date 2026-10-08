import PublicLayout from '../layouts/PublicLayout';

const steps = [
  {
    title: 'Creating an Email Account',
    icon: '📧',
    steps: ['Open gmail.com in your browser', 'Click "Create account"', 'Fill your name, date of birth', 'Choose a username (e.g. yourname2024)', 'Set a strong password', 'Verify with your phone number', 'Your Gmail is ready!'],
    tip: 'Use your real name + year as username. Write down your password safely.'
  },
  {
    title: 'Filling Online Application Forms',
    icon: '📝',
    steps: ['Read all instructions first', 'Keep your documents ready (Aadhaar, Mark Sheet)', 'Fill your name exactly as in Aadhaar', 'Double-check all information', 'Save/preview before submitting', 'Note your application number', 'Take a screenshot of confirmation'],
    tip: 'Never share your application login/password with anyone.'
  },
  {
    title: 'Uploading Documents Online',
    icon: '📄',
    steps: ['Scan or photograph your document clearly', 'Ensure the image is readable and not blurry', 'File size usually should be below 200KB', 'Common formats: PDF or JPG', 'Click "Upload" or "Choose File"', 'Wait for upload confirmation', 'Verify the uploaded file is correct'],
    tip: 'Use a free app like CamScanner to scan documents with your phone.'
  },
  {
    title: 'Applying for Scholarships Online',
    icon: '🎓',
    steps: ['Visit scholarships.gov.in (National Scholarship Portal)', 'Register with your mobile number', 'Login and choose your scholarship', 'Fill the application carefully', 'Upload required documents', 'Submit and note Application ID', 'Track your application status online'],
    tip: 'Ask your teacher to help verify your application before submission.'
  },
  {
    title: 'Using Government Portals',
    icon: '🏛️',
    steps: ['Common portals: NSP, Digilocker, e-District, UDID', 'Always use official government (.gov.in) websites', 'Create your Digilocker account for digital certificates', 'Link your Aadhaar to access services', 'Download digital certificates safely', 'Keep login credentials secure'],
    tip: 'Digilocker lets you store and access all certificates digitally — very useful!'
  },
  {
    title: 'Online Safety & Password Security',
    icon: '🔒',
    steps: ['Use different passwords for each account', 'Password should have letters, numbers and symbols', 'Never share OTP with anyone — not even helplines', 'Check URL starts with "https://" before entering details', 'Do not click suspicious links in messages', 'Log out after using shared computers', 'Report suspicious requests to a trusted adult'],
    tip: 'A good password example: Ravi@School2024# — Easy to remember, hard to guess.'
  },
];

export default function DigitalSkillsPage() {
  return (
    <PublicLayout>
      <div style={{ background: 'var(--purple-50)', padding: '3rem 0' }}>
        <div className="container">
          <div className="section-tag">Digital Literacy</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Digital Skills for Students</h1>
          <p style={{ color: 'var(--text-medium)', maxWidth: '620px', lineHeight: 1.7 }}>
            Step-by-step guides to help you navigate the digital world — creating accounts, filling forms, uploading documents and staying safe online.
          </p>
        </div>
      </div>

      <div className="section" style={{ paddingTop: '3rem' }}>
        <div className="container">
          {/* Step Visual Flow */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--border)', marginBottom: '3rem', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '1.5rem', color: 'var(--purple-700)' }}>📋 Scholarship Application — Step by Step</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              {[
                { step: '1', label: 'Create Email' },
                { step: '2', label: 'Prepare Documents' },
                { step: '3', label: 'Visit Portal' },
                { step: '4', label: 'Fill Application' },
                { step: '5', label: 'Upload Documents' },
                { step: '6', label: 'Submit' },
                { step: '7', label: 'Track Status ✓' },
              ].map((s, i) => (
                <>
                  <div key={s.step} style={{ textAlign: 'center' }}>
                    <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, margin: '0 auto 0.4rem', fontSize: '0.9rem' }}>{s.step}</div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-dark)', maxWidth: '70px', lineHeight: 1.3 }}>{s.label}</div>
                  </div>
                  {i < 6 && <div style={{ color: 'var(--purple-300)', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.2rem' }}>→</div>}
                </>
              ))}
            </div>
          </div>

          {/* Guide Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.5rem' }}>
            {steps.map((guide, idx) => (
              <div key={idx} className="card" style={{ border: '1px solid var(--border)' }}>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{guide.icon}</div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-dark)' }}>{guide.title}</h3>
                  <ol style={{ paddingLeft: '1.25rem', marginBottom: '1rem' }}>
                    {guide.steps.map((s, i) => (
                      <li key={i} style={{ fontSize: '0.88rem', color: 'var(--text-medium)', marginBottom: '0.4rem', lineHeight: 1.5 }}>{s}</li>
                    ))}
                  </ol>
                  <div style={{ padding: '0.75rem 1rem', background: 'var(--purple-50)', borderRadius: '8px', border: '1px solid var(--purple-100)', fontSize: '0.82rem', color: 'var(--purple-700)' }}>
                    💡 <strong>Tip:</strong> {guide.tip}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Important Resources */}
          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--green-50)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--green-200)' }}>
            <h3 style={{ marginBottom: '1.25rem', color: 'var(--green-800)' }}>🔗 Important Government Portals</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {[
                { name: 'National Scholarship Portal', url: 'https://scholarships.gov.in', desc: 'Apply for central govt scholarships' },
                { name: 'Digilocker', url: 'https://digilocker.gov.in', desc: 'Store digital certificates' },
                { name: 'e-District Tamil Nadu', url: 'https://www.edistrict.tn.gov.in', desc: 'Government certificates & services' },
                { name: 'Tamil Nadu Scholarship', url: 'https://www.tnscholarship.gov.in', desc: 'State govt scholarships' },
                { name: 'Vidyalakshmi', url: 'https://www.vidyalakshmi.co.in', desc: 'Education loan portal' },
                { name: 'UDID Portal', url: 'https://www.swavlambancard.gov.in', desc: 'Disability ID card registration' },
              ].map(p => (
                <a key={p.name} href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: 'block', padding: '1rem', background: 'white', borderRadius: '10px', border: '1px solid var(--green-200)', textDecoration: 'none', transition: '0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--secondary)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--green-200)'}>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--secondary)', marginBottom: '0.25rem' }}>{p.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-medium)' }}>{p.desc}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
