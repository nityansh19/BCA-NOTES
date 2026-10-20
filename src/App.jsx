import React, { useState, useEffect } from 'react';

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

const subjectUnits = {
  LN132: ['Communication basics and the communication process', 'Listening, speaking and presentation skills', 'Reading comprehension and vocabulary', 'Professional writing and workplace communication'],
  CAIL10: ['Computer fundamentals and number systems', 'Problem-solving, algorithms and flowcharts', 'C programming fundamentals, operators and control flow', 'Arrays, functions, pointers and structures'],
  CAI14: ['Introduction to the IT industry', 'Computer hardware, software and operating systems', 'IT services, careers and professional practices', 'Emerging technologies and industry trends'],
  ES103: ['Environment, ecosystems and biodiversity', 'Natural resources and sustainability', 'Pollution, climate change and environmental issues', 'Environmental protection and sustainable development'],
  MTI61: ['Fundamentals of sets, relations and functions', 'Algebra and mathematical techniques', 'Matrices and determinants', 'Core mathematical methods for computer applications'],
  HM103: ['Introduction to Indian Knowledge Systems', 'Knowledge traditions and classical literature', 'Science, mathematics and technology in India', 'Contemporary relevance and applications'],
  CA117: ['Introduction to data structures and algorithm analysis', 'Arrays, linked lists, stacks and queues', 'Trees, graphs and traversal techniques', 'Searching, sorting and hashing'],
  CA118: ['Operating-system fundamentals and architecture', 'Processes, threads and CPU scheduling', 'Memory management and virtual memory', 'File systems, I/O and deadlock basics'],
  CA119: ['Python foundations for machine learning', 'Data handling, cleaning and visualisation', 'Machine-learning concepts and model workflow', 'Introductory supervised and unsupervised learning'],
  CA120: ['Data communication fundamentals and transmission media', 'Network models, topologies and protocols', 'IP addressing, routing and switching basics', 'Transport, application protocols and network security'],
  CA121: ['Logic, propositions and proof techniques', 'Sets, relations and functions', 'Combinatorics and recurrence relations', 'Graphs, trees and discrete structures'],
  CA122: ['Constitutional foundations and key institutions', 'Fundamental rights, duties and governance', 'Cyber law and the legal framework', 'Digital rights, cyber offences and responsible technology']
};

const years = [
  { id: 1, title: 'First year', range: 'SEM 01 — 02', semesters: [1, 2], tag: 'LEVEL 01: THE STARTER PACK' },
  { id: 2, title: 'Second year', range: 'SEM 03 — 04', semesters: [3, 4], tag: 'LEVEL 02: SKILL UP' },
  { id: 3, title: 'Third year', range: 'SEM 05 — 06', semesters: [5, 6], tag: 'LEVEL 03: FINAL BOSS' },
];

export default function App() {
  const [pagePath, setPagePath] = useState(window.location.pathname);
  const navigate = (path) => { window.history.pushState({}, '', path); setPagePath(path); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  useEffect(() => { const onPop = () => setPagePath(window.location.pathname); window.addEventListener('popstate', onPop); return () => window.removeEventListener('popstate', onPop); }, []);
  const route = pagePath.match(/^\/semester\/(\d+)$/);
  const subjectRoute = pagePath.match(/^\/subject\/([A-Za-z0-9]+)$/);
  const routeSemester = route ? Number(route[1]) : null;
  const routeSubject = subjectRoute ? [...semesterOneSubjects, ...semesterTwoSubjects].find(item => item.code === subjectRoute[1]) : null;
  const [activeYear, setActiveYear] = useState(1);
  const [activeSemester, setActiveSemester] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [activeSubject, setActiveSubject] = useState(null);
  const selectedYear = years.find((year) => year.id === activeYear);
  const knownSemesterCount = (semester) => semester === 1 || semester === 2 ? 6 : null;
  const semesterLabel = (semester) => knownSemesterCount(semester) ? '6 subjects unlocked' : 'Subject list in progress';

  const allSubjects = [...semesterOneSubjects, ...semesterTwoSubjects];
  const semesterSubjects = (semester) => semester === 1 ? semesterOneSubjects : semester === 2 ? semesterTwoSubjects : [];
  const pageHeader = (eyebrow, title, subtitle, backPath = '/browse') => <div className="inner-page-heading"><button className="back-link" onClick={() => navigate(backPath)}>← Back</button><span className="section-index">{eyebrow}</span><h1>{title}</h1><p>{subtitle}</p></div>;
  if (routeSubject) {
    const units = subjectUnits[routeSubject.code] || [];
    return <div className={`site-shell inner-page-shell ${darkMode ? 'dark-mode' : ''}`}><header className="topbar"><a className="brand" href="/" onClick={e=>{e.preventDefault();navigate('/')}}><span className="brand-mark">📖</span><span>BCA<span className="brand-light">NOTES</span></span></a><div className="top-actions"><button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>{darkMode ? '☀ Light mode' : '☾ Dark mode'}</button><button className="top-link" onClick={() => navigate('/browse')}>Browse semesters ↗</button></div></header><main className="inner-page-content">{pageHeader(`SUBJECT WORKSPACE / ${routeSubject.code}`,routeSubject.name,'Your dedicated space for units, class notes, revision material and exam prep.',`/semester/${routeSubject.code === 'LN132' || routeSubject.code === 'CAIL10' || routeSubject.code === 'CAI14' || routeSubject.code === 'ES103' || routeSubject.code === 'MTI61' || routeSubject.code === 'HM103' ? 1 : 2`)}<div className="subject-page-summary"><span className="subject-detail-icon">{routeSubject.icon}</span><div><span className="section-index">YOUR LEARNING PATH</span><h2>One unit at a time.</h2><p>Open a unit to explore its outline and see where your study resources will live.</p></div><span className="status-label">WORKSPACE READY</span></div><div className="unit-list-heading"><div><span className="section-index">THE LEARNING PATH</span><h2>Units & resources</h2></div><span className="unit-count">{units.length} UNITS</span></div><div className="unit-list">{units.map((unit,i)=><details className="unit-accordion" key={i}><summary><span className="unit-number">0{i+1}</span><span className="unit-title-wrap"><strong>Unit {i+1}</strong><small>{unit}</small></span><span className="unit-open-icon">＋</span></summary><div className="unit-content"><p>Everything for this unit, together in one place.</p><div className="resource-placeholder"><span className="resource-file-icon">PDF</span><span><strong>Study materials</strong><small>Actual PDFs will appear here when added to the repository.</small></span><span className="resource-status">AWAITING NOTES</span></div><div className="resource-placeholder"><span className="resource-file-icon">✎</span><span><strong>Revision notes & questions</strong><small>Summaries, important questions and practice resources.</small></span><span className="resource-status">PLANNED</span></div></div></details>)}</div><p className="workspace-disclaimer">Unit titles are a starter roadmap and should be checked against your official syllabus. Actual PDFs are not attached yet.</p></main><footer className="footer"><span>BCA NOTES</span><span>Study better, one page at a time.</span></footer></div>;
  }
  if (route) {
    const sem = routeSemester; const subjects = semesterSubjects(sem); const year = sem <= 2 ? 'First year' : sem <= 4 ? 'Second year' : 'Third year';
    return <div className={`site-shell inner-page-shell ${darkMode ? 'dark-mode' : ''}`}><header className="topbar"><a className="brand" href="/" onClick={e=>{e.preventDefault();navigate('/')}}><span className="brand-mark">📖</span><span>BCA<span className="brand-light">NOTES</span></span></a><div className="top-actions"><button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>{darkMode ? '☀ Light mode' : '☾ Dark mode'}</button><button className="top-link" onClick={() => navigate('/browse')}>All semesters ↗</button></div></header><main className="inner-page-content">{pageHeader(`SEMESTER DIRECTORY / ${year.toUpperCase()}`,`Semester ${String(sem).padStart(2,'0')}`,sem <= 2 ? 'Pick a subject to open its own study workspace.' : 'This semester’s subject list will be added when its official syllabus is available.')}<div className="semester-page-banner"><span className="level-pill">LEVEL 0{sem}</span><h2>{sem===1?'The foundations.':sem===2?'The skill tree.':sem===3?'The next chapter.':sem===4?'The upgrade.':sem===5?'The endgame.':'The final level.'}</h2><p>{subjects.length ? `${subjects.length} subjects ready to explore` : 'Subject directory coming soon'}</p></div>{subjects.length ? <div className="subjects-grid dedicated-subject-grid">{subjects.map((subject,i)=><button key={subject.code} className="subject-card" onClick={()=>navigate(`/subject/${subject.code}`)}><span className="subject-card-top"><span className="subject-icon">{subject.icon}</span><span className="subject-number">0{i+1}</span></span><span className="subject-name">{subject.name}</span><span className="subject-card-bottom"><span>Open subject workspace <span className="arrow">↗</span></span><span className="subject-code">{subject.code}</span></span></button>)}</div> : <div className="empty-state"><span className="empty-icon">✳</span><div><strong>Subjects are on the way</strong><p>Share the official syllabus for Semester {sem} and we’ll add the correct subjects.</p></div><span className="status-label">COMING SOON</span></div>}</main><footer className="footer"><span>BCA NOTES</span><span>Study better, one page at a time.</span></footer></div>;
  }
  if (pagePath === '/browse') return <div className={`site-shell inner-page-shell ${darkMode ? 'dark-mode' : ''}`}><header className="topbar"><a className="brand" href="/" onClick={e=>{e.preventDefault();navigate('/')}}><span className="brand-mark">📖</span><span>BCA<span className="brand-light">NOTES</span></span></a><div className="top-actions"><button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>{darkMode ? '☀ Light mode' : '☾ Dark mode'}</button><a className="top-link" href="/" onClick={e=>{e.preventDefault();navigate('/')}}>Home ↗</a></div></header><main className="inner-page-content">{pageHeader('THE SEMESTER EXPLORER','Choose your next level.','Three years. Six semesters. A clearer path through your BCA.','/')}<div className="year-tabs dedicated-year-tabs">{years.map(year=><div className="year-tab dedicated-year-card" key={year.id}><span className="tab-number">0{year.id}</span><span className="tab-text"><strong>{year.title}</strong><small>{year.range}</small><span className="year-tag">{year.id===1?'START HERE':year.id===2?'POWER UP':'FINAL LEVEL'}</span></span><span className="tab-arrow">↗</span><div className="dedicated-semester-links">{year.semesters.map(sem=><button key={sem} onClick={()=>navigate(`/semester/${sem}`)}>Semester {String(sem).padStart(2,'0')} <span>Explore ↗</span></button>)}</div></div>)}</div></main><footer className="footer"><span>BCA NOTES</span><span>Study better, one page at a time.</span></footer></div>;
  return <div className={`site-shell home-shell ${darkMode ? "dark-mode" : ""}`} id="top">
    <header className="topbar">
      <a className="brand" href="#top" aria-label="BCA Notes home"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M6 10c5-2 10-1 14 2v18c-4-3-9-4-14-2z" fill="#d9ff62"/><path d="M34 10c-5-2-10-1-14 2v18c4-3 9-4 14-2z" fill="#f7ffe9"/><path d="M20 12v18M10 15l6 1M10 19l6 1M24 16l6-1M24 20l6-1" stroke="#55733b" strokeWidth="1.4" strokeLinecap="round"/></svg></span><span>BCA<span className="brand-light">NOTES</span></span></a>
      <span className="topbar-note"><span className="live-dot" /> YOUR STUDY SPACE</span>
      <div className="top-actions"><button className="theme-toggle" type="button" onClick={() => setDarkMode(!darkMode)} aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}><span className="theme-icon">{darkMode ? "☀" : "☾"}</span><span>{darkMode ? "Light" : "Dark"} mode</span></button><button className="top-link" onClick={() => navigate('/browse')}>Browse notes <span>↘</span></button></div>
    </header>
    <main>
      <section className="hero">
        <div className="hero-kicker"><span>YOUR DEGREE, DECODED</span><span className="kicker-line" /></div>
        <h1>Big syllabus?<br /><span>Bring it on.</span></h1><div className="hero-proof"><span className="proof-dot"></span> LESS SCROLLING. MORE “OH, I GET IT.” <span className="proof-line"></span></div>
        <div className="hero-bottom">
          <p>The BCA notes hub that gets you. Pick your semester, find your subjects, and spend less time hunting for notes.</p>
          <button className="hero-button" onClick={() => navigate('/browse')}>Let’s find my notes <span>↓</span></button>
        </div>
        <div className="hero-stamp" aria-hidden="true"><span>LESS</span><span>STRESS</span><span className="stamp-star">✳</span></div>
        <div className="hero-visual" aria-hidden="true"><div className="visual-orbit orbit-one"></div><div className="visual-orbit orbit-two"></div><div className="visual-glow"></div><div className="floating-book book-back"><span className="book-line"></span><span className="book-line short"></span><span className="book-symbol">∑</span></div><div className="floating-book book-front"><span className="book-label">BCA / NOTES</span><span className="book-title">Make room<br/>for the<br/>aha! moment.</span><span className="book-line"></span><span className="book-line short"></span><span className="book-footer">CRAM LESS • GET IT</span></div><div className="float-chip chip-one"><span>✳</span> 6 semesters. One hub.</div><div className="float-chip chip-two"><span>↗</span> Your next topic →</div><div className="visual-spark spark-one">✦</div><div className="visual-spark spark-two">✳</div></div>
      </section>
      <section className="browse-section" id="browse">
        <div className="section-heading"><div><span className="section-index">01 / CHOOSE YOUR ADVENTURE</span><h2>Where are you in the BCA multiverse?</h2></div><p>Pick your level. Let’s make this degree feel less like a boss fight.</p></div>
        <div className="year-tabs" role="tablist" aria-label="BCA year">
          {years.map((year) => <button key={year.id} role="tab" aria-selected={activeYear === year.id} className={`year-tab ${activeYear === year.id ? 'active' : ''}`} onClick={() => navigate(`/semester/${year.semesters[0]}`)}>
            <span className="tab-number">0{year.id}</span><span className="tab-text"><strong>{year.title}</strong><small>{year.range}</small><span className="year-tag">{year.id === 1 ? "START HERE" : year.id === 2 ? "POWER UP" : "FINAL LEVEL"}</span></span><span className="tab-arrow">↗</span>
          </button>)}
        </div>
        <div className="semester-area">
          <div className="semester-heading"><div><span className="section-index">{selectedYear.tag}</span><h3>{selectedYear.title} <span className="heading-aside">/ choose your next quest</span></h3></div><span className="semester-total">0{selectedYear.semesters[0]} <i>—</i> 0{selectedYear.semesters[1]}</span></div>
          <div className="semester-grid">
            {selectedYear.semesters.map((semester, index) => <button key={semester} className={`semester-card ${activeSemester === semester ? 'selected' : ''}`} onClick={() => navigate(`/semester/${semester}`)}>
              <span className="semester-card-top"><span className="level-pill"><span className="level-dot"></span> LEVEL 0{semester}</span><span className="semester-card-index">0{index + 1} / 02</span></span>
              <span className="semester-card-title">{semester === 1 ? "The foundations." : semester === 2 ? "The skill tree." : semester === 3 ? "The next chapter." : semester === 4 ? "The upgrade." : semester === 5 ? "The endgame." : "The final level."}</span>
              <span className="semester-subtitle">Semester {String(semester).padStart(2, '0')} · {semesterLabel(semester)}</span>
              <span className="level-track" aria-hidden="true"><span style={{ width: knownSemesterCount(semester) ? '100%' : '34%' }} /></span>
              <span className="semester-card-bottom"><span>{activeSemester === semester ? 'Quest selected ✓' : 'Explore subjects'} <span className="arrow">↗</span></span><span className="semester-symbol">{activeSemester === semester ? "✦" : "＋"}</span></span>
            </button>)}
          </div>
          {activeSemester && <div className="subjects-panel" id={`semester-${activeSemester}`}>
            <div className="subjects-panel-heading"><div><span className="section-index">SUBJECT DIRECTORY</span><h4>Semester {String(activeSemester).padStart(2, '0')} subjects</h4></div><span className="subject-count">{activeSemester === 1 || activeSemester === 2 ? '06 SUBJECTS' : 'SUBJECTS TO BE ADDED'}</span></div>
            {activeSemester === 1 || activeSemester === 2 ? <div className="subjects-grid">
              {(activeSemester === 1 ? semesterOneSubjects : semesterTwoSubjects).map((subject, index) => <button key={subject.code} id={`subject-${subject.code}`} className={`subject-card ${activeSubject === subject.code ? 'subject-active' : ''}`} aria-expanded={activeSubject === subject.code} onClick={() => navigate(`/subject/${subject.code}`)}>
                <span className="subject-card-top"><span className="subject-icon">{subject.icon}</span><span className="subject-number">0{index + 1}</span></span>
                <span className="subject-name">{subject.name}</span>
                <span className="subject-card-bottom"><span>{activeSubject === subject.code ? 'Close subject' : 'View units & resources'} <span className="arrow">↗</span></span><span className="subject-code">{subject.code}</span>
              </button>)}
            </div> : <div className="empty-state"><span className="empty-icon">✳</span><div><strong>Subjects for Semester {String(activeSemester).padStart(2, '0')}</strong><p>This semester’s subject list will be added when you share its syllabus.</p></div><span className="status-label">COMING SOON</span></div>}
            {(activeSemester === 1 || activeSemester === 2) && activeSubject && <section className="subject-detail-page" aria-live="polite">
              {(() => { const subject = (activeSemester === 1 ? semesterOneSubjects : semesterTwoSubjects).find(item => item.code === activeSubject); return <><div className="subject-detail-hero"><div className="subject-detail-icon">{subject.icon}</div><div className="subject-detail-copy"><span className="section-index">SUBJECT WORKSPACE / {subject.code}</span><h5>{subject.name}</h5><p>Your subject, broken into manageable units. Open a unit to start organising your revision.</p></div><span className="status-label">WORKSPACE READY</span></div><div className="unit-list-heading"><div><span className="section-index">THE LEARNING PATH</span><h6>Unit-by-unit roadmap</h6></div><span className="unit-count">{(subjectUnits[subject.code] || []).length} UNITS</span></div><div className="unit-list">{(subjectUnits[subject.code] || []).map((unit, unitIndex) => <details className="unit-accordion" key={unitIndex}><summary><span className="unit-number">0{unitIndex + 1}</span><span className="unit-title-wrap"><strong>Unit {unitIndex + 1}</strong><small>{unit}</small></span><span className="unit-open-icon">＋</span></summary><div className="unit-content"><p>Use this space for your class notes, key definitions, diagrams and exam questions for this unit.</p><div className="resource-placeholder"><span className="resource-file-icon">PDF</span><span><strong>Study materials</strong><small>Upload or add the real notes for this unit to make them available here.</small></span><span className="resource-status">AWAITING NOTES</span></div><div className="resource-placeholder"><span className="resource-file-icon">✎</span><span><strong>Revision notes & questions</strong><small>Quick summaries, important questions and practice can live here.</small></span><span className="resource-status">PLANNED</span></div></div></details>)}</div><p className="workspace-disclaimer">Unit titles are a starter roadmap, not verified syllabus text. We’ll align these with your official syllabus and attach actual PDFs when you share them.</p></>; })()}
            </section>}
          </div>}
        </div>
        <div className="catalogue-note"><span className="note-spark">✳</span><span>Your degree is a journey. Your notes should be easy to find.</span><span className="note-right">BUILT FOR BCA LIFE</span></div>
      </section>
    </main>
    <footer className="footer"><a className="brand footer-brand" href="#top"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 40 40"><path d="M6 10c5-2 10-1 14 2v18c-4-3-9-4-14-2z" fill="#d9ff62"/><path d="M34 10c-5-2-10-1-14 2v18c4-3 9-4 14-2z" fill="#f7ffe9"/><path d="M20 12v18M10 15l6 1M10 19l6 1M24 16l6-1M24 20l6-1" stroke="#55733b" strokeWidth="1.4" strokeLinecap="round"/></svg></span><span>BCA<span className="brand-light">NOTES</span></span></a><span>Study better, one page at a time.</span><span>© {new Date().getFullYear()} BCA NOTES</span></footer>
  </div>;
}