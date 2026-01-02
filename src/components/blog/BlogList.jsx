import React from 'react';
import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { articles } from '../../data/articles';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import PageHero from '../layout/PageHero';

const BlogList = () => {
    return (
        <Box sx={{ minHeight: '80vh', bgcolor: 'grey.50' }}>
            <PageHero
                title="精選文章"
                subtitle="分享關於網頁設計、行銷科技與數位轉型的最新觀點。"
                small
            />
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={4}>
                    {articles.map((article, index) => (
                        <Grid item xs={12} md={6} key={article.id}>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 4, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', transition: '0.3s', '&:hover': { translateY: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' } }}>
                                    <CardContent sx={{ flexGrow: 1, p: 4 }}>
                                        <Typography variant="caption" color="primary" fontWeight="bold">
                                            {article.date}
                                        </Typography>
                                        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold" sx={{ mt: 1 }}>
                                            {article.title}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                                            {article.description}
                                        </Typography>
                                        <Button component={Link} to={`/articles/${article.id}`} variant="outlined" sx={{ borderRadius: 20 }}>
                                            閱讀更多
                                        </Button>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default BlogList;
