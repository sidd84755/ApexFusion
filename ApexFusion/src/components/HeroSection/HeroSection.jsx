import { useRef, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const HeroSection = ({ id }) => {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  useEffect(() => {
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-hero');
        }
      });
    };
    
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.2,
    });
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  const scrollToProducts = (e) => {
    e.preventDefault();
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Calculate parallax transformations based on scroll position
  const headerTransform = `translateY(${scrollY * 0.2}px)`;
  const subheaderTransform = `translateY(${scrollY * 0.15}px)`;
  const buttonsTransform = `translateY(${scrollY * 0.1}px)`;

  return (
    <Box
      component="section"
      id={id}
      ref={sectionRef}
      sx={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'transparent',
      }}
    >
      {/* Decorative Elements with Parallax Effect */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '20vw',
          height: '20vw',
          maxWidth: '300px',
          maxHeight: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.primary.main}30 0%, ${theme.palette.primary.main}05 70%)`,
          opacity: 0.7,
          transform: `translate(${scrollY * -0.1}px, ${scrollY * 0.05}px)`,
          zIndex: 0,
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          right: '10%',
          width: '15vw',
          height: '15vw',
          maxWidth: '200px',
          maxHeight: '200px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.palette.secondary.main}30 0%, ${theme.palette.secondary.main}05 70%)`,
          opacity: 0.7,
          transform: `translate(${scrollY * 0.12}px, ${scrollY * -0.08}px)`,
          zIndex: 0,
        }}
      />
      
      {/* Floating geometric shapes */}
      <Box
        sx={{
          position: 'absolute',
          top: '25%',
          right: '20%',
          width: '80px',
          height: '80px',
          borderRadius: '12px',
          background: `linear-gradient(135deg, ${theme.palette.primary.main}40, ${theme.palette.primary.light}40)`,
          transform: `translate(${scrollY * 0.15}px, ${scrollY * -0.1}px) rotate(${scrollY * 0.05}deg)`,
          zIndex: 0,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '30%',
          left: '15%',
          width: '60px',
          height: '60px',
          background: `linear-gradient(135deg, ${theme.palette.secondary.main}40, ${theme.palette.secondary.light}40)`,
          transform: `translate(${scrollY * -0.15}px, ${scrollY * 0.1}px) rotate(${45 - scrollY * 0.03}deg)`,
          zIndex: 0,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          top: '60%',
          left: '25%',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: `linear-gradient(135deg, ${theme.palette.primary.light}40, ${theme.palette.secondary.light}40)`,
          transform: `translate(${scrollY * -0.2}px, ${scrollY * 0.15}px)`,
          zIndex: 0,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            py: { xs: 8, md: 12 },
          }}
        >
          <Typography
            variant="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4.5rem' },
              lineHeight: 1.2,
              mb: 2,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              opacity: 0,
              transform: `translateY(-20px) ${headerTransform}`,
              animation: 'fadeInUp 0.8s forwards 0.2s',
              position: 'relative',
              zIndex: 3,
              textShadow: '0 5px 15px rgba(0,0,0,0.1)',
            }}
          >
            Turning Ideas into Digital Masterpieces
          </Typography>
          
          <Typography
            variant="h5"
            gutterBottom
            sx={{
              maxWidth: '800px',
              mb: 4,
              color: 'text.secondary',
              opacity: 0,
              transform: `translateY(-20px) ${subheaderTransform}`,
              animation: 'fadeInUp 0.8s forwards 0.4s',
              position: 'relative',
              zIndex: 3,
            }}
          >
            We help businesses transform their vision into powerful software solutions
            that drive growth, efficiency, and innovation.
          </Typography>
          
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 2,
              mt: 2,
              opacity: 0,
              transform: `translateY(-20px) ${buttonsTransform}`,
              animation: 'fadeInUp 0.8s forwards 0.6s',
              position: 'relative',
              zIndex: 3,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              size="large"
              href="#contact"
              sx={{
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                boxShadow: `0 4px 14px 0 ${theme.palette.primary.main}40`,
                '&:hover': {
                  boxShadow: `0 6px 20px 0 ${theme.palette.primary.main}60`,
                  transform: 'translateY(-3px)',
                },
                position: 'relative',
                overflow: 'hidden',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: '-100%',
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                  animation: 'shine 3s infinite',
                }
              }}
            >
              Get a Free Quote
            </Button>
            
            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={scrollToProducts}
              sx={{
                borderRadius: '50px',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                position: 'relative',
                overflow: 'hidden',
                '&:hover': {
                  transform: 'translateY(-3px)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                },
              }}
            >
              Our Solutions
            </Button>
          </Box>
        </Box>
      </Container>
      
      {/* Scroll down indicator with parallax effect */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 40 - scrollY * 0.3, // Moves up as user scrolls
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite',
          opacity: Math.max(0, 0.7 - scrollY * 0.005), // Fades out as user scrolls
          cursor: 'pointer',
          zIndex: 2,
        }}
        onClick={scrollToProducts}
      >
        <KeyboardArrowDownIcon
          fontSize="large"
          sx={{ color: theme.palette.primary.main }}
        />
      </Box>
      
      {/* CSS animations */}
      <style jsx="true">{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0) translateX(-50%);
          }
          40% {
            transform: translateY(-20px) translateX(-50%);
          }
          60% {
            transform: translateY(-10px) translateX(-50%);
          }
        }
        
        @keyframes shine {
          0% {
            left: -100%;
          }
          20% {
            left: 100%;
          }
          100% {
            left: 100%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </Box>
  );
};

export default HeroSection; 