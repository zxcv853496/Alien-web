import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Chip, Tooltip, Stack } from '@mui/material';
import { supabase } from '../../../lib/supabaseClient';
import { articles as legacyArticles } from '../../../data/articles'; // Import legacy for seeding
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const ArticleList = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('articles')
                .select('*')
                .order('date', { ascending: false });

            if (error) {
                // If table doesn't exist, this might error. We catch it.
                console.error('Error fetching articles:', error);
            }
            setArticles(data || []);
        } catch (error) {
            console.error('Unexpected error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(t('admin.delete_confirm'))) return;

        try {
            const { error } = await supabase
                .from('articles')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setArticles(articles.filter(a => a.id !== id));
            toast.success(t('admin.delete_success'));
        } catch (error) {
            console.error('Error deleting:', error);
            toast.error('Failed to delete');
        }
    };

    const handleSeed = async () => {
        if (!window.confirm(`This will import ${legacyArticles.length} articles from your legacy file. Continue?`)) return;

        try {
            const formattedData = legacyArticles.map(article => ({
                id: article.id, // Keep old IDs for SEO url compatibility
                title: article.title,
                description: article.description,
                content: article.content,
                tags: article.tags || [],
                date: article.date,
                created_at: new Date().toISOString()
            }));

            const { error } = await supabase
                .from('articles')
                .upsert(formattedData, { onConflict: 'id' });

            if (error) throw error;
            toast.success('Legacy articles imported successfully!');
            fetchArticles();
        } catch (error) {
            console.error('Seed error:', error);
            toast.error('Failed to import articles. Did you run the SQL to create the table?');
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" color="primary">
                    {t('admin.articles.title')}
                </Typography>
                <Stack direction="row" spacing={2}>
                    {articles.length === 0 && (
                        <Button
                            variant="outlined"
                            startIcon={<SaveAltIcon />}
                            onClick={handleSeed}
                        >
                            {t('admin.articles.import')}
                        </Button>
                    )}
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => navigate('/admin/articles/new')}
                    >
                        {t('admin.articles.new')}
                    </Button>
                </Stack>
            </Box>

            <Paper sx={{ p: 3, overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>{t('admin.date')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>{t('admin.name')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Tags</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold' }}>{t('admin.actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">Loading...</TableCell>
                                </TableRow>
                            ) : articles.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No articles found. Import legacy data to get started.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                articles.map((article) => (
                                    <TableRow key={article.id} hover>
                                        <TableCell sx={{ whiteSpace: 'nowrap' }}>{article.date}</TableCell>
                                        <TableCell sx={{ fontWeight: 500 }}>{article.title}</TableCell>
                                        <TableCell>
                                            <Stack direction="row" spacing={0.5}>
                                                {article.tags?.slice(0, 3).map(tag => (
                                                    <Chip key={tag} label={tag} size="small" variant="outlined" />
                                                ))}
                                                {article.tags?.length > 3 && <Chip label={`+${article.tags.length - 3}`} size="small" />}
                                            </Stack>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton color="primary" onClick={() => navigate(`/admin/articles/${article.id}`)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="error" onClick={() => handleDelete(article.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Box>
    );
};

export default ArticleList;
