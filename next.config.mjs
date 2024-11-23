/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['www.publico.es', 'picsum.photos', 'imagenes.elpais.com', 'upload.wikimedia.org'],
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  }
};

export default nextConfig;
