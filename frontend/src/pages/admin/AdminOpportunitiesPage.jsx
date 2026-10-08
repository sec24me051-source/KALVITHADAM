import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { opportunityService } from '../../services/api';

const OPPORTUNITY_TYPES = [
  'Scholarship',
  'Government Scheme',
  'Educational Assistance',
  'Higher Education Scheme',
  'NGO Scholarship',
  'Mentoring Program',
  'Career Support',
  'Skill Program'
];

export default function AdminOpportunitiesPage() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const initialForm = {
    title: '',
    provider: '',
    type: 'Scholarship',
    description: '',
    eligibility: '',
    benefits: '',
    applicationProcedure: '',
    deadline: 'Ongoing',
    applicationLink: '',
    location: 'Tamil Nadu',
    educationLevel: 'Class 9-12, College',
    isActive: true,
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    loadOpportunities();
  }, []);

  const loadOpportunities = async () => {
    try {
      setLoading(true);
      const res = await opportunityService.getAll();
      setOpportunities(res.data);
    } catch (err) {
      setError('Failed to load opportunities');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setShowModal(true);
  };

  const handleOpenEdit = (opp) => {
    setEditingId(opp._id);
    setForm({
      title: opp.title || '',
      provider: opp.provider || '',
      type: opp.type || 'Scholarship',
      description: opp.description || '',
      eligibility: opp.eligibility || '',
      benefits: opp.benefits || '',
      applicationProcedure: opp.applicationProcedure || '',
      deadline: opp.deadline || 'Ongoing',
      applicationLink: opp.applicationLink || '',
      location: opp.location || 'Tamil Nadu',
      educationLevel: Array.isArray(opp.educationLevel) ? opp.educationLevel.join(', ') : (opp.educationLevel || ''),
      isActive: opp.isActive !== false,
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this opportunity?')) return;
    try {
      await opportunityService.delete(id);
      setSuccess('Opportunity deleted successfully');
      loadOpportunities();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete opportunity');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = {
        ...form,
        educationLevel: form.educationLevel.split(',').map((s) => s.trim()).filter(Boolean),
      };

      if (editingId) {
        await opportunityService.update(editingId, payload);
        setSuccess('Opportunity updated successfully!');
      } else {
        await opportunityService.create(payload);
        setSuccess('Opportunity added successfully!');
      }
      setShowModal(false);
      loadOpportunities();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const filteredOpps = opportunities.filter((o) =>
    o.title?.toLowerCase().includes(search.toLowerCase()) ||
    o.provider?.toLowerCase().includes(search.toLowerCase()) ||
    o.type?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="dashboard-title">Manage Opportunities & Schemes</h1>
            <p className="dashboard-subtitle">Publish and update scholarships, government schemes, and NGO assistance programs.</p>
          </div>
          <button onClick={handleOpenCreate} className="btn btn-primary btn-sm" id="add-opportunity-btn">
            ➕ Add Opportunity
          </button>
        </div>

        {error && <div className="alert alert-danger" style={{ marginBottom: '1rem' }}>{error}</div>}
        {success && <div className="alert alert-success" style={{ marginBottom: '1rem' }}>{success}</div>}

        <div className="card" style={{ marginBottom: '1.5rem' }}>
          <div className="card-body" style={{ padding: '1rem' }}>
            <div className="search-box" style={{ maxWidth: '400px' }}>
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search opportunities by title or provider..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
                id="search-opps-input"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="spinner-container"><div className="spinner"></div></div>
        ) : (
          <div className="card">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Opportunity Title</th>
                    <th>Provider</th>
                    <th>Type</th>
                    <th>Benefits</th>
                    <th>Deadline</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOpps.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>
                        No opportunities registered yet.
                      </td>
                    </tr>
                  ) : (
                    filteredOpps.map((opp) => (
                      <tr key={opp._id}>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{opp.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{opp.location}</div>
                        </td>
                        <td>{opp.provider}</td>
                        <td>
                          <span className="badge badge-purple">{opp.type}</span>
                        </td>
                        <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {opp.benefits}
                        </td>
                        <td>{opp.deadline}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleOpenEdit(opp)} className="btn btn-ghost btn-sm">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(opp._id)} className="btn btn-danger btn-sm">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal for Add / Edit */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '650px' }}>
              <div className="modal-header">
                <h3 className="modal-title">{editingId ? 'Edit Opportunity' : 'Add New Opportunity'}</h3>
                <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '70vh', overflowY: 'auto' }}>
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="form-control"
                      placeholder="e.g. Moovalur Ramamirtham Ammaiyar Scheme"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Provider Organization / Dept *</label>
                      <input
                        type="text"
                        required
                        value={form.provider}
                        onChange={(e) => setForm({ ...form, provider: e.target.value })}
                        className="form-control"
                        placeholder="e.g. Government of Tamil Nadu"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Type *</label>
                      <select
                        value={form.type}
                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                        className="form-control"
                      >
                        {OPPORTUNITY_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Short Description *</label>
                    <textarea
                      rows="2"
                      required
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="form-control"
                      placeholder="Brief overview of the scheme and who it helps..."
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Eligibility Criteria *</label>
                    <textarea
                      rows="2"
                      required
                      value={form.eligibility}
                      onChange={(e) => setForm({ ...form, eligibility: e.target.value })}
                      className="form-control"
                      placeholder="Who can apply? Income limits, gender, standard..."
                    ></textarea>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Benefits / Financial Aid *</label>
                    <input
                      type="text"
                      required
                      value={form.benefits}
                      onChange={(e) => setForm({ ...form, benefits: e.target.value })}
                      className="form-control"
                      placeholder="e.g. ₹1,000 monthly direct bank transfer"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Application Procedure *</label>
                    <textarea
                      rows="2"
                      required
                      value={form.applicationProcedure}
                      onChange={(e) => setForm({ ...form, applicationProcedure: e.target.value })}
                      className="form-control"
                      placeholder="Steps to apply, e.g. visit e-Sevai or apply through school HM..."
                    ></textarea>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Deadline</label>
                      <input
                        type="text"
                        value={form.deadline}
                        onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                        className="form-control"
                        placeholder="e.g. Ongoing, or Oct 31, 2026"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Application / Portal URL</label>
                      <input
                        type="url"
                        value={form.applicationLink}
                        onChange={(e) => setForm({ ...form, applicationLink: e.target.value })}
                        className="form-control"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Location / State</label>
                      <input
                        type="text"
                        value={form.location}
                        onChange={(e) => setForm({ ...form, location: e.target.value })}
                        className="form-control"
                        placeholder="e.g. Tamil Nadu or Pan-India"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Education Levels (comma-separated)</label>
                      <input
                        type="text"
                        value={form.educationLevel}
                        onChange={(e) => setForm({ ...form, educationLevel: e.target.value })}
                        className="form-control"
                        placeholder="Class 9-10, Class 11-12, College"
                      />
                    </div>
                  </div>
                </div>

                <div className="modal-footer" style={{ borderTop: '1px solid var(--border)', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    {editingId ? 'Save Changes' : 'Create Opportunity'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
