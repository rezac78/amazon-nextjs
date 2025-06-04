import withBundleAnalyzer from "@next/bundle-analyzer";

const nextConfig = {
 compress: true,
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
