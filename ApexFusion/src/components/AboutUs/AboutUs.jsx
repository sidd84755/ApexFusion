import React, { useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Divider from '@mui/material/Divider';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import { useTheme, alpha } from '@mui/material/styles';
import { motion, useScroll, useTransform } from 'framer-motion';

// Tech stack icons (MUI Icons or you can import actual tech logos)
import JavascriptIcon from '@mui/icons-material/Javascript';
import CodeIcon from '@mui/icons-material/Code';
import StorageIcon from '@mui/icons-material/Storage';
import CloudIcon from '@mui/icons-material/Cloud';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import BoltIcon from '@mui/icons-material/Bolt';

const techStackData = [
  { name: 'React', icon: <JavascriptIcon />, color: '#61DAFB' },
  { name: 'Node.js', icon: <JavascriptIcon />, color: '#68A063' },
  { name: 'Python', icon: <CodeIcon />, color: '#3776AB' },
  { name: 'MongoDB', icon: <StorageIcon />, color: '#47A248' },
  { name: 'AWS', icon: <CloudIcon />, color: '#FF9900' },
  { name: 'React Native', icon: <PhoneIphoneIcon />, color: '#61DAFB' },
];

const timelineData = [
  {
    year: '2015',
    title: 'Our Beginning',
    description: 'ApexFusion was founded with a vision to create innovative software solutions.',
  },
  {
    year: '2017',
    title: 'Rapid Growth',
    description: 'Expanded our team and capabilities to serve enterprise clients.',
  },
  {
    year: '2019',
    title: 'Global Reach',
    description: 'Established partnerships with international clients and opened new offices.',
  },
  {
    year: '2022',
    title: 'Innovation Leader',
    description: 'Recognized as an industry leader in custom software development.',
  },
];

// Placeholder team data
const teamData = [
  { name: 'Siddharath', role: 'Founder & CEO' },
  { name: 'Samantha Lee', role: 'CTO' },
  { name: 'Michael Chen', role: 'Lead Developer' },
  { name: 'Priya Sharma', role: 'UX Director' },
  { name: 'David Wilson', role: 'Project Manager' },
];

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);
const MotionAvatar = motion(Avatar);

const AboutUs = ({ id }) => {
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
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8], [0.9, 1, 1.05]);

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

  return (
    <MotionBox
      component="section"
      id="aboutus"
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
        background: `linear-gradient(135deg, ${alpha(theme.palette.background.paper, 0.9)}, ${alpha(theme.palette.background.default, 0.9)})`,
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
            width: 250,
            height: 250,
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
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.07)}, transparent 70%)`,
          }}
          className="float-element"
        />
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '15%',
            width: 80,
            height: 80,
            transform: 'rotate(45deg)',
            background: alpha(theme.palette.secondary.main, 0.04),
            backdropFilter: 'blur(4px)',
            border: `1px solid ${alpha(theme.palette.secondary.main, 0.1)}`,
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
          <MotionTypography
            variant="h2"
            component="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              textAlign: 'center',
              fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
              background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            About ApexFusion
          </MotionTypography>
          <MotionTypography
            variant="h5"
            component="p"
            sx={{
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              mb: 2,
              textAlign: 'center',
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.6,
            }}
          >
            We are a team of passionate developers, designers, and strategists
            dedicated to creating exceptional software solutions.
          </MotionTypography>
          <Box
            sx={{
              width: 60,
              height: 4,
              backgroundColor: theme.palette.primary.main,
              mx: 'auto',
              mb: 4,
              borderRadius: '2px',
              boxShadow: `0 2px 10px ${alpha(theme.palette.primary.main, 0.3)}`,
            }}
          />
        </motion.div>

        <Grid container spacing={6}>
          {/* Mission section */}
          <Grid item xs={12} md={6}>
            <MotionCard
              elevation={2}
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -10, boxShadow: '0 12px 20px rgba(0,0,0,0.1)' }}
              sx={{
                height: '100%',
                borderRadius: 2,
                p: { xs: 2, md: 4 },
                display: 'flex',
                flexDirection: 'column',
                backdropFilter: 'blur(10px)',
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transition: 'all 0.3s ease',
              }}
            >
              <Typography
                variant="h4"
                component="h3"
                sx={{ fontWeight: 600, mb: 3, color: theme.palette.primary.main }}
              >
                Our Mission
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                At ApexFusion, we believe that software should empower businesses to achieve
                their goals. Our mission is to create innovative, reliable, and
                user-centered digital solutions that drive growth and efficiency.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                We combine technical expertise with industry knowledge to deliver
                custom solutions that address real-world challenges. Our collaborative
                approach ensures that we understand your unique needs and build
                software that exceeds expectations.
              </Typography>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: 'auto',
                  p: 2,
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.light, 0.1)}, ${alpha(theme.palette.secondary.light, 0.1)})`,
                }}
                className="pulse"
              >
                <BoltIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="subtitle1" color="secondary" sx={{ fontWeight: 600 }}>
                  Turning Ideas into Digital Masterpieces
                </Typography>
              </Box>
            </MotionCard>
          </Grid>

          {/* Company timeline */}
          <Grid item xs={12} md={6}>
            <MotionCard
              elevation={2}
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10, boxShadow: '0 12px 20px rgba(0,0,0,0.1)' }}
              sx={{
                height: '100%',
                borderRadius: 2,
                p: { xs: 2, md: 4 },
                display: 'flex',
                flexDirection: 'column',
                backdropFilter: 'blur(10px)',
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transition: 'all 0.3s ease',
              }}
            >
              <Typography
                variant="h4"
                component="h3"
                sx={{ fontWeight: 600, mb: 3, color: theme.palette.primary.main }}
              >
                Our Journey
              </Typography>
              <Timeline position="alternate" sx={{ p: 0, mb: 2 }}>
                {timelineData.map((item, index) => (
                  <TimelineItem key={index}>
                    <TimelineOppositeContent sx={{ m: 'auto 0' }}>
                      <MotionTypography
                        variant="h6"
                        component="span"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                        sx={{ fontWeight: 'bold' }}
                      >
                        {item.year}
                      </MotionTypography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={isVisible ? { scale: 1 } : {}}
                        transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                      >
                        <TimelineDot color="primary" />
                      </motion.div>
                      {index !== timelineData.length - 1 && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={isVisible ? { height: '100%' } : {}}
                          transition={{ duration: 0.7, delay: 0.7 + index * 0.1 }}
                          style={{ width: '100%' }}
                        >
                          <TimelineConnector />
                        </motion.div>
                      )}
                    </TimelineSeparator>
                    <TimelineContent sx={{ py: '12px', px: 2 }}>
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      >
                        <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </motion.div>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </MotionCard>
          </Grid>

          {/* Tech stack */}
          <Grid item xs={12}>
            <MotionCard
              elevation={2}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -5, boxShadow: '0 12px 20px rgba(0,0,0,0.1)' }}
              sx={{
                borderRadius: 2,
                p: { xs: 3, md: 5 },
                mt: 4,
                backdropFilter: 'blur(10px)',
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transition: 'all 0.3s ease',
              }}
            >
              <Typography
                variant="h4"
                component="h3"
                sx={{ fontWeight: 600, mb: 4, textAlign: 'center' }}
              >
                Our Technology Stack
              </Typography>
              <Grid container spacing={3} justifyContent="center">
                {techStackData.map((tech, index) => (
                  <Grid item xs={6} sm={4} md={2} key={index}>
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                      whileHover={{ y: -10, scale: 1.05 }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          textAlign: 'center',
                        }}
                      >
                        <MotionAvatar
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.7, ease: "easeInOut" }}
                          sx={{
                            bgcolor: `${tech.color}20`,
                            color: tech.color,
                            width: 64,
                            height: 64,
                            mb: 1,
                            boxShadow: `0 5px 15px ${tech.color}30`,
                            transition: 'all 0.3s ease',
                          }}
                        >
                          {tech.icon}
                        </MotionAvatar>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {tech.name}
                        </Typography>
                      </Box>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </MotionCard>
          </Grid>

          {/* Team section */}
          <Grid item xs={12}>
            <MotionCard
              elevation={2}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              whileHover={{ y: -5, boxShadow: '0 12px 20px rgba(0,0,0,0.1)' }}
              sx={{
                borderRadius: 2,
                p: { xs: 3, md: 5 },
                mt: 4,
                textAlign: 'center',
                backdropFilter: 'blur(10px)',
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                transition: 'all 0.3s ease',
              }}
            >
              <Typography
                variant="h4"
                component="h3"
                sx={{ fontWeight: 600, mb: 4 }}
              >
                Meet Our Team
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
                Our talented team combines deep technical expertise with industry knowledge
                to deliver exceptional results. We're passionate about creating software
                that makes a difference.
              </Typography>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <AvatarGroup
                  max={8}
                  sx={{
                    justifyContent: 'center',
                    mb: 3,
                    '& .MuiAvatar-root': {
                      width: 64,
                      height: 64,
                      fontSize: '1.5rem',
                      border: `2px solid ${theme.palette.background.paper}`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                      }
                    },
                  }}
                >
                  {teamData.map((member, index) => (
                    <Avatar
                      key={index}
                      sx={{
                        bgcolor: `${theme.palette.primary.main}${index * 20}`,
                      }}
                    >
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </Avatar>
                  ))}
                </AvatarGroup>
              </motion.div>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
                {teamData.map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Box sx={{ textAlign: 'center', px: 2 }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {member.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {member.role}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </MotionCard>
          </Grid>
        </Grid>
      </Container>
    </MotionBox>
  );
};

export default AboutUs; 