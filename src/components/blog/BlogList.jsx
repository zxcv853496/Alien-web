import React, { useState, useMemo, useEffect } from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, CardActionArea, Chip, Stack, CircularProgress } from '@mui/material';
import PushPinIcon from '@mui/icons-material/PushPin';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { supabase } from '../../lib/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import PageHero from '../layout/PageHero';
import LoadingState from '../common/LoadingState';

// Sub-component for Article Card to handle individual state (like tag expansion)
const ArticleCard = ({ article }) => {
    const [tagsExpanded, setTagsExpanded] = useState(false);
    const TAG_LIMIT = 12;
    const displayedTags = tagsExpanded ? article.tags : article.tags?.slice(0, TAG_LIMIT);
    const hasMoreTags = article.tags?.length > TAG_LIMIT;

    return (
        <Card sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            borderRadius: 4,
            overflow: 'hidden',
            // Sticky Style: Simple border as requested (Original style), no gradient background.
            boxShadow: article.is_sticky ? '0 4px 20px rgba(33, 150, 243, 0.15)' : '0 4px 20px rgba(0,0,0,0.05)',
            border: article.is_sticky ? '2px solid' : 'none',
            borderColor: 'primary.main',
            transition: '0.3s',
            '&:hover': { translateY: -5, boxShadow: article.is_sticky ? '0 10px 30px rgba(33, 150, 243, 0.25)' : '0 10px 30px rgba(0,0,0,0.1)' }
        }}>
            <CardActionArea
                component={Link}
                to={`/articles/${article.id}`}
                sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            >
                <CardContent sx={{ width: '100%', p: 4 }}>
                    {article.is_sticky && (
                        <Chip
                            icon={<PushPinIcon sx={{ fontSize: '14px !important', transform: 'rotate(45deg)' }} />}
                            label="置頂文章"
                            size="small"
                            color="primary"
                            sx={{ mb: 2, fontWeight: 'bold' }}
                        />
                    )}

                    <Box sx={{ mb: 2 }} onClick={(e) => {
                        // Stop propagation to prevent card click
                    }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 1 }}>
                            {displayedTags?.map(tag => (
                                <Chip key={tag} label={`#${tag}`} size="small" sx={{
                                    bgcolor: 'primary.50',
                                    color: 'primary.main',
                                    fontWeight: 'bold',
                                    fontSize: '0.75rem',
                                    mb: 0.5 // small gap for wrapped lines
                                }} />
                            ))}
                            {hasMoreTags && !tagsExpanded && (
                                <Chip
                                    label="..."
                                    size="small"
                                    onClick={(e) => {
                                        e.preventDefault(); // Stop Link navigation
                                        e.stopPropagation();
                                        setTagsExpanded(true);
                                    }}
                                    sx={{
                                        cursor: 'pointer',
                                        bgcolor: 'grey.100',
                                        '&:hover': { bgcolor: 'grey.200' }
                                    }}
                                />
                            )}
                        </Stack>
                    </Box>

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
    );
};

export default function BlogList() {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [tagsFilterExpanded, setTagsFilterExpanded] = useState(false);
    const TAG_FILTER_LIMIT = 12;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .order('is_sticky', { ascending: false })
                    .order('date', { ascending: false });

                if (error) throw error;
                if (data) setArticles(data);
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

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

        // Sort by sticky first, then date (Newest first)
        // Note: Articles are already fetched in this order, but filtering preserves order usually.
        // Re-sorting ensures consistency if modification happens.
        return result.sort((a, b) => {
            if (a.is_sticky !== b.is_sticky) {
                // true (1) before false (0) -> descending
                return (b.is_sticky ? 1 : 0) - (a.is_sticky ? 1 : 0);
            }
            return new Date(b.date) - new Date(a.date);
        });
    }, [articles, selectedTags]);


    return (
        <Box sx={{ minHeight: '80vh', bgcolor: 'grey.50' }}>
            <PageHero
                title="精選文章"
                subtitle="分享關於網頁設計、行銷科技與數位轉型的最新觀點。"
                small
            />

            <Container maxWidth="lg" sx={{ py: 8 }}>
                {/* Restore Tag Filter UI */}
                <Stack direction="row" spacing={1} sx={{ mb: 6, flexWrap: 'wrap', gap: 1 }}>
                    {(tagsFilterExpanded ? allTags : allTags.slice(0, TAG_FILTER_LIMIT)).map((tag) => {
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
                                    bgcolor: isSelected ? 'common.black' : '#F3F4F6',
                                    color: isSelected ? 'common.white' : 'text.secondary',
                                    fontWeight: isSelected ? 600 : 500,
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        bgcolor: isSelected ? 'common.black' : '#E5E7EB',
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
                    {!tagsFilterExpanded && allTags.length > TAG_FILTER_LIMIT && (
                        <Chip
                            label="展開更多"
                            icon={<ExpandMoreIcon />}
                            onClick={() => setTagsFilterExpanded(true)}
                            clickable
                            sx={{
                                borderRadius: '50px',
                                fontSize: '0.9rem',
                                height: 'auto',
                                px: 1,
                                py: 0.75,
                                border: '1px dashed',
                                borderColor: 'text.secondary',
                                bgcolor: 'transparent',
                                color: 'text.secondary',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    borderColor: 'primary.main',
                                    color: 'primary.main',
                                    bgcolor: 'primary.50'
                                },
                            }}
                        />
                    )}
                </Stack>

                <Stack spacing={4}>
                    {loading ? (
                        <Box sx={{ width: '100%' }}>
                            <LoadingState />
                        </Box>
                    ) : (
                        <AnimatePresence>
                            {filteredArticles.map((article) => (
                                <Box key={article.id} sx={{ width: '100%' }}>
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ArticleCard article={article} />
                                    </motion.div>
                                </Box>
                            ))}
                        </AnimatePresence>
                    )}
                    {!loading && filteredArticles.length === 0 && (
                        <Typography textAlign="center" color="text.secondary">
                            沒有找到相關文章
                        </Typography>
                    )}
                </Stack>
            </Container>
        </Box>
    );
};
