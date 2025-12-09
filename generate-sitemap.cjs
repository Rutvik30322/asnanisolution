// Generate sitemap for Asnani HR Solutions
const fs = require('fs');
const path = require('path');

// Define all URLs for the website
const urls = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  // Recruitment category pages
  { url: '/recruitment/oil-gas-mechanical-projects', changefreq: 'weekly', priority: 0.7 },
  { url: '/recruitment/construction', changefreq: 'weekly', priority: 0.7 },
  { url: '/recruitment/electrical-instrumentation', changefreq: 'weekly', priority: 0.7 },
  { url: '/recruitment/hvac-manufacturing', changefreq: 'weekly', priority: 0.7 },
  { url: '/recruitment/hospitality-services', changefreq: 'weekly', priority: 0.7 },
  { url: '/recruitment/tailoring-upholstery', changefreq: 'weekly', priority: 0.7 },
  { url: '/recruitment/general-positions', changefreq: 'weekly', priority: 0.7 },
  // Insights pages
  { url: '/insights/how-to-get-a-job-gulf-russia', changefreq: 'monthly', priority: 0.6 },
  { url: '/insights/why-choose-us-asnani', changefreq: 'monthly', priority: 0.6 },
  { url: '/insights/in-demand-jobs-2025', changefreq: 'monthly', priority: 0.6 },
  { url: '/insights/visa-process-gulf-russia', changefreq: 'monthly', priority: 0.6 },
  // FAQ pages
  { url: '/faqs/general-faqs', changefreq: 'monthly', priority: 0.5 },
  { url: '/faqs/candidate-faqs', changefreq: 'monthly', priority: 0.5 },
  { url: '/faqs/client-faqs', changefreq: 'monthly', priority: 0.5 },
  { url: '/faqs/support-faqs', changefreq: 'monthly', priority: 0.5 }
];

// Generate XML content
const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>https://asnanihr.in${url.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write to sitemap.xml
const outputPath = path.join(__dirname, 'sitemap.xml');
fs.writeFileSync(outputPath, xmlContent);

console.log(`Sitemap generated successfully at ${outputPath}`);
