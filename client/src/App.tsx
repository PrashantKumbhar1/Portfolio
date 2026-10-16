import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Route, Switch } from 'wouter';
import Home from './pages/Home';
import NotFound from './pages/not-found';

class PortfolioBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error, info: ErrorInfo) { console.error('Portfolio rendering error', error, info.componentStack); }
  render() {
    if (this.state.failed) return <main className="recovery-page"><span className="eyebrow">PRASHANT KUMBHAR / PORTFOLIO</span><h1>This view couldn’t load.</h1><p>Please reload the page to try again.</p><button className="button-primary" onClick={() => window.location.reload()}>Reload portfolio</button></main>;
    return this.props.children;
  }
}

export default function App() {
  return <PortfolioBoundary><Switch><Route path="/" component={Home}/><Route component={NotFound}/></Switch></PortfolioBoundary>;
}
