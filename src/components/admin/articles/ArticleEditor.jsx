import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, TextField, Button, Grid, Chip, Stack } from '@mui/material';
import { supabase } from '../../../lib/supabaseClient';
import { useNavigate, useParams } from 'react-router-dom';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ArticleEditor = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const isNew = !id || id === 'new';
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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
        tags: []
    });

    useEffect(() => {
        if (!isNew) {
            fetchArticle();
        }
    }, [id]);

    const fetchArticle = async () => {
        setLoading(true);
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
            setLoading(false);
        }
    };

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
            toast.error('Failed to save article. ID might be duplicate.');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !isNew) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
                <Typography>Loading...</Typography>
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: '1000px', mx: 'auto' }}>
            {/* Header / Back */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/admin/articles')} sx={{ mr: 2 }}>
                    {t('admin.actions.back') || 'Back'}
                </Button>
                <Typography variant="h5" fontWeight="bold" color="text.primary">
                    {isNew ? t('admin.articles.new') : t('admin.articles.edit')}
                </Typography>
            </Box>

            <Stack spacing={3}>
                {/* 1. Article Title */}
                <Paper sx={{ p: 3 }}>
                    <Box>
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
                    </Box>
                </Paper>

                {/* 2. Settings (Date, Slug, Tags) */}
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                        {t('admin.settings')}
                    </Typography>
                    <Grid container spacing={3}>
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
                                <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ mt: 1 }}>
                                    {formData.tags.map((tag) => (
                                        <Chip
                                            key={tag}
                                            label={tag}
                                            onDelete={() => handleDeleteTag(tag)}
                                            color="primary"
                                            size="small"
                                            variant="outlined"
                                        />
                                    ))}
                                </Stack>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                {/* 3. SEO */}
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>SEO</Typography>
                    <Box>
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
                    </Box>
                </Paper>

                {/* 4. Content & Preview */}
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ mb: 2 }}>
                        {t('admin.articles.content_label')}
                    </Typography>
                    <Grid container spacing={3}>
                        {/* Editor */}
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                placeholder="# Start writing your article..."
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                multiline
                                minRows={20}
                                sx={{
                                    ...inputStyle,
                                    fontFamily: 'monospace',
                                    '& .MuiInputBase-input': { fontFamily: 'monospace', fontSize: '0.9rem', lineHeight: 1.6 },
                                    height: '100%',
                                    '& .MuiOutlinedInput-root': { height: '100%', alignItems: 'flex-start' }
                                }}
                            />
                        </Grid>
                        {/* Preview */}
                        <Grid item xs={12}>
                            <Box sx={{
                                height: '100%',
                                minHeight: '500px',
                                p: 2,
                                border: '1px solid #e0e0e0',
                                borderRadius: '12px',
                                bgcolor: '#fafafa',
                                overflowY: 'auto',
                                fontFamily: 'sans-serif'
                            }}>
                                {formData.content ? (
                                    <article className="prose prose-sm max-w-none">
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                            {formData.content}
                                        </ReactMarkdown>
                                    </article>
                                ) : (
                                    <Typography color="text.secondary" sx={{ fontStyle: 'italic', mt: 2, textAlign: 'center' }}>
                                        Preview area
                                    </Typography>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>

                {/* 5. Save Action */}
                <Box sx={{ pb: 5 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        size="large"
                        startIcon={<SaveIcon />}
                        disabled={loading}
                        sx={{
                            height: 56,
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            borderRadius: '12px',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                    >
                        {loading ? t('admin.articles.saving') : t('admin.articles.save')}
                    </Button>
                </Box>
            </Stack>
        </Box>
    );
};

export default ArticleEditor;
