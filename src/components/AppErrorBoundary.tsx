import { Component, type ErrorInfo, type ReactNode } from "react";

type AppErrorBoundaryProps = {
  children: ReactNode;
};

type AppErrorBoundaryState = {
  hasError: boolean;
};

export class AppErrorBoundary extends Component<AppErrorBoundaryProps, AppErrorBoundaryState> {
  state: AppErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AppErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: unknown, info: ErrorInfo) {
    console.error("[app-boundary] render crash", error, info.componentStack);
  }

  private handleReload = () => {
    window.location.reload();
  };

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="min-h-screen min-h-screen-ios bg-background text-foreground flex items-center justify-center p-6">
        <section className="max-w-md w-full rounded-2xl border border-border/60 bg-card p-6 text-center shadow-sm">
          <h1 className="font-display text-2xl font-bold mb-2">Something went wrong</h1>
          <p className="text-sm text-muted-foreground mb-5">
            Страница столкнулась с ошибкой. Попробуйте перезагрузить.
          </p>
          <button
            type="button"
            onClick={this.handleReload}
            className="inline-flex items-center justify-center rounded-full px-4 h-10 text-sm font-semibold border border-border hover:bg-muted transition-colors"
          >
            Reload
          </button>
        </section>
      </main>
    );
  }
}
