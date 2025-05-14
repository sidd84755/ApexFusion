import React from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

/**
 * SEO component for managing all meta tags dynamically
 */
const SEO = ({ 
  title, 
  description, 
  keywords, 
  ogType = 'website',
  ogImage = '/og-image.jpg',
  twitterCard = 'summary_large_image',
  canonicalUrl,
  structuredData
}) => {
  // Base URL - replace with your actual domain when deployed
  const siteUrl = 'https://apexfusion.com';
  
  // Default title and descriptions if not provided
  const defaultTitle = 'ApexFusion - Turning Ideas into Digital Masterpieces';
  const defaultDescription = 'ApexFusion creates innovative software solutions including custom web apps, mobile development, and cloud services. Transform your business with our cutting-edge technology.';
  const defaultKeywords = 'software development, web apps, mobile apps, cloud solutions, digital transformation, custom software, ApexFusion';
  
  // Use provided values or defaults
  const metaTitle = title || defaultTitle;
  const metaDescription = description || defaultDescription;
  const metaKeywords = keywords || defaultKeywords;
  
  // Set canonical URL
  const canonical = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={canonical} />
      <meta property="twitter:title" content={metaTitle} />
      <meta property="twitter:description" content={metaDescription} />
      <meta property="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Structured Data if provided */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  ogType: PropTypes.string,
  ogImage: PropTypes.string,
  twitterCard: PropTypes.string,
  canonicalUrl: PropTypes.string,
  structuredData: PropTypes.object
};

export default SEO; 