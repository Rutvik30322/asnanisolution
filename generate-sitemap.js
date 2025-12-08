import { writeFileSync } from 'fs';
import { join } from 'path';

// Base URL of your website
const BASE_URL = 'https://asnanihr.in';

// Static pages
const STATIC_PAGES = [
  '',
  '/about',
  '/faqs',
  '/insights',
  '/recruitment'
];

// Dynamic recruitment categories from your data
const RECRUITMENT_CATEGORIES = [
  'oil-gas-mechanical-projects',
  'construction',
  'electrical-instrumentation',
  'hvac-manufacturing',
  'hospitality-services',
  'tailoring-upholstery',
  'general-positions'
];

// Generate sitemap content
let sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

// Add static pages
STATIC_PAGES.forEach(page => {
  sitemapContent += `  <url>
    <loc>${BASE_URL}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>\n`;

  // Add dynamic recruitment category pages
  if (page === '/recruitment') {
    RECRUITMENT_CATEGORIES.forEach(category => {
      sitemapContent += `  <url>
    <loc>${BASE_URL}/recruitment/${category}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
    });
  }

  // Add dynamic insights pages (you can customize this based on actual insights)
  if (page === '/insights') {
    // For now, we'll add some example insights - you can modify this based on your actual content
    const insights = ['industry-trends', 'career-advice', 'market-analysis'];
    insights.forEach(insight => {
      sitemapContent += `  <url>
    <loc>${BASE_URL}/insights/${insight}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\n`;
    });
  }

  // Add dynamic FAQ pages (you can customize this based on actual FAQs)
  if (page === '/faqs') {
    // For now, we'll add some example FAQ categories - you can modify this based on your actual content
    const faqCategories = ['general', 'recruitment', 'services'];
    faqCategories.forEach(faq => {
      sitemapContent += `  <url>
    <loc>${BASE_URL}/faqs/${faq}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>\n`;
    });
  }
});

sitemapContent += `</urlset>`;

// Write sitemap to file
const sitemapPath = join(process.cwd(), 'client', 'public', 'sitemap.xml');
writeFileSync(sitemapPath, sitemapContent);

console.log('Sitemap generated successfully at:', sitemapPath);