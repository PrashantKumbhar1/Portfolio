import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Code2, Fingerprint, Layers3, ScanLine, Shield } from 'lucide-react';
import { projects, type Project } from './data';
import { ProjectModel } from './ProjectModels';

export function ProjectVisual({ project }: { project: Project }) {
  const [stage, setStage] = useState(0);
  const icons = { threatcore: Shield, netra: Fingerprint, 'qr-security': ScanLine, phishing: ScanLine, civiclens: Code2 };
  const Icon = icons[project.id as keyof typeof icons];
  return <div className={`project-visual visual-${project.id}`}>
    <div className="visual-heading"><span>{project.status === 'Completed' ? 'WORKFLOW / CONCEPTUAL VIEW' : `ARCHITECTURE / ${project.status.toUpperCase()}`}</span><span>0{stage + 1}</span></div>
    <div className="project-diagram">
      {project.id === 'threatcore' && <><svg className="defense-connections" viewBox="0 0 400 240" aria-hidden="true"><path d="M90 65L300 65L300 180L90 180Z M90 65L300 180 M300 65L90 180"/></svg><div className="defense-center"><Icon size={47} strokeWidth={.9}/><span>THREATCORE</span></div><div className="defense-nodes">{project.stages.map((item, index) => <button key={item.title} className={stage === index ? 'active' : ''} onClick={() => setStage(index)} aria-pressed={stage === index}><span>0{index + 1}</span>{item.title}</button>)}</div></>}
      {project.id === 'netra' && <div className="netra-artifacts">{project.stages.map((item, index) => <button key={item.title} aria-pressed={stage === index} className={`evidence-sheet sheet-${index} ${stage === index ? 'active' : ''}`} onClick={() => setStage(index)}><span>DEVELOPMENT / 0{index + 1}</span>{index === 0 ? <Layers3 size={34} strokeWidth={1}/> : index === 1 ? <Fingerprint size={34} strokeWidth={1}/> : index === 2 ? <Code2 size={34} strokeWidth={1}/> : <Shield size={34} strokeWidth={1}/>}<strong>{item.title}</strong><i/><i/><i/></button>)}</div>}
      {project.id === 'qr-security' && <ProjectModel kind="qr-security" stage={stage}/>}
      {project.id === 'phishing' && <ProjectModel kind="phishing" stage={stage}/>}
      {project.id === 'civiclens' && <ProjectModel kind="civiclens" stage={stage}/>}
    </div>
    {project.id !== 'threatcore' && <div className="visual-stages" role="group" aria-label={`${project.title} architecture stages`}>{project.stages.map((item,index) => <button key={item.title} aria-pressed={stage === index} onClick={() => setStage(index)}>{item.title}</button>)}</div>}
    <p className="visual-stage-description" aria-live="polite">{project.stages[stage].detail}</p>
  </div>;
}
const distinct: Record<string, string> = {
  threatcore: 'Now in final-stage development, ThreatCore connects deep-learning detections with MITRE ATT&CK context, a PPO defense agent, and explanations an analyst can read.',
  netra: 'In active development, NETRA brings evidence provenance, indicator correlation, attack reconstruction, and AI-assisted investigation into one analyst-focused workflow.',
  'qr-security': 'Its focus is QRishing and UPI fraud patterns, with explainable risk scoring that gives each flagged transaction a human-readable justification.',
  phishing: 'URL and lexical feature engineering form the core of the classification approach, with the aim of distinguishing suspicious sources and reducing false positives.',
  civiclens: 'Authentication and role-based access sit alongside duplicate detection and ML prioritization, connecting secure software engineering with intelligent workflows.',
};
export function ProjectShowcase({ onProject }: { onProject: (id: string) => void }) {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  function goTo(index: number) {
    const container = track.current;
    const slide = container?.children[index] as HTMLElement | undefined;
    const first = container?.children[0] as HTMLElement | undefined;
    if (!container || !slide || !first) return;
    container.scrollTo({ left: slide.offsetLeft - first.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  function updateActive() {
    const container = track.current;
    if (!container) return;
    const left = container.getBoundingClientRect().left;
    let nearest = 0, distance = Infinity;
    Array.from(container.children).forEach((child, index) => {
      const delta = Math.abs(child.getBoundingClientRect().left - left);
      if (delta < distance) { distance = delta; nearest = index; }
    });
    setActive(nearest);
  }
  return <section id="work" className="new-section showcase"><div className="section-heading"><div><span className="overline">02 / SELECTED ENGINEERING</span><h2>Built with intent.<br/><em>Investigated with curiosity.</em></h2></div><p>Security, evidence, and intelligent systems.<br/>The work that connects my interests.</p></div><div className="project-slider-controls" aria-label="Project navigation"><button type="button" aria-label="Previous project" disabled={active===0} onClick={()=>goTo(active-1)}><ArrowLeft size={18}/></button><span aria-live="polite">{String(active+1).padStart(2,'0')} / {String(projects.length).padStart(2,'0')}<small>Swipe to explore projects</small></span><button type="button" aria-label="Next project" disabled={active===projects.length-1} onClick={()=>goTo(active+1)}><ArrowRight size={18}/></button></div><div className="showcase-layout" ref={track} onScroll={updateActive}>{projects.map(project => <article className={`showcase-project showcase-${project.id}`} key={project.id}><div className="showcase-copy"><div className="project-topline"><span>{project.number} / {project.discipline}</span><span className="project-status"><i/>{project.status}</span></div><h3>{project.title}</h3><p>{project.premise}</p><p className="project-distinction">{distinct[project.id]}</p><div className="tech-tags">{project.tools.map(tool => <span key={tool}>{tool}</span>)}</div><button className="case-link" onClick={() => onProject(project.id)}>Explore the case study <ArrowUpRight size={19}/></button></div><ProjectVisual project={project}/></article>)}</div></section>;
}
