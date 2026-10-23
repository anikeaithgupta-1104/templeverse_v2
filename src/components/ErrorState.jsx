import React from "react";
import { Component } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

/** Friendly error state used across all data-driven pages. */
export default function ErrorState({ title = "Something went wrong", message, onRetry }) {
  return (
    <div className="flex min-h-[45vh] flex-col items-center justify-center gap-4 px-6 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <AlertTriangle className="h-8 w-8 text-red-500" aria-hidden="true" />
      </div>
      <h2 className="font-display text-2xl font-semibold text-midnight">{title}</h2>
      {message && <p className="max-w-md text-sm text-midnight-700/70">{message}</p>}
      {onRetry && (
        <button className="btn btn-dark btn-sm mt-2" onClick={onRetry}>
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Try Again
        </button>
      )}
    </div>
  );
}

/**
 * React error boundary — catches any render error so the user never
 * sees a blank page or a raw JavaScript error message.
 */
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error("TempleVerse caught a render error:", error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorState
          title="Something went wrong on this page"
          message="An unexpected error occurred. Please return home or try again."
          onRetry={() => this.setState({ hasError: false })}
        />
      );
    }
    return this.props.children;
  }
}
