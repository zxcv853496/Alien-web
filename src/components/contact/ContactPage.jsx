import React from 'react';
import { Box } from '@mui/material';
import PageHero from '../layout/PageHero';
import Contact from '../home/Contact';
import { useTranslation } from 'react-i18next';

const ContactPage = () => {
    const { t } = useTranslation();

    return (
        <Box>
            <PageHero
                title={t('nav.contact')}
                subtitle={t('contact.message.placeholder')}
                small
            />
            <Contact />
        </Box>
    );
};

export default ContactPage;
