import React, { useState } from 'react';

const years = [
  { id: 1, title: 'First year', range: 'SEM 01 — 02', semesters: [1, 2], tag: 'THE FOUNDATIONS' },
  { id: 2, title: 'Second year', range: 'SEM 03 — 04', semesters: [3, 4], tag: 'BUILD YOUR SKILLS' },
  { id: 3, title: 'Third year', range: 'SEM 05 — 06', semesters: [5, 6], tag: 'FINISH STRONG' },
];

export default function App() {
  const [activeYear, setActiveYear] = useState(1);
  const [activeSemester, setActiveSemester] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const selectedYear = years.find((year) => year.id === activeYear);

  return <div className={`site-shell ${darkMode ? "dark-mode" : ""}`} id="top">
    <header className="topbar">
      <a className="brand" href="#top" aria-label="BCA Notes home"><span className="brand-mark">b.</span><span>BCA<span className="brand-light">NOTES</span></span></a>
      <span className="topbar-note"><span className="live-dot" /> YOUR STUDY SPACE</span>
      <div className="top-actions"><button className="theme-toggle" type="button" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}><span className="theme-icon">{darkMode ? "☀" : "☾"}</span><span>{darkMode ? "Light" : "Dark"} mode</span></button><a className="top-link" href="#browse">Browse notes <span>↘</span></a></div>
    </header>
    <main>
      <section className="hero">
        <div className="hero-kicker"><span>THE BCA NOTES LIBRARY</span><span className="kicker-line" /></div>
        <h1>Less searching.<br /><span>More studying.</span></h1>
        <div className="hero-bottom">
          <p>Your BCA notes, organised by year and semester.<br className="desktop-break" /> Find what you need and get straight to learning.</p>
          <a className="hero-button" href="#browse">Find my notes <span>↓</span></a>
        </div>
        <div className="hero-stamp" aria-hidden="true"><span>STUDY</span><span>SMARTER</span><span className="stamp-star">✳</span></div>
      </section>
      <section className="browse-section" id="browse">
        <div className="section-heading"><div><span className="section-index">01 / YOUR COURSE</span><h2>Choose your semester</h2></div><p>Pick a year to get started.</p></div>
        <div className="year-tabs" role="tablist" aria-label="BCA year">
          {years.map((year) => <button key={year.id} role="tab" aria-selected={activeYear === year.id} className={`year-tab ${activeYear === year.id ? 'active' : ''}`} onClick={() => { setActiveYear(year.id); setActiveSemester(null); }}>
            <span className="tab-number">0{year.id}</span><span className="tab-text"><strong>{year.title}</strong><small>{year.range}</small></span><span className="tab-arrow">↗</span>
          </button>)}
        </div>
        <div className="semester-area">
          <div className="semester-heading"><div><span className="section-index">{selectedYear.tag}</span><h3>{selectedYear.title}</h3></div><span className="semester-total">0{selectedYear.semesters[0]} <i>—</i> 0{selectedYear.semesters[1]}</span></div>
          <div className="semester-grid">
            {selectedYear.semesters.map((semester, index) => <button key={semester} className={`semester-card ${activeSemester === semester ? 'selected' : ''}`} onClick={() => setActiveSemester(activeSemester === semester ? null : semester)}>
              <span className="semester-card-top"><span>SEMESTER</span><span>0{index + 1}</span></span>
              <span className="semester-card-title">Semester {String(semester).padStart(2, '0')}</span>
              <span className="semester-card-bottom"><span>{activeSemester === semester ? 'Selected' : 'View notes'} <span className="arrow">↗</span></span><span className="semester-symbol">✳</span></span>
            </button>)}
          </div>
          {activeSemester && <div className="empty-state"><span className="empty-icon">✳</span><div><strong>Notes for Semester {String(activeSemester).padStart(2, '0')}</strong><p>We’re organising the subjects and notes for this semester. The catalogue will appear here once it’s ready.</p></div><span className="status-label">COMING SOON</span></div>}
        </div>
        <div className="catalogue-note"><span className="note-spark">✳</span><span>One simple library. All six semesters.</span><span className="note-right">MADE FOR BCA STUDENTS</span></div>
      </section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="#top"><span className="brand-mark">b.</span><span>BCA<span className="brand-light">NOTES</span></span></a><span>Study better, one page at a time.</span><span>© {new Date().getFullYear()} BCA NOTES</span></footer>
  </div>;
}