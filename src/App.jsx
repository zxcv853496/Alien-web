import React from 'react';
import MainLayout from './components/layout/MainLayout';
import Hero from './components/home/Hero';
import Services from './components/home/Services';
import Process from './components/home/Process';
import WhyChooseUs from './components/home/WhyChooseUs';
import Contact from './components/home/Contact';
import { Box } from '@mui/material';

function App() {
  return (
    <MainLayout>
      <Box>
        {/* 各個區塊組件 */}
        <Hero />
        <Services />
        <Process />
        <WhyChooseUs />
        <Contact />
      </Box>
    </MainLayout>
  );
}

export default App;
