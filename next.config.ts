/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nouns.center",
      },
      {
        protocol: "https",
        hostname: "noun.pics",
      },
    ],
  },
};

export default nextConfig;
