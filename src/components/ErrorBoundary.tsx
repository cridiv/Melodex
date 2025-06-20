import React from 'react';

type ErrorBoundaryState = { hasError: boolean; error: unknown };

export class ErrorBoundary extends React.Component<React.PropsWithChildren<{}>, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, info: any) {
    console.error('🛑 Caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-500 p-10">
          <h1>Something went wrong</h1>
          <p>{this.state.error?.toString()}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
