import React from 'react';
import { useTranslation } from 'react-i18next';
import PageHero from '../layout/PageHero';

const Hero = () => {
    const { t } = useTranslation();

    return (
        <div id="hero">
            <PageHero
                title={t('hero.title')}
                subtitle={t('hero.subtitle')}
                ctaText={t('cta.title').split('！')[0]}
                ctaLink="#contact"
            />
        </div>
    );
};

export default Hero;


