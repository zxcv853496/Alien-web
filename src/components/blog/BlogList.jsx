import React, { useState, useMemo, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea, Chip, Stack, CircularProgress } from '@mui/material';
import { articles as legacyArticles } from '../../data/articles';
import { supabase } from '../../lib/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../layout/PageHero';

const BlogList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .order('date', { ascending: false });

            if (error) throw error;

            // Hybrid Merge Strategy:
            // 1. Start with Legacy Articles
            // 2. Overwrite/Add DB Articles
            const articleMap = new Map();
            legacyArticles.forEach(a => articleMap.set(a.id, a));
            if (data) {
                data.forEach(a => articleMap.set(a.id, a));
            }

            const combinedAuthors = Array.from(articleMap.values());
            setArticles(combinedAuthors);

        } catch (error) {
            console.error('Error fetching articles:', error);
            // Fallback on error - use legacy only
            setArticles(legacyArticles);
        } finally {
            setLoading(false);
        }
    };

    // Extract unique tags
    const allTags = useMemo(() => {
        const tags = new Set(articles.flatMap(article => article.tags || []));
        return ['All', ...Array.from(tags)];
    }, [articles]);

    // Toggle tag selection
    const handleTagClick = (tag) => {
        if (tag === 'All') {
            setSelectedTags([]);
            return;
        }

        setSelectedTags(prev => {
            if (prev.includes(tag)) {
                return prev.filter(t => t !== tag);
            } else {
                return [...prev, tag];
            }
        });
    };

    // Filter and Sort articles
    const filteredArticles = useMemo(() => {
        let result = articles;

        // Filter
        if (selectedTags.length > 0) {
            result = articles.filter(article =>
                article.tags?.some(tag => selectedTags.includes(tag))
            );
        }

        // Sort by date (Newest first)
        return result.sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [articles, selectedTags]);


    return (
        <Box sx={{ minHeight: '80vh', bgcolor: 'grey.50' }}>
            <PageHero
                title="精選文章"
                subtitle="分享關於網頁設計、行銷科技與數位轉型的最新觀點。"
                small
            />

            <Container maxWidth="lg" sx={{ py: 8 }}>
                {/* Tag Filter */}
                <Stack direction="row" spacing={1} sx={{ mb: 6, flexWrap: 'wrap', gap: 1 }}>
                    {allTags.map((tag) => {
                        const isSelected = tag === 'All'
                            ? selectedTags.length === 0
                            : selectedTags.includes(tag);

                        return (
                            <Chip
                                key={tag}
                                label={tag === 'All' ? '全部文章' : tag}
                                onClick={() => handleTagClick(tag)}
                                component={motion.div}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                sx={{
                                    borderRadius: '50px',
                                    fontSize: '0.95rem',
                                    height: 'auto',
                                    px: 1.5,
                                    py: 1,
                                    cursor: 'pointer',
                                    border: '1px solid',
                                    borderColor: isSelected ? 'common.black' : 'transparent',
                                    bgcolor: isSelected ? 'common.black' : '#F3F4F6', // Light grey for inactive
                                    color: isSelected ? 'common.white' : 'text.secondary',
                                    fontWeight: isSelected ? 600 : 500,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        bgcolor: isSelected ? 'common.black' : '#E5E7EB', // Slightly darker grey on hover
                                        borderColor: isSelected ? 'common.black' : 'transparent',
                                        boxShadow: 'none'
                                    },
                                    '& .MuiChip-label': {
                                        px: 1
                                    }
                                }}
                            />
                        );
                    })}
                </Stack>

                <Grid container spacing={4}>
                    {loading ? (
                        <Grid item xs={12}>
                            <Box
                                component={motion.div}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    py: 12,
                                    gap: 3
                                }}
                            >
                                <CircularProgress
                                    size={50}
                                    thickness={4}
                                    sx={{
                                        color: 'primary.main',
                                        filter: 'drop-shadow(0 0 8px rgba(33, 150, 243, 0.3))'
                                    }}
                                />
                                <Typography
                                    variant="h6"
                                    color="text.secondary"
                                    sx={{
                                        fontWeight: 500,
                                        letterSpacing: 1,
                                        animation: 'pulse 2s infinite'
                                    }}
                                >
                                    {t('loading.articles') || 'Loading Articles...'}
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
                        </Grid>
                    ) : (
                        <AnimatePresence mode='wait'>
                            {filteredArticles.map((article, index) => (
                                <Grid item xs={12} md={6} key={article.id}>
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Card sx={{
                                            height: '100%',
                                            borderRadius: 4,
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                                            transition: '0.3s',
                                            '&:hover': { translateY: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }
                                        }}>
                                            <CardActionArea
                                                component={Link}
                                                to={`/articles/${article.id}`}
                                                sx={{ height: '100%', p: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}
                                            >
                                                <CardContent sx={{ width: '100%' }}>
                                                    <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                                                        {article.tags?.map(tag => (
                                                            <Chip
                                                                key={tag}
                                                                label={`#${tag}`}
                                                                size="small"
                                                                sx={{
                                                                    bgcolor: 'primary.50',
                                                                    color: 'primary.main',
                                                                    fontWeight: 'bold',
                                                                    fontSize: '0.75rem'
                                                                }}
                                                            />
                                                        ))}
                                                    </Stack>
                                                    <Typography variant="caption" color="text.secondary" fontWeight="bold">
                                                        {article.date}
                                                    </Typography>
                                                    <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" sx={{ mt: 1 }}>
                                                        {article.title}
                                                    </Typography>
                                                    <Typography variant="body1" color="text.secondary">
                                                        {article.description}
                                                    </Typography>
                                                </CardContent>
                                            </CardActionArea>
                                        </Card>
                                    </motion.div>
                                </Grid>
                            ))}
                        </AnimatePresence>
                    )}
                </Grid>
            </Container>
        </Box>
    );
};

export default BlogList;
