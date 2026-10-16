import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Search } from 'lucide-react';
import { Modal } from './Modal';
import { projects } from './data';
export function CommandPalette({ onClose, onProject }: { onClose: () => void; onProject: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const commands = [
    ...[{ title: 'Prashant Kumbhar / introduction', anchor: 'overview' }, { title: 'Browse project case studies', anchor: 'work' }, { title: 'Education / Pillai College of Engineering', anchor: 'education' }, { title: 'About Prashant & education', anchor: 'about' }, { title: 'Experience & internships', anchor: 'experience' }, { title: 'Skills and technologies', anchor: 'skills' }, { title: 'Hackathons', anchor: 'hackathons' }, { title: 'Get in touch', anchor: 'contact' }].map(item => ({ id: item.anchor, title: item.title, type: 'Navigate', action: () => { onClose(); window.location.hash = item.anchor; } })),
    ...projects.map(project => ({ id: project.id, title: project.title, type: project.status, action: () => { onClose(); onProject(project.id); } })),
  ];
  const results = commands.filter(item => `${item.title} ${item.type}`.toLowerCase().includes(query.toLowerCase()));
  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { document.getElementById(`command-option-${active}`)?.scrollIntoView({ block: 'nearest' }); }, [active]);
  return <Modal onClose={onClose} label="Search the portfolio" className="command-modal"><div className="command-input"><Search size={20}/><input ref={inputRef} autoFocus role="combobox" aria-label="Search sections and projects" aria-expanded="true" aria-controls="command-results" aria-activedescendant={results.length ? `command-option-${active}` : undefined} autoComplete="off" placeholder="Find a project, section, or research…" value={query} onChange={event => { setQuery(event.target.value); setActive(0); }} onKeyDown={event => { if (event.key === 'ArrowDown' && results.length) { event.preventDefault(); setActive((active + 1) % results.length); } if (event.key === 'ArrowUp' && results.length) { event.preventDefault(); setActive((active - 1 + results.length) % results.length); } if (event.key === 'Enter' && results[active]) { event.preventDefault(); results[active].action(); } }}/></div><div className="command-results" id="command-results" role="listbox" aria-label="Matching destinations">{results.length ? results.map((item, index) => <div key={item.id} id={`command-option-${index}`} role="option" aria-selected={active === index} className={active === index ? 'active' : ''} onMouseEnter={() => setActive(index)}><button tabIndex={-1} onClick={item.action}><span>{item.title}<small>{item.type}</small></span><ArrowUpRight size={17}/></button></div>) : <p className="empty-state">No matches. Try “DFIR”, “ThreatCore”, or “education”.</p>}</div><footer><span>↑ ↓ to explore</span><span>↵ to open</span><span>Esc to close</span></footer></Modal>;
}
