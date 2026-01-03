import React from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const LoadingState = ({ minHeight = '400px', py = 8, message }) => {
    const { t } = useTranslation();

    return (
        <Box
            component={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: minHeight,
                py: py,
                gap: 2
            }}
        >
            <CircularProgress
                size={40}
                thickness={4}
                sx={{
                    color: 'primary.main',
                }}
            />
            <Typography
                variant="body1"
                color="text.secondary"
                sx={{
                    fontWeight: 500,
                    letterSpacing: 2,
                    animation: 'pulse 1.5s infinite',
                    textTransform: 'uppercase',
                    fontSize: '0.875rem'
                }}
            >
                {message || t('loading.articles') || 'Loading...'}
            </Typography>
            <style>
                {`
                    @keyframes pulse {
                        0% { opacity: 0.5; }
                        50% { opacity: 1; }
                        100% { opacity: 0.5; }
                    }
                `}
            </style>
        </Box>
    );
};

export default LoadingState;
