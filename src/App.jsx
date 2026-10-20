import React, { useState } from 'react';

const semesterOneSubjects = [
  { code: 'LN132', name: 'Communication Skills: Theory and Practices', short: 'Communication Skills', icon: 'Aa' },
  { code: 'CAIL10', name: 'Computer Fundamentals and C Programming', short: 'Computer Fundamentals & C', icon: '</>' },
  { code: 'CAI14', name: 'Introduction to IT Industry', short: 'Introduction to IT Industry', icon: 'IT' },
  { code: 'ES103', name: 'Environmental Studies and Sustainability', short: 'Environmental Studies', icon: '↗' },
  { code: 'MTI61', name: 'Mathematics for Computer Applications', short: 'Mathematics', icon: '∑' },
  { code: 'HM103', name: 'Indian Knowledge System', short: 'Indian Knowledge System', icon: '✳' },
];

const semesterTwoSubjects = [
  { code: 'CA117', name: 'Data Structure with C', short: 'Data Structures', icon: '[]' },
  { code: 'CA118', name: 'Principles of Operating System', short: 'Operating Systems', icon: 'OS' },
  { code: 'CA119', name: 'Fundamentals of Machine Learning with Python', short: 'Machine Learning + Python', icon: 'ML' },
  { code: 'CA120', name: 'Data Communication and Computer Networks', short: 'Computer Networks', icon: '↔' },
  { code: 'CA121', name: 'Discrete Mathematical Structure', short: 'Discrete Mathematics', icon: '∑' },
  { code: 'CA122', name: 'Indian Constitution and Cyber Law', short: 'Constitution & Cyber Law', icon: '§' },
];

const years = [
  { id: 1, title: 'First year', range: 'SEM 01 — 02', semesters: [1, 2], tag: 'THE FOUNDATIONS' },
  { id: 2, title: 'Second year', range: 'SEM 03 — 04', semesters: [3, 4], tag: 'BUILD YOUR SKILLS' },
  { id: 3, title: 'Third year', range: 'SEM 05 — 06', semesters: [5, 6], tag: 'FINISH STRONG' },
];

export default function App() {
  const [activeYear, setActiveYear] = useState(1);
  const [activeSemester, setActiveSemester] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSubject, setActiveSubject] = useState(null);
  const selectedYear = years.find((year) => year.id === activeYear);

  return <div className={`site-shell ${darkMode ? "dark-mode" : ""}`} id="top">
    <header className="topbar">
      <a className="brand" href="#top" aria-label="BCA Notes home"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M6 10c5-2 10-1 14 2v18c-4-3-9-4-14-2z" fill="#d9ff62"/><path d="M34 10c-5-2-10-1-14 2v18c4-3 9-4 14-2z" fill="#f7ffe9"/><path d="M20 12v18M10 15l6 1M10 19l6 1M24 16l6-1M24 20l6-1" stroke="#55733b" strokeWidth="1.4" strokeLinecap="round"/></svg></span><span>BCA<span className="brand-light">NOTES</span></span></a>
      <span className="topbar-note"><span className="live-dot" /> YOUR STUDY SPACE</span>
      <div className="top-actions"><button className="theme-toggle" type="button" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}><span className="theme-icon">{darkMode ? "☀" : "☾"}</span><span>{darkMode ? "Light" : "Dark"} mode</span></button><a className="top-link" href="#browse">Browse notes <span>↘</span></a></div>
    </header>
    <main>
      <section className="hero">
        <div className="hero-kicker"><span>THE BCA NOTES LIBRARY</span><span className="kicker-line" /></div>
        <h1>Less searching.<br /><span>More studying.</span></h1><div className="hero-proof"><span className="proof-dot"></span> YOUR BCA JOURNEY, BEAUTIFULLY ORGANISED <span className="proof-line"></span></div>
        <div className="hero-bottom">
          <p>Your BCA notes, organised by year and semester.<br className="desktop-break" /> Find what you need and get straight to learning.</p>
          <a className="hero-button" href="#browse">Find my notes <span>↓</span></a>
        </div>
        <div className="hero-stamp" aria-hidden="true"><span>STUDY</span><span>SMARTER</span><span className="stamp-star">✳</span></div>
        <div className="hero-visual" aria-hidden="true"><div className="visual-orbit orbit-one"></div><div className="visual-orbit orbit-two"></div><div className="visual-glow"></div><div className="floating-book book-back"><span className="book-line"></span><span className="book-line short"></span><span className="book-symbol">∑</span></div><div className="floating-book book-front"><span className="book-label">BCA / NOTES</span><span className="book-title">Your next<br/>Aha! moment.</span><span className="book-line"></span><span className="book-line short"></span><span className="book-footer">LEARN • BUILD • GROW</span></div><div className="float-chip chip-one"><span>✳</span> 6 semesters</div><div className="float-chip chip-two"><span>↗</span> Find your focus</div><div className="visual-spark spark-one">✦</div><div className="visual-spark spark-two">✳</div></div>
      </section>
      <section className="browse-section" id="browse">
        <div className="section-heading"><div><span className="section-index">01 / YOUR COURSE</span><h2>Choose your semester</h2></div><p>Pick a year to get started.</p></div>
        <div className="year-tabs" role="tablist" aria-label="BCA year">
          {years.map((year) => <button key={year.id} role="tab" aria-selected={activeYear === year.id} className={`year-tab ${activeYear === year.id ? 'active' : ''}`} onClick={() => { setActiveYear(year.id); setActiveSemester(null); setActiveSubject(null); }}>
            <span className="tab-number">0{year.id}</span><span className="tab-text"><strong>{year.title}</strong><small>{year.range}</small></span><span className="tab-arrow">↗</span>
          </button>)}
        </div>
        <div className="semester-area">
          <div className="semester-heading"><div><span className="section-index">{selectedYear.tag}</span><h3>{selectedYear.title}</h3></div><span className="semester-total">0{selectedYear.semesters[0]} <i>—</i> 0{selectedYear.semesters[1]}</span></div>
          <div className="semester-grid">
            {selectedYear.semesters.map((semester, index) => <button key={semester} className={`semester-card ${activeSemester === semester ? 'selected' : ''}`} onClick={() => { setActiveSemester(activeSemester === semester ? null : semester); setActiveSubject(null); }}>
              <span className="semester-card-top"><span>SEMESTER</span><span>0{index + 1}</span></span>
              <span className="semester-card-title">Semester {String(semester).padStart(2, '0')}</span>
              <span className="semester-card-bottom"><span>{activeSemester === semester ? 'Selected' : 'View notes'} <span className="arrow">↗</span></span><span className="semester-symbol">✳</span></span>
            </button>)}
          </div>
          {activeSemester && <div className="subjects-panel" id={`semester-${activeSemester}`}>
            <div className="subjects-panel-heading"><div><span className="section-index">SUBJECT DIRECTORY</span><h4>Semester {String(activeSemester).padStart(2, '0')} subjects</h4></div><span className="subject-count">{activeSemester === 1 || activeSemester === 2 ? '06 SUBJECTS' : 'SUBJECTS TO BE ADDED'}</span></div>
            {activeSemester === 1 || activeSemester === 2 ? <div className="subjects-grid">
              {(activeSemester === 1 ? semesterOneSubjects : semesterTwoSubjects).map((subject, index) => <button key={subject.code} id={`subject-${subject.code}`} className={`subject-card ${activeSubject === subject.code ? 'subject-active' : ''}`} onClick={() => setActiveSubject(activeSubject === subject.code ? null : subject.code)}>
                <span className="subject-card-top"><span className="subject-icon">{subject.icon}</span><span className="subject-number">0{index + 1}</span></span>
                <span className="subject-name">{subject.name}</span>
                <span className="subject-card-bottom"><span>{activeSubject === subject.code ? 'Selected' : 'Open subject'} <span className="arrow">↗</span></span><span className="subject-code">{subject.code}</span></span>
              </button>)}
            </div> : <div className="empty-state"><span className="empty-icon">✳</span><div><strong>Subjects for Semester {String(activeSemester).padStart(2, '0')}</strong><p>This semester’s subject list will be added when you share its syllabus.</p></div><span className="status-label">COMING SOON</span></div>}
            {(activeSemester === 1 || activeSemester === 2) && activeSubject && <div className="subject-detail"><span className="empty-icon">PDF</span><div><strong>{(activeSemester === 1 ? semesterOneSubjects : semesterTwoSubjects).find(subject => subject.code === activeSubject)?.name}</strong><p>Subject page is ready for notes. PDFs and unit-wise materials will appear here when you provide them.</p></div><span className="status-label">NOTES COMING SOON</span></div>}
          </div>}
        </div>
        <div className="catalogue-note"><span className="note-spark">✳</span><span>One simple library. All six semesters.</span><span className="note-right">MADE FOR BCA STUDENTS</span></div>
      </section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M6 10c5-2 10-1 14 2v18c-4-3-9-4-14-2z" fill="#d9ff62"/><path d="M34 10c-5-2-10-1-14 2v18c4-3 9-4 14-2z" fill="#f7ffe9"/><path d="M20 12v18M10 15l6 1M10 19l6 1M24 16l6-1M24 20l6-1" stroke="#55733b" strokeWidth="1.4" strokeLinecap="round"/></svg></span><span>BCA<span className="brand-light">NOTES</span></span></a><span>Study better, one page at a time.</span><span>© {new Date().getFullYear()} BCA NOTES</span></footer>
  </div>;
}