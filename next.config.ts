import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
 compress: true,
 env: {
  BASE_URL: process.env.BASE_URL,
  NEXT_PUBLIC_BASE_URL_CLIENT: process.env.NEXT_PUBLIC_BASE_URL_CLIENT,
  BASE_URL_API: process.env.BASE_URL_API,
 },
 images: {
  remotePatterns: [
   {
    protocol: "https",
    hostname: "back-api.eleqra.ir",
    port: undefined,
    pathname: "/**",
   } as const, // ← ترفند مهم برای گذر از TS سختگیرانه
  ],
 },
 async rewrites() {
  return [
   {
    source: "/api/proxy/graphql",
    destination: "https://back-api.eleqra.ir/graphql",
   },
  ];
 },
};

export default withBundleAnalyzer({
 enabled: process.env.ANALYZE === "true",
})(nextConfig);
