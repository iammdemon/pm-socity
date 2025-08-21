"use client";

import { useGetContactFormQuery } from "@/app/redux/services/contactApi";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { ContactData } from "@/app/connect/page";

export default function ContactMessagesPage() {
  const { data, isLoading, isError } = useGetContactFormQuery({});

  if (isLoading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading messages...</p>
      </div>
    );

  if (isError)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-600 text-lg">Failed to load messages.</p>
      </div>
    );

  return (
    <div className="bg-white min-h-screen p-4 ">
      <h1 className="text-3xl font-bold text-black mb-8 text-center">
        Contact Messages
      </h1>

      {data && data.length > 0 ? (
        <div className="overflow-x-auto border border-gray-300 rounded-lg shadow-sm">
          <Table className="min-w-full">
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead className="text-black">Name</TableHead>
                <TableHead className="text-black">Email</TableHead>
                <TableHead className="text-black">Phone</TableHead>
                <TableHead className="text-black">Message</TableHead>
                <TableHead className="text-black text-center">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data.map((msg:ContactData, index:number) => (
                <TableRow key={index} className="hover:bg-gray-100 align-top">
                  <TableCell className="text-black font-medium">{msg.name}</TableCell>
                  <TableCell className="text-black break-words">{msg.email}</TableCell>
                  <TableCell className="text-black">{msg.phone || "-"}</TableCell>
                  <TableCell className="text-black break-words max-w-xs">
                    {msg.message}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      className="flex items-center gap-2 text-black border-black"
                      asChild
                    >
                      <a href={`mailto:${msg.email}`}>
                        <Mail size={16} /> Mail
                      </a>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center text-gray-600 mt-10 text-lg">No messages found.</p>
      )}
    </div>
  );
}
