import { Outlet } from 'react-router-dom';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import ScrollToTop from '../components/layout/ScrollToTop';
import ScrollToTopButton from '../components/layout/ScrollToTopButton';
import Chatbot from '../components/chat/Chatbot';
import FeedbackForm from '../components/feedback/FeedbackForm';

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
      <ScrollToTopButton />
      <Chatbot />
      <FeedbackForm />
    </div>
  );
}
