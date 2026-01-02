import React, { useState, useMemo } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea, Chip, Stack } from '@mui/material';
import { articles } from '../../data/articles';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../layout/PageHero';

const BlogList = () => {
    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState([]);

    // Extract unique tags
    const allTags = useMemo(() => {
        const tags = new Set(articles.flatMap(article => article.tags || []));
        return ['All', ...Array.from(tags)];
    }, []);

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
    }, [selectedTags]);

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
                </Grid>
            </Container>
        </Box>
    );
};

export default BlogList;
