import { ArrowLeft } from 'lucide-react';
export default function NotFound() {
  return <main className="recovery-page"><span className="eyebrow">404 / PAGE NOT FOUND</span><h1>This path doesn’t lead to a page.</h1><p>Return to the portfolio to explore the cybersecurity projects, skills, and background.</p><a className="button-primary" href="/"><ArrowLeft size={17}/>Return to portfolio</a></main>;
}
