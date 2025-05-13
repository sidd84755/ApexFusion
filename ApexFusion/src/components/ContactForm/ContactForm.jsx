import React, { useState, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import { useTheme, alpha } from '@mui/material/styles';
import { motion, useScroll, useTransform } from 'framer-motion';

const initialFormState = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

const subjects = [
  'Custom Web Development',
  'Mobile App Development',
  'ERP Solutions',
  'Cloud Services',
  'Data Analytics',
  'Other',
];

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionTypography = motion(Typography);

const ContactForm = ({ id }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    // Clear the error when the user starts typing again
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    // Name validation
    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Email validation
    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formState.email)) {
      newErrors.email = 'Invalid email address';
    }
    
    // Subject validation
    if (!formState.subject) {
      newErrors.subject = 'Please select a subject';
    }
    
    // Message validation
    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formState.message.trim().length < 10) {
      newErrors.message = 'Message should be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        setSubmitting(false);
        setSnackbar({
          open: true,
          message: 'Your message has been sent successfully!',
          severity: 'success',
        });
        setFormState(initialFormState);
      }, 1000);
    }
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <MotionBox
      component="section"
      id={id}
      ref={sectionRef}
      sx={{
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden',
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
            top: '10%',
            right: '5%',
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
            bottom: '10%',
            left: '10%',
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${alpha(theme.palette.secondary.main, 0.07)}, transparent 70%)`,
          }}
          className="float-element"
        />
        <Box
          sx={{
            position: 'absolute',
            top: '40%',
            left: '5%',
            width: 80,
            height: 80,
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
            Get In Touch
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
            Have a project in mind? Let's discuss how we can help bring your vision to life.
          </MotionTypography>
        </motion.div>

        <Grid container spacing={5}>
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <MotionCard
              elevation={3}
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
              sx={{
                height: '100%',
                borderRadius: 3,
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                backgroundColor: alpha(theme.palette.background.paper, 0.8),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 10px 30px ${alpha('#000', 0.08)}`,
                transition: 'all 0.3s ease',
              }}
            >
              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="name"
                      variant="outlined"
                      value={formState.name}
                      onChange={handleChange}
                      error={Boolean(errors.name)}
                      helperText={errors.name || ''}
                      required
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email Address"
                      name="email"
                      variant="outlined"
                      value={formState.email}
                      onChange={handleChange}
                      error={Boolean(errors.email)}
                      helperText={errors.email || ''}
                      required
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Phone Number (Optional)"
                      name="phone"
                      variant="outlined"
                      value={formState.phone}
                      onChange={handleChange}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      label="Subject"
                      name="subject"
                      variant="outlined"
                      value={formState.subject}
                      onChange={handleChange}
                      error={Boolean(errors.subject)}
                      helperText={errors.subject || ''}
                      required
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                        },
                      }}
                    >
                      {subjects.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Your Message"
                      name="message"
                      variant="outlined"
                      value={formState.message}
                      onChange={handleChange}
                      error={Boolean(errors.message)}
                      helperText={errors.message || ''}
                      required
                      multiline
                      rows={5}
                      InputProps={{
                        sx: {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        disabled={submitting}
                        endIcon={<SendIcon />}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: 'none',
                          fontSize: '1rem',
                          fontWeight: 600,
                          background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                          transition: 'all 0.3s ease',
                          boxShadow: `0 4px 15px ${alpha(theme.palette.primary.main, 0.3)}`,
                          '&:hover': {
                            boxShadow: `0 7px 20px ${alpha(theme.palette.primary.main, 0.4)}`,
                          },
                        }}
                      >
                        {submitting ? 'Sending...' : 'Send Message'}
                      </Button>
                    </motion.div>
                  </Grid>
                </Grid>
              </Box>
            </MotionCard>
          </Grid>
          
          {/* Contact Info */}
          <Grid item xs={12} md={4}>
            <MotionCard
              elevation={3}
              initial={{ opacity: 0, x: 50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5, boxShadow: '0 12px 30px rgba(0,0,0,0.1)' }}
              sx={{
                height: '100%',
                borderRadius: 3,
                overflow: 'hidden',
                backdropFilter: 'blur(10px)',
                backgroundColor: alpha(theme.palette.primary.main, 0.03),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                boxShadow: `0 10px 30px ${alpha('#000', 0.08)}`,
                transition: 'all 0.3s ease',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  px: { xs: 3, md: 4 },
                  pt: { xs: 3, md: 4 },
                  pb: { xs: 6, md: 8 },
                  display: 'flex',
                  flexDirection: 'column',
                  background: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0.03)}, ${alpha(theme.palette.primary.main, 0.1)})`,
                }}
              >
                <Typography variant="h5" component="h3" gutterBottom fontWeight={600} sx={{ mb: 4 }}>
                  Contact Information
                </Typography>
                
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <LocationOnIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
                    <Typography variant="h6" component="p">
                      Our Location
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="textSecondary" sx={{ ml: 6 }}>
                    515 A Unity City, Kursi Road<br />
                    Lucknow
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <EmailIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
                    <Typography variant="h6" component="p">
                      Email Us
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="textSecondary" sx={{ ml: 6 }}>
                    sidd84755@gmail.com
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 4 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <PhoneIcon color="primary" sx={{ mr: 2, fontSize: 28 }} />
                    <Typography variant="h6" component="p">
                      Call Us
                    </Typography>
                  </Box>
                  <Typography variant="body1" color="textSecondary" sx={{ ml: 6 }}>
                    +91 7380720888
                  </Typography>
                </Box>
                
                <Box
                  sx={{
                    mt: 'auto',
                    p: 3,
                    borderRadius: 2,
                    bgcolor: alpha(theme.palette.background.paper, 0.5),
                    backdropFilter: 'blur(5px)',
                    border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  }}
                  className="glass-effect"
                >
                  <Typography variant="body2" color="textSecondary" align="center">
                    Our business hours are Monday to Friday, 9:00 AM to 6:00 PM IST.
                    We typically respond to inquiries within 24 hours.
                  </Typography>
                </Box>
              </Box>
            </MotionCard>
          </Grid>
        </Grid>
      </Container>
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleSnackbarClose} 
          severity={snackbar.severity} 
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </MotionBox>
  );
};

export default ContactForm; 