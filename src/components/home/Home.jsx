import React from 'react';
import Hero from './Hero';
import Services from './Services';
import Process from './Process';
import WhyChooseUs from './WhyChooseUs';
import Pricing from './Pricing';
import Contact from './Contact';
import { Box } from '@mui/material';

import { Helmet } from 'react-helmet-async';

const Home = () => {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebDesignCompany",
        "name": "Alien AntiGravity Web Design",
        "image": "https://www.xn--boqs94em30a.tw/og-image.jpg",
        "url": "https://www.xn--boqs94em30a.tw/",
        "telephone": "+886-978-966-582",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Taipei",
            "addressCountry": "TW"
        },
        "priceRange": "$$",
        "openingHoursSpecification": {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "09:00",
            "closes": "18:00"
        }
    };

    return (
        <Box>
            <Helmet>
                <title>Alien AntiGravity | AI Web Design &amp; Development</title>
                <meta name="description" content="Alien AntiGravity provides premium AI-driven web design, SEO optimization, and full-stack development. Transform your business with future-ready websites." />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Alien AntiGravity | AI Web Design &amp; Development" />
                <meta property="og:description" content="Expert AI Web Design services in Taiwan. We build fast, responsive, and SEO-friendly websites." />
                <meta property="og:url" content="https://www.xn--boqs94em30a.tw/" />
                <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            </Helmet>
            <Hero />
            <Services />
            <Process />
            <WhyChooseUs />
            <Pricing />
        </Box>
    );
};

export default Home;
