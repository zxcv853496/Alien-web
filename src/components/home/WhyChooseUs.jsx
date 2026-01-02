import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';

const WhyChooseUs = () => {
    const { t } = useTranslation();

    const reasons = [
        { title: t('why.professional.title'), desc: t('why.professional.desc') },
        { title: t('why.custom.title'), desc: t('why.custom.desc') },
        { title: t('why.quality.title'), desc: t('why.quality.desc') },
        { title: t('why.transparent.title'), desc: t('why.transparent.desc') },
    ];

    return (
        <Box id="why-us" sx={{ py: 8, bgcolor: 'white' }}>
            <Container maxWidth="lg">
                <Typography variant="h3" component="h2" align="center" gutterBottom sx={{ mb: 6, fontWeight: 'bold', color: 'primary.main' }}>
                    {t('why.title')}
                </Typography>
                <Grid container spacing={4}>
                    {reasons.map((reason, index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Paper elevation={0} sx={{ p: 3, display: 'flex', alignItems: 'flex-start', bgcolor: 'grey.50' }}>
                                <CheckCircleIcon color="primary" sx={{ mr: 2, fontSize: 30 }} />
                                <Box>
                                    <Typography variant="h6" gutterBottom fontWeight="bold">
                                        {reason.title}
                                    </Typography>
                                    <Typography variant="body1" color="text.secondary">
                                        {reason.desc}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default WhyChooseUs;
