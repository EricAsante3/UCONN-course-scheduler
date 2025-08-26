/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    basePath: '/UCONN-Course-Scheduler',
    assetPrefix: '/UCONN-Course-Scheduler/',
    trailingSlash: true, // helps with static hosting like GitHub Pages
};

export default nextConfig;
