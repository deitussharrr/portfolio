import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  FiAward, FiBookOpen, FiCode, FiCpu, FiExternalLink, FiFolder, FiGithub,
  FiHardDrive, FiLinkedin, FiMail, FiMonitor, FiPower, FiSearch, FiTerminal,
  FiUser, FiUsers, FiX
} from 'react-icons/fi';
import DetailView from './components/DetailView';
import profileImg from './assets/profile.jpg';
import startOrbImg from './assets/portfolio-start-snowflake.png';
import {
  certifications, education, experience, profile, projects, publication, skills
} from './data/portfolio';

const iconMap = {
  about: <FiUser />, experience: <FiUsers />, education: <FiBookOpen />,
  certifications: <FiAward />, skills: <FiCode />, projects: <FiFolder />,
  publication: <FiBookOpen />, contact: <FiMail />, system: <FiCpu />, terminal: <FiTerminal />
};

const apps = [
  { id: 'about', label: 'About', title: 'About Tusshar' }, { id: 'experience', label: 'Experience', title: 'Experience' },
  { id: 'education', label: 'Education', title: 'Education' }, { id: 'certifications', label: 'Certifications', title: 'Certification Center' },
  { id: 'skills', label: 'Skills', title: 'Skill Explorer' }, { id: 'projects', label: 'Projects', title: 'Projects' },
  { id: 'publication', label: 'Publication', title: 'Publication' }, { id: 'contact', label: 'Contact', title: 'Contact' },
  { id: 'system', label: 'System Information', title: 'System Information' }, { id: 'terminal', label: 'Terminal', title: 'Windows Terminal' },
];

const searchable = [
  ...certifications.map(item => ({ ...item, type: 'Certification', text: `${item.title} ${item.issuer}` })),
  ...skills.map(item => ({ title: item, issuer: 'Skill', type: 'Skill', text: item })),
  ...experience.map(item => ({ ...item, title: item.role, issuer: item.organization, type: 'Experience', text: `${item.role} ${item.organization}` })),
  ...education.map(item => ({ ...item, title: item.program, issuer: item.institution, type: 'Education', text: `${item.program} ${item.institution}` })),
  ...projects.map(item => ({ ...item, type: 'Project', text: `${item.title} ${item.description} ${item.tags.join(' ')}` })),
];

function App() {
  const [openApps, setOpenApps] = useState([]);
  const [focused, setFocused] = useState(null);
  const [startOpen, setStartOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [time, setTime] = useState(new Date());
  const [terminalLines, setTerminalLines] = useState(['TussharOS Terminal [Portfolio Edition]', 'Type "help" to see available commands.']);
  const [terminalInput, setTerminalInput] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const shortcut = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault(); setSearchOpen(true); setStartOpen(false);
      }
    };
    window.addEventListener('keydown', shortcut);
    return () => { clearInterval(timer); window.removeEventListener('keydown', shortcut); };
  }, []);

  const launch = (app) => {
    setOpenApps(current => current.some(item => item.id === app.id) ? current.map(item => item.id === app.id ? { ...item, minimized: false } : item) : [...current, { ...app, minimized: false }]);
    setFocused(app.id); setStartOpen(false); setSearchOpen(false);
  };
  const close = (id) => { setOpenApps(current => current.filter(item => item.id !== id)); setFocused(current => current === id ? null : current); };
  const minimize = (id) => { setOpenApps(current => current.map(item => item.id === id ? { ...item, minimized: true } : item)); setFocused(null); };
  const toggleTask = (id) => {
    const app = openApps.find(item => item.id === id);
    if (!app) return;
    if (app.minimized || focused !== id) { launch(app); } else { minimize(id); }
  };

  const results = useMemo(() => query.trim() ? searchable.filter(item => item.text.toLowerCase().includes(query.toLowerCase())).slice(0, 8) : [], [query]);
  const runCommand = (event) => {
    event.preventDefault();
    const command = terminalInput.trim().toLowerCase();
    const commandAliases = {
      about: 'about',
      whoami: 'about',
      experience: 'experience',
      education: 'education',
      certs: 'certifications',
      certifications: 'certifications',
      skills: 'skills',
      projects: 'projects',
      publication: 'publication',
      contact: 'contact',
      systeminfo: 'system',
      system: 'system',
      terminal: 'terminal',
    };
    const responses = {
      help: 'about -> About | experience -> Experience | education -> Education | certs -> Certifications | skills -> Skills | projects -> Projects | publication -> Publication | contact -> Contact | systeminfo -> System Information | clear -> Clear terminal',
      about: profile.about, whoami: `${profile.name} — ${profile.title}`,
      experience: `${experience.length} experience entries indexed.`, education: `${education.length} education records indexed.`,
      certs: `${certifications.length} certifications indexed.`, skills: `${skills.length} skills indexed.`,
      projects: projects.map(item => item.title).join(' • '), systeminfo: 'TussharOS 12 | Portfolio Edition | Status: Online',
    };
    if (command === 'clear') {
      setTerminalLines([]);
    } else {
      const target = commandAliases[command];
      if (target) {
        const targetApp = apps.find(app => app.id === target);
        if (targetApp) launch(targetApp);
      }
      setTerminalLines(lines => [...lines, `PS> ${terminalInput}`, target ? `Opening ${target}...` : (responses[command] || `Command not found: ${command}`)]);
    }
    setTerminalInput('');
  };

  const renderContent = (id) => {
    if (id === 'about') return <div className="app-stack"><div className="profile-hero"><img src={profileImg} alt={profile.name} /><div><span className="eyebrow">PERSONAL OPERATING SYSTEM</span><h2>{profile.name}</h2><p>{profile.title} · {profile.location}</p><div className="inline-links"><a href={profile.github} target="_blank" rel="noreferrer"><FiGithub /> GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer"><FiLinkedin /> LinkedIn</a></div></div></div><section className="info-panel"><span className="eyebrow">ABOUT</span><p>{profile.about}</p><p className="muted">Building at the intersection of software engineering, artificial intelligence, product design, and human-centered technology.</p></section><div className="stat-grid"><div><strong>{experience.length}</strong><span>experience records</span></div><div><strong>{certifications.length}</strong><span>certifications</span></div><div><strong>{skills.length}</strong><span>skills indexed</span></div></div></div>;
    if (id === 'experience') return <div className="app-stack"><AppHeader eyebrow="ACTIVITY HISTORY" title="Experience" count={`${experience.length} records`} /><div className="timeline">{experience.map((item, index) => <article className="timeline-entry" key={`${item.organization}-${item.role}-${index}`}><span className="timeline-dot" /><div><div className="record-meta">{item.dates} · {item.mode}</div><h3>{item.role}</h3><p className="accent">{item.organization}</p>{item.skills && <div className="tag-row">{item.skills.map(skill => <span key={skill}>{skill}</span>)}</div>}</div></article>)}</div></div>;
    if (id === 'education') return <div className="app-stack"><AppHeader eyebrow="ACADEMIC RECORDS" title="Education" /><div className="record-grid">{education.map((item, index) => <article className="record-card" key={`${item.institution}-${index}`}><FiBookOpen /><div><div className="record-meta">{item.dates}</div><h3>{item.program}</h3><p className="accent">{item.institution}</p>{item.detail && <p className="muted">{item.detail}</p>}</div></article>)}</div></div>;
    if (id === 'certifications') return <Explorer title="Certification Center" eyebrow="LICENSES & CERTIFICATIONS" items={certifications} countLabel="certifications" renderItem={(item) => <article className="explorer-row"><FiAward /><div><h3>{item.title}</h3><p className="accent">{item.issuer} · {item.issued}</p>{item.credentialId && <small>Credential ID: {item.credentialId}</small>}</div></article>} />;
    if (id === 'skills') return <Explorer title="Skill Explorer" eyebrow="CAPABILITY INDEX" items={skills.map(title => ({ title, issuer: 'Skill' }))} countLabel="skills" renderItem={(item) => <span className="skill-chip">{item.title}</span>} />;
    if (id === 'projects') return <div className="app-stack"><AppHeader eyebrow="WORKSPACE" title="Projects" /><div className="record-grid">{projects.map(item => <article className="record-card project-card" key={item.title}><FiFolder /><div><div className="record-meta">{item.dates}</div><h3>{item.title}</h3><p className="accent">{item.subtitle}</p>{item.description && <p className="muted">{item.description}</p>}<div className="tag-row">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>{item.link !== '#' && <a href={item.link} target="_blank" rel="noreferrer" className="text-link">Open project <FiExternalLink /></a>}</div></article>)}</div></div>;
    if (id === 'publication') return <div className="app-stack"><AppHeader eyebrow="RESEARCH NODE" title="Publication" /><article className="publication-card"><FiBookOpen /><h2>{publication}</h2><p className="muted">Publication information from the existing portfolio record.</p></article></div>;
    if (id === 'system') return <div className="app-stack"><AppHeader eyebrow="ABOUT THIS PC" title="TussharOS 12" /><div className="system-card"><div className="system-orb"><FiMonitor /></div><h2>TussharOS 12</h2><p className="accent">Portfolio Edition · Personal developer workspace</p>{[['Build', '12.0.2026'], ['Architecture', 'Full Stack / AI / Systems'], ['Status', 'Online'], ['Experience records', experience.length], ['Certification nodes', certifications.length], ['Skill vectors', skills.length]].map(([label, value]) => <div className="system-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div></div>;
    if (id === 'terminal') return <div className="terminal-app"><div className="terminal-output">{terminalLines.map((line, index) => <div key={`${line}-${index}`}>{line}</div>)}</div><form onSubmit={runCommand} className="terminal-form"><span>PS&gt;</span><input autoFocus value={terminalInput} onChange={event => setTerminalInput(event.target.value)} aria-label="Terminal command" /></form></div>;
    return <div className="app-stack"><AppHeader eyebrow="COMMUNICATIONS" title="Contact" /><section className="contact-panel"><p>Open a channel to say hello.</p><a href={`mailto:${profile.email}`} className="contact-link"><FiMail /> {profile.email}</a><a href={profile.linkedin} target="_blank" rel="noreferrer" className="contact-link"><FiLinkedin /> LinkedIn</a><a href={profile.github} target="_blank" rel="noreferrer" className="contact-link"><FiGithub /> GitHub</a></section></div>;
  };

  const desktopApps = apps.slice(0, 7);
  return <div className="os-shell">
    <main className="desktop-surface" onClick={() => { setStartOpen(false); setSearchOpen(false); }}>
      <div className="ambient-grid" />
      <div className="mobile-status-bar"><span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span><span className="mobile-status-icons"><FiHardDrive /><FiMessageSquare /></span></div>
      <section className="desktop-welcome" aria-label="Portfolio overview"><div className="welcome-copy"><span className="eyebrow">WELCOME BACK</span><h1>{profile.name}</h1><p>{profile.title} building thoughtful systems across AI, software, and design.</p><div className="welcome-actions"><button onClick={() => launch(apps[0])}><FiUser /> Open profile</button><button className="secondary" onClick={() => launch(apps[5])}><FiFolder /> View projects</button></div></div><div className="welcome-metrics"><div><strong>{certifications.length}</strong><span>certifications</span></div><div><strong>{skills.length}</strong><span>skills</span></div><div><strong>{experience.length}</strong><span>roles</span></div></div></section>
      <div className="desktop-icons-container">{desktopApps.map(app => <button className="desktop-icon" key={app.id} aria-label={`Open ${app.label}`} onDoubleClick={() => launch(app)} onClick={event => event.stopPropagation()}><span className="desktop-icon-image">{iconMap[app.id]}</span><span>{app.label}</span></button>)}</div>
      <AnimatePresence>{openApps.filter(app => !app.minimized).map((app, index) => <DetailView key={app.id} isOpen onClose={() => close(app.id)} onMinimize={() => minimize(app.id)} title={app.title} icon={iconMap[app.id]} initialX={90 + index * 28} initialY={55 + index * 24} isFocused={focused === app.id} onFocus={() => { setFocused(app.id); setStartOpen(false); }}><div className="window-content">{renderContent(app.id)}</div></DetailView>)}</AnimatePresence>
      <AnimatePresence>{startOpen && <aside className="start-menu-modern" onClick={event => event.stopPropagation()}><div className="start-profile"><img src={profileImg} alt="" /><div><strong>{profile.name}</strong><small>{profile.title}</small></div></div><button className="launcher-search" onClick={() => setSearchOpen(true)}><FiSearch /> Search portfolio <kbd>Ctrl K</kbd></button><span className="eyebrow">PINNED</span><div className="launcher-grid">{apps.map(app => <button key={app.id} onClick={() => launch(app)}><span>{iconMap[app.id]}</span>{app.label}</button>)}</div><div className="start-footer"><span>TussharOS Portfolio Edition</span><FiPower /></div></aside>}</AnimatePresence>
      <AnimatePresence>{searchOpen && <div className="search-overlay" onClick={event => event.stopPropagation()}><div className="global-search"><div className="search-input"><FiSearch /><input autoFocus placeholder="Search certifications, skills, experience…" value={query} onChange={event => setQuery(event.target.value)} /><button onClick={() => setSearchOpen(false)} aria-label="Close search"><FiX /></button></div>{query && <div className="search-results">{results.length ? results.map((item, index) => <button key={`${item.type}-${item.title}-${index}`} onClick={() => { launch(apps.find(app => app.id === item.type.toLowerCase()) || apps.find(app => app.id === (item.type === 'Certification' ? 'certifications' : item.type === 'Skill' ? 'skills' : item.type === 'Project' ? 'projects' : item.type.toLowerCase()))); }}><span className="result-type">{item.type}</span><strong>{item.title}</strong><small>{item.issuer}</small></button>) : <p className="muted">No indexed records found.</p>}</div>}</div></div>}</AnimatePresence>
    </main>
    <footer className="taskbar-modern"><button className="start-button" onClick={event => { event.stopPropagation(); setStartOpen(value => !value); }}><img src={startOrbImg} alt="Open start menu" /><span>Start</span></button><button className="taskbar-search" onClick={() => setSearchOpen(true)}><FiSearch /> <span>Search portfolio</span></button><div className="taskbar-apps">{openApps.map(app => <button className={focused === app.id && !app.minimized ? 'active' : ''} key={app.id} onClick={() => toggleTask(app.id)}>{iconMap[app.id]}<span>{app.label}</span></button>)}</div><div className="system-tray-modern"><FiHardDrive /><span>{time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}<small>{time.toLocaleDateString([], { month: 'short', day: 'numeric' })}</small></span></div><span className="mobile-home-indicator" /></footer>
  </div>;
}

function AppHeader({ eyebrow, title, count }) { return <header className="app-header"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{count && <span className="count-badge">{count}</span>}</header>; }
function Explorer({ title, eyebrow, items, countLabel, renderItem }) {
  const [query, setQuery] = useState('');
  const filtered = items.filter(item => `${item.title} ${item.issuer}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="app-stack"><AppHeader eyebrow={eyebrow} title={title} count={`${filtered.length} / ${items.length} ${countLabel}`} /><label className="local-search"><FiSearch /><input value={query} onChange={event => setQuery(event.target.value)} placeholder={`Filter ${countLabel}…`} /></label><div className={countLabel === 'skills' ? 'skill-cloud' : 'explorer-list'}>{filtered.map((item, index) => <React.Fragment key={`${item.title}-${index}`}>{renderItem(item)}</React.Fragment>)}</div></div>;
}

export default App;
