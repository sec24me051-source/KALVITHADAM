import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import AccessibilityWidget from '../components/AccessibilityWidget';

export default function PublicLayout({ children }) {
  return (
    <div className="flex-col" style={{ minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
      <AccessibilityWidget />
    </div>
  );
}
