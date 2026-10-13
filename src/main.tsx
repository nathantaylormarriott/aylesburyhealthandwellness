import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import LenisRoot from './components/LenisRoot';
import '@fontsource/geist-sans/latin-400.css';
import '@fontsource/geist-sans/latin-500.css';
import '@fontsource/geist-sans/latin-600.css';
import '@fontsource/geist-sans/latin-700.css';
import './index.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Missing #root element');
}

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);
document.getElementById('seo-static')?.remove();

createRoot(rootEl).render(
  <StrictMode>
    <ErrorBoundary>
      <LenisRoot>
        <App />
      </LenisRoot>
    </ErrorBoundary>
  </StrictMode>,
);
