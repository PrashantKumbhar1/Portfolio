export type Discipline = 'All' | 'DFIR' | 'AI & detection' | 'Secure systems';
export type Project = {
  id: string; number: string; title: string; shortTitle: string; discipline: Exclude<Discipline, 'All'>;
  status: string; date: string; role: string; premise: string; problem: string;
  stages: { title: string; detail: string }[]; outcome: string; limitations: string;
  tools: string[]; connections: string[]; architectureLabel: string;
};
export const person = {
  name: 'Prashant Kumbhar', email: 'kumbharprashant494@gmail.com',
  github: 'https://github.com/PrashantKumbhar1',
  linkedin: 'https://www.linkedin.com/in/prashant-kumbhar-784920356/',
  resume: '/PrashantKumbhar_Cybersecurity.docx',
};
export const projects: Project[] = [
  {
    id: 'threatcore', number: '01', title: 'ThreatCore', shortTitle: 'ThreatCore', discipline: 'AI & detection',
    status: 'In development', date: 'Mar 2026 — Present', role: 'Academic major project · Team of four',
    premise: 'Connecting threat detection, attacker context, and explainable defensive decisions.',
    problem: 'A detection becomes more useful when it can be understood in the context of an attack and connected to a defensive action. ThreatCore explores that connection in an autonomous cyber-defense framework.',
    architectureLabel: 'Proposed framework · active development',
    stages: [
      { title: 'Detect', detail: 'Designing DNN and LSTM models to identify malicious activity.' },
      { title: 'Contextualize', detail: 'Integrating a MITRE ATT&CK knowledge graph to connect detections with attacker tactics and techniques.' },
      { title: 'Respond', detail: 'Architecting a PPO reinforcement learning agent to evaluate security state and select defensive actions based on severity and context.' },
      { title: 'Explain', detail: 'Incorporating XAI for interpretable decisions and an LLM assistant for readable incident summaries.' },
    ],
    outcome: 'An academic major project in active development, combining AI detection with contextual defense and explanation.',
    limitations: 'This is an evolving design, not a production defense platform. Transfer learning and meta-learning are scoped extensions. No measured detection accuracy or response-performance results are reported here.',
    tools: ['Python', 'DNN / LSTM', 'PPO', 'MITRE ATT&CK', 'XAI', 'LLMs', 'Wazuh'],
    connections: ['ai', 'context', 'explain'],
  },
  {
    id: 'netra', number: '02', title: 'NETRA', shortTitle: 'NETRA', discipline: 'DFIR',
    status: 'Research & architecture', date: 'Aug 2026 — Present', role: 'Personal research · Solo',
    premise: 'Turning fragmented security evidence into an investigation that an analyst can follow.',
    problem: 'Evidence storage is only one part of an investigation. I am researching a SOC/NETRA that can support preservation, correlation, investigation, and reconstruction of cyber incidents.',
    architectureLabel: 'Research model · implementation has not started',
    stages: [
      { title: 'Preserve', detail: 'Scoping evidence collection and preservation with chain-of-custody tracking.' },
      { title: 'Correlate', detail: 'Exploring IOC and threat-intelligence correlation to connect forensic evidence with security telemetry.' },
      { title: 'Reconstruct', detail: 'Designing attack-chain reconstruction workflows that help analysts understand the sequence of events.' },
      { title: 'Investigate', detail: 'Researching AI-assisted investigation workflows. Python is planned for implementation.' },
    ],
    outcome: 'Research and architecture for a personal NETRA. The project directly reflects the field I want to grow into.',
    limitations: 'The capabilities shown are planned. No acquisition engine, evidence parser, live investigation service, or completed implementation is claimed.',
    tools: ['DFIR', 'Threat hunting', 'Threat intelligence', 'Chain of custody', 'Python (planned)'],
    connections: ['context', 'evidence', 'explain'],
  },
  {
    id: 'qr-security', number: '03', title: 'QR Security Engine', shortTitle: 'QR Security Engine', discipline: 'AI & detection',
    status: 'Completed', date: 'Feb — Aug 2026', role: 'Personal project · Solo',
    premise: 'Examining the destination behind a QR scan and explaining the risk of a payment link.',
    problem: 'QR codes and UPI payment links can conceal phishing and QRishing attempts. I built an engine to analyze these artifacts and make flagged risks understandable.',
    architectureLabel: 'Implemented workflow · simplified conceptual view',
    stages: [
      { title: 'Read', detail: 'Used Python, Flask, and OpenCV to analyze QR codes and UPI payment links.' },
      { title: 'Assess', detail: 'Designed detection logic around real-world UPI fraud patterns and QR-based phishing techniques.' },
      { title: 'Score', detail: 'Implemented risk scoring to communicate the severity of flagged transactions.' },
      { title: 'Explain', detail: 'Added explainable output so flagged transactions include a human-readable justification.' },
    ],
    outcome: 'A QR/UPI threat-detection engine with risk scoring and explanatory output.',
    limitations: 'Benchmark datasets, measured accuracy, and deployment results are not included in this case study. Risk output should support review rather than establish fraud by itself.',
    tools: ['Python', 'Flask', 'OpenCV', 'Scikit-learn', 'XAI', 'UPI URL analysis'],
    connections: ['ai', 'explain', 'web'],
  },
  {
    id: 'phishing', number: '04', title: 'AI-Phishing Attack Detection', shortTitle: 'Phishing detection', discipline: 'AI & detection',
    status: 'Completed', date: 'Nov 2025 — Jan 2026', role: 'Personal project · Solo',
    premise: 'Using the structure of a URL as a signal for potential phishing.',
    problem: 'Malicious URLs and phishing websites can resemble legitimate sources. This project explores how URL and lexical features can help an ML pipeline distinguish them.',
    architectureLabel: 'Implemented pipeline · simplified conceptual view',
    stages: [
      { title: 'Inspect', detail: 'Analyzed URL and lexical attributes as inputs to a phishing-detection pipeline.' },
      { title: 'Engineer', detail: 'Applied feature engineering to distinguish suspicious sources from legitimate ones, with the aim of reducing false positives.' },
      { title: 'Classify', detail: 'Built classification using Scikit-learn, with Flask supporting the application pipeline.' },
    ],
    outcome: 'An ML-based pipeline for classifying malicious URLs and phishing websites.',
    limitations: 'Accuracy, false-positive rate, and independent validation figures are not included in this case study.',
    tools: ['Python', 'Scikit-learn', 'Flask', 'Pandas', 'Feature engineering'],
    connections: ['ai', 'web'],
  },
  {
    id: 'civiclens', number: '05', title: 'CivicLens AI', shortTitle: 'CivicLens AI', discipline: 'Secure systems',
    status: 'Completed', date: 'Jul — Oct 2025', role: 'Team project',
    premise: 'Secure API workflows for an AI-assisted civic complaint platform.',
    problem: 'A complaint platform needs protected access and dependable workflows, alongside a way to recognize duplicate reports and prioritize issues.',
    architectureLabel: 'Implemented backend responsibilities · conceptual view',
    stages: [
      { title: 'Authenticate', detail: 'Built REST APIs with JWT authentication to protect access to application workflows.' },
      { title: 'Authorize', detail: 'Implemented role-based access control for appropriate access to complaint operations.' },
      { title: 'Process', detail: 'Developed complaint creation, retrieval, and update workflows using Flask and MongoDB.' },
      { title: 'Prioritize', detail: 'Implemented duplicate-complaint detection and ML-based complaint prioritization.' },
    ],
    outcome: 'Secure backend APIs with authenticated, role-aware workflows and ML-assisted complaint processing.',
    limitations: 'No production scale, performance benchmark, or independent security audit is claimed.',
    tools: ['Python', 'Flask', 'REST APIs', 'MongoDB', 'Machine learning', 'JWT / RBAC'],
    connections: ['web', 'ai'],
  },
];
export const concepts = [
  { id: 'evidence', label: 'Evidence & provenance', detail: 'Chain of custody and evidence preservation are planned foundations of the NETRA.', tool: 'DFIR / chain of custody' },
  { id: 'context', label: 'Attack context', detail: 'ThreatCore explores MITRE ATT&CK context; NETRA research explores threat intelligence and attack reconstruction.', tool: 'MITRE ATT&CK / threat intelligence' },
  { id: 'ai', label: 'AI engineering', detail: 'ML is used in the detection and civic projects. DNN, LSTM, and PPO are part of the developing ThreatCore framework.', tool: 'Scikit-learn / DNN / LSTM / PPO' },
  { id: 'explain', label: 'Explainable decisions', detail: 'QR Security Engine provides risk explanations. ThreatCore plans XAI and readable incident summaries; NETRA research scopes AI-assisted investigation.', tool: 'XAI / LLMs / analyst workflows' },
  { id: 'web', label: 'Application security', detail: 'URL analysis, secure APIs, JWT authentication, and role-based access connect the detection and backend projects.', tool: 'Flask / JWT / RBAC / URL analysis' },
];
export const skills = [
  { name: 'Investigate & assess', note: 'Foundations and tools', items: ['VAPT', 'OWASP Top 10', 'MITRE ATT&CK', 'Threat hunting fundamentals', 'Nmap', 'Burp Suite', 'Wireshark', 'Metasploit', 'Nikto'] },
  { name: 'Detect & explain', note: 'Project work and active exploration', items: ['Scikit-learn', 'Pandas', 'OpenCV', 'DNN', 'LSTM', 'PPO', 'Explainable AI', 'LLM-based assistants'] },
  { name: 'Build & secure', note: 'Engineering toolkit', items: ['Python', 'JavaScript', 'C', 'Flask', 'Node.js', 'REST APIs', 'JWT / RBAC', 'MySQL', 'PostgreSQL', 'MongoDB', 'Firebase', 'Docker', 'Git', 'Postman', 'Linux', 'Windows'] },
];
export const disciplines: Discipline[] = ['All', 'DFIR', 'AI & detection', 'Secure systems'];
export const projectById = (id: string) => projects.find(project => project.id === id);
