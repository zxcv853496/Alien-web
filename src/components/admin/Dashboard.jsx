import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { supabase } from '../../lib/supabaseClient';
import EmailIcon from '@mui/icons-material/Email';
import LoadingState from '../common/LoadingState';

import { useTranslation } from 'react-i18next';

const Dashboard = () => {
    const { t } = useTranslation();
    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            // Optimised count query
            const { count, error } = await supabase
                .from('messages')
                .select('*', { count: 'exact', head: true });

            if (error) throw error;
            setCount(count || 0);
        } catch (error) {
            console.error('Error fetching messages count:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 4 }}>
                {t('admin.overview')}
            </Typography>
            {loading ? (
                <LoadingState minHeight="200px" />
            ) : (
                <Grid container spacing={3}>
                    {/* Stats Card */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <EmailIcon color="primary" sx={{ mr: 1 }} />
                                <Typography variant="h6">{t('admin.total_messages')}</Typography>
                            </Box>
                            <Typography variant="h3" fontWeight="bold">
                                {count}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Box>
    );
};

export default Dashboard;
