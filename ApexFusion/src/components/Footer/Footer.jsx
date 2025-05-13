import React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import GitHubIcon from '@mui/icons-material/GitHub';
import LanguageIcon from '@mui/icons-material/Language';
import { useTheme, alpha } from '@mui/material/styles';
import { motion } from 'framer-motion';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About Us', href: '#aboutus' },
      { name: 'Careers', href: '#' },
      { name: 'Our Team', href: '#aboutus' },
      { name: 'Blog', href: '#' },
    ],
  },
  {
    title: 'Services',
    links: [
      { name: 'Web Development', href: '#products' },
      { name: 'Mobile Apps', href: '#products' },
      { name: 'Data Analytics', href: '#products' },
      { name: 'Cloud Solutions', href: '#products' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { name: 'Documentation', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Knowledge Base', href: '#' },
      { name: 'FAQs', href: '#' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { name: 'Privacy Policy', href: '#privacy-policy' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'GDPR', href: '#' },
    ],
  },
];

const MotionBox = motion(Box);
const MotionTypography = motion(Typography);

const Footer = ({ onNavigate }) => {
  const theme = useTheme();
  
  const handleLinkClick = (e, href) => {
    // If it's the privacy policy link
    if (href === '#privacy-policy' && onNavigate) {
      e.preventDefault();
      onNavigate('privacy-policy');
      window.location.hash = href;
    }
  };
  
  return (
    <MotionBox
      component="footer"
      sx={{
        py: { xs: 6, md: 8 },
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.97)}, ${alpha(theme.palette.secondary.dark, 0.97)})`,
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative elements */}
      <Box
        sx={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '30%',
          height: '50%',
          background: `radial-gradient(circle, ${alpha('#fff', 0.05)}, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '10%',
          width: '25%',
          height: '40%',
          background: `radial-gradient(circle, ${alpha('#fff', 0.04)}, transparent 70%)`,
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />
      
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Info */}
          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LanguageIcon sx={{ mr: 1, fontSize: 28 }} />
                <Typography variant="h5" component="div" sx={{ fontWeight: 700 }}>
                  ApexFusion
                </Typography>
              </Box>
              
              <Typography variant="body2" sx={{ mb: 3, opacity: 0.8 }}>
                Transforming ideas into exceptional digital experiences. We create innovative software 
                solutions that drive business growth and enhance user engagement.
              </Typography>
              
              <Box>
                <IconButton 
                  component={motion.a} 
                  href="#" 
                  aria-label="Facebook"
                  sx={{ 
                    color: 'white', 
                    mr: 1,
                    '&:hover': {
                      bgcolor: alpha('#fff', 0.1),
                    }
                  }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton 
                  component={motion.a} 
                  href="#" 
                  aria-label="Twitter"
                  sx={{ 
                    color: 'white', 
                    mr: 1,
                    '&:hover': {
                      bgcolor: alpha('#fff', 0.1),
                    }
                  }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton 
                  component={motion.a} 
                  href="#" 
                  aria-label="LinkedIn"
                  sx={{ 
                    color: 'white', 
                    mr: 1,
                    '&:hover': {
                      bgcolor: alpha('#fff', 0.1),
                    }
                  }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <LinkedInIcon />
                </IconButton>
                <IconButton 
                  component={motion.a} 
                  href="#" 
                  aria-label="Instagram"
                  sx={{ 
                    color: 'white', 
                    mr: 1,
                    '&:hover': {
                      bgcolor: alpha('#fff', 0.1),
                    }
                  }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton 
                  component={motion.a} 
                  href="#" 
                  aria-label="GitHub"
                  sx={{ 
                    color: 'white',
                    '&:hover': {
                      bgcolor: alpha('#fff', 0.1),
                    }
                  }}
                  whileHover={{ y: -5, scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <GitHubIcon />
                </IconButton>
              </Box>
            </motion.div>
          </Grid>
          
          {/* Links Sections */}
          {footerLinks.map((section, index) => (
            <Grid item xs={6} sm={3} md={2} key={section.title}>
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              >
                <MotionTypography 
                  variant="subtitle1" 
                  component="h6" 
                  sx={{ 
                    fontWeight: 700, 
                    mb: 2,
                    display: 'inline-block',
                    '&::after': {
                      content: '""',
                      display: 'block',
                      width: '40%',
                      height: '2px',
                      mt: 0.5,
                      backgroundColor: theme.palette.secondary.main,
                      borderRadius: '2px',
                    },
                  }}
                >
                  {section.title}
                </MotionTypography>
                
                <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0 }}>
                  {section.links.map((link, i) => (
                    <Box component="li" key={link.name} sx={{ mb: 1 }}>
                      <Link
                        component={motion.a}
                        href={link.href}
                        onClick={link.href === '#privacy-policy' ? (e) => handleLinkClick(e, link.href) : undefined}
                        sx={{
                          color: 'white',
                          opacity: 0.7,
                          textDecoration: 'none',
                          '&:hover': {
                            opacity: 1,
                            color: theme.palette.secondary.light,
                          },
                          display: 'inline-block',
                        }}
                        whileHover={{ x: 5 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                      >
                        {link.name}
                      </Link>
                    </Box>
                  ))}
                </Box>
              </motion.div>
            </Grid>
          ))}
        </Grid>
        
        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 6,
            pt: 3,
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'center' },
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.7, mb: { xs: 2, sm: 0 } }}>
            © {new Date().getFullYear()} ApexFusion. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link 
              href="#privacy-policy" 
              onClick={(e) => handleLinkClick(e, '#privacy-policy')}
              sx={{ 
                color: 'white', 
                opacity: 0.7, 
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  opacity: 1,
                  color: theme.palette.secondary.light,
                }
              }}
            >
              Privacy
            </Link>
            <Link 
              href="#" 
              sx={{ 
                color: 'white', 
                opacity: 0.7, 
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  opacity: 1,
                  color: theme.palette.secondary.light,
                }
              }}
            >
              Terms
            </Link>
            <Link 
              href="#" 
              sx={{ 
                color: 'white', 
                opacity: 0.7, 
                textDecoration: 'none',
                fontSize: '0.875rem',
                '&:hover': {
                  opacity: 1,
                  color: theme.palette.secondary.light,
                }
              }}
            >
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </MotionBox>
  );
};

export default Footer; 