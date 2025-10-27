"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

import { ArrowLeft, Calendar, MapPin, Users, Check } from "lucide-react";

import {
  useGetEventBySlugQuery,
  useRegisterEventMutation,
} from "@/app/redux/services/eventApi";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { IUser } from "@/app/redux/services/userApi";

export default function EventPage() {
  const params = useParams();
  const router = useRouter();

  const slug = params.slug;
  const session = useSession();
  const userId = session.data?.user?.id;

  const { data, isLoading, error, refetch } = useGetEventBySlugQuery(
    slug as string,
    {
      skip: !slug,
    }
  );

  const event = data?.data;

  const [registerEvent, { isLoading: isRegistering }] =
    useRegisterEventMutation();

  const handleRegister = async () => {
    if (!session) {
      router.push(
        "/auth/signin?callbackUrl=" + encodeURIComponent(window.location.href)
      );
      return;
    }

    try {
      await registerEvent(event?._id || "").unwrap();
      refetch();
      toast.success("Successfully registered for the event!", {
        description: "You'll receive a confirmation email shortly.",
        duration: 5000,
      });
    } catch {
      toast.error("Failed to register for event", {
        description: "Please try again later.",
      });
      console.error("Failed to register for event:");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16">
          <div className="space-y-6">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-48" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-24 h-24 rounded-full bg-muted flex items-center justify-center">
              <MapPin className="w-12 h-12 text-muted-foreground" />
            </div>
            <CardTitle className="text-2xl">Event Not Found</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              The event you&apos;re looking for doesn&apos;t exist or has been
              removed.
            </p>
            <Button onClick={() => router.push("/events")} className="w-full">
              Back to Events
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Fix: Properly check if user is registered
  // The joinedUser array might contain either string IDs or populated user objects
  const isRegistered =
    event?.joinedUser?.some((user: IUser | string) => {
      // If it's a string, compare directly
      if (typeof user === "string") {
        return user === userId;
      }
      // If it's an object, compare the _id property
      if (user && typeof user === "object" && user._id) {
        return user._id.toString() === userId;
      }
      return false;
    }) || false;

  // Format date in US timezone
  const formatDate = (dateString: string) => {
    // Extract the date part only, ignoring timezone conversion
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = date.getUTCMonth();
    const day = date.getUTCDate();

    const localDate = new Date(Date.UTC(year, month, day));

    return localDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Button */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/dashboard/events")}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Events
          </Button>
        </div>
      </div>

      {/* Hero Section with Image */}
      <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
        <Image
          src={event?.image || "/placeholder-event.jpg"}
          alt={event?.title}
          fill
          style={{ objectFit: "cover" }}
          className="transition-transform duration-700 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6 md:p-10 max-w-4xl">
          <Badge variant="secondary" className="mb-4">
            Event
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(event?.date)}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>
                {event.joinedUserCount || event.joinedUser?.length || 0}{" "}
                registered
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="grid gap-6">
          {/* Main Content Card */}
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="text-2xl">About this event</CardTitle>
                  <p className="text-muted-foreground mt-1">
                    {event.joinedUserCount || event.joinedUser?.length || 0}{" "}
                    people {isRegistered ? "are registered" : "have registered"}{" "}
                    for this event
                  </p>
                </div>
                {isRegistered ? (
                  <Badge variant="default" className="gap-2 px-4 py-2">
                    <Check className="w-4 h-4" />
                    Registered
                  </Badge>
                ) : (
                  <Button
                    onClick={handleRegister}
                    disabled={isRegistering}
                    size="lg"
                  >
                    {isRegistering ? "Registering..." : "Register Now"}
                  </Button>
                )}
              </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <p className="text-foreground leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Calendar className="w-5 h-5 text-primary" />
                  Date & Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  {formatDate(event?.date)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <MapPin className="w-5 h-5 text-primary" />
                  Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{event.location}</p>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Capacity</span>
                <span className="font-medium">Unlimited</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  Registration Status
                </span>
                <Badge variant={isRegistered ? "default" : "secondary"}>
                  {isRegistered ? "Registered" : "Not Registered"}
                </Badge>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Event Type</span>
                <Badge variant="outline">Public Event</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
