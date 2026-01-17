"use client";

import { RefreshCcw, Home, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";


export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Error Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <AlertCircle
              className="w-24 h-24 text-destructive"
              strokeWidth={1.5}
            />
            <div className="absolute inset-0 animate-ping opacity-20">
              <AlertCircle
                className="w-24 h-24 text-destructive"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <h2 className="text-2xl font-semibold mb-6">Something went wrong</h2>

        <div className="bg-muted border border-border rounded-lg p-6 mb-8">
          <p className="font-mono text-sm break-words text-muted-foreground">
            {error.message || "An unexpected error occurred"}
          </p>
        </div>

        <p className="mb-8 text-lg text-muted-foreground">
          Don’t worry, even the best drafts need a rewrite sometimes.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Try Again button */}
          <Button
            variant="default"
            size="lg"
            onClick={reset}
            className="flex items-center gap-2 group"
          >
            <RefreshCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
            Try Again
          </Button>

          {/* Back to Home button */}
          <Button
            asChild
            variant="outline"
            size="lg"
            className="flex items-center gap-2"
          >
            <Link href="/">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>
        </div>


      </div>
    </div>
  );
}
