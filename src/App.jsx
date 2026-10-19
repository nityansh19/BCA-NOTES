import { useState } from 'react';

const years = [
  { id: 1, title: 'First year', detail: 'Build your foundations.', semesters: [1, 2] },
  { id: 2, title: 'Second year', detail: 'Connect concepts and practice.', semesters: [3, 4] },
  { id: 3, title: 'Third year', detail: 'Bring it all together.', semesters: [5, 6] },
];

export default function App() {
  const [openYear, setOpenYear] = useState(1);
  const [selectedSemester, setSelectedSemester] = useState(null);

  function browse() {
    document.getElementById('years')?.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className="site-shell" id="top">
      <header className="topbar">
        <a className="brand" href="#top"><span className="brand-mark">B</span><span>BCA<span className="brand-light">NOTES</span></span></a>
        <nav><a href="#years">Browse notes</a><a href="#about">About</a></nav>
        <button className="nav-cta" onClick={browse}>Explore notes <span aria-hidden="true">↗</span></button>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> MADE FOR BCA STUDENTS</div>
            <h1>Make every<br />semester <span>count.</span></h1>
            <p className="hero-description">Your BCA journey, made simpler. Find clear, student-friendly study notes organised by year and semester.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={browse}>Find your semester <span aria-hidden="true">→</span></button>
              <a className="text-button" href="#about">Get to know us ↓</a>
            </div>
            <p className="hero-note">✓ Built around your course, one semester at a time.</p>
          </div>
          <div className="hero-art" aria-label="Illustration of organized study notes">
            <div className="art-glow" />
            <div className="floating-chip chip-top">✳ Study smarter</div>
            <div className="note-sheet sheet-back"><div className="sheet-top">•••</div><div className="fake-line line-short" /><div className="fake-line" /><div className="fake-line line-mid" /><div className="fake-diagram"><i /><i /><i /></div><div className="fake-line" /><div className="fake-line line-short" /></div>
            <div className="note-sheet sheet-front">
              <div className="sheet-label">YOUR STUDY SPACE <span>01</span></div>
              <div className="sheet-title">Learn it.<br /><em>Understand it.</em></div>
              <div className="sheet-rule" />
              <div className="topic-row"><span className="topic-icon">▤</span><span><b>Clear notes</b><small>Easy to follow</small></span><span className="topic-check">✓</span></div>
              <div className="topic-row"><span className="topic-icon purple">▦</span><span><b>Organised units</b><small>Find topics faster</small></span><span className="topic-check">✓</span></div>
              <div className="sheet-footer"><span>ONE STEP AT A TIME</span><span className="footer-stars">✳ ✳ ✳</span></div>
            </div>
            <div className="floating-chip chip-bottom"><span className="mini-orb" /> Your next chapter starts here</div>
          </div>
          <div className="hero-index"><span>01</span><div /> STUDY WITH CLARITY</div>
        </section>

        <section className="browse-section" id="years">
          <div className="section-heading">
            <div><div className="eyebrow section-eyebrow">YOUR COURSE, YOUR PACE</div><h2>Where are you <span>studying?</span></h2><p>Choose your year, then select a semester to explore.</p></div>
            <div className="semester-count">♧ <span>3 years <i>·</i> 6 semesters</span></div>
          </div>
          <div className="year-list">
            {years.map((year) => {
              const isOpen = openYear === year.id;
              return (
                <article className={`year-card ${isOpen ? 'is-open' : ''}`} key={year.id}>
                  <button className="year-main" onClick={() => { setOpenYear(isOpen ? null : year.id); setSelectedSemester(null); }} aria-expanded={isOpen}>
                    <span className={`year-number year-${year.id}`}>0{year.id}</span>
                    <span className="year-info"><strong>{year.title}</strong><small>{year.detail}</small></span>
                    <span className="year-range">Semesters {String(year.semesters[0]).padStart(2, '0')}–{String(year.semesters[1]).padStart(2, '0')}</span>
                    <span className="year-chevron" aria-hidden="true">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && <div className="semester-panel">
                    <div className="semester-panel-heading"><span>SELECT A SEMESTER</span><span>YEAR 0{year.id}</span></div>
                    <div className="semester-grid">
                      {year.semesters.map((semester) => <button key={semester} className={`semester-card ${selectedSemester === semester ? 'semester-selected' : ''}`} onClick={() => setSelectedSemester(selectedSemester === semester ? null : semester)}>
                        <span className="semester-icon">▤</span><span className="semester-copy"><strong>Semester {String(semester).padStart(2, '0')}</strong><small>{selectedSemester === semester ? 'Selected' : 'Explore semester'}</small></span><span className="semester-arrow">→</span>
                      </button>)}
                    </div>
                    {selectedSemester && year.semesters.includes(selectedSemester) && <div className="coming-soon"><span className="coming-icon">✳</span><span><strong>We’re preparing this semester.</strong><small>Subject lists and syllabus details will be added here soon.</small></span><span className="coming-pill">COMING SOON</span></div>}
                  </div>}
                </article>
              );
            })}
          </div>
          <p className="browse-footnote"><span>✳</span> More subjects and syllabus details are on the way.</p>
        </section>
        <section className="about-strip" id="about"><div className="about-icon">▤</div><div><h3>Made for students, by students.</h3><p>Simple to browse. Easier to study. Built one semester at a time.</p></div><span className="about-decoration">BCA / NOTES</span></section>
      </main>
      <footer className="footer"><a className="brand footer-brand" href="#top"><span className="brand-mark">B</span><span>BCA<span className="brand-light">NOTES</span></span></a><span>Study better, one page at a time.</span><span>© {new Date().getFullYear()} BCA NOTES</span></footer>
    </div>
  );
}
