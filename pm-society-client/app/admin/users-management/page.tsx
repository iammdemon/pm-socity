"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs,TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Users,
  Filter,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  UserCircle,
  Mail,
  BookOpen,
  Calendar,
  AlertTriangle,
  Linkedin,
  Crown,
  Star,
} from "lucide-react";
import { IUser, useGetAllUsersQuery } from "@/app/redux/services/userApi";

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [packageFilter, setPackageFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [activeTab, setActiveTab] = useState("all");

  const { data, isLoading, isError, error, refetch } = useGetAllUsersQuery();

  const users: IUser[] = data?.data || [];
  const members = users.filter((user) => user.role !== "admin");
  const linkedinSupportUsers = members.filter(
    (user) => user.linkedinSupport === "active"
  );
  const regularUsers = members.filter(
    (user) => user.linkedinSupport !== "active"
  );

  // Determine which users to display based on active tab
  const displayUsers =
    activeTab === "linkedin" ? linkedinSupportUsers : regularUsers;

  // Filter users based on search and package filter
  const filteredUsers: IUser[] = displayUsers?.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPackage =
      packageFilter === "all" || user.packageType === packageFilter;
    return matchesSearch && matchesPackage;
  });

  // Get unique packages for filter dropdown
  const uniquePackages = [
    ...new Set(displayUsers.map((user) => user.packageType || "N/A")),
  ];

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / pageSize);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, packageFilter, activeTab]);

  const formatDate = (dateString: string | Date | undefined) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getPackageBadgeVariant = (packageType: string | undefined) => {
    switch (packageType) {
      case "IGNITE":
        return "default";
      case "ELEVATE":
        return "secondary";
      case "ASCEND":
        return "outline";
      case "THE_SOCIETY":
        return "default";
      case "THE_SOCIETY_PLUS":
        return "destructive";
      default:
        return "secondary";
    }
  };

  const isMembershipExpired = (endDate: Date | undefined) => {
    if (!endDate) return false;
    return new Date(endDate) < new Date();
  };

  const LoadingSkeleton = () => (
    <div className="space-y-4">
      {[...Array(5)].map((_, i) => (
        <div key={i} className="flex items-center space-x-4 p-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );

  const ErrorAlert = () => (
    <Alert variant="destructive" className="mb-6">
      <AlertDescription className="flex items-center justify-between">
        <span>
          Failed to load users.{" "}
          {error &&
          "data" in error &&
          typeof error.data === "object" &&
          error.data !== null &&
          "message" in error.data
            ? (error.data as { message: string }).message
            : "Please try again."}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          className="ml-4"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </AlertDescription>
    </Alert>
  );

  const EmptyState = () => (
    <div className="text-center py-12">
      <UserCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No {activeTab === "linkedin" ? "LinkedIn Support" : ""} users found
      </h3>
      <p className="text-gray-500">
        {searchTerm || packageFilter !== "all"
          ? "Try adjusting your search or filter criteria."
          : `No ${activeTab === "linkedin" ? "LinkedIn Support" : ""} users have been enrolled yet.`}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-white p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 border-b pb-6">
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-8 w-8 text-black" />
            <h1 className="text-3xl font-bold text-black">Users Management</h1>
          </div>
          <p className="text-gray-600">
            Manage and view all enrolled users with package details
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-l-4 border-l-black shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-black">{members.length}</p>
                </div>
                <Users className="h-8 w-8 text-black" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-black shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Packages</p>
                  <p className="text-2xl font-bold text-black">
                    {uniquePackages.length - 1}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-black" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-black shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">This Month</p>
                  <p className="text-2xl font-bold text-black">
                    {
                      filteredUsers.filter((user) => {
                        if (!user.createdAt) return false;
                        const createdAt = new Date(user.createdAt);
                        return (
                          createdAt.getMonth() === new Date().getMonth() &&
                          createdAt.getFullYear() === new Date().getFullYear()
                        );
                      }).length
                    }
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-black" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-yellow-400 shadow-sm bg-gradient-to-r from-gray-50 to-gray-100">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    LinkedIn Support
                  </p>
                  <p className="text-2xl font-bold text-black">
                    {linkedinSupportUsers.length}
                  </p>
                </div>
                <div className="relative">
                  <Linkedin className="h-8 w-8 text-blue-600" />
                  <Crown className="absolute -top-1 -right-1 h-4 w-4 text-yellow-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="shadow-sm border border-gray-200">
          <CardHeader className="border-b p-6">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <TabsList className="grid w-full sm:w-auto grid-cols-2 bg-gray-100">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    All Users ({regularUsers.length})
                  </TabsTrigger>
                  <TabsTrigger
                    value="linkedin"
                    className="data-[state=active]:bg-black data-[state=active]:text-white"
                  >
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn Support ({linkedinSupportUsers.length})
                    </div>
                  </TabsTrigger>
                </TabsList>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-full sm:w-64 border-gray-300 focus:border-black"
                    />
                  </div>
                  <Select value={packageFilter} onValueChange={setPackageFilter}>
                    <SelectTrigger className="w-full sm:w-48 border-gray-300 focus:border-black">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by package" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Packages</SelectItem>
                      {uniquePackages.map((pkg) => (
                        <SelectItem
                          key={pkg}
                          value={pkg}
                          disabled={pkg === "N/A"}
                        >
                          {pkg || "N/A"}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    onClick={() => refetch()}
                    disabled={isLoading}
                    className="w-full sm:w-auto border-gray-300 hover:bg-black hover:text-white"
                  >
                    <RefreshCw
                      className={`h-4 w-4 mr-2 ${
                        isLoading ? "animate-spin" : ""
                      }`}
                    />
                    Refresh
                  </Button>
                </div>
              </div>
            </Tabs>
          </CardHeader>
          <CardContent className="p-0">
            {isError && (
              <div className="p-6">
                <ErrorAlert />
              </div>
            )}
            {isLoading ? (
              <div className="p-6">
                <LoadingSkeleton />
              </div>
            ) : filteredUsers.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-black">
                          Serial No.
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                          User
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                          Email
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                          Package
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                          Subscription
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                          Membership End
                        </TableHead>
                        <TableHead className="font-semibold text-black">
                          Status
                        </TableHead>
                        {activeTab === "linkedin" && (
                          <TableHead className="font-semibold text-black">
                            LinkedIn Support
                          </TableHead>
                        )}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedUsers.map((user, index) => {
                        const isExpired = isMembershipExpired(
                          user.subscriptionEndDate
                            ? new Date(user.subscriptionEndDate)
                            : undefined
                        );

                        return (
                          <TableRow
                            key={user._id}
                            className="hover:bg-gray-50 border-b border-gray-100"
                          >
                            <TableCell className="px-4 py-3">
                              {(currentPage - 1) * pageSize + index + 1}.
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <div className="flex items-center space-x-3">
                                <UserCircle className="h-8 w-8 text-gray-400" />
                                <span className="font-medium text-black">
                                  {user.name}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <Mail className="h-4 w-4 text-gray-400" />
                                <span className="text-gray-700">
                                  {user.email}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <Badge
                                variant={getPackageBadgeVariant(
                                  user.packageType
                                )}
                                className="text-sm"
                              >
                                {user.packageType || "N/A"}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <Badge
                                variant="outline"
                                className="text-sm border-gray-300"
                              >
                                {user.subscriptionType || "One-Time"}
                              </Badge>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <div className="flex items-center space-x-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                <span
                                  className={`text-gray-600 ${
                                    isExpired ? "text-red-500" : ""
                                  }`}
                                >
                                  {formatDate(user.subscriptionEndDate)}
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="px-4 py-3">
                              <Badge
                                variant={
                                  isExpired
                                    ? "destructive"
                                    : user.subscriptionStatus === "active"
                                    ? "default"
                                    : "secondary"
                                }
                                className="text-sm"
                              >
                                {isExpired
                                  ? "Expired"
                                  : user.subscriptionStatus || "Active"}
                                {isExpired && (
                                  <AlertTriangle className="ml-1 h-3 w-3" />
                                )}
                              </Badge>
                            </TableCell>
                            {activeTab === "linkedin" && (
                              <TableCell className="px-4 py-3">
                                <div className="flex items-center space-x-2">
                                  <Badge
                                    variant="outline"
                                    className="bg-blue-50 text-blue-700 border-blue-200"
                                  >
                                    <Linkedin className="h-3 w-3 mr-1" />
                                    Active
                                  </Badge>
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                </div>
                              </TableCell>
                            )}
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-700">
                        Showing {(currentPage - 1) * pageSize + 1} to{" "}
                        {Math.min(currentPage * pageSize, filteredUsers.length)}{" "}
                        of {filteredUsers.length} users
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Select
                        value={pageSize.toString()}
                        onValueChange={(value) => setPageSize(Number(value))}
                      >
                        <SelectTrigger className="w-20 border-gray-300 focus:border-black">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                          <SelectItem value="50">50</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="border-gray-300 hover:bg-black hover:text-white"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm text-gray-700">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="border-gray-300 hover:bg-black hover:text-white"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}