import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'react-i18next';

const WhyChooseUs = () => {
    const { t } = useTranslation();

    const reasons = [
        { title: "專業團隊", desc: "擁有豐富的網頁設計與開發經驗。" },
        { title: "客製化方案", desc: "根據您的需求量身打造專屬網站。" },
        { title: "品質保證", desc: "注重細節，確保每個環節都達到最高標準。" },
        { title: "透明流程", desc: "讓您清楚掌握網站建置進度。" },
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
