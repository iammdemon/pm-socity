'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { FaBookOpen, FaSearch, FaBook } from 'react-icons/fa';
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
    <Card className="group border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-black bg-white rounded-xl overflow-hidden">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3 mb-3">
          {resource.tags.slice(0, 1).map(tag => (
            <Badge
              key={tag}
              variant="secondary"
              className="bg-black text-white text-sm font-medium px-3 py-1 rounded-full"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="text-xl font-bold text-black group-hover:text-gray-600 transition-colors line-clamp-2">
          <Link href={resource.link} target="_blank" className="hover:text-gray-700 transition-colors duration-200">
            {resource.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-2">
        <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">{resource.description}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {resource.tags.map((tag: string) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-black border-gray-400 text-sm px-3 py-1 rounded-full"
            >
              {tag}
            </Badge>
          ))}
        </div>
        <Link href={resource.link} target="_blank">
          <Button className="w-full bg-black text-white text-base font-semibold py-3 hover:bg-gray-900 transition-colors duration-200 rounded-lg">
            <FaBookOpen className="mr-2 h-5 w-5" /> View Resource
          </Button>
        </Link>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white text-black font-sans">
 

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search resources..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-black focus:ring-black rounded-lg"
                />
              </div>
            </div>
            <div className="flex gap-4 w-full lg:w-auto">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-32 border-gray-300 focus:border-black focus:ring-black rounded-lg">
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {isLoading ? (
            <div className="mb-12">
              <Skeleton className="h-8 w-48 mb-4" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="border border-gray-200 shadow-lg">
                    <CardHeader>
                      <Skeleton className="h-6 w-3/4 mt-4" />
                      <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-3/4 mb-4" />
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : isError ? (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to load resources</h3>
                <p className="text-red-600">
                  Please try again later or{' '}
                  <button onClick={refetch} className="underline hover:text-red-800">try again</button>.
                </p>
              </div>
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                <FaBookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No resources found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            </div>
          ) : (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div className="bg-black p-2 rounded-lg">
                  <FaBook className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-black">Resources</h2>
                <Badge className="bg-black text-white px-3 py-1">
                  {filteredResources.length}
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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