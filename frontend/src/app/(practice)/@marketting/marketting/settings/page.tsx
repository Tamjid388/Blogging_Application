import React from "react";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-blue-50 px-6 py-20">
      <div className="mx-auto max-w-3xl space-y-12">
        
        {/* SECTION 1 */}
        <section className="text-center space-y-4 border-b pb-8 border-blue-200">
          <h1 className="text-5xl font-extrabold tracking-tight text-blue-900">
            Settings Page
          </h1>
          <p className="text-blue-700 text-lg">
            This page is rendered from <code>/settings/page.tsx</code>
          </p>
        </section>

        {/* SECTION 2 */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-blue-900">
            Purpose
          </h2>

          <p className="text-blue-700">
            This route is used for practicing <strong>Parallel Routes</strong>  
            alongside Marketing, Sales, and Practice pages.
          </p>

       
        </section>

      </div>
    </main>
  );
}
