import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { motion } from 'framer-motion';

const PageHero = ({ title, subtitle, ctaText, ctaLink, small = false }) => {
    const [displayedText, setDisplayedText] = React.useState("");
    const fullText = subtitle || "";

    React.useEffect(() => {
        if (!fullText) return;

        let currentIndex = 0;
        setDisplayedText(""); // Reset text on change

        const intervalId = setInterval(() => {
            if (currentIndex <= fullText.length) {
                setDisplayedText(fullText.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(intervalId);
            }
        }, 50);

        return () => clearInterval(intervalId);
    }, [fullText]);

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
            sx={{
                position: 'relative',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                py: small ? { xs: 6, md: 10 } : { xs: 8, md: 15 },
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
                transition={{ delay: 1 }}
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
                    <Typography
                        variant={small ? "h3" : "h2"}
                        component="h1"
                        gutterBottom
                        sx={{
                            fontWeight: '800',
                            textShadow: '0px 4px 10px rgba(0,0,0,0.2)',
                            fontSize: small ? { xs: '2rem', md: '3rem' } : undefined
                        }}
                    >
                        {title}
                    </Typography>

                    {/* Typewriter Effect */}
                    <Box sx={{ mb: ctaText ? 6 : 0, minHeight: '3.2em', display: 'flex', justifyContent: 'center' }}>
                        <Typography variant="h5" component="p" sx={{ opacity: 0.95, lineHeight: 1.6, margin: 0, fontSize: small ? '1.2rem' : undefined }}>
                            {displayedText}<motion.span
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                                style={{ display: 'inline', marginLeft: '2px', fontWeight: 'bold', color: 'inherit' }}
                            >
                                |
                            </motion.span>
                        </Typography>
                    </Box>

                    {ctaText && (
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Button
                                variant="contained"
                                color="secondary"
                                size="large"
                                href={ctaLink || "#"}
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
                                {ctaText}
                            </Button>
                        </motion.div>
                    )}
                </motion.div>
            </Container>
        </Box>
    );
};

export default PageHero;
