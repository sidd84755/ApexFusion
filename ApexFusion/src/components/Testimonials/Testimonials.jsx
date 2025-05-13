import React, { useState, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useTheme, alpha } from '@mui/material/styles';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Sample testimonial data
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO, TechNova",
    content: "ApexFusion delivered a custom web application that transformed our business operations. Their team's attention to detail and technical expertise exceeded our expectations. The software is intuitive, robust, and scales with our growing needs.",
    avatar: null, // Would be a URL to an image
    rating: 5,
  },
  {
    id: 2,
    name: "David Chen",
    role: "CEO, Startup Ventures",
    content: "Working with ApexFusion was a game-changer for our startup. They developed a mobile app that our customers love, delivered on time and within budget. Their agile approach kept us involved throughout the process, and the end result is exactly what we envisioned.",
    avatar: null,
    rating: 5,
  },
  {
    id: 3,
    name: "Maria Rodriguez",
    role: "Marketing Director, BrandConnect",
    content: "The data analytics solution provided by ApexFusion has revolutionized how we understand our market. The custom dashboards give us real-time insights that drive our strategy. Their team was responsive, professional, and delivered a solution tailored to our specific needs.",
    avatar: null,
    rating: 4,
  },
  {
    id: 4,
    name: "James Wilson",
    role: "Operations Manager, LogiTech",
    content: "ApexFusion created an ERP system that streamlined our complex operations. What impressed me most was their understanding of our industry challenges and their innovative approach to solving them. The system has significantly improved our efficiency and reduced costs.",
    avatar: null,
    rating: 5,
  },
  {
    id: 5,
    name: "Emily Patel",
    role: "Product Manager, HealthTech",
    content: "The healthcare application developed by ApexFusion has improved patient care and operational efficiency. Their team worked diligently to ensure compliance with regulations while creating an intuitive interface for our staff. We continue to partner with them for ongoing enhancements.",
    avatar: null,
    rating: 5,
  },
];

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);

const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const theme = useTheme();
  const autoPlayRef = useRef(null);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // For parallax scrolling effect
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const yBackground = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.3]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8], [0.9, 1, 1.05]);

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-play functionality
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        
        // Only start auto-play when section is visible
        if (entry.isIntersecting) {
          autoPlayRef.current = setInterval(() => {
            handleNext();
          }, 5000);
        } else if (autoPlayRef.current) {
          clearInterval(autoPlayRef.current);
        }
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
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, []);

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <MotionBox
      component="section"
      id="testimonials"
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.05)}, ${alpha(theme.palette.secondary.dark, 0.05)})`,
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
            top: '10%',
            left: '5%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.03)}, transparent 70%)`,
          }}
          className="float-element"
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            right: '10%',
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.primary.main, 0.04)}, transparent 70%)`,
          }}
          className="float-element"
        />
        <FormatQuoteIcon
          sx={{
            position: 'absolute',
            top: '30%',
            right: '15%',
            fontSize: '8rem',
            color: alpha(theme.palette.primary.main, 0.1),
            transform: 'rotate(180deg)',
          }}
          className="float-element"
        />
        <FormatQuoteIcon
          sx={{
            position: 'absolute',
            bottom: '30%',
            left: '15%',
            fontSize: '8rem',
            color: alpha(theme.palette.secondary.main, 0.1),
          }}
          className="float-element-x"
        />
      </MotionBox>

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MotionTypography
            variant="h2"
            component="h2"
            align="center"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            Client Testimonials
          </MotionTypography>
          
          <MotionTypography
            variant="h5"
            component="p"
            align="center" 
            color="textSecondary"
            sx={{ 
              mb: 8,
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Hear what our clients have to say about their experience working with us.
          </MotionTypography>
        </motion.div>

        <Box
          sx={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            minHeight: { xs: 400, md: 380 },
            mt: 2,
            mb: 4,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <MotionCard
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.4 }
              }}
              elevation={4}
              sx={{
                maxWidth: 800,
                mx: 'auto',
                borderRadius: 4,
                position: 'absolute',
                width: '100%',
                backdropFilter: 'blur(10px)',
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 15px 30px ${alpha('#000', 0.1)}`,
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
                  <Rating
                    value={testimonials[activeIndex].rating}
                    readOnly
                    precision={0.5}
                    icon={<StarIcon fontSize="inherit" color="primary" />}
                    emptyIcon={<StarIcon fontSize="inherit" />}
                    sx={{ 
                      color: theme.palette.primary.main,
                      fontSize: { xs: '1.5rem', md: '2rem' },
                    }}
                  />
                </Box>

                <Typography
                  variant="body1"
                  align="center"
                  paragraph
                  sx={{
                    fontSize: { xs: '1rem', md: '1.2rem' },
                    lineHeight: 1.8,
                    fontStyle: 'italic',
                    mb: 4,
                    position: 'relative',
                  }}
                >
                  <FormatQuoteIcon 
                    sx={{ 
                      fontSize: '1.5rem', 
                      color: alpha(theme.palette.primary.main, 0.4),
                      mr: 1,
                      verticalAlign: 'top'
                    }} 
                  />
                  {testimonials[activeIndex].content}
                  <FormatQuoteIcon 
                    sx={{ 
                      fontSize: '1.5rem', 
                      color: alpha(theme.palette.primary.main, 0.4),
                      ml: 1,
                      transform: 'rotate(180deg)',
                      verticalAlign: 'bottom'
                    }} 
                  />
                </Typography>

                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    src={testimonials[activeIndex].avatar}
                    alt={testimonials[activeIndex].name}
                    sx={{
                      width: 60,
                      height: 60,
                      mb: 1,
                      bgcolor: `${theme.palette.primary.main}${activeIndex * 20}`,
                      border: `3px solid ${theme.palette.background.paper}`,
                      boxShadow: `0 5px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                    }}
                  >
                    {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                  </Avatar>
                  <Typography variant="h6" component="p" fontWeight={600}>
                    {testimonials[activeIndex].name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {testimonials[activeIndex].role}
                  </Typography>
                </Box>
              </CardContent>
            </MotionCard>
          </AnimatePresence>

          <IconButton
            onClick={handlePrev}
            aria-label="previous testimonial"
            sx={{
              position: 'absolute',
              left: { xs: 0, md: -30 },
              zIndex: 2,
              bgcolor: alpha(theme.palette.background.paper, 0.7),
              boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: theme.palette.background.paper,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowBackIosIcon />
          </IconButton>

          <IconButton
            onClick={handleNext}
            aria-label="next testimonial"
            sx={{
              position: 'absolute',
              right: { xs: 0, md: -30 },
              zIndex: 2,
              bgcolor: alpha(theme.palette.background.paper, 0.7),
              boxShadow: '0 3px 10px rgba(0,0,0,0.1)',
              '&:hover': {
                bgcolor: theme.palette.background.paper,
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            mt: 2,
          }}
        >
          {testimonials.map((_, index) => (
            <Box
              key={index}
              onClick={() => setActiveIndex(index)}
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                mx: 0.5,
                bgcolor: index === activeIndex ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.3),
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: index === activeIndex ? 'scale(1.2)' : 'scale(1)',
                '&:hover': {
                  bgcolor: index === activeIndex ? theme.palette.primary.main : alpha(theme.palette.primary.main, 0.5),
                },
              }}
            />
          ))}
        </Box>
      </Container>
    </MotionBox>
  );
};

export default Testimonials; 