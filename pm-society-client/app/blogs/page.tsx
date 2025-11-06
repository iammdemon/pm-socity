'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FiArrowRight, FiTag, FiTrendingUp, FiCalendar, FiSearch } from 'react-icons/fi';
import Image from 'next/image';
import localFont from 'next/font/local';
import Footer from '@/app/components/layout/Footer';
import Header from '@/app/components/layout/Header';
import { useGetBlogsQuery } from '../redux/services/blogApi';

const bonVivant = localFont({
  src: '../../public/fonts/BonVivantSerifBold.ttf',
});

interface BlogPost {
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  category: string;
  trending?: boolean;
  views: number;
  likes: number;
  tags: string[];
  createdAt: string;
}

interface BlogsResponse {
  data: BlogPost[];
  message: string;
  total?: number;
}

const BlogPage = () => {
  const router = useRouter();
  const { data: blogsResponse, isLoading, isError } = useGetBlogsQuery();
  const blogs: BlogPost[] =
    blogsResponse && Array.isArray((blogsResponse as unknown as BlogsResponse)?.data)
      ? (blogsResponse as unknown as BlogsResponse).data
      : [];

  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleBlogClick = (slug: string) => {
    router.push(`/blogs/${slug}`);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#ECE8E1] dark:bg-gray-900 transition-colors duration-300">
        {/* Hero */}
        <section className="relative overflow-hidden min-h-[35vh] md:min-h-[90vh] max-h-[800px] py-12 md:py-16 flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/image/coach-2.webp)' }}
          />
          <div className="absolute inset-0 bg-black/40 dark:bg-black/50 z-10" />
          <div className="relative z-20 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 text-center">
            <h1
              className={`${bonVivant.className} text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 drop-shadow-lg transition-all duration-1000 ${
                isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              The Society Speaks
            </h1>
            <p
              className={`text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-2xl sm:max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              Real experiences, practical advice, and tools from those walking the project path with you.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-12 sm:py-16">
          <div className="flex justify-center mb-8 sm:mb-12">
            <h2
              className={`${bonVivant.className} text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black dark:text-white`}
            >
              Latest Articles
            </h2>
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-64 sm:h-80 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center text-red-600 dark:text-red-400 font-semibold py-12 sm:py-16">
              Failed to load articles. Please try again.
            </div>
          )}

          {!isLoading && blogs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {blogs.map((post, index) => (
                <article
                  key={post.slug}
                  onClick={() => handleBlogClick(post.slug)}
                  className={`group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                  role="button"
                  aria-label={`View article: ${post.title}`}
                >
                  {/* Image */}
                  <div className="relative h-48 sm:h-56 md:h-64">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading={index < 3 ? 'eager' : 'lazy'}
                      priority={index < 3}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    {post.trending && (
                      <div className="absolute top-3 right-3">
                        <span className="px-2 py-1 bg-black/80 dark:bg-white/80 text-white dark:text-black text-xs sm:text-sm font-semibold rounded-full flex items-center gap-1">
                          <FiTrendingUp className="w-3 h-3 sm:w-4 sm:h-4" /> Hot
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 sm:p-6">
                    <div className="flex gap-2 mb-2 sm:mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs sm:text-sm font-medium rounded-lg"
                        >
                          <FiTag className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-base sm:text-lg md:text-xl font-bold text-black dark:text-white mb-2 group-hover:text-gray-700 dark:group-hover:text-gray-300 line-clamp-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="border-t border-gray-100 dark:border-gray-700 pt-3 sm:pt-4 flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-black dark:text-white group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!isLoading && blogs.length === 0 && (
            <div className="text-center py-12 sm:py-16">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                  <FiSearch className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400 dark:text-gray-500" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-black dark:text-white mb-3 sm:mb-4">
                  No articles found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base md:text-lg">
                  Try adjusting your search or explore different categories to discover more content.
                </p>
              </div>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default BlogPage;