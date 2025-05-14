import { useState, useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import theme from './theme'
import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/HeroSection/HeroSection'
import Products from './components/Products/Products'
import AboutUs from './components/AboutUs/AboutUs'
import Testimonials from './components/Testimonials/Testimonials'
import ContactForm from './components/ContactForm/ContactForm'
import Footer from './components/Footer/Footer'
import ThreeCanvas from './components/ThreeCanvas/ThreeCanvas'
import PrivacyPolicy from './components/PrivacyPolicy/PrivacyPolicy'
import SEO from './components/SEO/SEO'
import ServiceSchema from './components/SEO/ServiceSchema'
import TestimonialSchema from './components/SEO/TestimonialSchema'
import FAQSchema from './components/SEO/FAQSchema'
import './App.css'

// Sample data for structured data
const sampleServices = [
  {
    title: "Custom Web Development",
    description: "We create custom, responsive web applications tailored to your specific business needs."
  },
  {
    title: "Mobile App Development",
    description: "Native and cross-platform mobile applications for iOS and Android devices."
  },
  {
    title: "ERP Solutions",
    description: "Custom enterprise resource planning solutions to streamline your business operations."
  },
  {
    title: "Cloud Services",
    description: "Secure, scalable cloud solutions for businesses of all sizes."
  },
  {
    title: "Data Analytics",
    description: "Transform your data into actionable insights with our analytics solutions."
  }
];

const sampleTestimonials = [
  {
    name: "John Smith",
    position: "CEO, TechCorp",
    quote: "ApexFusion delivered our project on time and exceeded our expectations. Their team was professional and responsive throughout the entire process.",
    rating: 5
  },
  {
    name: "Sarah Johnson",
    position: "Marketing Director, InnovateCo",
    quote: "The mobile app ApexFusion developed for us has significantly increased our customer engagement. We highly recommend their services.",
    rating: 5
  },
  {
    name: "Michael Brown",
    position: "CTO, FutureTech",
    quote: "ApexFusion's cloud solutions have transformed our infrastructure. Their expertise and attention to detail are unmatched.",
    rating: 4
  }
];

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [currentPage, setCurrentPage] = useState('home');
  
  useEffect(() => {
    // Check URL hash for navigation
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#privacy-policy') {
        setCurrentPage('privacy-policy');
      } else {
        setCurrentPage('home');
        
        // Only update active section when on home page
        const sections = ['home', 'products', 'about', 'testimonials', 'contact'];
        if (hash) {
          const section = hash.substring(1);
          if (sections.includes(section)) {
            setActiveSection(section);
          }
        }
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check initial URL
    
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);
  
  useEffect(() => {
    if (currentPage === 'home') {
      const handleScroll = () => {
        const sections = ['home', 'products', 'about', 'testimonials', 'contact'];
        const scrollPosition = window.scrollY + 100;
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const offsetTop = element.offsetTop;
            const offsetHeight = element.offsetHeight;
            
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [currentPage]);
  
  // Define SEO data for different pages
  const seoData = {
    home: {
      title: 'ApexFusion - Turning Ideas into Digital Masterpieces',
      description: 'ApexFusion creates innovative software solutions including custom web apps, mobile development, and cloud services. Transform your business with our cutting-edge technology.',
      keywords: 'software development, web apps, mobile apps, cloud solutions, digital transformation, custom software, ApexFusion',
      canonicalUrl: '/',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        'name': 'ApexFusion',
        'url': 'https://apexfusion.com',
        'potentialAction': {
          '@type': 'SearchAction',
          'target': 'https://apexfusion.com/search?q={search_term_string}',
          'query-input': 'required name=search_term_string'
        }
      }
    },
    privacy: {
      title: 'Privacy Policy - ApexFusion',
      description: 'Read ApexFusion\'s privacy policy to understand how we collect, use, and protect your personal information.',
      keywords: 'privacy policy, data protection, data security, ApexFusion privacy',
      canonicalUrl: '/privacy-policy',
      structuredData: {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        'name': 'Privacy Policy',
        'description': 'ApexFusion\'s privacy policy and data protection practices.',
        'url': 'https://apexfusion.com/privacy-policy'
      }
    }
  };
  
  const goToHomePage = () => {
    setCurrentPage('home');
    window.location.hash = '';
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {currentPage === 'privacy-policy' ? (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
          <SEO {...seoData.privacy} />
          <PrivacyPolicy onGoBack={goToHomePage} />
          <Footer onNavigate={(page) => setCurrentPage(page)} />
        </Box>
      ) : (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
          <SEO {...seoData.home} />
          <ServiceSchema services={sampleServices} />
          <TestimonialSchema testimonials={sampleTestimonials} />
          <FAQSchema />
          <ThreeCanvas />
          <Navbar activeSection={activeSection} />
          <main>
            <HeroSection id="home" />
            <Products id="products" />
            <AboutUs id="about" />
            <Testimonials id="testimonials" />
            <ContactForm id="contact" />
          </main>
          <Footer onNavigate={(page) => setCurrentPage(page)} />
        </Box>
      )}
    </ThemeProvider>
  )
}

export default App
