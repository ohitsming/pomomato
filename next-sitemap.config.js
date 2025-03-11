/** @type {import('next-sitemap').IConfig} */
// import api to fetch dynamic links

module.exports = {
    siteUrl: process.env.NEXT_PUBLIC_DOMAIN_URI || 'https://pomomato.com',
    generateRobotsTxt: true,
    sitemapSize: 500,
    changefreq: 'daily',
    priority: 0.8,
    generateRobotsTxt: true, // Generate robots.txt
    sitemapSize: 7000, // Split large sitemaps into multiple files
}