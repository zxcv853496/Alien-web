import React from 'react';
import Hero from './Hero';
import Services from './Services';
import Process from './Process';
import WhyChooseUs from './WhyChooseUs';
import Contact from './Contact';
import { Box } from '@mui/material';

const Home = () => {
    return (
        <Box>
            <Hero />
            <Services />
            <Process />
            <WhyChooseUs />
            <Contact />
        </Box>
    );
};

export default Home;
