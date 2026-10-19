import { useState } from 'react';
import { ArrowDown, ArrowRight, BookOpen, Check, ChevronDown, GraduationCap, Layers3, Sparkles } from 'lucide-react';

const years = [
  { id: 1, label: 'First year', range: 'Semesters 01–02', semesters: [1, 2], description: 'Build your foundations.' },
  { id: 2, label: 'Second year', range: 'Semesters 03–04', semesters: [3, 4], description: 'Connect concepts and practice.' },
  { id: 3, label: 'Third year', range: 'Semesters 05–06', semesters: [5, 6], description: 'Bring it all together.' },
];

function App() {
  const [activeYear, setActiveYear] = useState(1);
  const [activeSemester, setActiveSemester] = useState(null);

  const chooseYear = (year) => {
    setActiveYear(activeYear === year ? null : year);
    setActiveSemester(null);
  };

  const scrollToYears = () => document.getElementById('years')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="BCA Notes home">
          <span className="brand-mark"><BookOpen size={19} strokeWidth={2.2} /></span>
          <span>BCA<span className="brand-light">NOTES</span></span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          <a href="#years">Browse notes</a>
          <a href="#about">About</a>
        </nav>
        <button className="nav-cta" onClick={scrollToYears}>Explore notes <ArrowRight size={15} /></button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span className="status-dot" /> MADE FOR BCA STUDENTS</div>
            <h1>Make every<br />semester <span>count.</span></h1>
            <p className="hero-description">Your BCA journey, made simpler. Find clear, student-friendly study notes organised by year and semester.</p>
            <div className="hero-actions">
              <button className="primary-button" onClick={scrollToYears}>Find your semester <ArrowRight size={17} /></button>
              <a className="text-button" href="#about">Get to know us <ArrowDown size={15} /></a>
            </div>
            <div className="hero-note"><span className="tiny-check"><Check size={12} /></span> Built around your course, one semester at a time.</div>
          </div>

          <div className="hero-art" aria-label="Illustration of organized study notes">
            <div className="art-glow" />
            <div className="floating-chip chip-top"><Sparkles size={14} /> Study smarter</div>
            <div className="note-sheet sheet-back">
              <div className="sheet-top"><span /><span /><span /></div>
              <div className="fake-line line-short" /><div className="fake-line" /><div className="fake-line line-mid" />
              <div className="fake-diagram"><span /><span /><span /></div>
              <div className="fake-line" /><div className="fake-line line-short" />
            </div>
            <div className="note-sheet sheet-front">
              <div className="sheet-label">YOUR STUDY SPACE <span>01</span></div>
              <div className="sheet-title">Learn it.<br /><em>Understand it.</em></div>
              <div className="sheet-rule" />
              <div className="topic-row"><span className="topic-icon"><BookOpen size={14} /></span><span><b>Clear notes</b><small>Easy to follow</small></span><Check size={15} className="topic-check" /></div>
              <div className="topic-row"><span className="topic-icon purple"><Layers3 size={14} /></span><span><b>Organised units</b><small>Find topics faster</small></span><Check size={15} className="topic-check" /></div>
              <div className="sheet-footer"><span>ONE STEP AT A TIME</span><span className="footer-stars">✳ ✳ ✳</span></div>
            </div>
            <div className="floating-chip chip-bottom"><span className="mini-orb" /> Your next chapter starts here</div>
          </div>
          <div className="hero-index"><span>01</span><div /> STUDY WITH CLARITY</div>
        </section>

        <section className="browse-section" id="years">
          <div className="section-heading">
            <div>
              <div className="eyebrow section-eyebrow">YOUR COURSE, YOUR PACE</div>
              <h2>Where are you <span>studying?</span></h2>
              <p>Choose your year, then select a semester to explore.</p>
            </div>
            <div className="semester-count"><GraduationCap size={17} /><span>3 years <i>·</i> 6 semesters</span></div>
          </div>

          <div className="year-list">
            {years.map((year) => {
              const isOpen = activeYear === year.id;
              return (
                <article className={`year-card ${isOpen ? 'is-open' : ''}`} key={year.id}>
                  <button className="year-main" onClick={() => chooseYear(year.id)} aria-expanded={isOpen}>
                    <span className={`year-number year-${year.id}`}>0{year.id}</span>
                    <span className="year-info"><strong>{year.label}</strong><small>{year.description}</small></span>
                    <span className="year-range">{year.range}</span>
                    <span className="year-chevron"><ChevronDown size={19} /></span>
                  </button>
                  {isOpen && (
                    <div className="semester-panel">
                      <div className="semester-panel-heading"><span>SELECT A SEMESTER</span><span>YEAR 0{year.id}</span></div>
                      <div className="semester-grid">
                        {year.semesters.map((semester) => (
                          <button
                            key={semester}
                            className={`semester-card ${activeSemester === semester ? 'semester-selected' : ''}`}
                            onClick={() => setActiveSemester(activeSemester === semester ? null : semester)}
                          >
                            <span className="semester-icon"><BookOpen size={17} /></span>
                            <span className="semester-copy"><strong>Semester {String(semester).padStart(2, '0')}</strong><small>{activeSemester === semester ? 'Selected' : 'Explore semester'}</small></span>
                            <ArrowRight size={16} className="semester-arrow" />
                          </button>
                        ))}
                      </div>
                      {activeSemester && year.semesters.includes(activeSemester) && (
                        <div className="coming-soon">
                          <span className="coming-icon"><Sparkles size={17} /></span>
                          <span><strong>We’re preparing this semester.</strong><small>Subject lists and syllabus details will be added here soon.</small></span>
                          <span className="coming-pill">COMING SOON</span>
                        </div>
                      )}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
          <p className="browse-footnote"><span>✳</span> More subjects and syllabus details are on the way.</p>
        </section>

        <section className="about-strip" id="about">
          <div className="about-icon"><BookOpen size={21} /></div>
          <div><h3>Made for students, by students.</h3><p>Simple to browse. Easier to study. Built one semester at a time.</p></div>
          <span className="about-decoration">BCA / NOTES</span>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#top"><span className="brand-mark"><BookOpen size={16} /></span><span>BCA<span className="brand-light">NOTES</span></span></a>
        <span>Study better, one page at a time.</span>
        <span>© {new Date().getFullYear()} BCA NOTES</span>
      </footer>
    </div>
  );
}

export default App;