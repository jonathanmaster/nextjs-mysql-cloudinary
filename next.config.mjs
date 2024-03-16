/** @type {import('next').NextConfig} */
const nextConfig = {
  // redirects es para decirle de donde a donde va a ir una página
  async redirects() {
    return [
      {
        source: '/',
        destination: '/products',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
