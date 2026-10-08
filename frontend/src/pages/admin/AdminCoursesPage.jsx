import { useState, useEffect } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import { courseService } from '../../services/api';

const CATEGORIES = [
  'Academic Learning',
  'Skill Development',
  'Life Skills',
  'Digital Literacy'
];

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const initialForm = {
    title: '',
    category: 'Academic Learning',
    subcategory: '',
    description: '',
    level: 'Beginner',
    duration: '4 hours',
    language: 'Tamil & English',
    tags: 'basics, school',
    lessons: [
      { title: 'Lesson 1: Introduction', duration: '15 min', content: 'Overview and fundamental concepts.' },
      { title: 'Lesson 2: Core Concepts', duration: '25 min', content: 'Detailed walkthrough and examples.' }
    ]
  };

  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      setLoading(true);
      const res = await courseService.getAll();
      setCourses(res.data);
    } catch (err) {
      setError('Failed to load courses');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenCreate = () => {
    setEditingId(null);
    setForm(initialForm);
    setShowModal(true);
  };

  const handleOpenEdit = (course) => {
    setEditingId(course._id);
    setForm({
      title: course.title || '',
      category: course.category || 'Academic Learning',
      subcategory: course.subcategory || '',
      description: course.description || '',
      level: course.level || 'Beginner',
      duration: course.duration || '4 hours',
      language: course.language || 'Tamil & English',
      tags: Array.isArray(course.tags) ? course.tags.join(', ') : (course.tags || ''),
      lessons: course.lessons && course.lessons.length > 0 ? course.lessons : [
        { title: 'Lesson 1: Introduction', duration: '15 min', content: 'Introductory notes.' }
      ],
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this course module?')) return;
    try {
      await courseService.delete(id);
      setSuccess('Course deleted successfully');
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete course');
    }
  };

  const handleAddLessonField = () => {
    setForm({
      ...form,
      lessons: [...form.lessons, { title: `Lesson ${form.lessons.length + 1}`, duration: '20 min', content: '' }]
    });
  };

  const handleRemoveLessonField = (idx) => {
    setForm({
      ...form,
      lessons: form.lessons.filter((_, i) => i !== idx)
    });
  };

  const handleLessonChange = (idx, field, value) => {
    const updated = [...form.lessons];
    updated[idx][field] = value;
    setForm({ ...form, lessons: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const payload = {
        ...form,
        lessonCount: form.lessons.length,
        tags: form.tags.split(',').map((s) => s.trim()).filter(Boolean),
      };

      if (editingId) {
        await courseService.update(editingId, payload);
        setSuccess('Course updated successfully!');
      } else {
        await courseService.create(payload);
        setSuccess('Course created successfully!');
      }
      setShowModal(false);
      loadCourses();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
    }
  };

  const filteredCourses = courses.filter((c) =>
    c.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.category?.toLowerCase().includes(search.toLowerCase()) ||
    c.subcategory?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 className="dashboard-title">Curriculum & Course Modules</h1>
            <p className="dashboard-subtitle">Manage learning paths, skill training modules, and life-skills lessons.</p>
          </div>
          <button onClick={handleOpenCreate} className="btn btn-primary btn-sm" id="add-course-btn">
            ➕ Add New Course
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
                placeholder="Search courses by title or subject..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
                id="search-courses-input"
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
                    <th>Module Title</th>
                    <th>Category</th>
                    <th>Level</th>
                    <th>Lessons</th>
                    <th>Duration</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.length === 0 ? (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-light)' }}>
                        No course modules available.
                      </td>
                    </tr>
                  ) : (
                    filteredCourses.map((c) => (
                      <tr key={c._id}>
                        <td>
                          <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{c.title}</div>
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-light)' }}>{c.language}</div>
                        </td>
                        <td>
                          <span className="badge badge-purple">{c.category}</span>
                        </td>
                        <td>
                          <span className="badge badge-info">{c.level}</span>
                        </td>
                        <td>{c.lessons?.length || c.lessonCount || 0} Lessons</td>
                        <td>{c.duration}</td>
                        <td>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button onClick={() => handleOpenEdit(c)} className="btn btn-ghost btn-sm">
                              Edit
                            </button>
                            <button onClick={() => handleDelete(c._id)} className="btn btn-danger btn-sm">
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

        {/* Modal for Add/Edit */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '700px' }}>
              <div className="modal-header">
                <h3 className="modal-title">{editingId ? 'Edit Course Module' : 'Create Course Module'}</h3>
                <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '70vh', overflowY: 'auto' }}>
                  <div className="form-group">
                    <label className="form-label">Course Title *</label>
                    <input
                      type="text"
                      required
                      value={form.title}
                      onChange={(e) => setForm({ ...form, title: e.target.value })}
                      className="form-control"
                      placeholder="e.g. Practical Electrical & House Wiring Basics"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Category *</label>
                      <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="form-control"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Subcategory / Subject</label>
                      <input
                        type="text"
                        value={form.subcategory}
                        onChange={(e) => setForm({ ...form, subcategory: e.target.value })}
                        className="form-control"
                        placeholder="e.g. Vocational Skills"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description *</label>
                    <textarea
                      rows="2"
                      required
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      className="form-control"
                      placeholder="Comprehensive course outline and learning outcomes..."
                    ></textarea>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                    <div className="form-group">
                      <label className="form-label">Difficulty Level</label>
                      <select
                        value={form.level}
                        onChange={(e) => setForm({ ...form, level: e.target.value })}
                        className="form-control"
                      >
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Total Duration</label>
                      <input
                        type="text"
                        value={form.duration}
                        onChange={(e) => setForm({ ...form, duration: e.target.value })}
                        className="form-control"
                        placeholder="e.g. 5 hours"
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Language</label>
                      <input
                        type="text"
                        value={form.language}
                        onChange={(e) => setForm({ ...form, language: e.target.value })}
                        className="form-control"
                        placeholder="Tamil & English"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Tags (comma-separated)</label>
                    <input
                      type="text"
                      value={form.tags}
                      onChange={(e) => setForm({ ...form, tags: e.target.value })}
                      className="form-control"
                      placeholder="vocational, hands-on, electrician"
                    />
                  </div>

                  {/* Lessons Builder */}
                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                      <label className="form-label" style={{ margin: 0, fontWeight: 700 }}>Course Lessons ({form.lessons.length})</label>
                      <button type="button" onClick={handleAddLessonField} className="btn btn-ghost btn-sm">
                        + Add Lesson
                      </button>
                    </div>
                    {form.lessons.map((lesson, idx) => (
                      <div key={idx} style={{ background: '#f8fafc', padding: '0.75rem', borderRadius: '8px', marginBottom: '0.75rem', border: '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
                          <input
                            type="text"
                            placeholder="Lesson Title"
                            value={lesson.title}
                            onChange={(e) => handleLessonChange(idx, 'title', e.target.value)}
                            className="form-control"
                            style={{ flex: 2 }}
                            required
                          />
                          <input
                            type="text"
                            placeholder="Duration (e.g. 15 min)"
                            value={lesson.duration}
                            onChange={(e) => handleLessonChange(idx, 'duration', e.target.value)}
                            className="form-control"
                            style={{ flex: 1 }}
                          />
                          {form.lessons.length > 1 && (
                            <button
                              type="button"
                              onClick={() => handleRemoveLessonField(idx)}
                              className="btn btn-danger btn-sm"
                            >
                              ✕
                            </button>
                          )}
                        </div>
                        <textarea
                          placeholder="Lesson Content / Summary notes"
                          rows="2"
                          value={lesson.content}
                          onChange={(e) => handleLessonChange(idx, 'content', e.target.value)}
                          className="form-control"
                        ></textarea>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="modal-footer" style={{ borderTop: '1px solid var(--border)', padding: '1rem 1.5rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button type="button" onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary btn-sm">
                    {editingId ? 'Save Changes' : 'Create Course'}
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
