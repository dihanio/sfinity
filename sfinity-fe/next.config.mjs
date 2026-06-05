/** @type {import('next').NextConfig} */

const nextConfig = {

  allowedDevOrigins: ["sfinity.ryuzen.my.id"],

  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },

  images: {

    remotePatterns: [

      {
        protocol: "https",
        hostname:
          "images.unsplash.com",
      },

      {
        protocol: "https",
        hostname:
          "ui-avatars.com",
      },

    ],

  },

};

export default nextConfig;