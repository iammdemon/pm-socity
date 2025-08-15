"use client"
import React, { useMemo } from "react";
import { 
  Users, 
  DollarSign, 
  Package, 
  UserPlus, 
  ChevronRight, 
  TrendingUp,

  Loader2,
  AlertCircle,

  CreditCard,
  Crown,
  Zap,
  Rocket,
  Star,
 
} from "lucide-react";
import {  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Area, AreaChart } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useGetAllUsersQuery } from "../redux/services/userApi";
import Link from "next/link";



interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phoneNumber?: string;
  course?: string;
  amount?: number;
  role?: "member" | "admin";
  packageType?: "IGNITE" | "ELEVATE" | "ASCEND" | "THE_SOCIETY" | "THE_SOCIETY_PLUS";
  subscriptionType?: "monthly" | "yearly" | "one_time";
  subscriptionId?: string;
  subscriptionStatus?: "active" | "canceled" | "past_due" | "unpaid";
  subscriptionEndDate?: Date | string;
  createdAt?: Date | string;
}

interface ProcessedData {
  totalUsers: number;
  totalRevenue: number;
  monthlyRevenue: number;
  monthlyEnrollments: number;
  growthRate: number;
  activeSubscriptions: number;
  churnRate: number;
  recentEnrollments: Array<{
    id: string;
    name: string;
    packageType: string;
    subscriptionType: string;
    createdAt: Date|string;
    amount: number;
    status: string;
  }>;
  monthlyData: Array<{
    month: string;
    revenue: number;
    enrollments: number;
    users: number;
  }>;
  packageData: Array<{
    name: string;
    enrollments: number;
    revenue: number;
    color: string;
    icon: string;
  }>;
  subscriptionData: Array<{
    type: string;
    count: number;
    revenue: number;
    color: string;
  }>;
}

// Package configurations
const PACKAGE_CONFIG = {
  'IGNITE': {
    name: 'Ignite',
    color: '#EF4444',
    icon: 'Zap',
    description: 'Starter package'
  },
  'ELEVATE': {
    name: 'Elevate',
    color: '#F59E0B',
    icon: 'TrendingUp',
    description: 'Growth package'
  },
  'ASCEND': {
    name: 'Ascend',
    color: '#3B82F6',
    icon: 'Rocket',
    description: 'Advanced package'
  },
  'THE_SOCIETY': {
    name: 'The Society',
    color: '#8B5CF6',
    icon: 'Crown',
    description: 'Premium package'
  },
  'THE_SOCIETY_PLUS': {
    name: 'The Society Plus',
    color: '#10B981',
    icon: 'Star',
    description: 'Ultimate package'
  }
};

const formatDate = (dateString: string | Date) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount/100)
};

const getPackageIcon = (iconName: string) => {
  const icons = {
    'Zap': Zap,
    'TrendingUp': TrendingUp,
    'Rocket': Rocket,
    'Crown': Crown,
    'Star': Star
  };
  return icons[iconName as keyof typeof icons] || Package;
};

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function AdminDashboard() {
  const { data: usersData, isLoading, isError, error } = useGetAllUsersQuery();

  const processedData = useMemo((): ProcessedData => {
    if (!usersData?.data) {
      return {
        totalUsers: 0,
        totalRevenue: 0,
        monthlyRevenue: 0,
        monthlyEnrollments: 0,
        growthRate: 0,
        activeSubscriptions: 0,
        churnRate: 0,
        recentEnrollments: [],
        monthlyData: [],
        packageData: [],
        subscriptionData: []
      };
    }

    const users: IUser[] = usersData.data.filter(user => user.role !== 'admin');
    const totalUsers = users.length;
    const totalRevenue = users.reduce((sum, user) => sum + (user?.amount || 0), 0)
    const activeSubscriptions = users.filter(user => user.subscriptionStatus === 'active').length;

    // Get current month and last month data
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    // Filter users by month
    const currentMonthUsers = users.filter(user => {
      const userDate = new Date(user.createdAt || '');
      return userDate.getMonth() === currentMonth && userDate.getFullYear() === currentYear;
    });

    const lastMonthUsers = users.filter(user => {
      const userDate = new Date(user.createdAt || '');
      return userDate.getMonth() === lastMonth && userDate.getFullYear() === lastMonthYear;
    });

    const monthlyRevenue = currentMonthUsers.reduce((sum, user) => sum + (user.amount || 0), 0)
    const monthlyEnrollments = currentMonthUsers.length;
    const lastMonthRevenue = lastMonthUsers.reduce((sum, user) => sum + (user.amount || 0), 0)
    
    // Calculate growth rate
    const growthRate = lastMonthRevenue > 0 
      ? ((monthlyRevenue - lastMonthRevenue) / lastMonthRevenue) * 100 
      : monthlyRevenue > 0 ? 100 : 0;

    // Calculate churn rate (simplified - canceled subscriptions / total subscriptions)
    const canceledSubscriptions = users.filter(user => user.subscriptionStatus === 'canceled').length;
    const churnRate = totalUsers > 0 ? (canceledSubscriptions / totalUsers) * 100 : 0;

    // Process recent enrollments
    const recentEnrollments = users
      .sort((a, b) => new Date(b.createdAt || '').getTime() - new Date(a.createdAt || '').getTime())
      .slice(0, 10)
      .map(user => ({
        id: user._id,
        name: user.name,
        packageType: user.packageType || 'Unknown',
        subscriptionType: user.subscriptionType || 'one_time',
        createdAt: user.createdAt || '',
        amount: user.amount || 0,
        status: user.subscriptionStatus || 'active'
      }));

    // Process monthly data for the last 7 months
    const monthlyData = [];
    for (let i = 6; i >= 0; i--) {
      const monthDate = new Date(currentYear, currentMonth - i, 1);
      const monthKey = monthDate.getMonth();
      const yearKey = monthDate.getFullYear();
      
      const monthUsers = users.filter(user => {
        const userDate = new Date(user.createdAt || '');
        return userDate.getMonth() === monthKey && userDate.getFullYear() === yearKey;
      });

      monthlyData.push({
        month: MONTH_NAMES[monthKey],
        revenue: monthUsers.reduce((sum, user) => sum + (user.amount || 0), 0),
        enrollments: monthUsers.length,
        users: monthUsers.length
      });
    }

    // Process package data
    const packageMap = new Map<string, { enrollments: number; revenue: number }>();
    
    users.forEach(user => {
      const packageType = user.packageType || 'Unknown';
      const existing = packageMap.get(packageType) || { enrollments: 0, revenue: 0 };
      packageMap.set(packageType, {
        enrollments: existing.enrollments + 1,
        revenue: existing.revenue + (user.amount || 0)
      });
    });

    const packageData = Array.from(packageMap.entries())
      .map(([packageType, data]) => ({
        name: PACKAGE_CONFIG[packageType as keyof typeof PACKAGE_CONFIG]?.name || packageType,
        enrollments: data.enrollments,
        revenue: data.revenue,
        color: PACKAGE_CONFIG[packageType as keyof typeof PACKAGE_CONFIG]?.color || '#6B7280',
        icon: PACKAGE_CONFIG[packageType as keyof typeof PACKAGE_CONFIG]?.icon || 'Package'
      }))
      .sort((a, b) => b.enrollments - a.enrollments);

    // Process subscription data
    const subscriptionMap = new Map<string, { count: number; revenue: number }>();
    
    users.forEach(user => {
      const subType = user.subscriptionType || 'one_time';
      const existing = subscriptionMap.get(subType) || { count: 0, revenue: 0 };
      subscriptionMap.set(subType, {
        count: existing.count + 1,
        revenue: existing.revenue + (user.amount || 0)
      });
    });

    const subscriptionData = Array.from(subscriptionMap.entries())
      .map(([type, data]) => ({
        type: type.charAt(0).toUpperCase() + type.slice(1),
        count: data.count,
        revenue: data.revenue,
        color: type === 'monthly' ? '#3B82F6' : type === 'yearly' ? '#10B981' : '#F59E0B'
      }));

    return {
      totalUsers,
      totalRevenue,
      monthlyRevenue,
      monthlyEnrollments,
      growthRate,
      activeSubscriptions,
      churnRate,
      recentEnrollments,
      monthlyData,
      packageData,
      subscriptionData
    };
  }, [usersData]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 mb-2">Failed to load dashboard data</p>
          <p className="text-gray-600 text-sm">
            {error ? 'An error occurred' : 'Please try again later'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Dashboard Overview
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back! Here&apos;s your business performance at a glance.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
              <Users className="h-5 w-5 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{processedData.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">
                {processedData.activeSubscriptions} active subscriptions
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Revenue</CardTitle>
              <DollarSign className="h-5 w-5 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(processedData.totalRevenue)}</div>
              <p className="text-xs text-gray-500 mt-1">
                All time revenue
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Revenue</CardTitle>
              <TrendingUp className="h-5 w-5 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{formatCurrency(processedData.monthlyRevenue)}</div>
              <p className={`text-xs mt-1 flex items-center gap-1 ${processedData.growthRate >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {processedData.growthRate >= 0 ? '+' : ''}{processedData.growthRate.toFixed(1)}% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Monthly Enrollments</CardTitle>
              <UserPlus className="h-5 w-5 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">{processedData.monthlyEnrollments}</div>
              <p className="text-xs text-gray-500 mt-1">
                {processedData.churnRate.toFixed(1)}% churn rate
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Revenue Trend */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue performance over the last 7 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={processedData.monthlyData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    formatter={(value) => [formatCurrency(Number(value)), 'Revenue']} 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)"
                    strokeWidth={3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Enrollment Trend */}
          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Enrollment Trend</CardTitle>
              <CardDescription>Monthly enrollments over the last 7 months</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={processedData.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" stroke="#64748b" />
                  <YAxis stroke="#64748b" />
                  <Tooltip 
                    formatter={(value) => [value, 'Enrollments']}
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                  <Bar dataKey="enrollments" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Package Performance & Subscription Distribution */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Package Performance</CardTitle>
              <CardDescription>Revenue and enrollment breakdown by package type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {processedData.packageData.length > 0 ? (
                  processedData.packageData.map((pkg, index) => {
                    const IconComponent = getPackageIcon(pkg.icon);
                    return (
                      <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${pkg.color}20` }}
                          >
                            <IconComponent className="w-6 h-6" style={{ color: pkg.color }} />
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{pkg.name}</p>
                            <p className="text-sm text-gray-600">{pkg.enrollments} enrollments</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">{formatCurrency(pkg.revenue)}</p>
                          <p className="text-sm text-gray-600">Revenue</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No package data available</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-800">Packages Types</CardTitle>
              <CardDescription>Distribution of Packages</CardDescription>
            </CardHeader>
            <CardContent>
              {processedData.packageData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={processedData.packageData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="enrollments"
                      >
                        {processedData.packageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name, props) => [value,name, props.payload.type]}
                        contentStyle={{ 
                          backgroundColor: 'white', 
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="space-y-2 mt-4">
                    {processedData.packageData.map((sub, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: sub.color }}
                          ></div>
                          <span className="text-sm font-medium">{sub.name}</span>
                        </div>
                        <span className="text-sm text-gray-600">{sub.enrollments}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-[250px] text-gray-500">
                  <div className="text-center">
                    <CreditCard className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No subscription data</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Enrollments */}
        <Card className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-gray-800">Recent Enrollments</CardTitle>
                <CardDescription>Latest student enrollments and package selections</CardDescription>
              </div>
              <Link href="/admin/users-management" className="flex items-center gap-2 bg-black text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200">
                View All
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {processedData.recentEnrollments.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Student</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Package</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Subscription</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {processedData.recentEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                        <td className="py-3 px-4 font-medium text-gray-900">{enrollment.name}</td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full" style={{ 
                            backgroundColor: `${PACKAGE_CONFIG[enrollment.packageType as keyof typeof PACKAGE_CONFIG]?.color || '#6B7280'}20`,
                            color: PACKAGE_CONFIG[enrollment.packageType as keyof typeof PACKAGE_CONFIG]?.color || '#6B7280'
                          }}>
                            {PACKAGE_CONFIG[enrollment.packageType as keyof typeof PACKAGE_CONFIG]?.name || enrollment.packageType}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 capitalize">{enrollment.subscriptionType}</td>
                        <td className="py-3 px-4 font-semibold text-gray-900">{formatCurrency(enrollment.amount)}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                            enrollment.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : enrollment.status === 'canceled' 
                              ? 'bg-red-100 text-red-800'
                              : enrollment.status === 'past_due'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}>
                            {enrollment.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600">
                          {formatDate(enrollment.createdAt)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <Users className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>No recent enrollments</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

      
      </div>
    </div>
  );
}