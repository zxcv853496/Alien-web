import React from 'react';
import { Box } from '@mui/material';
import PageHero from '../layout/PageHero';
import Pricing from '../home/Pricing';
import { useTranslation } from 'react-i18next';

const PricingPage = () => {
    const { t } = useTranslation();

    return (
        <Box>
            <PageHero
                title={t('pricing.hero.title')}
                subtitle={t('pricing.hero.subtitle')}
                small
            />
            <Pricing />
        </Box>
    );
};

export default PricingPage;
