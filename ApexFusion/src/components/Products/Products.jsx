import React, { useEffect, useRef, useState } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useTheme, alpha } from '@mui/material/styles';
import { motion, useScroll, useTransform } from 'framer-motion';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import InsightsIcon from '@mui/icons-material/Insights';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';

const productsData = [
  {
    id: 1,
    title: "ApexFusion Pro",
    description: "Our flagship platform offering comprehensive analytics and seamless integration.",
    icon: <LanguageIcon sx={{ fontSize: 60 }} />,
    features: ["Real-time analytics", "Custom dashboards", "API integration"]
  },
  {
    id: 2,
    title: "ApexFusion Lite",
    description: "Streamlined version perfect for small teams and startups looking for essential features.",
    icon: <PhoneIphoneIcon sx={{ fontSize: 60 }} />,
    features: ["Core analytics", "Basic reporting", "Cloud storage"]
  },
  {
    id: 3,
    title: "ApexFusion Enterprise",
    description: "Advanced solution for large organizations with complex data needs and security requirements.",
    icon: <StorageIcon sx={{ fontSize: 60 }} />,
    features: ["Advanced security", "Unlimited users", "24/7 support"]
  }
];

const MotionBox = motion(Box);
const MotionCard = motion(Card);

function Products() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const theme = useTheme();
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const xCards = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const opacitySection = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8], [0.8, 1, 1.05]);
  
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
    
    // Autoplay for cards
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % productsData.length);
    }, 5000);
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
      clearInterval(interval);
    };
  }, []);

  const handleOpen = (product) => {
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <MotionBox
      ref={sectionRef}
      component="section"
      id="products"
      sx={{
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.secondary.light, 0.1)})`,
      }}
      style={{
        opacity: opacitySection,
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
        {/* Circle decorations */}
        <Box
          sx={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.1)}, transparent 70%)`,
          }}
          className="float-element"
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            right: '8%',
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.1)}, transparent 70%)`,
          }}
          className="float-element"
        />
        
        {/* Geometric shapes */}
        <Box
          sx={{
            position: 'absolute',
            top: '30%',
            right: '10%',
            width: 100,
            height: 100,
            transform: 'rotate(45deg)',
            background: alpha(theme.palette.primary.main, 0.05),
            boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1)`,
            backdropFilter: 'blur(5px)',
            border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
            borderRadius: '15px',
          }}
          className="rotating-element"
        />
      </MotionBox>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Typography 
            variant="h2" 
            component="h2" 
            align="center" 
            gutterBottom
            sx={{
              mb: 3,
              fontWeight: 700,
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            Our Products
          </Typography>
          
          <Typography 
            variant="h6" 
            component="p" 
            align="center" 
            color="textSecondary"
            sx={{ 
              mb: 6, 
              maxWidth: 700, 
              mx: 'auto',
              fontWeight: 400,
              lineHeight: 1.6,
            }}
          >
            Discover our cutting-edge solutions designed to transform your business with powerful analytics and seamless integration capabilities.
          </Typography>
        </motion.div>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          {productsData.map((product, index) => (
            <Grid item xs={12} md={4} key={product.id}>
              <MotionCard
                elevation={3}
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s ease',
                  borderRadius: 2,
                  overflow: 'hidden',
                  backdropFilter: 'blur(10px)',
                  backgroundColor: alpha(theme.palette.background.paper, 0.8),
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: `0 12px 20px -10px ${alpha(theme.palette.primary.main, 0.3)}`,
                  }
                }}
                initial={{ opacity: 0, x: 100 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <Box 
                  sx={{ 
                    p: 4, 
                    display: 'flex', 
                    justifyContent: 'center',
                    alignItems: 'center',
                    background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.secondary.light, 0.1)})`,
                    color: theme.palette.primary.main
                  }}
                >
                  {product.icon}
                </Box>
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography 
                    gutterBottom 
                    variant="h5" 
                    component="h3"
                    sx={{ fontWeight: 600, mb: 2 }}
                  >
                    {product.title}
                  </Typography>
                  
                  <Typography variant="body1" color="text.secondary" paragraph>
                    {product.description}
                  </Typography>
                  
                  <Box sx={{ mt: 2 }}>
                    {product.features.map((feature, i) => (
                      <Box 
                        key={i} 
                        sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          mb: 1,
                          '&:before': {
                            content: '""',
                            display: 'inline-block',
                            width: 6,
                            height: 6,
                            borderRadius: '50%',
                            backgroundColor: theme.palette.primary.main,
                            mr: 1.5,
                          }
                        }}
                      >
                        <Typography variant="body2" color="text.primary">
                          {feature}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                  
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                    <Button 
                      variant="contained" 
                      color="primary"
                      size="small"
                      onClick={() => handleOpen(product)}
                      sx={{ 
                        borderRadius: '20px',
                        px: 2,
                        backgroundColor: alpha(theme.palette.primary.main, 0.9),
                        '&:hover': {
                          backgroundColor: theme.palette.primary.main,
                          transform: 'translateY(-2px)',
                          boxShadow: `0 6px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                        }
                      }}
                    >
                      Learn More
                    </Button>
                    <IconButton 
                      size="small"
                      sx={{ 
                        color: theme.palette.primary.main,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.1),
                          transform: 'translateX(3px)',
                        }
                      }}
                    >
                      <ArrowForwardIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
            <Button 
              variant="outlined" 
              color="primary"
              size="large"
              endIcon={<ArrowForwardIcon />}
              sx={{ 
                borderRadius: 2,
                px: 4,
                py: 1,
                fontSize: '1rem',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  backgroundColor: alpha(theme.palette.primary.main, 0.05),
                  transform: 'translateY(-3px)',
                }
              }}
            >
              View all products
            </Button>
          </Box>
        </motion.div>
      </Container>

      {/* Product details modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="product-details-modal"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2,
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: 800,
            maxHeight: '90vh',
            overflowY: 'auto',
            backgroundColor: theme.palette.background.paper,
            borderRadius: 2,
            boxShadow: 24,
            p: { xs: 3, md: 5 },
            position: 'relative',
          }}
        >
          {selectedProduct && (
            <>
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                }}
              >
                <CloseIcon />
              </IconButton>
              <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ color: theme.palette.primary.main }}>
                  {selectedProduct.icon}
                </Box>
                <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                  {selectedProduct.title}
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ mb: 3 }}>
                {selectedProduct.description}
              </Typography>
              
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                Key Features:
              </Typography>
              
              <Box component="ul" sx={{ pl: 3, mb: 3 }}>
                {selectedProduct.features.map((feature, index) => (
                  <Typography component="li" key={index} sx={{ mb: 1 }}>
                    {feature}
                  </Typography>
                ))}
              </Box>
              
              <Button
                variant="contained"
                color="primary"
                href="#contact"
                onClick={handleClose}
                sx={{ mt: 2 }}
              >
                Request a Consultation
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </MotionBox>
  );
}

export default Products; 