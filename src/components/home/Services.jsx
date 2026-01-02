import React from 'react';
import { Box, Container, Grid, Typography, Card, CardContent } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import WebIcon from '@mui/icons-material/Web';
import StorageIcon from '@mui/icons-material/Storage'; // Using as a proxy for Vue/React complexity? Maybe better icons exists.
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const ServiceCard = ({ title, description, icon, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', p: 2, '&:hover': { boxShadow: 6 } }}>
            <Box sx={{ color: 'primary.main', mb: 2 }}>
                {icon}
            </Box>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
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
            title: t('services.static.title'),
            description: "極致速度與穩定性，高安全性，成本效益高。",
            icon: <WebIcon sx={{ fontSize: 50 }} />,
            delay: 0.2
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
            delay: 0.6
        },
        {
            title: t('services.seo.title'),
            description: "提升網站能見度，增加自然流量，專業分析與策略。",
            icon: <SearchIcon sx={{ fontSize: 50 }} />,
            delay: 0.8
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
