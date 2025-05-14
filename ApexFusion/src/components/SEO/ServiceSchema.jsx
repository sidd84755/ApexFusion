import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Component for adding structured data for services
 */
const ServiceSchema = ({ services }) => {
  const servicesData = services.map(service => ({
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "ApexFusion"
    }
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ApexFusion",
    "url": "https://apexfusion.com",
    "logo": "https://apexfusion.com/logo.png",
    "offers": servicesData
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default ServiceSchema; 