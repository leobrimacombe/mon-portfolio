import { Component } from 'react';

// Renders `fallback` instead of `children` once anything inside throws while
// rendering, so an optional layer (the WebGL hero) can fail without blanking the
// whole page. `onError` lets the parent react, e.g. by switching the 3D off.
export class ErrorBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    this.props.onError?.(error);
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}
