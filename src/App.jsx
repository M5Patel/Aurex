import Routes from './routes';
import './index.css';
import { ToastProvider } from './components/layout/ToastProvider';
import PageLoader from './components/ui/PageLoader';

export default function App() {
  return (
    <>
      <PageLoader />
      <ToastProvider>
        <Routes />
      </ToastProvider>
    </>
  );
}
