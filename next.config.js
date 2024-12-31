/** @type {import('next').NextConfig} */
const path = require('path');
const moduleResolver = require('./module-resolver');

const nextConfig = {
   sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  transpilePackages: ['@components'],
  images: {
    remotePatterns: [],
    domains: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    minimumCacheTTL: 60,
  },
  experimental: {
    largePageDataBytes: 128 * 100000,
  },
  webpack: (config) => {
    // Use the centralized module resolver for aliases
    config.resolve.alias = {
      ...config.resolve.alias,
      ...moduleResolver.alias
    };

    // Add extensions without overwriting
    config.resolve.extensions = [
      ...(config.resolve.extensions || []),
      '.ts', '.tsx', '.js', '.jsx', '.json'
    ];

    // Add modules without overwriting
    config.resolve.modules = [
      path.resolve(__dirname),
      'node_modules',
      ...(config.resolve.modules || [])
    ];
    
    // Font loader config
    config.module.rules.push({
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          publicPath: '/_next/static/fonts/',
          outputPath: 'static/fonts/',
        },
      },
    });

    return config;
  },
};

module.exports = nextConfig;