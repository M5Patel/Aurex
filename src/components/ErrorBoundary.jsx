import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (typeof window !== 'undefined' && window.console) {
      console.error('ErrorBoundary caught:', error, info);
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white px-6">
          <h1 className="font-serif text-2xl md:text-3xl font-bold mb-4">Something went wrong</h1>
          <p className="text-zinc-400 text-center max-w-md mb-8">
            We encountered an unexpected error. Please try again or return home.
          </p>
          <Link
            to="/"
            className="px-8 py-3 bg-luxury-gold text-luxury-black font-semibold rounded-md hover:bg-luxury-gold-light transition-colors"
          >
            Return Home
          </Link>
        </div>
      );
    }
    return this.props.children;
  }
}
