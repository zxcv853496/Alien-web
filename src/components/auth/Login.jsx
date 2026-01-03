import React, { useState } from 'react';
import { Box, Paper, TextField, Button, Typography, Container, CircularProgress } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import LockIcon from '@mui/icons-material/Lock';

const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation();

    const from = location.state?.from?.pathname || '/admin';

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await login(email, password);
            if (error) throw error;

            toast.success('Welcome back, Admin!');
            navigate(from, { replace: true });
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Failed to login');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)',
            }}
        >
            <Container maxWidth="xs">
                <Paper
                    elevation={10}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        borderRadius: 4,
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)'
                    }}
                >
                    <Box
                        sx={{
                            width: 50,
                            height: 50,
                            bgcolor: 'primary.main',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2,
                            boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)'
                        }}
                    >
                        <LockIcon sx={{ color: 'white' }} />
                    </Box>
                    <Typography component="h1" variant="h5" fontWeight="bold" gutterBottom color="primary">
                        Admin Login
                    </Typography>
                    <Box component="form" onSubmit={handleLogin} sx={{ mt: 1, width: '100%' }}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, ml: 1, fontWeight: 'bold' }}>
                                Email Address
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                placeholder="Enter your email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        bgcolor: 'white',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                        '& fieldset': { borderColor: '#e0e0e0' },
                                        '&:hover fieldset': { borderColor: 'primary.main' },
                                    }
                                }}
                            />
                        </Box>
                        <Box sx={{ mb: 4 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, ml: 1, fontWeight: 'bold' }}>
                                Password
                            </Typography>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                placeholder="Enter your password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        borderRadius: '12px',
                                        bgcolor: 'white',
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                                        '& fieldset': { borderColor: '#e0e0e0' },
                                        '&:hover fieldset': { borderColor: 'primary.main' },
                                    }
                                }}
                            />
                        </Box>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            disabled={loading}
                            sx={{
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                borderRadius: 2,
                                boxShadow: '0 4px 10px rgba(33, 150, 243, 0.3)'
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default Login;
