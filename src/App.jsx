import Routes from './routes';
import './index.css';
import { ToastProvider } from './components/layout/ToastProvider';

export default function App() {
  return (
    <ToastProvider>
      <Routes />
    </ToastProvider>
  );
}
