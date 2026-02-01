import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage'; // Using as a proxy for Vue/React complexity? Maybe better icons exists.
import SearchIcon from '@mui/icons-material/Search';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars

import Tilt from 'react-parallax-tilt';

const ServiceCard = ({ title, description, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{
            zIndex: 2
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <Tilt
            tiltMaxAngleX={15}
            tiltMaxAngleY={15}
            perspective={1000}
            scale={1.05}
            transitionSpeed={1500}
            gyroscope={true}
            glareEnable={true}
            glareMaxOpacity={0.4}
            glareColor="#ffffff"
            glarePosition="all"
        >
            <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 3,
                borderRadius: '16px',
                background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
                boxShadow: '20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff',
                border: '1px solid rgba(255,255,255,0.8)',
                // Remove existing hover effects as Tilt handles movement
            }}>
                <Box sx={{
                    color: 'white',
                    mb: 2,
                    p: 2,
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #1565c0, #42a5f5)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    boxShadow: '0 4px 10px rgba(21, 101, 192, 0.3)',
                    transform: 'translateZ(30px)' // 3D Floating Effect
                }}>
                    {React.cloneElement(icon, { sx: { fontSize: 40, color: 'white' } })}
                </Box>
                <CardContent sx={{ transform: 'translateZ(20px)' }}>
                    <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                        {description}
                    </Typography>
                </CardContent>
            </Card>
        </Tilt>
    </motion.div>
);

const Services = () => {
    const { t } = useTranslation();

    const services = [
        {
            title: t('services.onestop.title'),
            description: t('services.onestop.desc'),
            icon: <RocketLaunchIcon sx={{ fontSize: 50 }} />,
            delay: 0.2
        },
        {
            title: t('services.ai.title'),
            description: t('services.ai.desc'),
            icon: <AutoAwesomeIcon sx={{ fontSize: 50 }} />,
            delay: 0.25
        },
        {
            title: t('services.webdev.title'),
            description: t('services.webdev.desc'),
            icon: <CodeIcon sx={{ fontSize: 50 }} />,
            delay: 0.3
        },
        {
            title: t('services.corporate.title'),
            description: t('services.corporate.desc'),
            icon: <WebIcon sx={{ fontSize: 50 }} />,
            delay: 0.4
        },
        {
            title: t('services.landing.title'),
            description: t('services.landing.desc'),
            icon: <RocketLaunchIcon sx={{ fontSize: 50 }} />, // Using Rocket for high conversion/launch
            delay: 0.5
        },
        {
            title: t('services.seo.title'),
            description: t('services.seo.desc'),
            icon: <SearchIcon sx={{ fontSize: 50 }} />,
            delay: 0.6
        }
    ];

    return (
        <Box id="services" sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold' }}>
                    {t('services.title')}
                </Typography>
                <Grid container spacing={4} justifyContent="center">
                    {services.map((service, index) => (
                        <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
                            <ServiceCard {...service} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;
