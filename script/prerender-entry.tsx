import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import Home from '../client/src/pages/Home';
import NotFound from '../client/src/pages/not-found';
export { person, projects } from '../client/src/portfolio/data';

// Render the very same components and initial state used by the browser.
export const renderHome = () => renderToString(createElement(Home));
export const render404 = () => renderToString(createElement(NotFound));
