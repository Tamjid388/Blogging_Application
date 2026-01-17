import React from "react";

export default function MarketingPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-12">
        
        {/* SECTION 1 */}
        <section className="text-center space-y-4 border-b pb-8">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Marketing Page
          </h1>
          <p className="text-muted-foreground text-lg">
            This page is rendered from <code>/marketing/page.tsx</code>
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Why this page exists?
          </h2>

          <p className="text-muted-foreground">
            This page is only for practicing <strong>Parallel Routes</strong> in Next.js.
            The purpose is to clearly identify which route and layout is currently active.
          </p>

          <div className="rounded-lg border bg-muted p-4 text-sm">
            <p>
              👉 If you are seeing <strong>“Marketing Page”</strong>,  
              it means the <code>marketing</code> route is working correctly.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
