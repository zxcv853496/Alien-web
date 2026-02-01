import React, { useState } from 'react';
import { Box, Container, Typography, TextField, MenuItem, Button, Grid, Paper, Tooltip } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import PageHero from '../layout/PageHero';

const SimulatedTerminal = ({ text }) => (
    <Box sx={{
        fontFamily: "'Fira Code', monospace",
        fontSize: '0.875rem',
        color: '#00f2ff',
        bgcolor: 'rgba(0, 10, 20, 0.9)',
        p: 3,
        borderRadius: 2,
        height: 200,
        overflow: 'hidden',
        mb: 4,
        textAlign: 'left',
        border: '1px solid rgba(0, 242, 255, 0.3)',
        boxShadow: '0 0 20px rgba(0, 242, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end'
    }}>
        {text.map((line, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                style={{ marginBottom: 4 }}
            >
                <span style={{ color: '#ff0055', marginRight: 8 }}>➜</span>
                {line}
            </motion.div>
        ))}
        <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8 }}
            style={{ color: '#00f2ff', marginTop: 4 }}
        >_</motion.div>
    </Box>
);

const ResultCard = ({ title, icon, children, delay }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
        style={{ height: '100%' }}
    >
        <Paper
            elevation={0}
            sx={{
                p: 3,
                height: '100%',
                bgcolor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: 4,
                transition: '0.3s',
                '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.08)',
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                }
            }}
        >
            <Box display="flex" alignItems="center" mb={2} gap={1}>
                {icon}
                <Typography variant="h6" color="primary.light" fontWeight="bold">
                    {title}
                </Typography>
            </Box>
            {children}
        </Paper>
    </motion.div>
);

const AIPage = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState('input');
    const [formData, setFormData] = useState({ name: '', industry: 'tech' });
    const [result, setResult] = useState(null);
    const [logs, setLogs] = useState([]);
    const [, setError] = useState(false);

    const industries = [
        { value: 'tech', label: t('ai.industry.tech') },
        { value: 'food', label: t('ai.industry.food') },
        { value: 'fashion', label: t('ai.industry.fashion') },
        { value: 'finance', label: t('ai.industry.finance') },
        { value: 'consulting', label: t('ai.industry.consulting') }
    ];

    const validateInput = (text) => {
        // Validation: Too short, or only symbols/numbers, or repeated chars
        if (!text || text.length < 2) return false;
        if (/^[\d\W_]+$/.test(text)) return false; // Only numbers/symbols
        if (/(.)\1{3,}/.test(text)) return false; // Repeated chars like 'aaaa'

        // Strict check: Disallow typical "messy code" symbols including #@%# as requested
        if (/[#@%^&*()={}[\]:;"'<>,?/~`!|]/.test(text)) return false;

        return true;
    };

    const generateStrategy = () => {
        if (!formData.name) return;
        setStep('analyzing');
        setLogs([]);
        setError(false);

        const isValid = validateInput(formData.name);

        const logSequence = [
            "Initializing Neural Core v2.4...",
            `[SCAN] Sector Analysis: ${formData.industry.toUpperCase()}`,
            "Parsing Global Design Trends...",
            "Synthesizing Brand DNA...",
            "Computing Color Psychometrics...",
        ];

        // If invalid, add error logs
        if (!isValid) {
            logSequence.push(
                "WARN: Semantic Pattern Mismatch...",
                "ERROR: Token Analysis Failed.",
                "CRITICAL: Unable to generate valid strategy."
            );
        } else {
            logSequence.push(
                "Generating Neuromorphic Layouts...",
                "Optimizing Copy for Conversion...",
                "FINALIZING STRATEGY MATRIX..."
            );
        }

        let i = 0;
        const interval = setInterval(() => {
            if (i < logSequence.length) {
                setLogs(prev => [...prev.slice(-6), logSequence[i]]);
                i++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    if (isValid) {
                        // Simulation Logic
                        const strategies = {
                            tech: {
                                slogans: ["Future of Innovation", "Code Your Dreams", "Digital Evolution"],
                                colors: ["#00F0FF", "#000000", "#FFFFFF", "#7000FF"],
                                style: t('ai.style.minimalist')
                            },
                            food: {
                                slogans: ["Taste the Joy", "Freshness Delivered", "Soul on a Plate"],
                                colors: ["#FF9F1C", "#2EC4B6", "#FFFFFF", "#E71D36"],
                                style: t('ai.style.warm')
                            },
                            fashion: {
                                slogans: ["Define Your Style", "Elegant & Timeless", "Wear the Trend"],
                                colors: ["#2B2D42", "#8D99AE", "#EDF2F4", "#D90429"],
                                style: t('ai.style.editorial')
                            },
                            finance: {
                                slogans: ["Secure Your Future", "Smart Wealth", "Trust in Numbers"],
                                colors: ["#0E2431", "#D4AF37", "#FFFFFF", "#1E3D59"],
                                style: t('ai.style.trust')
                            },
                            consulting: {
                                slogans: ["Strategic Excellence", "Leading the Way", "Expert Insights"],
                                colors: ["#1A3A3A", "#F4F1DE", "#3D405B", "#E07A5F"],
                                style: t('ai.style.corporate')
                            }
                        };
                        const targetData = strategies[formData.industry];

                        setResult({
                            slogan: targetData.slogans[Math.floor(Math.random() * targetData.slogans.length)],
                            colors: targetData.colors,
                            style: targetData.style
                        });
                        setStep('result');
                    } else {
                        setError(true);
                        setStep('error');
                    }
                }, 800);
            }
        }, 800);
    };

    return (
        <Box sx={{
            minHeight: '100vh',
            bgcolor: '#0a0a0a', // Dark background as base
            color: 'white',
            position: 'relative',
        }}>
            <Helmet>
                <title>AI Brand Generator | Alien AntiGravity</title>
                <meta name="description" content="Experience our AI Brand Strategy Generator." />
            </Helmet>

            <PageHero
                title="AI STRATEGY CORE"
                subtitle={t('ai.generator.subtitle')}
                small
            />

            {/* Background Particles Decoration (Preserved for content area) */}
            <Box sx={{
                position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
                background: 'radial-gradient(circle at 50% 50%, #1a237e 0%, #000000 100%)',
                zIndex: 0,
                pointerEvents: 'none'
            }}>
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        style={{
                            position: 'absolute',
                            width: Math.random() * 4 + 2,
                            height: Math.random() * 4 + 2,
                            borderRadius: '50%',
                            backgroundColor: '#00f2ff',
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -100, 0],
                            opacity: [0.2, 0.8, 0.2]
                        }}
                        transition={{
                            duration: Math.random() * 5 + 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </Box>

            <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, py: 8 }}>
                <AnimatePresence mode='wait'>
                    {step === 'input' && (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                        >
                            <Paper sx={{
                                p: 5,
                                bgcolor: 'rgba(255, 255, 255, 0.05)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: 4,
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                            }}>
                                <Grid container spacing={4}>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            label={t('ai.input.brand_name')}
                                            variant="outlined"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    borderRadius: 2,
                                                    bgcolor: 'rgba(0,0,0,0.3)',
                                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                                    '&:hover fieldset': { borderColor: 'rgba(0, 242, 255, 0.5)' },
                                                    '&.Mui-focused fieldset': { borderColor: '#00f2ff', boxShadow: '0 0 10px rgba(0, 242, 255, 0.3)' },
                                                },
                                                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
                                                '& .MuiInputLabel-root.Mui-focused': { color: '#00f2ff' }
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            fullWidth
                                            select
                                            label={t('ai.input.industry')}
                                            value={formData.industry}
                                            onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                                            sx={{
                                                '& .MuiOutlinedInput-root': {
                                                    color: 'white',
                                                    borderRadius: 2,
                                                    bgcolor: 'rgba(0,0,0,0.3)',
                                                    '& fieldset': { borderColor: 'rgba(255,255,255,0.2)' },
                                                    '&:hover fieldset': { borderColor: 'rgba(0, 242, 255, 0.5)' },
                                                    '&.Mui-focused fieldset': { borderColor: '#00f2ff', boxShadow: '0 0 10px rgba(0, 242, 255, 0.3)' },
                                                },
                                                '& .MuiInputLabel-root': { color: 'rgba(255,255,255,0.6)' },
                                                '& .MuiInputLabel-root.Mui-focused': { color: '#00f2ff' },
                                                '& .MuiSelect-icon': { color: 'white' }
                                            }}
                                            SelectProps={{
                                                MenuProps: {
                                                    PaperProps: {
                                                        sx: {
                                                            bgcolor: '#0a1929',
                                                            border: '1px solid rgba(0, 242, 255, 0.3)',
                                                            '& .MuiMenuItem-root': {
                                                                color: 'white',
                                                                '&:hover': { bgcolor: 'rgba(0, 242, 255, 0.1)' },
                                                                '&.Mui-selected': { bgcolor: 'rgba(0, 242, 255, 0.2)', '&:hover': { bgcolor: 'rgba(0, 242, 255, 0.3)' } }
                                                            }
                                                        }
                                                    }
                                                }
                                            }}
                                        >
                                            {industries.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            size="large"
                                            onClick={generateStrategy}
                                            disabled={!formData.name}
                                            sx={{
                                                py: 2,
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold',
                                                borderRadius: 2,
                                                background: 'linear-gradient(45deg, #00f2ff 30%, #0066ff 90%)',
                                                color: 'black',
                                                boxShadow: '0 0 20px rgba(0, 242, 255, 0.4)',
                                                '&:hover': {
                                                    background: 'linear-gradient(45deg, #00c2cf 30%, #0056cf 90%)',
                                                    transform: 'scale(1.02)',
                                                    boxShadow: '0 0 30px rgba(0, 242, 255, 0.6)'
                                                },
                                                transition: '0.3s'
                                            }}
                                        >
                                            {t('ai.btn.analyze')}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </motion.div>
                    )}

                    {step === 'analyzing' && (
                        <motion.div
                            key="analyzing"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <SimulatedTerminal text={logs} />
                            <Box textAlign="center">
                                <Typography variant="h6" color="#00f2ff" sx={{ fontFamily: 'monospace', letterSpacing: 2 }}>
                                    PROCESSING...
                                </Typography>
                            </Box>
                        </motion.div>
                    )}

                    {step === 'error' && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Box textAlign="center" sx={{
                                p: 5,
                                border: '1px solid #ff0055',
                                borderRadius: 4,
                                bgcolor: 'rgba(255, 0, 85, 0.1)',
                                boxShadow: '0 0 30px rgba(255, 0, 85, 0.2)'
                            }}>
                                <Typography variant="h3" color="#ff0055" fontWeight="bold" gutterBottom>
                                    ⚠ ERROR
                                </Typography>
                                <Typography variant="h5" color="white" gutterBottom>
                                    {t('ai.error.title')}
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.7)', mb: 4 }}>
                                    {t('ai.error.desc')}
                                </Typography>
                                <Button
                                    variant="outlined"
                                    onClick={() => setStep('input')}
                                    sx={{
                                        color: '#ff0055',
                                        borderColor: '#ff0055',
                                        '&:hover': { borderColor: '#ff0055', bgcolor: 'rgba(255, 0, 85, 0.1)' }
                                    }}
                                >
                                    {t('ai.error.btn')}
                                </Button>
                            </Box>
                        </motion.div>
                    )}

                    {step === 'result' && result && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <Grid container spacing={3}>
                                {/* Slogan Card */}
                                <Grid item xs={12}>
                                    <ResultCard title="Generated Slogan" icon={<AutoAwesomeIcon sx={{ color: '#00f2ff' }} />} delay={0.1}>
                                        <Typography variant="h3" fontWeight="bold" sx={{
                                            background: 'linear-gradient(90deg, #fff 0%, #aaa 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            fontStyle: 'italic',
                                            my: 2
                                        }}>
                                            "{result.slogan}"
                                        </Typography>
                                    </ResultCard>
                                </Grid>

                                {/* Style Card */}
                                <Grid item xs={12} md={6}>
                                    <ResultCard title="Design System" icon={<AutoAwesomeIcon sx={{ color: '#ff0055' }} />} delay={0.2}>
                                        <Typography variant="h5" fontWeight="bold" color="white" gutterBottom>
                                            {result.style}
                                        </Typography>
                                        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)' }}>
                                            Based on current industry trends, this aesthetic maximizes user trust and engagement metrics for {formData.industry} sectors.
                                        </Typography>
                                    </ResultCard>
                                </Grid>

                                {/* Color Card */}
                                <Grid item xs={12} md={6}>
                                    <ResultCard title="Chromatic DNA" icon={<AutoAwesomeIcon sx={{ color: '#ffd700' }} />} delay={0.3}>
                                        <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                                            {result.colors.map((c, i) => (
                                                <Tooltip title="Copy Hex" key={i}>
                                                    <Box
                                                        onClick={() => navigator.clipboard.writeText(c)}
                                                        sx={{
                                                            width: 60,
                                                            height: 60,
                                                            borderRadius: '16px',
                                                            bgcolor: c,
                                                            cursor: 'pointer',
                                                            boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                                                            border: '2px solid rgba(255,255,255,0.1)',
                                                            transition: '0.2s',
                                                            '&:hover': { transform: 'scale(1.1) rotate(5deg)' }
                                                        }}
                                                    />
                                                </Tooltip>
                                            ))}
                                        </Box>
                                    </ResultCard>
                                </Grid>

                                <Grid item xs={12} align="center" mt={4}>
                                    <Button
                                        startIcon={<RestartAltIcon />}
                                        onClick={() => setStep('input')}
                                        sx={{ color: 'rgba(255,255,255,0.6)', '&:hover': { color: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                                    >
                                        RESET SIMULATION
                                    </Button>
                                </Grid>
                            </Grid>
                        </motion.div>
                    )}
                </AnimatePresence>
            </Container>
        </Box>
    );
};

export default AIPage;
