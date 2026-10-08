import { useState, useEffect } from 'react';
import PublicLayout from '../layouts/PublicLayout';
import { opportunityService } from '../services/api';

const TYPES = ['All', 'Scholarship', 'Government Scheme', 'Educational Assistance', 'Higher Education Scheme', 'NGO Scholarship', 'Mentoring Program', 'Career Support', 'Skill Program'];

const typeBadge = {
  'Scholarship': 'badge-purple',
  'Government Scheme': 'badge-blue',
  'Educational Assistance': 'badge-green',
  'Higher Education Scheme': 'badge-orange',
  'NGO Scholarship': 'badge-gray',
  'Mentoring Program': 'badge-green',
  'Career Support': 'badge-orange',
  'Skill Program': 'badge-blue',
};

export default function OpportunitiesPage() {
  const [opps, setOpps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [type, setType] = useState('All');
  const [selected, setSelected] = useState(null);

  useEffect(() => { loadOpps(); }, []);

  const loadOpps = async () => {
    try {
      const { data } = await opportunityService.getAll();
      setOpps(data);
    } catch { setOpps([]); }
    finally { setLoading(false); }
  };

  const filtered = opps.filter(o => {
    const matchSearch = !search || o.title.toLowerCase().includes(search.toLowerCase()) || o.provider.toLowerCase().includes(search.toLowerCase()) || o.description.toLowerCase().includes(search.toLowerCase());
    const matchType = type === 'All' || o.type === type;
    return matchSearch && matchType;
  });

  return (
    <PublicLayout>
      <div style={{ background: 'var(--green-50)', padding: '3rem 0' }}>
        <div className="container">
          <div className="section-tag section-tag-green">Opportunities</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Scholarships & Educational Opportunities</h1>
          <p style={{ color: 'var(--text-medium)', maxWidth: '600px', marginBottom: '2rem', lineHeight: 1.7 }}>
            Discover government scholarships, welfare schemes, NGO programs and skill development opportunities. Search, check eligibility and apply.
          </p>
          <div style={{ background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.5rem', border: '1px solid var(--green-200)', maxWidth: '700px' }}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div className="search-bar" style={{ flex: 1, minWidth: '240px' }}>
                <span className="search-icon">🔍</span>
                <input placeholder="Search scholarships, schemes..." value={search} onChange={e => setSearch(e.target.value)} id="opp-search" />
              </div>
              <select className="filter-select" value={type} onChange={e => setType(e.target.value)} id="opp-type-filter">
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {TYPES.slice(0, 5).map(t => (
              <button key={t} onClick={() => setType(t)} className={`btn btn-sm ${type === t ? 'btn-secondary' : 'btn-ghost'}`} style={{ borderRadius: '20px' }} id={`type-pill-${t.replace(/ /g, '-')}`}>{t}</button>
            ))}
          </div>

          <div style={{ marginBottom: '1rem', color: 'var(--text-medium)', fontSize: '0.9rem' }}>
            Showing <strong>{filtered.length}</strong> opportunities
          </div>

          {loading ? (
            <div className="loading"><div className="spinner"></div></div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="icon">🎯</div>
              <h3>No opportunities found</h3>
              <p>Try different search terms</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {filtered.map(opp => (
                <div key={opp._id} className="opp-card">
                  <div className="opp-card-header">
                    <div style={{ flex: 1 }}>
                      <span className={`badge ${typeBadge[opp.type] || 'badge-gray'}`} style={{ marginBottom: '0.5rem', display: 'inline-block' }}>{opp.type}</span>
                      <div className="opp-card-title">{opp.title}</div>
                      <div className="opp-card-provider">📌 {opp.provider}</div>
                    </div>
                    {opp.deadline && opp.deadline !== 'Ongoing' && (
                      <div style={{ flexShrink: 0, textAlign: 'right' }}>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginBottom: '0.15rem' }}>Deadline</div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#c2410c' }}>📅 {opp.deadline}</div>
                      </div>
                    )}
                    {opp.deadline === 'Ongoing' && <span className="badge badge-green">Ongoing</span>}
                  </div>
                  <div className="opp-card-desc">{opp.description}</div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div className="opp-detail">
                      <div className="opp-detail-label">Eligibility</div>
                      <div className="opp-detail-val">{opp.eligibility}</div>
                    </div>
                    <div className="opp-detail">
                      <div className="opp-detail-label">Benefits</div>
                      <div className="opp-detail-val" style={{ color: 'var(--secondary)', fontWeight: 600 }}>{opp.benefits}</div>
                    </div>
                  </div>
                  <div className="opp-card-footer">
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {(opp.educationLevel || []).slice(0, 3).map(l => <span key={l} className="badge badge-gray">{l}</span>)}
                      {(opp.educationLevel || []).length > 3 && <span className="badge badge-gray">+{(opp.educationLevel || []).length - 3} more</span>}
                    </div>
                    <div style={{ display: 'flex', gap: '0.75rem' }}>
                      <button className="btn btn-outline btn-sm" onClick={() => setSelected(opp)} id={`view-opp-${opp._id}`}>View Details</button>
                      {opp.applicationLink && (
                        <a href={opp.applicationLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm" id={`apply-opp-${opp._id}`}>Apply Now →</a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" style={{ maxWidth: '680px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2 style={{ fontSize: '1.1rem', paddingRight: '1rem' }}>{selected.title}</h2>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
                <span className={`badge ${typeBadge[selected.type] || 'badge-gray'}`}>{selected.type}</span>
              </div>
              <p style={{ fontWeight: 600, color: 'var(--text-medium)', marginBottom: '1rem' }}>📌 {selected.provider}</p>
              <p style={{ color: 'var(--text-medium)', lineHeight: 1.7, marginBottom: '1.25rem' }}>{selected.description}</p>
              {[
                { label: '✅ Eligibility', val: selected.eligibility },
                { label: '💰 Benefits', val: selected.benefits },
                { label: '📋 Application Procedure', val: selected.applicationProcedure },
              ].map(item => (
                <div key={item.label} style={{ marginBottom: '1rem', padding: '1rem', background: 'var(--bg-soft)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.4rem', color: 'var(--text-dark)' }}>{item.label}</div>
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-medium)', lineHeight: 1.6 }}>{item.val}</div>
                </div>
              ))}
              {selected.documents?.length > 0 && (
                <div style={{ padding: '1rem', background: 'var(--green-50)', borderRadius: '8px', border: '1px solid var(--green-200)', marginBottom: '1rem' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem', color: 'var(--green-800)' }}>📄 Required Documents</div>
                  <ul style={{ paddingLeft: '1rem', listStyle: 'disc' }}>
                    {selected.documents.map(d => <li key={d} style={{ fontSize: '0.88rem', color: 'var(--green-700)', marginBottom: '0.2rem' }}>{d}</li>)}
                  </ul>
                </div>
              )}
              {selected.deadline && <p style={{ fontSize: '0.88rem', color: 'var(--text-medium)' }}>📅 <strong>Deadline:</strong> {selected.deadline}</p>}
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Close</button>
              {selected.applicationLink && (
                <a href={selected.applicationLink} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" id="modal-apply-btn">Apply Now →</a>
              )}
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
