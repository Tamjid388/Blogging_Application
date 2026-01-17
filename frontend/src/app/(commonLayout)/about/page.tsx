// export const dynamic="force-dynamic"

import { Pencil, Code, Heart, Coffee, Github, Linkedin, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-20 sm:py-28">
          <div className="text-center">
            <h1 className="text-5xl sm:text-6xl font-bold text-black dark:text-white mb-6 tracking-tight">
              About LifeInDrafts
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
              A space where thoughts transform into words, and drafts evolve into stories.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="prose prose-lg max-w-none">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-6">The Story</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            LifeInDrafts started as a simple idea: to create a platform where writing feels natural, 
            authentic, and unpolished. In a world obsessed with perfection, this blog celebrates the 
            beauty of work-in-progress, the honesty of first drafts, and the journey of refining thoughts 
            into meaningful content.
          </p>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            Every post here represents a snapshot of thinking, learning, and growing. Some are polished 
            pieces, others are raw explorations. All are genuine attempts to capture life as it unfolds, 
            one draft at a time.
          </p>
        </div>
      </section>

      {/* Mission Cards */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-8 text-center">What We Believe</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors duration-300 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <Pencil className="w-10 h-10 text-black dark:text-white mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Authentic Writing</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Every word matters. We prioritize honest expression over perfect prose.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors duration-300 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <Heart className="w-10 h-10 text-black dark:text-white mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Continuous Growth</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Learning is a journey. We embrace the process of evolving ideas and perspectives.
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-colors duration-300 bg-white dark:bg-gray-900">
            <CardContent className="p-6">
              <Coffee className="w-10 h-10 text-black dark:text-white mb-4" strokeWidth={1.5} />
              <h3 className="text-xl font-semibold text-black dark:text-white mb-3">Thoughtful Content</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Quality over quantity. Each post is crafted with intention and care.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Developer Section */}
      <section className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-shrink-0">
              <div className="w-32 h-32 bg-black dark:bg-white rounded-full flex items-center justify-center">
                <Code className="w-16 h-16 text-white dark:text-black" strokeWidth={1.5} />
              </div>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-black dark:text-white mb-3">Built by Tamjid Ahmed</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                Developer, writer, and creator. I built LifeInDrafts to combine my passion for 
                coding and storytelling. This platform is a personal project where technology meets 
                creativity, designed to make writing and sharing ideas effortless.
              </p>
              
              <div className="flex gap-3 justify-center md:justify-start">
                <Button variant="outline" size="icon" className="border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                  <Mail className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-black dark:text-white mb-8 text-center">Built With</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'shadcn/ui'].map((tech) => (
            <div
              key={tech}
              className="px-6 py-3 border-2 border-gray-200 dark:border-gray-800 rounded-full text-black dark:text-white font-medium hover:border-black dark:hover:border-white transition-colors duration-300"
            >
              {tech}
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-4xl mx-auto px-6 py-16 text-center">
          <h2 className="text-3xl font-bold text-black dark:text-white mb-4">Start Reading</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
            Explore articles on technology, creativity, and everything in between.
          </p>
          <Button size="lg" className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-8 py-6 text-lg">
            Browse All Posts
          </Button>
        </div>
      </section>
    </div>
  );
}