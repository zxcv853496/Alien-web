import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { articles } from '../../data/articles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const BlogPost = () => {
    const { id } = useParams();
    const article = articles.find(a => a.id === id);

    if (!article) {
        return (
            <Container sx={{ py: 10, textAlign: 'center' }}>
                <Typography variant="h4">文章未找到</Typography>
                <Button component={Link} to="/articles" sx={{ mt: 2 }} variant="contained">
                    返回列表
                </Button>
            </Container>
        );
    }

    return (
        <>
            <Helmet>
                <title>{article.title} - Alien Web Design</title>
                <meta name="description" content={article.description} />
            </Helmet>

            <Box sx={{ py: 12, minHeight: '100vh', bgcolor: 'background.paper' }}>
                <Container maxWidth="md">
                    <Button
                        component={Link}
                        to="/articles"
                        startIcon={<ArrowBackIcon />}
                        sx={{ mb: 4 }}
                    >
                        返回文章列表
                    </Button>

                    <Typography variant="caption" display="block" color="text.secondary" gutterBottom>
                        {article.date}
                    </Typography>

                    <Typography variant="h3" component="h1" fontWeight="800" gutterBottom sx={{ mb: 4 }}>
                        {article.title}
                    </Typography>

                    <Paper elevation={0} sx={{ p: 0, bgcolor: 'transparent' }}>
                        <Typography
                            variant="body1"
                            sx={{
                                whiteSpace: 'pre-wrap',
                                lineHeight: 1.8,
                                fontSize: '1.1rem',
                                color: 'text.primary'
                            }}
                        >
                            {article.content}
                        </Typography>
                    </Paper>

                    <Box sx={{ mt: 8, pt: 4, borderTop: '1px solid #eee' }}>
                        <Typography variant="h6" gutterBottom>
                            需要專業的網站服務？
                        </Typography>
                        <Button component={Link} to="/#contact" variant="contained" size="large" sx={{ borderRadius: 50, px: 4 }}>
                            立即連繫我們
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default BlogPost;
