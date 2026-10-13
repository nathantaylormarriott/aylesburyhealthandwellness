import { Component, type ErrorInfo, type ReactNode } from 'react';

type Props = { children: ReactNode };
type State = { error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('App render error:', error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-[#FFFAF1] p-8 text-[#313C38]">
          <h1 className="text-xl font-bold mb-2">Something went wrong loading the site</h1>
          <p className="mb-4 text-sm text-[#83896D]">
            Try a hard refresh (Cmd+Shift+R). If this persists, open DevTools → Console and share the error.
          </p>
          <pre className="text-xs overflow-auto rounded-lg bg-white border border-[#83896D]/30 p-4">
            {this.state.error.message}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
