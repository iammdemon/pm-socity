"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FiArrowRight,
  FiTag,
  FiTrendingUp,
  FiCalendar,
  FiSearch,
} from "react-icons/fi";
import Image from "next/image";
import localFont from "next/font/local";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import { useGetBlogsQuery } from "../redux/services/blogApi";

const bonVivant = localFont({
  src: "../../public/fonts/BonVivantSerifBold.ttf",
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
  const {
    data: blogsResponse,
    isLoading,
    isError,
  } = useGetBlogsQuery();

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
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleBlogClick = (slug: string) => {
    router.push(`/blogs/${slug}`);
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#ECE8E1] ">
        {/* Hero */}
        <section className="relative overflow-hidden min-h-[100vh]  py-[80px] md:pt-[100px] flex items-center">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url(/image/blog.webp)" }}
          />
          <div className="absolute inset-0 bg-[#0a192f]/40 z-10" />

          <div className="relative z-20 w-full max-w-5xl mx-auto px-4 text-center">
            <h1
              className={`${bonVivant.className} text-2xl sm:text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg transition-all duration-1000 ${
                isLoaded ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
              }`}
            >
              The Society Speaks
            </h1>
            <p
              className={`text-base sm:text-lg md:text-2xl text-white/90 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              Real experiences, practical advice, and tools from those walking the
              project path with you.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="max-w-7xl mx-auto px-4 pb-20">
          <div className="flex justify-center my-12">
            <h2
              className={`${bonVivant.className} text-2xl sm:text-4xl md:text-6xl font-bold text-black`}
            >
              Latest Articles
            </h2>
          </div>

          {isLoading && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="h-80 bg-gray-200 animate-pulse rounded-3xl"
                />
              ))}
            </div>
          )}

          {isError && (
            <div className="text-center text-red-600 font-semibold py-20">
              Failed to load articles. Please try again.
            </div>
          )}

          {!isLoading && blogs.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((post, index) => (
                <article
                  key={post.slug}
                  onClick={() => handleBlogClick(post.slug)}
                  className={`group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Image */}
                  <div className="relative h-52">
                    <Image
                      src={post.image}
                      alt={post.title}
                      width={800}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading={index === 0 ? "eager" : "lazy"}
                      priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  
                    {post.trending && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-black/80 text-white text-sm font-semibold rounded-full flex items-center gap-1">
                          <FiTrendingUp className="w-3 h-3" /> Hot
                        </span>
                      </div>
                    )}
                
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex gap-2 mb-3">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg"
                        >
                          <FiTag className="w-3 h-3 inline mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-black mb-2 group-hover:text-gray-700 line-clamp-2 leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-3 h-3" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <FiArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!isLoading && blogs.length === 0 && (
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FiSearch className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-black mb-4">
                  No articles found
                </h3>
                <p className="text-gray-600 text-base sm:text-lg">
                  Try adjusting your search or explore different categories to
                  discover more content.
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
