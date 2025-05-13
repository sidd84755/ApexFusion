import React, { useRef, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTheme, alpha } from '@mui/material/styles';
import { motion, useScroll, useTransform } from 'framer-motion';

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);

const PrivacyPolicy = ({ onGoBack }) => {
  const theme = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8], [0.98, 1, 1.02]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack();
    } else {
      window.location.hash = '';
    }
  };

  return (
    <MotionBox
      component="section"
      ref={sectionRef}
      sx={{
        py: { xs: 6, md: 10 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.05)}, ${alpha(theme.palette.background.default, 0.9)})`,
      }}
      style={{
        opacity,
        scale
      }}
    >
      {/* Decorative background elements */}
      <MotionBox
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
        style={{ y: yBackground }}
      >
        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: '15%',
            right: '10%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.05)}, transparent 70%)`,
          }}
          className="float-element"
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '20%',
            left: '5%',
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.07)}, transparent 70%)`,
          }}
          className="float-element"
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '15%',
            width: 100,
            height: 100,
            transform: 'rotate(45deg)',
            background: alpha(theme.palette.primary.main, 0.03),
            backdropFilter: 'blur(5px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            borderRadius: '15px',
          }}
          className="rotating-element"
        />
      </MotionBox>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Back Button and Breadcrumbs */}
        <Box sx={{ mb: 5 }}>
          <Button 
            startIcon={<ArrowBackIcon />} 
            onClick={handleGoBack}
            sx={{ 
              mb: 2,
              color: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.05)
              }
            }}
          >
            Back to Home
          </Button>
          
          <Breadcrumbs aria-label="breadcrumb">
            <Link 
              color="inherit" 
              href="/"
              sx={{ 
                textDecoration: 'none',
                '&:hover': { color: theme.palette.primary.main }
              }}
            >
              Home
            </Link>
            <Typography color="text.primary">Privacy Policy</Typography>
          </Breadcrumbs>
        </Box>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MotionTypography
            variant="h2"
            component="h1"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            Privacy Policy
          </MotionTypography>
          
          <MotionTypography
            variant="subtitle1"
            component="p"
            align="center" 
            color="textSecondary"
            sx={{ 
              mb: 6,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </MotionTypography>
        </motion.div>

        <MotionCard
          elevation={3}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          sx={{
            borderRadius: 3,
            overflow: 'hidden',
            backdropFilter: 'blur(10px)',
            backgroundColor: alpha(theme.palette.background.paper, 0.8),
            border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            boxShadow: `0 10px 30px ${alpha('#000', 0.08)}`,
            mb: 8,
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h5" component="h2" gutterBottom fontWeight={600}>
              Introduction
            </Typography>
            <Typography variant="body1" paragraph>
              This Privacy Policy describes how ApexFusion ("we," "us," or "our") collects, uses, and discloses your information when you use our website, products, and services. We respect your privacy and are committed to protecting your personal data.
            </Typography>
            <Typography variant="body1" paragraph>
              Please read this Privacy Policy carefully to understand our practices regarding your personal data and how we will treat it.
            </Typography>

            <Typography variant="h5" component="h2" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
              Information We Collect
            </Typography>
            <Typography variant="body1" paragraph>
              We collect several types of information from and about users of our Services, including:
            </Typography>
            <Typography component="ul" sx={{ pl: 2, mb: 2 }}>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Personal Data:</strong> This includes name, email address, phone number, and other contact information you provide when filling out forms on our website.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Usage Data:</strong> Information about how you use our website, products, and services.
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  <strong>Technical Data:</strong> IP address, browser type and version, time zone setting, browser plug-in types and versions, operating system, and platform.
                </Typography>
              </li>
            </Typography>

            <Typography variant="h5" component="h2" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
              How We Use Your Information
            </Typography>
            <Typography variant="body1" paragraph>
              We use the information we collect for various purposes, including:
            </Typography>
            <Typography component="ul" sx={{ pl: 2, mb: 2 }}>
              <li>
                <Typography variant="body1" paragraph>
                  Providing, maintaining, and improving our Services
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  Processing and completing transactions
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  Sending you technical notices, updates, and support messages
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  Communicating about products, services, offers, and events
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  Responding to your comments, questions, and requests
                </Typography>
              </li>
            </Typography>

            <Typography variant="h5" component="h2" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
              Cookies and Tracking Technologies
            </Typography>
            <Typography variant="body1" paragraph>
              We use cookies and similar tracking technologies to track activity on our Services and hold certain information. Cookies are files with a small amount of data which may include an anonymous unique identifier.
            </Typography>
            <Typography variant="body1" paragraph>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Services.
            </Typography>

            <Typography variant="h5" component="h2" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
              Data Sharing and Disclosure
            </Typography>
            <Typography variant="body1" paragraph>
              We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:
            </Typography>
            <Typography component="ul" sx={{ pl: 2, mb: 2 }}>
              <li>
                <Typography variant="body1" paragraph>
                  With service providers who work on our behalf
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  When required by law or to protect our rights
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  With your consent or at your direction
                </Typography>
              </li>
            </Typography>

            <Typography variant="h5" component="h2" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
              Data Security
            </Typography>
            <Typography variant="body1" paragraph>
              We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please note that no electronic transmission or storage of information can be entirely secure.
            </Typography>

            <Typography variant="h5" component="h2" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
              Your Data Protection Rights
            </Typography>
            <Typography variant="body1" paragraph>
              Depending on your location, you may have certain rights regarding your personal information, such as:
            </Typography>
            <Typography component="ul" sx={{ pl: 2, mb: 2 }}>
              <li>
                <Typography variant="body1" paragraph>
                  The right to access personal data we hold about you
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  The right to request correction of your personal data
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  The right to request deletion of your personal data
                </Typography>
              </li>
              <li>
                <Typography variant="body1" paragraph>
                  The right to withdraw consent
                </Typography>
              </li>
            </Typography>

            <Typography variant="h5" component="h2" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
              Changes to This Privacy Policy
            </Typography>
            <Typography variant="body1" paragraph>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top of this page.
            </Typography>
            <Typography variant="body1" paragraph>
              You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
            </Typography>

            <Typography variant="h5" component="h2" gutterBottom fontWeight={600} sx={{ mt: 4 }}>
              Contact Us
            </Typography>
            <Typography variant="body1" paragraph>
              If you have any questions about this Privacy Policy, please contact us at:
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Email:</strong> sidd84755@gmail.com<br />
              <strong>Address:</strong> 515 A Unity City, Kursi Road Lucknow
            </Typography>
          </CardContent>
        </MotionCard>
      </Container>
    </MotionBox>
  );
};

export default PrivacyPolicy; 