import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Grid, Chip, Stack, IconButton, FormControlLabel, Checkbox } from '@mui/material';
import { supabase } from '../../../lib/supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LoadingState from '../../common/LoadingState';

const ArticleEditor = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const isNew = !id || id === 'new';
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(!isNew);
    const [tagInput, setTagInput] = useState('');

    // Rigid Input Style from rules.md
    const inputStyle = {
        '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            bgcolor: 'white',
            boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
            '& fieldset': { borderColor: '#e0e0e0' },
            '&:hover fieldset': { borderColor: 'primary.main' },
        }
    };

    // Helper component for rigid labels
    const InputLabel = ({ children }) => (
        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1, ml: 1 }}>
            {children}
        </Typography>
    );

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        description: '',
        content: '',
        date: new Date().toISOString().split('T')[0],
        tags: [],
        is_sticky: false
    });

    useEffect(() => {
        const fetchArticle = async () => {
            setFetching(true);
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                if (data) setFormData(data);
            } catch (error) {
                console.error('Error fetching article:', error);
                toast.error('Could not load article');
            } finally {
                setFetching(false);
            }
        };

        if (!isNew) {
            fetchArticle();
        }
    }, [id, isNew]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTagKeyDown = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            e.preventDefault();
            if (!formData.tags.includes(tagInput.trim())) {
                setFormData({
                    ...formData,
                    tags: [...formData.tags, tagInput.trim()]
                });
            }
            setTagInput('');
        }
    };

    const handleDeleteTag = (tagToDelete) => {
        setFormData({
            ...formData,
            tags: formData.tags.filter((tag) => tag !== tagToDelete)
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Auto-generate ID from title if new and ID is empty
        let submitId = formData.id;
        if (isNew && !submitId) {
            submitId = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
        }

        const articleData = {
            ...formData,
            id: submitId,
            updated_at: new Date().toISOString()
        };
        // For new articles, add created_at
        if (isNew) {
            articleData.created_at = new Date().toISOString();
        }

        try {
            const { error } = await supabase
                .from('articles')
                .upsert(articleData);

            if (error) throw error;
            toast.success(t('admin.articles.save_success') || 'Article saved successfully');
            navigate('/admin/articles');
        } catch (error) {
            console.error('Error saving article:', error);
            toast.error('Failed to save article');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <Box sx={{ py: 8 }}>
                <LoadingState message={t('admin.loading') || "Loading article..."} />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: '1000px', mx: 'auto' }}>
            {/* Header / Back */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
                <IconButton onClick={() => navigate('/admin/articles')} size="large">
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" fontWeight="bold" color="primary">
                    {isNew ? t('admin.articles.new') : t('admin.articles.edit')}
                </Typography>
            </Box>

            <Box component="form" onSubmit={handleSubmit}>
                <Stack spacing={4}>
                    {/* 1. Article Title */}
                    <Paper sx={{ p: 4, borderRadius: 3 }}>
                        <InputLabel>{t('admin.articles.title_label')}</InputLabel>
                        <TextField
                            fullWidth
                            placeholder={t('admin.articles.title_label')}
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            sx={inputStyle}
                        />
                    </Paper>

                    {/* 2. Settings (Date, Slug, Tags) */}
                    <Paper sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 3 }}>
                            {t('admin.settings')}
                        </Typography>
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Box>
                                    <InputLabel>{t('admin.articles.publish_date')}</InputLabel>
                                    <TextField
                                        fullWidth
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        sx={inputStyle}
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={formData.is_sticky || false}
                                                onChange={(e) => setFormData({ ...formData, is_sticky: e.target.checked })}
                                                name="is_sticky"
                                                color="primary"
                                            />
                                        }
                                        label={t('admin.articles.is_sticky') || "Pin to Top"}
                                        sx={{ mt: 2, display: 'block' }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box>
                                    <InputLabel>{t('admin.articles.slug_label')}</InputLabel>
                                    <TextField
                                        fullWidth
                                        placeholder={t('admin.articles.slug_placeholder')}
                                        name="id"
                                        value={formData.id}
                                        onChange={handleChange}
                                        disabled={!isNew}
                                        helperText={!isNew ? "ID locked" : t('admin.articles.slug_helper')}
                                        sx={inputStyle}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12}>
                                <Box>
                                    <InputLabel>{t('admin.articles.tags')}</InputLabel>
                                    <TextField
                                        fullWidth
                                        placeholder={t('admin.articles.tags_placeholder')}
                                        value={tagInput}
                                        onChange={(e) => setTagInput(e.target.value)}
                                        onKeyDown={handleTagKeyDown}
                                        sx={inputStyle}
                                    />
                                    <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mt: 2 }}>
                                        {formData.tags.map((tag) => (
                                            <Chip
                                                key={tag}
                                                label={tag}
                                                onDelete={() => handleDeleteTag(tag)}
                                                color="primary"
                                                variant="outlined"
                                                sx={{ borderRadius: '8px' }}
                                            />
                                        ))}
                                    </Stack>
                                </Box>
                            </Grid>
                        </Grid>
                    </Paper>

                    {/* 3. SEO Description */}
                    <Paper sx={{ p: 4, borderRadius: 3 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>SEO</Typography>
                        <InputLabel>{t('admin.articles.desc_label')}</InputLabel>
                        <TextField
                            fullWidth
                            placeholder={t('admin.articles.desc_label')}
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            multiline
                            rows={3}
                            sx={inputStyle}
                        />
                    </Paper>

                    {/* 4. Article Content Area (Full Width Vertical) */}
                    <Paper sx={{ p: 4, borderRadius: 3 }}>
                        <InputLabel>{t('admin.articles.content_label')} (Markdown)</InputLabel>
                        <TextField
                            fullWidth
                            placeholder="# 撰寫文章內容..."
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            multiline
                            minRows={15}
                            sx={{
                                ...inputStyle,
                                mb: 4,
                                '& .MuiInputBase-input': {
                                    fontFamily: 'Consolas, Monaco, "Courier New", monospace',
                                    fontSize: '0.95rem',
                                    lineHeight: 1.7
                                }
                            }}
                        />

                        <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 2, ml: 1, color: 'primary.main' }}>
                            {t('admin.articles.preview')}
                        </Typography>
                        <Box sx={{
                            minHeight: '400px',
                            p: 3,
                            border: '1px solid #e0e0e0',
                            borderRadius: '12px',
                            bgcolor: '#f8fafc',
                            overflowY: 'auto'
                        }}>
                            {formData.content ? (
                                <article className="markdown-body">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                        {formData.content}
                                    </ReactMarkdown>
                                </article>
                            ) : (
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px', opacity: 0.5 }}>
                                    <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
                                        {t('admin.articles.preview_placeholder')}
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Paper>

                    {/* 5. Save Action */}
                    <Box sx={{ pb: 8 }}>
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            size="large"
                            startIcon={<SaveIcon />}
                            disabled={loading}
                            sx={{
                                height: 60,
                                fontWeight: 'bold',
                                fontSize: '1.2rem',
                                borderRadius: '14px',
                                boxShadow: '0 8px 25px rgba(25, 118, 210, 0.2)',
                                transition: '0.3s',
                                '&:hover': {
                                    boxShadow: '0 12px 35px rgba(25, 118, 210, 0.3)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            {loading ? t('admin.articles.saving') : t('admin.articles.save')}
                        </Button>
                    </Box>
                </Stack>
            </Box>
            <style>
                {`
                .markdown-body {
                    line-height: 1.8;
                    color: #334155;
                }
                .markdown-body h1, .markdown-body h2, .markdown-body h3 {
                    margin-top: 24px;
                    margin-bottom: 16px;
                    font-weight: 700;
                    color: #0f172a;
                }
                .markdown-body p { margin-bottom: 16px; }
                .markdown-body ul, .markdown-body ol { margin-bottom: 16px; padding-left: 20px; }
                .markdown-body code {
                    background-color: #f1f5f9;
                    padding: 2px 4px;
                    border-radius: 4px;
                    font-family: monospace;
                }
                `}
            </style>
        </Box>
    );
};

export default ArticleEditor;
