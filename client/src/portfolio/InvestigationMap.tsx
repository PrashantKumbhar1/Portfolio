import { useState } from 'react';
import { ArrowUpRight, Fingerprint, Network, ScanLine, Shield, Code2, RotateCcw } from 'lucide-react';
import { concepts, disciplines, projects, type Discipline } from './data';

const positions: Record<string, [number, number]> = {
  netra: [20, 27], threatcore: [76, 18], 'qr-security': [80, 69], phishing: [46, 86], civiclens: [15, 70],
  evidence: [37, 12], context: [49, 33], ai: [65, 47], explain: [49, 61], web: [28, 49],
};
const icons = { netra: Fingerprint, threatcore: Shield, 'qr-security': ScanLine, phishing: Network, civiclens: Code2 };

export function InvestigationMap({ onProject }: { onProject: (id: string) => void }) {
  const [filter, setFilter] = useState<Discipline>('All');
  const [selected, setSelected] = useState('netra');
  const selectedProject = projects.find(project => project.id === selected);
  const selectedConcept = concepts.find(concept => concept.id === selected);
  const visibleProjects = projects.filter(project => filter === 'All' || project.discipline === filter);
  const visibleConcepts = concepts.filter(concept => visibleProjects.some(project => project.connections.includes(concept.id)));
  const connected = new Set(selectedProject ? [selected, ...selectedProject.connections] : [selected, ...visibleProjects.filter(project => project.connections.includes(selected)).map(project => project.id)]);

  function changeFilter(value: Discipline) {
    setFilter(value);
    const first = projects.find(project => value === 'All' || project.discipline === value);
    if (first) setSelected(first.id);
  }

  return <div className="investigation-map">
    <div className="map-toolbar"><span className="eyebrow"><span className="small-cross">+</span> A MAP OF MY WORK</span><button className="icon-button" aria-label="Reset investigation map" onClick={() => { setFilter('All'); setSelected('netra'); }}><RotateCcw size={15}/></button></div>
    <div className="map-filters" role="group" aria-label="Filter investigation map">{disciplines.map(value => <button key={value} aria-pressed={filter === value} onClick={() => changeFilter(value)}>{value === 'All' ? 'All connections' : value}</button>)}</div>
    <div className="graph" aria-label="Projects connected to their technical disciplines and concepts">
      <svg className="graph-edges" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        {visibleProjects.flatMap(project => project.connections.map(concept => {
          const a = positions[project.id], b = positions[concept];
          const active = selected === project.id || selected === concept;
          return <path key={`${project.id}-${concept}`} className={active ? 'edge active' : 'edge'} d={`M ${a[0]} ${a[1]} Q ${(a[0] + b[0]) / 2 + 4} ${(a[1] + b[1]) / 2 - 3} ${b[0]} ${b[1]}`}/>;
        }))}
      </svg>
      {visibleConcepts.map(concept => <button className={`concept-node ${connected.has(concept.id) ? 'related' : ''} ${selected === concept.id ? 'selected' : ''}`} key={concept.id} style={{ left: `${positions[concept.id][0]}%`, top: `${positions[concept.id][1]}%` }} aria-pressed={selected === concept.id} onClick={() => setSelected(concept.id)}><span className="concept-point"/><span>{concept.label}</span></button>)}
      {visibleProjects.map(project => {
        const Icon = icons[project.id as keyof typeof icons];
        return <button key={project.id} className={`project-node ${connected.has(project.id) ? 'related' : ''} ${selected === project.id ? 'selected' : ''}`} style={{ left: `${positions[project.id][0]}%`, top: `${positions[project.id][1]}%` }} aria-pressed={selected === project.id} onClick={() => setSelected(project.id)}><span className="node-id">{project.number} / {project.discipline === 'DFIR' ? 'RESEARCH' : 'PROJECT'}</span><Icon size={22} strokeWidth={1.25}/><strong>{project.shortTitle}</strong><span className="node-status">{project.status}</span></button>;
      })}
    </div>
    <div className="map-legend"><span><i className="legend-project"/> Project</span><span><i className="legend-concept"/> Concept</span><span className="map-instruction">Select a node to follow its connections</span></div>
    <div className="map-inspector" aria-live="polite"><div><span className="eyebrow">{selectedProject ? `SELECTED / ${selectedProject.status}` : 'CONNECTION / TECHNICAL CONTEXT'}</span><h3>{selectedProject?.shortTitle ?? selectedConcept?.label}</h3><p>{selectedProject?.premise ?? selectedConcept?.detail}</p></div>{selectedProject ? <button className="inspector-link" onClick={() => onProject(selectedProject.id)} aria-label={`Read ${selectedProject.title} case study`}><ArrowUpRight size={22}/></button> : <div className="concept-links">{visibleProjects.filter(project => project.connections.includes(selected)).map(project => <button key={project.id} onClick={() => onProject(project.id)}>{project.shortTitle}<ArrowUpRight size={12}/></button>)}</div>}</div>
  </div>;
}
