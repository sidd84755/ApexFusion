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
import './App.css'

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
  
  const goToHomePage = () => {
    setCurrentPage('home');
    window.location.hash = '';
  };
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {currentPage === 'privacy-policy' ? (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
          <PrivacyPolicy onGoBack={goToHomePage} />
          <Footer onNavigate={(page) => setCurrentPage(page)} />
        </Box>
      ) : (
        <Box sx={{ position: 'relative', minHeight: '100vh' }}>
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
