import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Stack,
  IconButton,
  Divider,
  Chip,
  Tooltip,
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'Browse Tenders', href: '/tenders' },
        { label: 'Search & Filter', href: '/tenders' },
        { label: 'Categories', href: '/tenders' },
        { label: 'Countries', href: '/tenders' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Our Mission', href: '/about' },
        { label: 'Team', href: '/team' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/help' },
        { label: 'Contact Us', href: '/contact' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Documentation', href: '/docs' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'GDPR', href: '/gdpr' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, href: '#', label: 'Facebook' },
    { icon: <TwitterIcon />, href: '#', label: 'Twitter' },
    { icon: <LinkedInIcon />, href: '#', label: 'LinkedIn' },
    { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Company Info */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
                AfriOffres
              </Typography>
              <Typography variant="body2" color="grey.400" sx={{ mb: 3, lineHeight: 1.6 }}>
                The leading platform for discovering and accessing government tenders and opportunities across Africa. 
                Connecting professionals with meaningful opportunities for growth and development.
              </Typography>
              
              {/* Contact Info */}
              <Stack spacing={1}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmailIcon sx={{ mr: 1, fontSize: 16, color: 'primary.main' }} />
                  <Typography variant="body2" color="grey.400">
                    contact@afrioffres.com
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon sx={{ mr: 1, fontSize: 16, color: 'primary.main' }} />
                  <Typography variant="body2" color="grey.400">
                    +234 123 456 7890
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationIcon sx={{ mr: 1, fontSize: 16, color: 'primary.main' }} />
                  <Typography variant="body2" color="grey.400">
                    Lagos, Nigeria
                  </Typography>
                </Box>
              </Stack>
            </Box>

            {/* Social Links */}
            <Box>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                Follow Us
              </Typography>
              <Stack direction="row" spacing={1}>
                {socialLinks.map((social, index) => (
                  <Tooltip key={index} title={social.label}>
                    <IconButton
                      href={social.href}
                      sx={{
                        color: 'grey.400',
                        '&:hover': {
                          color: 'primary.main',
                          bgcolor: 'rgba(255,255,255,0.1)',
                        },
                      }}
                    >
                      {social.icon}
                    </IconButton>
                  </Tooltip>
                ))}
              </Stack>
            </Box>
          </Grid>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                {section.title}
              </Typography>
              <Stack spacing={1}>
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    color="grey.400"
                    sx={{
                      textDecoration: 'none',
                      '&:hover': {
                        color: 'primary.main',
                      },
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'grey.800' }} />

        {/* Bottom Section */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' } }}>
          <Typography variant="body2" color="grey.400">
            © {currentYear} AfriOffres. All rights reserved.
          </Typography>
          
          <Stack direction="row" spacing={2} sx={{ mt: { xs: 2, md: 0 } }}>
            <Chip
              label="Made with ❤️ in Africa"
              size="small"
              sx={{
                bgcolor: 'primary.main',
                color: 'white',
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
            <Chip
              label="Version 1.0.0"
              size="small"
              variant="outlined"
              sx={{
                borderColor: 'grey.700',
                color: 'grey.400',
                '& .MuiChip-label': {
                  px: 1,
                },
              }}
            />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer; 