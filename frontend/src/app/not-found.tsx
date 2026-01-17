import Link from 'next/link';
import { ArrowLeft, FileQuestion, Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';


export default function NotFound() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 flex items-center justify-center px-4">

      <div className="max-w-2xl w-full text-center">
           {/* 404 Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-black/5 dark:bg-white/5 rounded-full blur-2xl"></div>
            <FileQuestion className="relative w-24 h-24
             text-black dark:text-white animate-pulse " strokeWidth={1.5} />
          </div>
        </div>

           {/* Error Code */}
        <div className="mb-6">
          <h1 className=" animate-bounce
          text-8xl sm:text-9xl font-bold text-black dark:text-white mb-2 tracking-tighter">
            404
          </h1>
          <div className="h-1 w-24 bg-black dark:bg-white mx-auto"></div>
        </div>
    {/* Error Message */}
        <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12 max-w-md mx-auto">
          This draft seems to have gone missing. The page you re looking for doesnt exist or has been moved.
        </p>

 {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Link href="/">
            <Button 
              size="lg" 
              className="bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 px-6 py-6 text-base w-full sm:w-auto"
            >
              <Home className="w-5 h-5 mr-2" />
              Return Home
            </Button>
          </Link>
          
          <Link href="/blog">
            <Button 
              variant="outline" 
              size="lg"
              className="border-2 border-black dark:border-white text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black px-6 py-6 text-base w-full sm:w-auto"
            >
              <Search className="w-5 h-5 mr-2" />
              Browse Posts
            </Button>
          </Link>
        </div>

        {/* Quick Links */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
            Popular pages you might be looking for:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link 
              href="/about" 
              className="group flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              About
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link 
              href="/blog" 
              className="group flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Blog
            </Link>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <Link 
              href="/contact" 
              className="group flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Contact
            </Link>
          </div>
        </div>

        
      </div>
    </div>
  );
}