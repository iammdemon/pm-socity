"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { LuArrowLeft, LuCalendar } from "react-icons/lu";
import Link from "next/link";
import Image from "next/image";
import Header from "@/app/components/layout/Header";
import Footer from "@/app/components/layout/Footer";
import localFont from "next/font/local";


const bonVivant = localFont({
  src: "../../../public/fonts/BonVivantSerifBold.ttf",
});

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  tags: string[];
  image: string;
  createdAt: string;
  content: string;
}

export default function BlogPostPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchPost = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/blogs/${slug}`
        );
        if (!res.ok) {
          throw new Error(`Failed to fetch blog: ${res.status}`);
        }
        const json = await res.json();
        if (!json.data) throw new Error("No data found");
        setPost(json.data);
      } catch (err: unknown) {
        console.error(err);
        setError("Could not load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#ECE8E1] p-8">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-48 mb-4" />
          <Skeleton className="h-12 w-3/4 mb-4" />
          <Skeleton className="h-64 w-full mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-[#ECE8E1] flex items-center justify-center p-8">
        <Card className="border-none shadow-lg bg-white p-6 max-w-xl mx-auto">
          <CardContent>
            <p className="text-red-600 mb-4">{error || "Blog not found"}</p>
            <Link href="/blogs">
              <Button
                variant="outline"
                className="text-black border-black hover:bg-black hover:text-white"
              >
                <LuArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#ECE8E1]">
        <div className="container mx-auto bg-white">
          <div className="relative w-full h-[80vh]">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
          <Card className="border-none max-w-7xl mx-auto shadow-lg bg-white p-5">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                    {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-black text-white"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
              <CardTitle
                className={`${bonVivant.className} text-4xl font-bold text-black`}
              >
                {post.title}
              </CardTitle>
              <div className="flex flex-wrap font-medium items-center gap-4 text-sm text-gray-600 mt-2">
                <span>
                  By Admin
                </span>
                
                
                <div className="flex items-center gap-2">
              <LuCalendar /> <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose prose-lg max-w-none text-black">
                {post.content.split("\n").map((paragraph, idx) => (
                  <p key={idx} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
             
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
