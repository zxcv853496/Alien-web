import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { Box, Container, Typography, Card, CardContent, CardActions, Button, Grid, Chip, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import StarIcon from '@mui/icons-material/Star';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import LoadingState from '../common/LoadingState';



const PricingCard = ({ title, price, description, features, popular, premium, delay, contactLink, ...props }) => (
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

            // Popular (Blue) styles - for A2
            ...(popular && !premium && {
                border: '2px solid #2196F3',
                boxShadow: '0 8px 40px rgba(33, 150, 243, 0.2)',
            }),

            // Premium (Gradient) styles - for B1 (Static Elite)
            ...(premium && {
                border: '3px solid transparent', // Required for gradient border
                background: 'linear-gradient(#fff, #fff) padding-box, linear-gradient(135deg, #00C6FF 0%, #0072FF 100%) border-box',
                boxShadow: '0 12px 50px rgba(0, 198, 255, 0.3)',
                zIndex: 2
            }),

            '&:hover': {
                transform: 'translateY(-10px)',
                boxShadow: popular || premium
                    ? '0 12px 50px rgba(0,0,0,0.2)'
                    : '0 12px 30px rgba(0,0,0,0.1)'
            }
        }}>
            {props.openingSpecial && (
                <Chip
                    label={props.badgeTitle || "OPENING SPECIAL"}
                    color="error"
                    sx={{
                        position: 'absolute',
                        top: 12,
                        left: 12,
                        fontWeight: 'bold',
                        height: 24,
                        boxShadow: '0 2px 10px rgba(211, 47, 47, 0.3)',
                        zIndex: 3,
                    }}
                />
            )}
            {(popular || premium) && (
                <Chip
                    icon={
                        <Box sx={{ display: 'flex', mr: -0.5 }}>
                            <StarIcon sx={{ fontSize: 16, color: 'white !important' }} />
                            {premium && <StarIcon sx={{ fontSize: 16, color: 'white !important', ml: -0.5 }} />}
                        </Box>
                    }
                    label={props.badgeLabel || "RECOMMENDED"}
                    sx={{
                        position: 'absolute',
                        top: 12,
                        right: 12,
                        fontWeight: 'bold',
                        height: 24,
                        color: 'white',
                        bgcolor: premium ? 'transparent' : 'primary.main',
                        background: premium ? 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)' : undefined,
                        boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
                    }}
                />
            )}
            <CardContent sx={{ flexGrow: 1, p: 3, pt: (popular || premium || props.openingSpecial) ? 6 : 3 }}>
                <Typography variant="h5" component="div" fontWeight="bold" gutterBottom color={popular ? 'primary' : 'text.primary'}>
                    {title}
                </Typography>
                <Typography variant="h4" component="div" fontWeight="800" sx={{ mb: 1, color: popular ? '#2196F3' : 'inherit' }}>
                    {price}
                </Typography>
                {props.originalPrice && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, mt: -0.5 }}>
                        <Typography variant="h6" color="text.secondary" sx={{ textDecoration: 'line-through', mr: 1, lineHeight: 1 }}>
                            {props.originalPrice}
                        </Typography>
                        <Chip label="-20%" color="error" size="small" sx={{ fontWeight: 'bold', height: 20, fontSize: '0.75rem' }} />
                    </Box>
                )}
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
                    onClick={() => {
                        window.location.hash = '#/contact';
                        window.scrollTo(0, 0);
                    }}
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

    // State for products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('*')
                    .order('id', { ascending: true });

                if (error) throw error;
                setProducts(data || []);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <LoadingState minHeight="600px" />;
    }

    // Process products for display
    const processedPlans = products.map(p => ({
        ...p,
        // Map DB fields to UI props
        title: p.name,
        price: p.price,
        originalPrice: p.original_price,
        description: p.description,
        features: Array.isArray(p.features) ? p.features.map(f => f.text) : [],

        // Map Recommendation Levels
        popular: p.recommendation_level === 1,
        premium: p.recommendation_level === 2,

        // Badge Logic
        openingSpecial: p.is_special,
        badgeTitle: t('badge.opening'),

        // Animation Delay (stagger based on ID/Order)
        delay: 0.1 * (p.id || 1)
    }));

    // Split into Series
    const seriesA = processedPlans.filter(p => p.series && p.series.includes('Series A'));
    const seriesB = processedPlans.filter(p => p.series && p.series.includes('Series B'));

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

                <Grid container spacing={8} justifyContent="center">
                    {/* Series A Column - Single Card or List */}
                    <Grid item xs={12} lg={4}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <Typography variant="h6" color="primary" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box component="span" sx={{ width: 4, height: 24, bgcolor: 'primary.main', mr: 1, borderRadius: 1 }} />
                                Series A: Quick Launch
                            </Typography>
                        </Box>
                        <Grid container spacing={3} justifyContent="center">
                            {seriesA.map((plan, index) => (
                                <Grid item xs={12} key={plan.id || index}>
                                    <PricingCard {...plan} contactLink={t('cta.button')} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>

                    {/* Series B Column - List */}
                    <Grid item xs={12} lg={8}>
                        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                            <Typography variant="h6" color="secondary" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center' }}>
                                <Box component="span" sx={{ width: 4, height: 24, bgcolor: 'secondary.main', mr: 1, borderRadius: 1 }} />
                                Series B: Corporate Brand
                            </Typography>
                        </Box>
                        <Grid container spacing={3} justifyContent="center">
                            {seriesB.map((plan, index) => (
                                <Grid item xs={12} md={6} key={plan.id || index}>
                                    <PricingCard {...plan} contactLink={t('cta.button')} />
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>

                {/* Series C - Enterprise Banner */}
                <Box sx={{ maxWidth: 'md', mx: 'auto', mt: 8 }}>
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
                                onClick={() => {
                                    window.location.hash = '#/contact';
                                    window.scrollTo(0, 0);
                                }}
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
