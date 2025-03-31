/** @type {import('next-sitemap').IConfig} */
// import api to fetch dynamic links

module.exports = {
    siteUrl: 'https://pomomato.com/',
    generateRobotsTxt: true,
    changefreq: 'daily',
    priority: 0.8,
    exclude: [
        '/auth/*',
        '/payment/*'
    ],
    sitemapSize: 200, // Split large sitemaps into multiple files
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/auth/*', '/payment/*']
            },
        ],
    },
}