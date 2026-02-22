import { ScrollRestoration } from 'react-router-dom';

/** Restores scroll on back navigation. New pages start at top. */
export default function ScrollToTop() {
  return <ScrollRestoration getKey={(location) => location.pathname} />;
}
