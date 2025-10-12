'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { FaBookOpen, FaSearch, FaBook, FaExternalLinkAlt } from 'react-icons/fa';
import { IResource, useGetResourcesQuery } from '@/app/redux/services/resourceApi';

export default function Library() {
  const { data, isLoading, isError, refetch } = useGetResourcesQuery();
  const resources = data?.data ?? [];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');

  // Filter and sort resources
  const filteredResources = resources
    .filter((resource: IResource) => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a: IResource, b: IResource) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0; // Default sorting (e.g., by creation date if available)
    });

  // Resource Card Component
  const ResourceCard = ({ resource }: { resource: IResource }) => (
    <Card className="group border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-gray-900 dark:hover:border-gray-400 overflow-hidden bg-white dark:bg-gray-800 rounded-2xl">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-4 left-4 z-10">
            {resource.tags.slice(0, 1).map(tag => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-black dark:bg-gray-200 text-white dark:text-gray-900 text-sm font-medium px-3 py-1 rounded-full shadow-md"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors line-clamp-2">
          <Link href={resource.link} target="_blank" className="hover:underline transition-all duration-200">
            {resource.title}
          </Link>
        </CardTitle>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">{resource.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {resource.tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 text-sm px-3 py-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={resource.link} target="_blank">
          <Button className="w-full bg-gradient-to-r from-black to-gray-800 dark:from-gray-900 dark:to-gray-700 text-white dark:text-gray-100 text-base font-semibold py-3 hover:from-gray-900 dark:hover:from-gray-800 hover:to-gray-900 dark:hover:to-gray-600 transition-all duration-300 rounded-xl shadow-lg hover:shadow-xl">
            <FaBookOpen className="mr-2 h-4 w-4" /> View Resource <FaExternalLinkAlt className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero/Intro Section */}
      <section className="py-12 lg:py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className=" dark:text-white  p-8 max-w-4xl mx-auto ">
            <FaBook className="w-16 h-16 mx-auto mb-4 opacity-90" />
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">Resource Library</h1>
            <p className="text-xl dark:text-blue-100 max-w-2xl mx-auto">Discover curated resources to elevate your project management skills and knowledge.</p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-200/30 dark:border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder="Search resources by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-gray-100 focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-gray-100/20 rounded-xl shadow-sm"
                />
              </div>
            </div>
            <div className="flex gap-4 w-full lg:w-auto justify-end">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-32 border-gray-300 dark:border-gray-600 focus:border-gray-900 dark:focus:border-gray-100 focus:ring-2 focus:ring-gray-900/20 dark:focus:ring-gray-100/20 rounded-xl shadow-sm">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Resources List */}
      <section className="py-12 lg:py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8 animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 p-2 rounded-lg">
                  <FaBook className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                </div>
                <Skeleton className="h-8 w-48 bg-gray-200 dark:bg-gray-700" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800 rounded-2xl overflow-hidden">
                      <CardHeader className="p-0">
                        <Skeleton className="h-48 w-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600" />
                      </CardHeader>
                      <CardContent className="p-6 space-y-3">
                        <Skeleton className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
                          <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
                        </div>
                        <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ) : isError ? (
            <div className="text-center py-20">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md mx-auto shadow-lg">
                <FaBookOpen className="w-12 h-12 text-red-400 dark:text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Unable to load resources</h3>
                <p className="text-red-600 dark:text-red-400">
                  Please try again later or{' '}
                  <button onClick={refetch} className="underline hover:text-red-700 dark:hover:text-red-300 font-medium">try again</button>.
                </p>
              </div>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 max-w-md mx-auto shadow-lg">
                <FaBookOpen className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">No resources found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-gradient-to-r from-black to-gray-800 dark:from-gray-900 dark:to-gray-700 p-2 rounded-xl shadow-lg">
                  <FaBook className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Resources</h2>
                <Badge className="bg-black dark:bg-gray-200 text-white dark:text-gray-900 px-3 py-1 font-semibold shadow-md">
                  {filteredResources.length}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {filteredResources.map((resource: IResource) => (
                  <ResourceCard key={resource._id} resource={resource} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

    
    </div>
  );
}