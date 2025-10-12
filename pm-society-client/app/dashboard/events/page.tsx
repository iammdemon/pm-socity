'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  CalendarDays, 
  MapPin, 
  Clock, 
  Search, 
  Calendar,
  Tag,
  ExternalLink
} from 'lucide-react';

import Image from 'next/image';
import { useGetEventsQuery } from '@/app/redux/services/eventApi';

interface Event {
  slug: string;
  title: string;
  description: string;
  date: string;
  location: string;
  image: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
}

export default function Event() {
  const { data: eventResponse, isLoading, error } = useGetEventsQuery();
  const events = eventResponse?.data || [];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Filter and sort events
  const filteredEvents = events
    .filter((event: Event) => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a: Event, b: Event) => {
      if (sortBy === 'date') {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return a.title.localeCompare(b.title);
    });

  // Check if event is upcoming
  const isUpcoming = (dateString: string) => {
    return new Date(dateString) > new Date();
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Get time until event
  const getTimeUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past Event';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `${diffDays} days away`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks away`;
    return `${Math.ceil(diffDays / 30)} months away`;
  };

  const upcomingEvents = filteredEvents.filter((event: Event) => isUpcoming(event.date));
  const pastEvents = filteredEvents.filter((event: Event) => !isUpcoming(event.date));
  const featuredEvents = upcomingEvents.filter((event: Event) => event.featured);

  // Unified Event Card Component
  const EventCard = ({ event, isPast = false }: { event: Event; isPast?: boolean }) => (
    <Card className={`group border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-gray-900 dark:hover:border-gray-400 overflow-hidden ${isPast ? 'bg-gray-50 dark:bg-gray-800/50' : 'bg-white dark:bg-gray-800'}`}>
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-500 ${isPast ? 'grayscale group-hover:grayscale-0' : ''}`}
          />
          {event.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-yellow-500 text-black font-semibold shadow-lg">Featured</Badge>
            </div>
          )}
          <div className="absolute top-4 right-4">
            <Badge className={`shadow-lg ${isPast ? 'bg-gray-600 text-white dark:bg-gray-500' : 'bg-black text-white dark:bg-gray-200 dark:text-gray-900'}`}>
              {isPast ? 'Past Event' : getTimeUntilEvent(event.date)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {event.category && (
            <Badge variant="outline" className={`${isPast ? 'text-gray-600 border-gray-600 dark:text-gray-400 dark:border-gray-500' : 'text-gray-900 border-gray-900 dark:text-gray-100 dark:border-gray-100'}`}>
              {event.category}
            </Badge>
          )}
          {event.tags && event.tags.slice(0, 2).map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
              <Tag className="w-3 h-3 mr-1" /> {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors line-clamp-2">
          {event.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm leading-relaxed">
          {event.description}
        </p>
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <CalendarDays className="w-4 h-4 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
        <Button asChild variant="outline" className="w-full group-hover:bg-gray-900 dark:group-hover:bg-gray-100 group-hover:text-white dark:group-hover:text-gray-900 transition-all duration-300 border-gray-300 dark:border-gray-600">
          <Link href={`/events/${event.slug}`} className="flex items-center justify-center gap-2">
            View Details <ExternalLink className="w-4 h-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="mt-5 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
      {/* Stats Section */}
      <section className="py-8 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800/50 dark:to-gray-900/50 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <div className="bg-gradient-to-r from-gray-900 to-gray-800 dark:from-gray-100 dark:to-gray-200 text-white dark:text-gray-900 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <CalendarDays className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{events.length}</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Total Events</p>
            </div>
            <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-400 dark:to-blue-500 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Clock className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{upcomingEvents.length}</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Upcoming Events</p>
            </div>
            <div className="text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200/50 dark:border-gray-700/50">
              <div className="bg-gradient-to-r from-yellow-500 to-orange-500 dark:from-yellow-400 dark:to-orange-400 text-white rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Tag className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1">{featuredEvents.length}</h3>
              <p className="text-gray-600 dark:text-gray-400 font-medium">Featured</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-200/30 dark:border-gray-700/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <Input
                  placeholder="Search events by title or description..."
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
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-12 lg:py-16 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-8 animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-2">
                  <Clock className="w-6 h-6 text-gray-400 dark:text-gray-500" />
                </div>
                <Skeleton className="h-8 w-48" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <Card className="border border-gray-200 dark:border-gray-700 shadow-lg bg-white dark:bg-gray-800">
                      <CardHeader>
                        <Skeleton className="h-48 w-full rounded-lg bg-gray-200 dark:bg-gray-700" />
                        <Skeleton className="h-6 w-3/4 mt-4 bg-gray-200 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700" />
                      </CardHeader>
                      <CardContent className="p-6 space-y-3">
                        <Skeleton className="h-4 w-full bg-gray-200 dark:bg-gray-700" />
                        <Skeleton className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700" />
                        <Skeleton className="h-10 w-full bg-gray-200 dark:bg-gray-700" />
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-2xl p-8 max-w-md mx-auto shadow-lg">
                <Calendar className="w-12 h-12 text-red-400 dark:text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">Unable to load events</h3>
                <p className="text-red-600 dark:text-red-400">Please try again later or contact support if the problem persists.</p>
              </div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 max-w-md mx-auto shadow-lg">
                <Calendar className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">No events found</h3>
                <p className="text-gray-600 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Featured Events */}
              {featuredEvents.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-2 rounded-xl shadow-lg">
                      <Tag className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Featured Events</h2>
                    <Badge className="bg-yellow-500 text-black font-semibold px-3 py-1 shadow-lg">
                      {featuredEvents.length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {featuredEvents.map((event: Event) => (
                      <EventCard key={event.slug} event={event} isPast={false} />
                    ))}
                  </div>
                </div>
              )}

              {/* Upcoming Events */}
              {upcomingEvents.map(event =>  (
                <div className="mb-16" key={event.slug}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 p-2 rounded-xl shadow-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Upcoming Events</h2>
                  
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {upcomingEvents.filter((event: Event) => !event.featured).map((event: Event) => (
                      <EventCard key={event.slug} event={event} isPast={false} />
                    ))}
                  </div>
                </div>)
              )}

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-gradient-to-r from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700 p-2 rounded-xl shadow-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Past Events</h2>
                    <Badge variant="outline" className="text-gray-600 dark:text-gray-400 border-gray-600 dark:border-gray-500 px-3 py-1">
                      {pastEvents.length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {pastEvents.map((event: Event) => (
                      <EventCard key={event.slug} event={event} isPast={true} />
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

    
    </div>
  );
}