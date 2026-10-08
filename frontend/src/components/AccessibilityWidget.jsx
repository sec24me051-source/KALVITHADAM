import { useState } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

export default function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const { settings, toggle } = useAccessibility();

  const options = [
    { key: 'largeText', label: '🔤 Large Text' },
    { key: 'highContrast', label: '🎨 High Contrast' },
    { key: 'reduceMotion', label: '🌿 Reduce Motion' },
    { key: 'lowData', label: '📶 Low Data Mode' },
  ];

  return (
    <div className="accessibility-fab">
      {open && (
        <div className="accessibility-panel">
          <h3>🚀 Accessibility</h3>
          {options.map(opt => (
            <div key={opt.key} className="acc-option">
              <span>{opt.label}</span>
              <button
                className={`acc-toggle ${settings[opt.key] ? 'on' : ''}`}
                onClick={() => toggle(opt.key)}
                aria-label={`Toggle ${opt.label}`}
                id={`acc-${opt.key}`}
              />
            </div>
          ))}
          <div style={{ marginTop: '0.75rem', padding: '0.75rem', background: '#f5f3ff', borderRadius: '8px', fontSize: '0.8rem', color: '#6d28d9' }}>
            <strong>Language:</strong> {settings.language}
            <br />
            <span style={{ fontSize: '0.75rem', color: '#7c3aed' }}>Tamil/English support active</span>
          </div>
        </div>
      )}
      <button
        className="accessibility-btn"
        onClick={() => setOpen(!open)}
        id="accessibility-fab-btn"
        aria-label="Open accessibility settings"
        title="Accessibility Settings"
      >
        🚀
      </button>
    </div>
  );
}
