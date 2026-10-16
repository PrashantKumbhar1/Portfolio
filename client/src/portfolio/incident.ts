export const incident = [
  {
    id: 'message', time: '10:42:01', source: 'mailbox-export.eml', type: 'Email record',
    title: 'A message introduces a link.',
    fields: [['Message-ID', '<case-017@lab.invalid>'], ['From', 'notice@accounts.lab.invalid'], ['To', 'analyst@workstation.invalid'], ['URL', 'https://review.lab.invalid/document']],
    content: 'Subject: Document ready for review\n\nA document is ready. Open the review link to view it.',
    interpretation: 'This message establishes a candidate entry point. A link and a sender name alone do not establish phishing or compromise.',
    provenance: 'Synthetic email record authored for this demonstration.',
  },
  {
    id: 'dns', time: '10:42:18', source: 'resolver-events.json', type: 'DNS event',
    title: 'The same hostname is resolved.',
    fields: [['Host', 'LAB-WS01'], ['Query', 'review.lab.invalid'], ['Answer', '192.0.2.40'], ['Event', 'DNS response']],
    content: '{ "host": "LAB-WS01", "query": "review.lab.invalid", "answer": "192.0.2.40" }',
    interpretation: 'The queried hostname matches the link in the email. A DNS response supports name resolution; it does not prove that a web page was loaded.',
    provenance: 'Synthetic resolver event. The IP is reserved for documentation.',
  },
  {
    id: 'request', time: '10:42:19', source: 'web-proxy.csv', type: 'HTTP request',
    title: 'A web request follows the lookup.',
    fields: [['Client', 'LAB-WS01'], ['Request', 'GET https://review.lab.invalid/document'], ['Status', '200'], ['Content-Disposition', 'attachment; filename="review.zip"']],
    content: '10:42:19,LAB-WS01,GET,review.lab.invalid/document,200,review.zip',
    interpretation: 'The proxy record connects the workstation to the email destination. The response advertises a ZIP attachment. A successful response alone does not prove file execution.',
    provenance: 'Synthetic proxy record, using the same hostname and workstation as the DNS event.',
  },
  {
    id: 'file', time: '10:42:20', source: 'file-events.json', type: 'File-system event',
    title: 'An archive is written to Downloads.',
    fields: [['Host', 'LAB-WS01'], ['Path', 'C:\\Users\\Analyst\\Downloads\\review.zip'], ['Event', 'FileCreated'], ['Process', 'browser.exe']],
    content: '{ "event": "FileCreated", "file": "review.zip", "process": "browser.exe", "host": "LAB-WS01" }',
    interpretation: 'The filename and timing are consistent with the response. No process creation, extraction, or payload analysis evidence is provided, so execution and maliciousness remain unproven.',
    provenance: 'Synthetic endpoint event. No file is downloaded by this demonstration.',
  },
];
