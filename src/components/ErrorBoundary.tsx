import { ReactNode } from "react";
import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

interface Props {
  children: ReactNode;
}

function ErrorFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h1>Something went wrong. Please try again.</h1>
    </div>
  );
}

function ErrorBoundary({ children }: Props) {
  return (
    <ReactErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ReactErrorBoundary>
  );
}

export default ErrorBoundary;
