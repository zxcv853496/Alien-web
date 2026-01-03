import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Chip, Avatar } from '@mui/material';
import { supabase } from '../../lib/supabaseClient';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import CloseIcon from '@mui/icons-material/Close';

const Messages = () => {
    const { t } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const { data, error } = await supabase
                .from('messages')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMessages(data || []);
        } catch (error) {
            console.error('Error fetching messages:', error);
            // Don't show toast on load error to avoid spamming if RLS blocks 0 rows
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm(t('admin.delete_confirm'))) return;

        try {
            const { error } = await supabase
                .from('messages')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setMessages(messages.filter((msg) => msg.id !== id));
            toast.success(t('admin.delete_success'));
        } catch (error) {
            console.error('Error deleting message:', error);
            toast.error('Failed to delete message');
        }
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="bold" color="primary" sx={{ mb: 4 }}>
                {t('admin.messages')}
            </Typography>
            <Paper sx={{ p: 3, overflow: 'hidden' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">{t('admin.inbox')}</Typography>
                    <Chip label={`${messages.length} ${t('admin.messages')}`} color="primary" variant="outlined" />
                </Box>
                <TableContainer sx={{ maxHeight: '70vh' }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>{t('admin.date')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>{t('admin.name')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>{t('admin.email')}</TableCell>
                                <TableCell sx={{ fontWeight: 'bold', color: 'text.secondary' }}>{t('admin.message')}</TableCell>
                                <TableCell align="right" sx={{ fontWeight: 'bold', color: 'text.secondary' }}>{t('admin.actions')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">Loading...</TableCell>
                                </TableRow>
                            ) : messages.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">No messages found.</TableCell>
                                </TableRow>
                            ) : (
                                messages.map((msg) => (
                                    <TableRow
                                        key={msg.id}
                                        hover
                                        onClick={() => setSelectedMessage(msg)}
                                        sx={{ cursor: 'pointer', '&:hover': { bgcolor: 'action.hover' } }}
                                    >
                                        <TableCell sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                                            {new Date(msg.created_at).toLocaleDateString()}
                                        </TableCell>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                                                <Avatar sx={{ bgcolor: 'primary.light', width: 32, height: 32, fontSize: '0.875rem' }}>
                                                    {msg.name.charAt(0).toUpperCase()}
                                                </Avatar>
                                                <Typography fontWeight="bold" variant="body2">{msg.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{ color: 'text.secondary' }}>{msg.email}</TableCell>
                                        <TableCell sx={{ maxWidth: 300 }}>
                                            <Typography variant="body2" sx={{
                                                display: '-webkit-box',
                                                overflow: 'hidden',
                                                WebkitBoxOrient: 'vertical',
                                                WebkitLineClamp: 1,
                                                color: 'text.secondary'
                                            }}>
                                                {msg.content}
                                            </Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Tooltip title={t('admin.actions.delete') || "Delete"}>
                                                <IconButton
                                                    color="error"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleDelete(msg.id);
                                                    }}
                                                    size="small"
                                                    sx={{
                                                        bgcolor: 'error.lighter',
                                                        '&:hover': { bgcolor: 'error.light', color: 'white' }
                                                    }}
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* Message Detail Dialog */}
            <Dialog
                open={!!selectedMessage}
                onClose={() => setSelectedMessage(null)}
                maxWidth="sm"
                fullWidth
                PaperProps={{
                    sx: { borderRadius: 3, p: 1 }
                }}
            >
                <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pb: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Avatar sx={{ bgcolor: 'secondary.main' }}><PersonIcon /></Avatar>
                        <Typography variant="h6" fontWeight="bold">
                            {selectedMessage?.name}
                        </Typography>
                    </Box>
                    <IconButton onClick={() => setSelectedMessage(null)} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 3, display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                            {selectedMessage && new Date(selectedMessage.created_at).toLocaleString()}
                        </Typography>
                        <Chip label={selectedMessage?.email} size="small" variant="outlined" sx={{ alignSelf: 'flex-start' }} />
                    </Box>

                    <Paper elevation={0} sx={{
                        p: 3,
                        bgcolor: '#f0f7ff',
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'primary.light'
                    }}>
                        <Typography variant="subtitle2" color="primary.main" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {t('admin.message')}
                        </Typography>
                        <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, color: '#334155' }}>
                            {selectedMessage?.content}
                        </Typography>
                    </Paper>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                        onClick={() => setSelectedMessage(null)}
                        variant="contained"
                        fullWidth
                        sx={{ borderRadius: 2 }}
                    >
                        {t('admin.actions.close') || "Close"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Messages;
