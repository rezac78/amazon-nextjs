import type {NextConfig} from "next";

const nextConfig: NextConfig = {
 async rewrites() {
  return [
   {
    source: "/api/proxy/graphql",
    destination: "https://back-api.eleqra.ir/graphql",
   },
  ];
 },
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "back-api.eleqra.ir",
   },
  ],
 },
};

export default nextConfig;
