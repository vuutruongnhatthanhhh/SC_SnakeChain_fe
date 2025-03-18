import type { NextConfig } from "next";

const API_URL = process.env.NEXT_PUBLIC_SERVER;
if (!API_URL) {
  throw new Error("NEXT_PUBLIC_SERVER is not defined in env");
}
const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [new URL(API_URL).hostname], // Lấy hostname từ API_URL
    remotePatterns: [
      {
        protocol: new URL(API_URL).protocol.replace(":", "") as
          | "http"
          | "https",
        hostname: new URL(API_URL).hostname,
        port: new URL(API_URL).port,
        pathname: "/uploadBlog/**",
      },
      {
        protocol: new URL(API_URL).protocol.replace(":", "") as
          | "http"
          | "https",
        hostname: new URL(API_URL).hostname,
        port: new URL(API_URL).port,
        pathname: "/uploadCourse/**",
      },
      {
        protocol: new URL(API_URL).protocol.replace(":", "") as
          | "http"
          | "https",
        hostname: new URL(API_URL).hostname,
        port: new URL(API_URL).port,
        pathname: "/uploadSourceCode/**",
      },
    ],
  },
};

export default nextConfig;
