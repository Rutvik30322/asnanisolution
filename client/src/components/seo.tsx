import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  url?: string;
  image?: string;
  type?: string;
}

export function SEO({
  title = "Asnani HR Solutions | Premier Manpower Consultancy for Gulf & Middle East",
  description = "Asnani HR Solutions - Premier Manpower Consultancy specializing in Gulf/Middle East recruitment across construction, oil & gas, hospitality, and manufacturing sectors since 2011.",
  keywords = "manpower consultancy, recruitment agency, Gulf jobs, Middle East recruitment, construction jobs, oil and gas recruitment, hospitality staffing, manufacturing jobs",
  url = "https://asnanihr.in/",
  image = "https://res.cloudinary.com/shivshaktisite/image/upload/v1755450397/logoasnani_uethq2.png",
  type = "website",
}: SEOProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
      
      {/* Schema.org structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Asnani HR Solutions",
          "url": url,
          "logo": image,
          "sameAs": [
            // Add your social media links here if you have them
          ]
        })}
      </script>
    </Helmet>
  );
}