import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <Box
            id="hero"
            sx={{
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                py: { xs: 8, md: 12 },
                textAlign: 'center',
                background: 'linear-gradient(45deg, #1565c0 30%, #42a5f5 90%)',
            }}
        >
            <Container maxWidth="md">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
                        {t('hero.title')}
                    </Typography>
                    <Typography variant="h5" component="p" sx={{ mb: 4, opacity: 0.9 }}>
                        {t('hero.subtitle')}
                    </Typography>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="large"
                        href="#contact"
                        sx={{ fontWeight: 'bold', px: 4, py: 1.5, bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
                    >
                        {t('cta.title').split('！')[0]}
                    </Button>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Hero;
