import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage'; // Using as a proxy for Vue/React complexity? Maybe better icons exists.
import SearchIcon from '@mui/icons-material/Search';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ServiceCard = ({ title, description, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{
            scale: 1.05,
            rotate: 1,
            zIndex: 2
        }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
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
            '&:hover': {
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                background: 'linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)'
            }
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
                boxShadow: '0 4px 10px rgba(21, 101, 192, 0.3)'
            }}>
                {React.cloneElement(icon, { sx: { fontSize: 40, color: 'white' } })}
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.8 }}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    </motion.div>
);

const Services = () => {
    const { t } = useTranslation();

    const services = [
        {
            title: t('services.onestop.title'),
            description: "從設計、開發到部署，全程為您服務，省心又省力。",
            icon: <RocketLaunchIcon sx={{ fontSize: 50 }} />,
            delay: 0.2
        },
        {
            title: t('services.static.title'),
            description: "極致速度與穩定性，高安全性，成本效益高。",
            icon: <WebIcon sx={{ fontSize: 50 }} />,
            delay: 0.3
        },
        {
            title: t('services.vue.title'),
            description: "直觀互動介面，模組化設計，高效能表現。",
            icon: <CodeIcon sx={{ fontSize: 50 }} />,
            delay: 0.4
        },
        {
            title: t('services.react.title'),
            description: "元件化架構，彈性與擴展性，強大社群支持。",
            icon: <StorageIcon sx={{ fontSize: 50 }} />,
            delay: 0.5
        },
        {
            title: t('services.seo.title'),
            description: "提升網站能見度，增加自然流量，專業分析與策略。",
            icon: <SearchIcon sx={{ fontSize: 50 }} />,
            delay: 0.6
        }
    ];

    return (
        <Box id="services" sx={{ py: 8, bgcolor: 'background.default' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold' }}>
                    我們的服務
                </Typography>
                <Grid container spacing={4}>
                    {services.map((service, index) => (
                        <Grid item key={index} xs={12} sm={6} md={3}>
                            <ServiceCard {...service} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Services;
