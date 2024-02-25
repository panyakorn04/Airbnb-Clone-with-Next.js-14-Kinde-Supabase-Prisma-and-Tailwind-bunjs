/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['eykkgopntdatfbahomet.supabase.co', 'another-domain.com'],
        remotePatterns: [
          {
            hostname: "a0.muscache.com",
            protocol: "https",
            port: "",
          },
          {
            hostname: "glvmmupiqwlmhicmggqp.supabase.co",
            protocol: "https",
            port: "",
          },
        ],
      },
};

export default nextConfig;
