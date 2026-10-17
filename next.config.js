/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        // The AI CV Builder case study was replaced by the Drupal project.
        source: "/projects/cv-builder",
        destination: "/projects/council-services",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
