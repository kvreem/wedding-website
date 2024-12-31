/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
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
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.join(__dirname, 'components'),
      '@custom-components': path.join(__dirname, 'custom-components'),
      '@pages': path.join(__dirname, 'pages'),
      '@modules': path.join(__dirname, 'modules'),
      '@system': path.join(__dirname, 'system'),
      '@demos': path.join(__dirname, 'demos'),
      '@common': path.join(__dirname, 'common'),
      '@data': path.join(__dirname, 'data'),
      '@root': __dirname,
    };
    
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