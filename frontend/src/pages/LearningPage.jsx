import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import { courseService } from '../services/api';

const CATEGORIES = ['All', 'Academic Learning', 'Skill Development', 'Life Skills', 'Digital Literacy'];
const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced'];

const categoryColors = {
  'Academic Learning': { bg: '#dbeafe', color: '#1d4ed8', icon: '📖' },
  'Skill Development': { bg: '#f5f3ff', color: '#7c3aed', icon: '🗣️' },
  'Life Skills': { bg: '#dcfce7', color: '#15803d', icon: '🌱' },
  'Digital Literacy': { bg: '#ffedd5', color: '#c2410c', icon: '💻' },
};

export default function LearningPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [level, setLevel] = useState('All');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const { data } = await courseService.getAll();
      setCourses(data);
    } catch {
      setCourses([]);
    } finally { setLoading(false); }
  };

  const filtered = courses.filter(c => {
    const matchSearch = !search || c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || c.category === category;
    const matchLevel = level === 'All' || c.level === level;
    return matchSearch && matchCat && matchLevel;
  });

  return (
    <PublicLayout>
      <div style={{ background: 'var(--purple-50)', padding: '3rem 0' }}>
        <div className="container">
          <div className="section-tag">Learning Hub</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, marginBottom: '0.75rem' }}>Learning & Skill Development</h1>
          <p style={{ color: 'var(--text-medium)', maxWidth: '600px', marginBottom: '2rem', lineHeight: 1.7 }}>
            Free courses in Tamil & English covering academic subjects, skill development, digital literacy and life skills. Learn at your own pace.
          </p>
          {/* Search & Filter */}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div className="search-bar" style={{ minWidth: '280px', flex: 1, maxWidth: '400px' }}>
              <span className="search-icon">🔍</span>
              <input placeholder="Search courses..." value={search} onChange={e => setSearch(e.target.value)} id="course-search" />
            </div>
            <div className="filters">
              <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)} id="category-filter">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
              <select className="filter-select" value={level} onChange={e => setLevel(e.target.value)} id="level-filter">
                {LEVELS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="section" style={{ paddingTop: '2.5rem' }}>
        <div className="container">
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`btn btn-sm ${category === cat ? 'btn-primary' : 'btn-ghost'}`}
                style={{ borderRadius: '20px' }} id={`cat-pill-${cat.replace(/ /g, '-')}`}>
                {cat === 'All' ? '📚 All' : (categoryColors[cat]?.icon || '') + ' ' + cat}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="loading"><div className="spinner"></div></div>
          ) : filtered.length === 0 ? (
            <div className="empty-state">
              <div className="icon">📚</div>
              <h3>No courses found</h3>
              <p>Try adjusting your search or filters</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '1.5rem' }}>
              {filtered.map(course => {
                const meta = categoryColors[course.category] || { bg: '#f5f3ff', color: '#7c3aed', icon: '📚' };
                return (
                  <div key={course._id} className="course-card" onClick={() => setSelected(course)} style={{ cursor: 'pointer' }}>
                    <div className="course-card-top" style={{ background: meta.bg }}>
                      <span style={{ fontSize: '3rem' }}>{meta.icon}</span>
                    </div>
                    <div className="course-card-body">
                      <div className="course-card-category">{course.category}</div>
                      <div className="course-card-title">{course.title}</div>
                      <div className="course-card-desc">{course.description.slice(0, 90)}...</div>
                      <div className="course-meta">
                        <span>📘 {course.lessonCount || course.lessons?.length || 0} Lessons</span>
                        <span>⏱ {course.duration}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                        <span className={`badge ${course.level === 'Beginner' ? 'badge-green' : course.level === 'Intermediate' ? 'badge-orange' : 'badge-purple'}`}>{course.level}</span>
                        <span style={{ fontSize: '0.78rem', color: 'var(--text-light)' }}>🗣️ {course.language}</span>
                      </div>
                      <button className="btn btn-primary btn-sm" style={{ width: '100%', justifyContent: 'center' }} id={`start-course-${course._id}`}>Start Learning</button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Course Detail Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" style={{ maxWidth: '650px' }} onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{selected.title}</h2>
              <button className="modal-close" onClick={() => setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                <span className={`badge ${selected.level === 'Beginner' ? 'badge-green' : 'badge-orange'}`}>{selected.level}</span>
                <span className="badge badge-purple">{selected.category}</span>
                <span className="badge badge-gray">🗣️ {selected.language}</span>
                <span className="badge badge-blue">⏱ {selected.duration}</span>
              </div>
              <p style={{ color: 'var(--text-medium)', marginBottom: '1.5rem', lineHeight: 1.7 }}>{selected.description}</p>
              <h4 style={{ marginBottom: '1rem' }}>📋 Course Lessons ({selected.lessons?.length || 0})</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {(selected.lessons || []).map((lesson, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem 1rem', background: 'var(--bg-soft)', borderRadius: '8px', border: '1px solid var(--border)' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'var(--purple-100)', color: 'var(--purple-700)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{lesson.title}</div>
                      {lesson.content && <div style={{ fontSize: '0.78rem', color: 'var(--text-light)', marginTop: '0.1rem' }}>{lesson.content}</div>}
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-light)', flexShrink: 0 }}>⏱ {lesson.duration}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setSelected(null)}>Close</button>
              <button className="btn btn-primary" id="enroll-course-btn">Start This Course →</button>
            </div>
          </div>
        </div>
      )}
    </PublicLayout>
  );
}
