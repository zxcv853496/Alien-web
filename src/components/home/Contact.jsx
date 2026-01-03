import React from 'react';
import { Box, Container, Typography, Button, TextField, Paper, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabaseClient';
import toast from 'react-hot-toast';

const Contact = () => {
    const { t } = useTranslation();
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        message: ''
    });
    const [sending, setSending] = React.useState(false);
    const [touched, setTouched] = React.useState({ email: false });

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleBlur = (e) => {
        setTouched({
            ...touched,
            [e.target.name]: true
        });
    };

    const isFormValid = Object.values(formData).every(value => value.trim() !== '') && isValidEmail(formData.email);

    const handleSubmit = async () => {
        if (!isFormValid) return;

        setSending(true);

        try {
            const { error } = await supabase
                .from('messages')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        content: formData.message
                    }
                ]);

            if (error) throw error;

            toast.success((toastId) => (
                <span onClick={() => toast.dismiss(toastId.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {t('contact.success', 'Message sent successfully! We will contact you soon.')}
                    <button onClick={(e) => { e.stopPropagation(); toast.dismiss(toastId.id); }} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '1.2em', padding: '0 4px', lineHeight: 1 }}>✕</button>
                </span>
            ), { duration: 5000 });
            setFormData({ name: '', email: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error((toastId) => (
                <span onClick={() => toast.dismiss(toastId.id)} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {t('contact.error', 'Failed to send message. Please try again later.')}
                    <button onClick={(e) => { e.stopPropagation(); toast.dismiss(toastId.id); }} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontSize: '1.2em', padding: '0 4px', lineHeight: 1 }}>✕</button>
                </span>
            ), { duration: 5000 });
        } finally {
            setSending(false);
        }
    };

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
                        <Typography variant="h3" component="h2" gutterBottom fontWeight="800" color="primary.main" sx={{ fontSize: { xs: '1.75rem', md: '2.5rem' } }}>
                            {t('cta.title')}
                        </Typography>
                        <Typography variant="h6" sx={{ mb: 6, color: 'text.secondary', fontWeight: 'normal' }}>
                            {t('cta.subtitle')}
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mb: 4, textAlign: 'left', justifyContent: 'center' }}>
                            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, ml: 1, fontWeight: 'bold' }}>
                                    {t('contact.name.label')}
                                </Typography>
                                <TextField
                                    fullWidth
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={t('contact.name.placeholder')}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            bgcolor: 'white',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                            '& fieldset': { borderColor: '#e0e0e0' },
                                            '&:hover fieldset': { borderColor: 'primary.main' },
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{ width: { xs: '100%', sm: 'calc(50% - 12px)' } }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, ml: 1, fontWeight: 'bold' }}>
                                    {t('contact.email.label')}
                                </Typography>
                                <TextField
                                    fullWidth
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={t('contact.email.placeholder')}
                                    variant="outlined"
                                    error={touched.email && !isValidEmail(formData.email)}
                                    helperText={touched.email && !isValidEmail(formData.email) ? t('contact.email.error') : ''}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            bgcolor: 'white',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                            '& fieldset': { borderColor: '#e0e0e0' },
                                            '&:hover fieldset': { borderColor: 'primary.main' },
                                        },
                                        '& .MuiFormHelperText-root': {
                                            marginLeft: 1
                                        }
                                    }}
                                />
                            </Box>
                            <Box sx={{ width: '100%' }}>
                                <Typography variant="subtitle2" sx={{ mb: 1, ml: 1, fontWeight: 'bold' }}>
                                    {t('contact.message.label')}
                                </Typography>
                                <TextField
                                    fullWidth
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder={t('contact.message.placeholder')}
                                    multiline
                                    rows={4}
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            bgcolor: 'white',
                                            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                            '& fieldset': { borderColor: '#e0e0e0' },
                                            '&:hover fieldset': { borderColor: 'primary.main' },
                                        }
                                    }}
                                />
                            </Box>
                        </Box>

                        <motion.div whileHover={isFormValid ? { scale: 1.02 } : {}} whileTap={isFormValid ? { scale: 0.98 } : {}}>
                            <Button
                                variant="contained"
                                size="large"
                                endIcon={!sending && <SendIcon />}
                                disabled={!isFormValid || sending}
                                onClick={handleSubmit}
                                sx={{
                                    bgcolor: 'primary.main',
                                    color: 'white',
                                    px: 8,
                                    py: 1.5,
                                    fontSize: '1.2rem',
                                    borderRadius: '50px',
                                    boxShadow: '0 8px 20px rgba(21, 101, 192, 0.4)',
                                    '&:hover': { bgcolor: 'primary.dark' },
                                    '&.Mui-disabled': {
                                        bgcolor: 'action.disabledBackground',
                                        color: 'action.disabled'
                                    }
                                }}
                            >
                                {sending ? <CircularProgress size={24} color="inherit" /> : t('cta.button')}
                            </Button>
                        </motion.div>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Contact;
