/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://ckb.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
     policies: [
        {userAgent: "*", allow: "/project/*"},
        {userAgent: "*", allow: "/"},
     ],
  },
};
