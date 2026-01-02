import React from 'react';
import { Box } from '@mui/material';
import PageHero from '../layout/PageHero';
import Pricing from '../home/Pricing';
import ComparisonTable from './ComparisonTable';
import { useTranslation } from 'react-i18next';
import { Container } from '@mui/material';

const PricingPage = () => {
    const { t } = useTranslation();

    const compareA = {
        title: t('compare.a.title'),
        headers: [t('compare.a.header1'), t('compare.a.header2')],
        rows: [
            { feature: t('compare.a.row1.feat'), values: [t('compare.a.row1.v1'), t('compare.a.row1.v2')] },
            { feature: t('compare.a.row2.feat'), values: [t('compare.a.row2.v1'), t('compare.a.row2.v2')] },
            { feature: t('compare.a.row3.feat'), values: [t('compare.a.row3.v1'), t('compare.a.row3.v2')] },
            { feature: t('compare.a.row4.feat'), values: [false, t('compare.a.row4.v2')] },
        ]
    };

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
                <ComparisonTable {...compareA} />
                <ComparisonTable {...compareB} />
            </Container>
        </Box>
    );
};

export default PricingPage;
