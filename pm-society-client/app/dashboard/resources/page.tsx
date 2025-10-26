'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, ExternalLink, BookOpen, Grid, List, Download, File } from 'lucide-react';
import { IResource, useGetResourcesQuery } from '@/app/redux/services/resourceApi';

export default function Library() {
  const { data, isLoading, isError, refetch } = useGetResourcesQuery();
  const resources = data?.data ?? [];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter and sort resources
  const filteredResources = resources
    .filter((resource: IResource) => {
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           resource.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    })
    .sort((a: IResource, b: IResource) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  // Helper function to determine if a resource is a file or external link
  const isFileResource = (fileUrl?: string) => {
    return fileUrl?.includes("resources/") || false;
  };

  // Helper function to get file icon based on file type
  const getFileIcon = (fileUrl?: string) => {
    if (!fileUrl) return <File className="w-4 h-4" />;
    
    const fileName = fileUrl.split('/').pop();
    const extension = fileName?.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return <File className="w-4 h-4 text-red-500" />;
      case 'doc':
      case 'docx':
        return <File className="w-4 h-4 text-blue-500" />;
      case 'xls':
      case 'xlsx':
        return <File className="w-4 h-4 text-green-500" />;
      case 'ppt':
      case 'pptx':
        return <File className="w-4 h-4 text-orange-500" />;
      case 'txt':
        return <File className="w-4 h-4 text-gray-500" />;
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
      case 'svg':
        return <File className="w-4 h-4 text-purple-500" />;
      default:
        return <File className="w-4 h-4" />;
    }
  };

  // Resource Card Component
  const ResourceCard = ({ resource }: { resource: IResource }) => (
    <Card className="group border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-black hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors">
              {resource.fileUrl ? (
                isFileResource(resource.fileUrl) ? (
                  <span className="flex items-center gap-2">
                    {getFileIcon(resource.fileUrl)}
                    {resource.title}
                  </span>
                ) : (
                  <Link href={resource.fileUrl} target="_blank" className="hover:underline flex items-center gap-2">
                    {getFileIcon(resource.fileUrl)}
                    {resource.title}
                  </Link>
                )
              ) : (
                <span>{resource.title}</span>
              )}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {resource.description}
            </p>
          </div>
          {resource.fileUrl && (
            isFileResource(resource.fileUrl) ? (
              <Download className="w-4 h-4 text-gray-400 dark:text-gray-500 ml-2 flex-shrink-0" />
            ) : (
              <ExternalLink className="w-4 h-4 text-gray-400 dark:text-gray-500 ml-2 flex-shrink-0" />
            )
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags?.slice(0, 3).map((tag: string) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-gray-300 dark:border-gray-700"
            >
              {tag}
            </Badge>
          ))}
          {resource.tags && resource.tags.length > 3 && (
            <Badge variant="outline" className="text-xs border-gray-300 dark:border-gray-700">
              +{resource.tags.length - 3}
            </Badge>
          )}
        </div>
        
        {resource.fileUrl ? (
          isFileResource(resource.fileUrl) ? (
            <Link href={resource.fileUrl} download>
              <Button variant="outline" className="w-full justify-center border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors">
                Download File
              </Button>
            </Link>
          ) : (
            <Link href={resource.fileUrl} target="_blank">
              <Button variant="outline" className="w-full justify-center border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors">
                View Resource
              </Button>
            </Link>
          )
        ) : (
          <Button variant="outline" className="w-full justify-center border-gray-300 dark:border-gray-700" disabled>
            No Resource Available
          </Button>
        )}
      </CardContent>
    </Card>
  );

  // Resource List Item Component
  const ResourceListItem = ({ resource }: { resource: IResource }) => (
    <Card className="border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-black hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              {resource.fileUrl ? (
                isFileResource(resource.fileUrl) ? (
                  <>
                    {getFileIcon(resource.fileUrl)}
                    {resource.title}
                  </>
                ) : (
                  <Link href={resource.fileUrl} target="_blank" className="hover:underline flex items-center gap-2">
                    {getFileIcon(resource.fileUrl)}
                    {resource.title}
                  </Link>
                )
              ) : (
                <span>{resource.title}</span>
              )}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
              {resource.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {resource.tags?.map((tag: string) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs border-gray-300 dark:border-gray-700"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
          {resource.fileUrl ? (
            isFileResource(resource.fileUrl) ? (
              <Link href={resource.fileUrl} download>
                <Button variant="ghost" size="sm" className="ml-4">
                  <Download className="w-4 h-4" />
                </Button>
              </Link>
            ) : (
              <Link href={resource.fileUrl} target="_blank">
                <Button variant="ghost" size="sm" className="ml-4">
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </Link>
            )
          ) : (
            <Button variant="ghost" size="sm" className="ml-4" disabled>
              <File className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold flex items-center gap-2">
                <BookOpen className="w-6 h-6" />
                Resource Library
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Discover curated resources to enhance your project management skills
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-black dark:border-white">
                {resources.length} resources
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white"
              />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-md">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-gray-100 dark:bg-gray-900' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-gray-100 dark:bg-gray-900' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="space-y-4">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="border border-gray-200 dark:border-gray-800">
                    <CardContent className="p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <div className="flex gap-2">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <Skeleton className="h-10 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Card key={i} className="border border-gray-200 dark:border-gray-800">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-3">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-2/3" />
                          <div className="flex gap-2">
                            <Skeleton className="h-6 w-16" />
                            <Skeleton className="h-6 w-16" />
                          </div>
                        </div>
                        <Skeleton className="h-10 w-10 ml-4" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        ) : isError ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Unable to load resources</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please try again later or contact support if the issue persists.
            </p>
            <Button onClick={refetch} variant="outline" className="border-black dark:border-white">
              Try Again
            </Button>
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or browse all resources.
            </p>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">
                {filteredResources.length} {filteredResources.length === 1 ? 'Resource' : 'Resources'}
              </h2>
            </div>
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource: IResource) => (
                  <ResourceCard key={resource._id} resource={resource} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredResources.map((resource: IResource) => (
                  <ResourceListItem key={resource._id} resource={resource} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}