module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3000/api/:path*", // Ensures Next.js doesn't override Express API
      },
    ];
  },
};