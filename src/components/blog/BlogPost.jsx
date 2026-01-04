import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper, Divider, CircularProgress } from '@mui/material';
import { Helmet } from 'react-helmet-async';

import { supabase } from '../../lib/supabaseClient';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PageHero from '../layout/PageHero';
import ReactMarkdown from 'react-markdown';
import { motion, useScroll, useSpring } from 'framer-motion';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const BlogPost = () => {
    const { id } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                const { data, error } = await supabase
                    .from('articles')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;

                if (data) {
                    setArticle(data);
                }
            } catch (err) {
                console.error("DB Fetch error", err);
                setArticle(null);
            } finally {
                setLoading(false);
            }
        };

        fetchArticle();
    }, [id]);



    if (loading) {
        return (
            <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

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

    // Custom Markdown Components
    const MarkdownComponents = {
        h2: ({ node, ...props }) => (
            <Typography
                variant="h4"
                component="h2"
                gutterBottom
                sx={{
                    mt: 6,
                    mb: 3,
                    fontWeight: 800,
                    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline-block'
                }}
                {...props}
            />
        ),
        h3: ({ node, ...props }) => (
            <Typography
                variant="h5"
                component="h3"
                gutterBottom
                sx={{ mt: 4, mb: 2, fontWeight: 700, color: 'text.primary', borderLeft: '4px solid #2196F3', pl: 2 }}
                {...props}
            />
        ),
        p: ({ node, ...props }) => (
            <Typography
                variant="body1"
                paragraph
                sx={{ lineHeight: 1.8, fontSize: '1.1rem', color: 'text.secondary', mb: 2 }}
                {...props}
            />
        ),
        strong: ({ node, ...props }) => (
            <Box component="span" sx={{ fontWeight: 'bold', color: 'primary.main', bgcolor: 'rgba(33, 150, 243, 0.1)', px: 0.5, borderRadius: 1 }}>
                {props.children}
            </Box>
        ),
        blockquote: ({ node, ...props }) => (
            <Paper
                elevation={0}
                sx={{
                    my: 4,
                    p: 3,
                    bgcolor: 'rgba(33, 150, 243, 0.05)',
                    border: '1px solid rgba(33, 150, 243, 0.2)',
                    borderRadius: 4,
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ position: 'absolute', top: -10, left: -10, opacity: 0.1 }}>
                    <AutoAwesomeIcon sx={{ fontSize: 100, color: 'primary.main' }} />
                </Box>
                <Typography variant="subtitle1" component="div" sx={{ position: 'relative', zIndex: 1, fontStyle: 'italic', fontWeight: 500 }}>
                    <Box component="span" sx={{ mr: 1, verticalAlign: 'middle' }}><AutoAwesomeIcon fontSize="small" color="primary" /></Box>
                    AI 重點摘要：
                </Typography>
                <Box sx={{ mt: 1, position: 'relative', zIndex: 1, color: 'text.primary' }}>
                    {props.children}
                </Box>
            </Paper>
        ),
        li: ({ node, ...props }) => (
            <Box component="li" sx={{ mb: 1 }}>
                <Typography variant="body1" component="span" sx={{ lineHeight: 1.8, fontSize: '1.1rem', color: 'text.secondary' }}>
                    {props.children}
                </Typography>
            </Box>
        )
    };

    return (
        <>
            <Helmet>
                <title>{article.title} - Alien Web Design</title>
                <meta name="description" content={article.description} />
            </Helmet>

            {/* Reading Progress Bar */}
            <motion.div
                style={{
                    scaleX,
                    position: "fixed",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "5px",
                    background: "linear-gradient(90deg, #2196F3, #21CBF3)",
                    transformOrigin: "0%",
                    zIndex: 9999
                }}
            />

            <PageHero
                title={article.title}
                subtitle={article.description}
                small
            />

            <Box sx={{ py: 8, minHeight: '100vh', bgcolor: 'background.paper' }}>
                <Container maxWidth="md">
                    <Button
                        component={Link}
                        to="/articles"
                        startIcon={<ArrowBackIcon />}
                        sx={{ mb: 4 }}
                    >
                        返回文章列表
                    </Button>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="caption" color="text.secondary">
                            發布日期：{article.date}
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {article.tags?.map(tag => (
                                <Typography key={tag} variant="caption" sx={{ bgcolor: 'secondary.main', color: 'white', px: 1, py: 0.5, borderRadius: 1 }}>
                                    {tag}
                                </Typography>
                            ))}
                        </Box>
                    </Box>

                    <Divider sx={{ mb: 6 }} />

                    <Box sx={{ minHeight: '50vh' }}>
                        <ReactMarkdown components={MarkdownComponents}>
                            {article.content}
                        </ReactMarkdown>
                    </Box>

                    <Box sx={{ mt: 8, pt: 8, borderTop: '1px solid #eee', textAlign: 'center' }}>
                        <Typography variant="h5" gutterBottom fontWeight="bold">
                            喜歡這篇文章嗎？
                        </Typography>
                        <Typography color="text.secondary" sx={{ mb: 4 }}>
                            如果您有任何網頁設計或 SEO 的需求，歡迎隨時與我們聯繫。
                        </Typography>
                        <Button component={Link} to="/contact" variant="contained" size="large" sx={{ borderRadius: 50, px: 6, py: 1.5 }}>
                            立即諮詢專案
                        </Button>
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default BlogPost;
