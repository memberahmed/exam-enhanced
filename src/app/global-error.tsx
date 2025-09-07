"use client";

import { Link } from "@/i18n/navigation";
import { RefreshCw, Home } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html>
      <body className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="max-w-lg w-full text-center space-y-6">
          {/* Header */}
          <h1 className="text-4xl font-bold text-foreground">Something went wrong</h1>
          <p className="text-muted-foreground">{error?.message || "An unexpected error occurred. Please try again."}</p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </button>

            <Link
              href="/"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg border border-border bg-card text-foreground hover:bg-muted"
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          {/* Footer */}
          <p className="text-xs text-muted-foreground">Error digest: {error?.digest || "N/A"}</p>
        </div>
      </body>
    </html>
  );
}
