import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'react-i18next';

const Contact = () => {
    const { t } = useTranslation();

    return (
        <Box id="contact" sx={{ py: 8, bgcolor: 'primary.main', color: 'primary.contrastText', textAlign: 'center' }}>
            <Container maxWidth="md">
                <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
                    {t('cta.title')}
                </Typography>
                <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
                    「架站一條龍」服務，讓您省心又安心！
                </Typography>
                <Button
                    variant="contained"
                    size="large"
                    startIcon={<EmailIcon />}
                    sx={{
                        bgcolor: 'white',
                        color: 'primary.main',
                        px: 6,
                        py: 1.5,
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        '&:hover': { bgcolor: 'grey.100' }
                    }}
                    href="mailto:contact@alienfreelance.com" // Placeholder email
                >
                    立即聯繫我們
                </Button>
            </Container>
        </Box>
    );
};

export default Contact;
