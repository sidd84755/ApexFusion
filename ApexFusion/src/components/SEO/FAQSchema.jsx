import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Component for adding structured data for FAQs
 */
const FAQSchema = () => {
  const faqs = [
    {
      question: "What services does ApexFusion offer?",
      answer: "ApexFusion offers custom web development, mobile app development, ERP solutions, cloud services, and data analytics."
    },
    {
      question: "How can I get a quote for my project?",
      answer: "You can request a quote by filling out our contact form or calling us directly at +91 7380720888."
    },
    {
      question: "What is the typical development process at ApexFusion?",
      answer: "Our development process includes requirements gathering, planning, design, development, testing, deployment, and ongoing support."
    },
    {
      question: "Does ApexFusion offer maintenance and support after project completion?",
      answer: "Yes, we provide ongoing maintenance and support services to ensure your software continues to function optimally."
    },
    {
      question: "What technologies does ApexFusion work with?",
      answer: "We work with a wide range of technologies including React, Node.js, Python, MongoDB, AWS, and many others based on project requirements."
    }
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

export default FAQSchema; 