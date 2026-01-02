import React from 'react';
import { Box, Container, Typography, Card, CardContent, CardActions, Button, Grid, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion';

const PricingCard = ({ title, price, description, features, popular, premium, delay, contactLink }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        style={{ height: '100%' }}
    >
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            borderRadius: 4,
            transition: '0.3s',
            // Default styles
            border: '1px solid #eee',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            transform: 'none',

            // Popular (Blue) styles - for A2
            ...(popular && !premium && {
                border: '2px solid #2196F3',
                transform: 'scale(1.05)',
                boxShadow: '0 8px 40px rgba(33, 150, 243, 0.2)',
            }),

            // Premium (Gradient) styles - for B1 (Static Elite)
            ...(premium && {
                border: '3px solid transparent', // Required for gradient border
                background: 'linear-gradient(#fff, #fff) padding-box, linear-gradient(135deg, #00C6FF 0%, #0072FF 100%) border-box',
                transform: 'scale(1.08)',
                boxShadow: '0 12px 50px rgba(0, 198, 255, 0.3)',
                zIndex: 2
            }),

            '&:hover': {
                transform: (popular || premium) ? 'scale(1.08) translateY(-5px)' : 'translateY(-5px)',
                boxShadow: '0 12px 50px rgba(0,0,0,0.1)'
            }
        }}>
            {(popular || premium) && (
                <Chip
                    icon={<StarIcon sx={{ fontSize: 16, color: 'white !important' }} />}
                    label="RECOMMENDED"
                    sx={{
                        position: 'absolute',
                        top: 16,
                        right: 16,
                        fontWeight: 'bold',
                        height: 24,
                        color: 'white',
                        bgcolor: premium ? 'transparent' : 'primary.main',
                        background: premium ? 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)' : undefined,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
                    }}
                />
            )}
            <CardContent sx={{ flexGrow: 1, p: 3, pt: popular ? 5 : 3 }}>
                <Typography variant="h5" component="div" fontWeight="bold" gutterBottom color={popular ? 'primary' : 'text.primary'}>
                    {title}
                </Typography>
                <Typography variant="h4" component="div" fontWeight="800" sx={{ mb: 1, color: popular ? '#2196F3' : 'inherit' }}>
                    {price}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3, minHeight: 40 }}>
                    {description}
                </Typography>

                <List dense>
                    {features.map((feature, index) => (
                        <ListItem key={index} disableGutters>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                                <CheckCircleIcon color="primary" sx={{ fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText
                                primary={feature}
                                primaryTypographyProps={{ variant: 'body2', color: 'text.primary' }}
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                    fullWidth
                    variant={popular ? "contained" : "outlined"}
                    size="large"
                    href="#contact"
                    startIcon={<AutoAwesomeIcon />}
                    sx={{
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 'bold',
                        boxShadow: popular ? '0 4px 14px rgba(33, 150, 243, 0.4)' : 'none'
                    }}
                >
                    {contactLink}
                </Button>
            </CardActions>
        </Card>
    </motion.div>
);

const Pricing = () => {
    const { t } = useTranslation();

    const plans = [
        {
            title: t('pricing.a1.title'),
            price: t('pricing.a1.price'),
            description: t('pricing.a1.desc'),
            features: t('pricing.a1.features').split(','),
            delay: 0.1
        },
        {
            title: t('pricing.a2.title'),
            price: t('pricing.a2.price'),
            description: t('pricing.a2.desc'),
            features: t('pricing.a2.features').split(','),
            popular: true,
            delay: 0.2
        },
        {
            title: t('pricing.b1.title'),
            price: t('pricing.b1.price'),
            description: t('pricing.b1.desc'),
            features: t('pricing.b1.features').split(','),
            premium: true,
            delay: 0.3
        },
        {
            title: t('pricing.b2.title'),
            price: t('pricing.b2.price'),
            description: t('pricing.b2.desc'),
            features: t('pricing.b2.features').split(','),
            delay: 0.4
        }
    ];

    return (
        <Box id="pricing" sx={{ py: 6, bgcolor: '#fafafa' }}>
            <Container maxWidth="lg">
                <Box textAlign="center" mb={6}>
                    <Typography variant="h3" component="h2" gutterBottom fontWeight="800">
                        {t('pricing.title')}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                        {t('pricing.subtitle')}
                    </Typography>
                </Box>

                {/* Series A */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Typography variant="h6" color="primary" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box component="span" sx={{ width: 4, height: 24, bgcolor: 'primary.main', mr: 1, borderRadius: 1 }} />
                        Series A: Quick Launch
                    </Typography>
                </Box>
                <Grid container spacing={3} justifyContent="center" sx={{ mb: 5 }}>
                    {plans.slice(0, 2).map((plan, index) => (
                        <Grid item xs={12} md={6} lg={5} key={index}>
                            <PricingCard {...plan} contactLink={t('cta.button')} />
                        </Grid>
                    ))}
                </Grid>

                {/* Series B */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                    <Typography variant="h6" color="secondary" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box component="span" sx={{ width: 4, height: 24, bgcolor: 'secondary.main', mr: 1, borderRadius: 1 }} />
                        Series B: Corporate Brand
                    </Typography>
                </Box>
                <Grid container spacing={3} justifyContent="center" sx={{ mb: 6 }}>
                    {plans.slice(2, 4).map((plan, index) => (
                        <Grid item xs={12} md={6} lg={5} key={index}>
                            <PricingCard {...plan} contactLink={t('cta.button')} />
                        </Grid>
                    ))}
                </Grid>

                {/* Series C - Enterprise Banner */}
                <Box sx={{ maxWidth: 'md', mx: 'auto' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Card sx={{
                            p: 4,
                            background: 'linear-gradient(45deg, #263238 30%, #37474f 90%)',
                            color: 'white',
                            borderRadius: 4,
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Box>
                                <Typography variant="h5" fontWeight="bold" gutterBottom>
                                    {t('pricing.c1.title')}
                                </Typography>
                                <Typography variant="body1" sx={{ opacity: 0.8, mb: { xs: 2, md: 0 } }}>
                                    {t('pricing.c1.desc')} • {t('pricing.c1.features').replaceAll(',', ' • ')}
                                </Typography>
                            </Box>
                            <Button
                                variant="contained"
                                color="inherit"
                                href="#contact"
                                sx={{ color: '#263238', fontWeight: 'bold', px: 4, whiteSpace: 'nowrap', minWidth: 'fit-content' }}
                            >
                                {t('pricing.contact')}
                            </Button>
                        </Card>
                    </motion.div>
                </Box>
            </Container>
        </Box>
    );
};

export default Pricing;
