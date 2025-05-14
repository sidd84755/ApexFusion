import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Component for adding structured data for testimonials
 */
const TestimonialSchema = ({ testimonials }) => {
  const reviewData = testimonials.map(testimonial => ({
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": testimonial.rating || 5,
      "bestRating": 5
    },
    "author": {
      "@type": "Person",
      "name": testimonial.name
    },
    "reviewBody": testimonial.quote
  }));

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "ApexFusion Software Solutions",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": testimonials.length
    },
    "review": reviewData
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default TestimonialSchema; 