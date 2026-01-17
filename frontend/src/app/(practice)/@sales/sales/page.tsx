import React from "react";

export default function SalesPage() {
  return (
    <main className="min-h-screen bg-background px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-12">
        
        {/* SECTION 1 */}
        <section className="text-center space-y-4 border-b pb-8">
          <h1 className="text-5xl font-extrabold tracking-tight">
            Sales Page
          </h1>
          <p className="text-muted-foreground text-lg">
            This page is rendered from <code>/sales/page.tsx</code>
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">
            Why this page exists?
          </h2>

          <p className="text-muted-foreground">
            This route is used to practice <strong>Parallel Routes</strong> alongside
            Marketing and Practice pages.
          </p>

          <div className="rounded-lg border bg-muted p-4 text-sm">
            <p>
              👉 Seeing <strong>“Sales Page”</strong> confirms the  
              <code> sales </code> route is rendering correctly.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
