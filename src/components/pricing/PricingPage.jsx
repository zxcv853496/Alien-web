import React from 'react';
import { Box } from '@mui/material';
import PageHero from '../layout/PageHero';
import Pricing from '../home/Pricing';
import ComparisonTable from './ComparisonTable';
import { useTranslation } from 'react-i18next';
import { Container, Typography } from '@mui/material';

const PricingPage = () => {
    const { t } = useTranslation();



    const compareB = {
        title: t('compare.b.title'),
        headers: [t('compare.b.header1'), t('compare.b.header2')],
        rows: [
            { feature: t('compare.b.row1.feat'), values: [t('compare.b.row1.v1'), t('compare.b.row1.v2')] },
            { feature: t('compare.b.row2.feat'), values: [t('compare.b.row2.v1'), t('compare.b.row2.v2')] },
            { feature: t('compare.b.row3.feat'), values: [t('compare.b.row3.v1'), t('compare.b.row3.v2')] },
            { feature: t('compare.b.row4.feat'), values: [t('compare.b.row4.v1'), t('compare.b.row4.v2')] },
        ]
    };

    return (
        <Box>
            <PageHero
                title={t('pricing.hero.title')}
                subtitle={t('pricing.hero.subtitle')}
                small
            />
            <Pricing />

            <Container maxWidth="lg" sx={{ pb: 10 }}>
                {/* Section Divider */}
                <Box sx={{ textAlign: 'center', mb: 6, mt: -4, position: 'relative', zIndex: 2 }}>
                    <Typography variant="h4" fontWeight="800" gutterBottom>
                        Compare Plans Details
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        詳細功能對比，協助您做出最佳選擇
                    </Typography>
                </Box>

                <ComparisonTable {...compareB} />
            </Container>
        </Box>
    );
};

export default PricingPage;
