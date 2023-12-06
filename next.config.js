/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // See: https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
    config.externals.push("pino-pretty", "lokijs", "encoding");
    config.resolve.fallback = { fs: false };
    return config;
  },
};

module.exports = nextConfig;
