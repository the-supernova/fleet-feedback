/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/",
        has: [
          {
            type: "cookie",
            key: "next-auth.session-token",
          },
        ],
        destination: "/sites",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;
