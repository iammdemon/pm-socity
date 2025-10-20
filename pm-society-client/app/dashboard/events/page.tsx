// Event component
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
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
  Calendar, 
  MapPin, 
  Search, 
  ExternalLink,
  Clock,
  Tag,
  Users
} from 'lucide-react';
import { useGetEventsQuery } from '@/app/redux/services/eventApi';

export interface Event {
  title: string;
  slug: string;
  description: string;
  image: string;
  date: string;
  location: string;
  joinedUser?: string[];
  category?: string;
  tags?: string[];
  featured?: boolean;
  joinedUserCount?: number;
}



export default function Event() {
  const { data: eventResponse, isLoading, error, refetch } = useGetEventsQuery();
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

  // Check if event is upcoming (US timezone)
  const isUpcoming = (dateString: string) => {
    const eventDate = new Date(dateString);
    const today = new Date();
    // Set both dates to the same timezone for comparison
    eventDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);
    return eventDate >= today;
  };

  // Format date for display (US timezone) - consistent with AdminEventsPage
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/New_York"
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

  // Event Card Component
  const EventCard = ({ event, isPast = false }: { event: Event; isPast?: boolean }) => (
    <Card className={`border border-gray-200 dark:border-gray-800 overflow-hidden bg-white dark:bg-black hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${isPast ? 'opacity-75' : ''}`}>
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className={`object-cover transition-transform duration-500 ${isPast ? 'grayscale' : ''} hover:scale-105`}
        />
        {event.featured && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-black dark:bg-white text-white dark:text-black">Featured</Badge>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="bg-white/90 dark:bg-black/90 text-black dark:text-white border-black dark:border-white backdrop-blur-sm">
            {isPast ? 'Past Event' : getTimeUntilEvent(event.date)}
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {event.category && (
            <Badge variant="outline" className="border-black dark:border-white">
              {event.category}
            </Badge>
          )}
          {event.tags && event.tags.slice(0, 2).map((tag, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300">
              {tag}
            </Badge>
          ))}
        </div>
        <h3 className="text-xl font-bold mb-3 line-clamp-2">{event.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3 text-sm">
          {event.description}
        </p>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
          {event.joinedUser && (
            <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Users className="w-4 h-4" />
              <span>{event.joinedUserCount} attending</span>
            </div>
          )}
        </div>
        <Button asChild variant="outline" className="w-full border-black dark:border-white hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all duration-200">
          <Link href={`/dashboard/events/${event.slug}`} className="flex items-center justify-center gap-2">
            View Details <ExternalLink className="w-4 h-4" />
          </Link>
        </Button>
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
                <Calendar className="w-6 h-6" />
                Events
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Discover upcoming events and join our community
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="border-black dark:border-white">
                {events.length} events
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900">
              <div className="text-2xl font-bold">{events.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Events</div>
            </div>
            <div className="text-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900">
              <div className="text-2xl font-bold">{upcomingEvents.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Upcoming</div>
            </div>
            <div className="text-center p-4 border border-gray-200 dark:border-gray-800 rounded-lg bg-gray-50 dark:bg-gray-900">
              <div className="text-2xl font-bold">{pastEvents.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Past Events</div>
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
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white"
              />
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-end">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-32 border-gray-300 dark:border-gray-700 focus:border-black dark:focus:border-white">
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
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="border border-gray-200 dark:border-gray-800">
                  <CardContent className="p-0">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-10 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full mb-4">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Unable to load events</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please try again later or contact support if the issue persists.
            </p>
            <Button 
              variant="outline" 
              className="border-black dark:border-white"
              onClick={() => refetch()}
            >
              Try Again
            </Button>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-900 rounded-full mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No events found</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search criteria or browse all events.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* Featured Events - Only show if there are featured events */}
            {featuredEvents.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Tag className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">Featured Events</h2>
                  <Badge variant="outline" className="border-black dark:border-white">
                    {featuredEvents.length}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
                  {featuredEvents.map((event: Event) => (
                    <EventCard key={event.slug} event={event} isPast={false} />
                  ))}
                </div>
              </div>
            )}

            {/* Upcoming Events - Show all upcoming events if no featured events */}
            {upcomingEvents.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Clock className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">
                    {featuredEvents.length > 0 ? 'Other Upcoming Events' : 'Upcoming Events'}
                  </h2>
                  <Badge variant="outline" className="border-black dark:border-white">
                    {featuredEvents.length > 0 
                      ? upcomingEvents.filter((event: Event) => !event.featured).length 
                      : upcomingEvents.length}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                  {featuredEvents.length > 0 
                    ? upcomingEvents.filter((event: Event) => !event.featured).map((event: Event) => (
                        <EventCard key={event.slug} event={event} isPast={false} />
                      ))
                    : upcomingEvents.map((event: Event) => (
                        <EventCard key={event.slug} event={event} isPast={false} />
                      ))}
                </div>
              </div>
            )}

            {/* Past Events */}
            {pastEvents.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Calendar className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">Past Events</h2>
                  <Badge variant="outline" className="border-gray-400 dark:border-gray-600">
                    {pastEvents.length}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                  {pastEvents.map((event: Event) => (
                    <EventCard key={event.slug} event={event} isPast={true} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}