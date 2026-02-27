import { Component } from 'react';
import { APP_VERSION } from '../config';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('❌ [ErrorBoundary]', error, info);
    // In production: send to Sentry / error monitoring
    // Sentry.captureException(error, { extra: info });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-agos-bg p-6">
          <div className="card p-8 max-w-md text-center">
            <div className="text-5xl mb-4">💥</div>
            <h1 className="font-display font-bold text-xl mb-2">Something went wrong</h1>
            <p className="text-agos-muted text-sm mb-4">An unexpected error occurred. Please try refreshing.</p>
            <pre className="text-xs text-agos-red bg-agos-surface p-3 rounded-lg text-left overflow-auto mb-4 max-h-32">
              {this.state.error?.message}
            </pre>
            <button onClick={() => window.location.reload()} className="btn-primary">Reload App</button>
            <p className="text-[10px] text-agos-dim mt-3">AGOS v{APP_VERSION}</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
