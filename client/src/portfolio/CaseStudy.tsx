import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Check, CircleDashed } from 'lucide-react';
import { Modal } from './Modal';
import { person, type Project } from './data';

export function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const [stage, setStage] = useState(0);
  const [tab, setTab] = useState('Overview');
  const tabs = ['Overview', 'Architecture', 'Scope & outcomes'];
  function tabKey(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
    else if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = tabs.length - 1;
    else return;
    event.preventDefault(); setTab(tabs[next]); document.getElementById(`case-tab-${next}`)?.focus();
  }
  return <Modal label={`${project.title} case study`} onClose={onClose} className="case-modal"><header className="case-header"><div className="eyebrow">PROJECT RECORD / {project.number} <span className="case-status">{project.status === 'Completed' ? <Check size={12}/> : <CircleDashed size={12}/>} {project.status}</span></div><h2>{project.title}</h2><p>{project.premise}</p><div className="case-meta"><span>{project.date}</span><span>{project.role}</span><span>{project.discipline}</span></div></header>
    <div className="case-tabs" role="tablist" aria-label="Case study sections">{tabs.map((value, index) => <button key={value} id={`case-tab-${index}`} role="tab" aria-selected={tab === value} aria-controls="case-panel" tabIndex={tab === value ? 0 : -1} onKeyDown={event => tabKey(event, index)} onClick={() => setTab(value)}>{value}</button>)}</div>
    <div id="case-panel" role="tabpanel" aria-labelledby={`case-tab-${tabs.indexOf(tab)}`} tabIndex={0} className="case-panel">
      {tab === 'Overview' && <div className="case-overview"><div><span className="eyebrow">THE PROBLEM</span><h3>{project.discipline === 'DFIR' ? 'From evidence to an account of events.' : project.discipline === 'Secure systems' ? 'Security belongs in the foundation.' : 'A signal needs context.'}</h3><p>{project.problem}</p><button className="text-button" onClick={() => { setTab('Architecture'); requestAnimationFrame(() => document.getElementById('case-panel')?.focus()); }}>Explore the technical approach <ArrowRight size={16}/></button></div><aside><span className="eyebrow">TECHNICAL FOOTPRINT</span><div className="tag-list">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div><p className="case-note">{project.architectureLabel}</p></aside></div>}
      {tab === 'Architecture' && <div className="architecture"><span className="eyebrow">{project.architectureLabel}</span><h3>Follow the system, one stage at a time.</h3><div className="architecture-flow" role="group" aria-label="Explore architecture stages">{project.stages.map((item, index) => <button key={item.title} aria-pressed={stage === index} onClick={() => setStage(index)}><span className="stage-number">0{index + 1}</span><strong>{item.title}</strong><ArrowRight size={15}/></button>)}</div><div className="stage-detail" aria-live="polite"><span>0{stage + 1}</span><div><h4>{project.stages[stage].title}</h4><p>{project.stages[stage].detail}</p></div></div><p className="case-note">This diagram explains the project’s documented responsibilities and design. It is not a measured execution trace.</p></div>}
      {tab === 'Scope & outcomes' && <div className="scope-layout"><section><span className="eyebrow">CURRENT OUTCOME</span><h3>{project.status}</h3><p>{project.outcome}</p></section><section><span className="eyebrow">BOUNDARIES & NEXT QUESTIONS</span><h3>What this work does—and what is still open.</h3><p>{project.limitations}</p></section></div>}
    </div><footer className="case-footer"><span>Prashant Kumbhar / Engineering & investigation</span><a href={person.github} target="_blank" rel="noreferrer">GitHub profile <ArrowUpRight size={15}/></a></footer>
  </Modal>;
}
