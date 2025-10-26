import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/photos/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: "/**" // Replace with your actual hostname
       
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '9000', 
        pathname: "/**" // Replace with your actual hostname
      }
    ],
  },
 
};

export default nextConfig;
