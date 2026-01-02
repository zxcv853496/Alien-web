import React from 'react';
import { Box } from '@mui/material';
import PageHero from '../layout/PageHero';
import Contact from '../home/Contact';
import { useTranslation } from 'react-i18next';

import { Helmet } from 'react-helmet-async';

const ContactPage = () => {
    const { t } = useTranslation();

    return (
        <Box>
            <Helmet>
                <title>Contact Us | Alien AntiGravity Web Design</title>
                <meta name="description" content="Ready to start your project? Contact Alien AntiGravity for a free consultation. We turn your ideas into high-performance websites." />
                <meta property="og:title" content="Contact Us | Alien AntiGravity" />
            </Helmet>
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
