import React from 'react';
import { Box, Typography, Container, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();

    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[800],
            }}
        >
            <Container maxWidth="sm">
                <Typography variant="body1" align="center">
                    Alien's Freelance Website
                </Typography>
                <Typography variant="body2" align="center" color="primary" sx={{ mb: 1, fontWeight: 'bold' }}>
                    {t('footer.contactLabel')}: zxcv853496@gmail.com
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                    {t('footer.rights')}
                </Typography>
            </Container>
        </Box>
    );
};

export default Footer;
