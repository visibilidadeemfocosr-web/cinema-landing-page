/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removido ignoreBuildErrors para garantir qualidade do código
  images: {
    // Habilitando otimização de imagens do Next.js
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
