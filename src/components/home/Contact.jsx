import React from 'react';
import { Box, Container, Typography, Button, TextField, Grid, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <Box
            id="contact"
            sx={{
                py: 10,
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #f5f5f5 0%, #e3f2fd 100%)'
            }}
        >
            {/* Decorative Circle */}
            <Box sx={{
                position: 'absolute',
                top: -50,
                left: -50,
                width: 200,
                height: 200,
                borderRadius: '50%',
                background: 'rgba(21, 101, 192, 0.05)',
                zIndex: 0
            }} />
            <Box sx={{
                position: 'absolute',
                bottom: -50,
                right: -50,
                width: 300,
                height: 300,
                borderRadius: '50%',
                background: 'rgba(66, 165, 245, 0.05)',
                zIndex: 0
            }} />


            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Paper
                        elevation={4}
                        sx={{
                            p: { xs: 4, md: 8 },
                            borderRadius: '24px',
                            textAlign: 'center',
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)'
                        }}
                    >
                        <Typography variant="h3" component="h2" gutterBottom fontWeight="800" color="primary.main">
                            {t('cta.title')}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 6, color: 'text.secondary', fontWeight: 'normal' }}>
                            「架站一條龍」服務，讓您省心又安心！
                        </Typography>

                        <Grid container spacing={3} sx={{ mb: 4, textAlign: 'left' }}>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="您的姓名 Name" variant="outlined" />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField fullWidth label="電子郵件 Email" variant="outlined" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField fullWidth label="諮詢內容 Message" multiline rows={4} variant="outlined" />
                            </Grid>
                        </Grid>

                        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={<SendIcon />}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    px: 8,
                                    py: 1.5,
                                    fontSize: '1.2rem',
                                    borderRadius: '50px',
                                    boxShadow: '0 8px 20px rgba(21, 101, 192, 0.4)',
                                    '&:hover': { bgcolor: 'primary.dark' }
                                }}
                                href="mailto:contact@alienfreelance.com"
                            >
                                立即聯繫我們
                            </Button>
                        </motion.div>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Contact;
