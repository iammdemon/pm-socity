

'use client';

import React, { useState,  } from 'react';

import { Card, CardContent, CardHeader,  } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
     
      return matchesSearch
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

  // Unified Event Card Component
  const EventCard = ({ event, isPast = false }: { event: Event; isPast?: boolean }) => (
    <Card className={`group border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-black ${isPast ? 'bg-gray-50' : 'bg-white'}`}>
      <CardHeader className="p-0">
        <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className={`object-cover group-hover:scale-105 transition-transform duration-300 ${isPast ? 'grayscale group-hover:grayscale-0' : ''}`}
          />
          <div className="absolute top-4 right-4">
            <Badge className={`${isPast ? 'bg-gray-600 text-white' : 'bg-black text-white'}`}>
              {isPast ? 'Past Event' : getTimeUntilEvent(event.date)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {event.category && (
            <Badge variant="outline" className={`${isPast ? 'text-gray-600 border-gray-600' : 'text-black border-black'}`}>
              {event.category}
            </Badge>
          )}
        </div>
        <h3 className="text-xl font-bold text-black mb-3 group-hover:text-gray-600 transition-colors line-clamp-2">
          {event.title}
        </h3>
        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed">
          {event.description}
        </p>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarDays className="w-4 h-4 flex-shrink-0" />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span className="line-clamp-1">{event.location}</span>
          </div>
        </div>
        {/* <Link href={`/events/${event.slug}`} className="block">
          {isPast ? (
            <Button variant="outline" className="w-full border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-black group">
              <Eye className="mr-2 h-4 w-4" />
              View Details
              <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          ) : (
            <Button className="w-full bg-black text-white hover:bg-gray-800 group">
              Register Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
        </Link> */}
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-white text-black">
     

      {/* Stats Section */}
      <section className="py-5 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-2 gap-8">
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <CalendarDays className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-2">{events.length}</h3>
              <p className="text-gray-600 font-medium">Total Events</p>
            </div>
            <div className="text-center bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-black to-gray-800 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-bold text-black mb-2">{upcomingEvents.length}</h3>
              <p className="text-gray-600 font-medium">Upcoming Events</p>
            </div>
          
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search events..."
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
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {isLoading ? (
            <>
              <div className="mb-12">
                <Skeleton className="h-8 w-48 mb-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Card key={i} className="border border-gray-200 shadow-lg">
                      <CardHeader>
                        <Skeleton className="h-48 w-full rounded-lg" />
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
            </>
          ) : error ? (
            <div className="text-center py-20">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-red-800 mb-2">Unable to load events</h3>
                <p className="text-red-600">Please try again later or contact support if the problem persists.</p>
              </div>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 mb-2">No events found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
              </div>
            </div>
          ) : (
            <>
              {/* Upcoming Events */}
              {upcomingEvents.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-black p-2 rounded-lg">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-black">Upcoming Events</h2>
                    <Badge className="bg-black text-white px-3 py-1">
                      {upcomingEvents.length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {upcomingEvents.map((event: Event) => (
                      <EventCard key={event.slug} event={event} isPast={false} />
                    ))}
                  </div>
                </div>
              )}

              {/* Past Events */}
              {pastEvents.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="bg-gradient-to-r from-gray-500 to-gray-600 p-2 rounded-lg">
                      <Calendar className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-3xl font-bold text-black">Past Events</h2>
                    <Badge variant="outline" className="text-gray-600 border-gray-600 px-3 py-1">
                      {pastEvents.length}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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

      {/* CTA Section
      <section className="py-20 bg-gradient-to-br from-black via-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Don&apos;t Miss Out on Future Events
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Be the first to know about new events, exclusive workshops, and special announcements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:from-yellow-500 hover:to-orange-600 font-semibold px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300">
              Join Our Newsletter
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-black font-semibold px-8 py-3 transition-all duration-300"
            >
              Follow Us
            </Button>
          </div>
        </div>
      </section> */}
    </div>
  );
}