import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FusionIcon from '@mui/icons-material/OfflineBoltOutlined';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';

const pages = ['Products', 'About Us', 'Testimonials', 'Contact'];

function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Navbar() {
  const theme = useTheme();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleScrollToSection = (sectionId) => {
    handleCloseNavMenu();
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -70; // Header height offset
      const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      
      // Change navbar background on scroll
      if (scrollPosition > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
      
      // Highlight active section in navbar (ScrollSpy)
      const sections = pages.map(page => document.getElementById(page.replace(/\s+/g, '').toLowerCase()));
      
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section) {
          const sectionTop = section.offsetTop - 100;
          if (scrollPosition >= sectionTop) {
            setActiveSection(pages[i]);
            break;
          }
        }
      }
      
      // If we're at the top, set to empty or to the first section
      if (scrollPosition < 100) {
        setActiveSection('');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logo animation effect
  const logoAnimation = {
    animation: scrolled ? 'none' : 'pulse 2s infinite ease-in-out',
    '@keyframes pulse': {
      '0%': { transform: 'scale(1)' },
      '50%': { transform: 'scale(1.1)' },
      '100%': { transform: 'scale(1)' }
    }
  };

  return (
    <HideOnScroll>
      <AppBar 
        position="fixed" 
        sx={{
          backgroundColor: scrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : 'transparent',
          boxShadow: scrolled 
            ? '0 4px 20px rgba(0, 0, 0, 0.1)' 
            : 'none',
          transition: 'all 0.4s ease',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          color: scrolled ? theme.palette.text.primary : '#fff',
          '& .MuiButton-root': {
            color: scrolled ? theme.palette.text.primary : '#fff',
            transition: 'all 0.3s ease',
            '&:hover': {
              color: theme.palette.secondary.main,
              transform: 'translateY(-3px)',
            },
          }
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Fade in={true} timeout={1500}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center',
                ...logoAnimation
              }}>
                <FusionIcon 
                  sx={{ 
                    mr: 1, 
                    fontSize: '2rem',
                    color: scrolled ? theme.palette.primary.main : '#fff',
                    transition: 'all 0.3s ease',
                    filter: scrolled ? 'none' : 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.6))'
                  }} 
                />
                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#"
                  sx={{
                    mr: 2,
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 700,
                    letterSpacing: '.2rem',
                    color: scrolled ? theme.palette.primary.main : '#fff',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    fontSize: { xs: '1.2rem', md: '1.5rem' },
                    textShadow: scrolled ? 'none' : '0 0 8px rgba(0, 0, 0, 0.3)'
                  }}
                >
                  ApexFusion
                </Typography>
              </Box>
            </Fade>

            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }, justifyContent: 'flex-end' }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ 
                  color: scrolled ? theme.palette.text.primary : '#fff',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'rotate(180deg)',
                    transition: 'all 0.5s ease',
                  } 
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiPaper-root': {
                    borderRadius: '10px',
                    minWidth: '180px',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.15)',
                    background: 'rgba(255,255,255,0.95)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255,255,255,0.3)',
                  }
                }}
              >
                {pages.map((page) => (
                  <MenuItem 
                    key={page} 
                    onClick={() => handleScrollToSection(page.replace(/\s+/g, '').toLowerCase())}
                    sx={{
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)',
                      },
                      borderLeft: activeSection === page 
                        ? `4px solid ${theme.palette.primary.main}` 
                        : '4px solid transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    <Typography 
                      textAlign="center"
                      sx={{
                        fontWeight: activeSection === page ? 600 : 400,
                        transition: 'all 0.2s',
                      }}
                    >
                      {page}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
              <Fade in={true} timeout={2000}>
                <Box sx={{ display: 'flex' }}>
                  {pages.map((page, index) => (
                    <Button
                      key={page}
                      onClick={() => handleScrollToSection(page.replace(/\s+/g, '').toLowerCase())}
                      sx={{
                        my: 2,
                        mx: 1,
                        display: 'block',
                        fontWeight: activeSection === page ? 700 : 500,
                        position: 'relative',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          width: activeSection === page ? '70%' : '0%',
                          height: '3px',
                          bottom: '5px',
                          left: '15%',
                          backgroundColor: theme.palette.secondary.main,
                          transition: 'all 0.3s ease',
                          borderRadius: '2px',
                          opacity: activeSection === page ? 1 : 0,
                        },
                        '&:hover::after': {
                          width: '70%',
                          opacity: 1,
                        },
                        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                        animation: `fadeIn 0.6s ease-out forwards ${0.3 + index * 0.1}s`,
                        opacity: 0, // Start invisible for the animation
                        '@keyframes fadeIn': {
                          '0%': { opacity: 0, transform: 'translateY(-10px)' },
                          '100%': { opacity: 1, transform: 'translateY(0)' }
                        }
                      }}
                    >
                      {page}
                    </Button>
                  ))}
                </Box>
              </Fade>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </HideOnScroll>
  );
}

export default Navbar; 