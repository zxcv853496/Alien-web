import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();

    const floatingVariant = {
        animate: {
            y: [0, -20, 0],
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <Box
            id="hero"
            sx={{
                position: 'relative',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                py: { xs: 8, md: 15 }, // Increased padding for more space
                textAlign: 'center',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)',
            }}
        >
            {/* Animated Background Elements */}
            <motion.div
                variants={floatingVariant}
                animate="animate"
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '100px',
                    height: '100px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.1)',
                }}
            />
            <motion.div
                variants={floatingVariant}
                animate="animate"
                transition={{ delay: 1 }} // Staggered animation
                style={{
                    position: 'absolute',
                    top: '60%',
                    right: '15%',
                    width: '150px',
                    height: '150px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.05)',
                }}
            />
            <motion.div
                animate={{ x: [0, 30, 0], y: [0, 30, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{
                    position: 'absolute',
                    bottom: '10%',
                    left: '20%',
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                }}
            />


            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: '800', textShadow: '0px 4px 10px rgba(0,0,0,0.2)' }}>
                        {t('hero.title')}
                    </Typography>
                    <Typography variant="h5" component="p" sx={{ mb: 6, opacity: 0.95, lineHeight: 1.6 }}>
                        {t('hero.subtitle')}
                    </Typography>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="large"
                            href="#contact"
                            sx={{
                                fontWeight: 'bold',
                                px: 5,
                                py: 1.8,
                                borderRadius: '50px',
                                bgcolor: 'white',
                                color: 'primary.main',
                                boxShadow: '0 4px 14px 0 rgba(0,0,0,0.2)',
                                '&:hover': { bgcolor: 'grey.100' }
                            }}
                        >
                            {t('cta.title').split('！')[0]}
                        </Button>
                    </motion.div>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Hero;
