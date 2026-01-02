import React from 'react';
import { Box, Container, Typography, Grid, Paper, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import ChatIcon from '@mui/icons-material/Chat';
import CodeIcon from '@mui/icons-material/Code';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const ProcessStep = ({ title, description, icon, index, steps }) => {
    const theme = useTheme();
    const isEven = index % 2 === 0;

    return (
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        height: '100%',
                        textAlign: 'center',
                        bgcolor: 'transparent',
                        position: 'relative',
                    }}
                >
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            mx: 'auto',
                            mb: 2,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'white',
                            color: 'primary.main',
                            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                            border: `2px solid ${theme.palette.primary.light}`,
                            position: 'relative',
                            zIndex: 2,
                            transition: '0.3s',
                            '&:hover': {
                                transform: 'scale(1.1)',
                                bgcolor: 'primary.main',
                                color: 'white',
                                borderColor: 'primary.main',
                            }
                        }}
                    >
                        {React.cloneElement(icon, { sx: { fontSize: 36 } })}

                        {/* Step Number Badge */}
                        <Box sx={{
                            position: 'absolute',
                            top: -5,
                            right: -5,
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            bgcolor: 'secondary.main',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem',
                            fontWeight: 'bold',
                            border: '2px solid white'
                        }}>
                            {index + 1}
                        </Box>
                    </Box>

                    <Typography variant="h6" gutterBottom fontWeight="bold">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {description}
                    </Typography>

                    {/* Connecting Line */}
                    <Box
                        sx={{
                            display: {
                                xs: 'none',
                                sm: index % 2 === 0 ? 'block' : 'none',
                                md: index < steps.length - 1 ? 'block' : 'none'
                            },
                            position: 'absolute',
                            top: 62,
                            right: -50 + '%',
                            width: '100%',
                            height: 2,
                            bgcolor: 'grey.300',
                            zIndex: 1,
                        }}
                    />
                </Paper>
            </motion.div>
        </Grid>
    );
};

const Process = () => {
    const { t } = useTranslation();

    const steps = [
        {
            title: t('process.step1.title'),
            description: t('process.step1.desc'),
            icon: <ChatIcon />
        },
        {
            title: t('process.step3.title'),
            description: t('process.step3.desc'),
            icon: <CodeIcon />
        },
        {
            title: t('process.step4.title'),
            description: t('process.step4.desc'),
            icon: <RocketLaunchIcon />
        }
    ];

    return (
        <Box
            id="process"
            sx={{
                py: 10,
                bgcolor: 'grey.50',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {/* Background decoration */}
            <Box sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0.1,
                background: 'radial-gradient(circle at 10% 20%, #2196f3 0%, transparent 20%), radial-gradient(circle at 90% 80%, #e91e63 0%, transparent 20%)',
                pointerEvents: 'none'
            }} />

            <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
                <Box textAlign="center" mb={6}>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                            {t('process.title')}
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            {t('process.subtitle')}
                        </Typography>
                    </motion.div>
                </Box>

                <Grid container spacing={4} justifyContent="center" sx={{ position: 'relative' }}>
                    {steps.map((step, index) => (
                        <ProcessStep key={index} {...step} index={index} steps={steps} />
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default Process;
