import React, { useState, useMemo } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea, Chip, Stack } from '@mui/material';
import { articles } from '../../data/articles';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../layout/PageHero';

const BlogList = () => {
    const navigate = useNavigate();
    const [selectedTag, setSelectedTag] = useState('All');

    // Extract unique tags
    const allTags = useMemo(() => {
        const tags = new Set(articles.flatMap(article => article.tags || []));
        return ['All', ...Array.from(tags)];
    }, []);

    // Filter articles
    const filteredArticles = useMemo(() => {
        if (selectedTag === 'All') return articles;
        return articles.filter(article => article.tags?.includes(selectedTag));
    }, [selectedTag]);

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
                    {allTags.map((tag) => (
                        <Chip
                            key={tag}
                            label={tag === 'All' ? '全部文章' : tag}
                            onClick={() => setSelectedTag(tag)}
                            color={selectedTag === tag ? 'primary' : 'default'}
                            variant={selectedTag === tag ? 'filled' : 'outlined'}
                            sx={{
                                borderRadius: 4,
                                fontSize: '1rem',
                                px: 1,
                                py: 2.5,
                                cursor: 'pointer',
                                transition: '0.3s',
                                '&:hover': {
                                    bgcolor: selectedTag === tag ? 'primary.dark' : 'rgba(0, 0, 0, 0.08)'
                                }
                            }}
                        />
                    ))}
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
