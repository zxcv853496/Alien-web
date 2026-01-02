import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, useMediaQuery, useTheme, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next';

import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorElLang, setAnchorElLang] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleOpenLangMenu = (event) => {
        setAnchorElLang(event.currentTarget);
    };

    const handleCloseLangMenu = (lang) => {
        if (lang) {
            i18n.changeLanguage(lang);
        }
        setAnchorElLang(null);
    };

    const navItems = [
        { label: t('nav.home'), path: '/' },
        { label: t('nav.pricing'), path: '/pricing' },
        { label: t('nav.articles'), path: '/articles' },
        { label: t('nav.contact'), path: '/contact' },
        { label: 'AI Tool', path: '/ai-strategy' },
    ];

    const handleNavigation = (path) => {
        navigate(path);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setMobileOpen(false);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Drawer Header */}
            <Box sx={{
                py: 4,
                background: 'linear-gradient(135deg, #1565c0 0%, #42a5f5 100%)',
                color: 'white'
            }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                    Alien's
                </Typography>
                <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
                    {t('drawer.subtitle')}
                </Typography>
            </Box>

            <List sx={{ flexGrow: 1, pt: 2 }}>
                {navItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    textAlign: 'center',
                                    py: 2,
                                    bgcolor: isActive ? 'primary.light' : 'transparent',
                                    color: isActive ? 'white' : 'inherit',
                                    '&:hover': { bgcolor: isActive ? 'primary.main' : 'rgba(0,0,0,0.04)', color: isActive ? 'white' : 'inherit' },
                                    transition: '0.3s'
                                }}
                            >
                                <ListItemText
                                    primary={item.label}
                                    primaryTypographyProps={{ fontSize: '1.1rem', fontWeight: isActive ? 700 : 500 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    );
                })}
            </List>

            {/* Drawer Footer decoration */}
            <Box sx={{ p: 2, bgcolor: 'grey.100' }}>
                <Typography variant="caption" color="text.secondary">
                    {t('drawer.copyright')}
                </Typography>
            </Box>
        </Box>
    );

    return (
        <AppBar position="sticky" color="default" elevation={0} sx={{ bgcolor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)' }}>
            <Toolbar>
                {/* Mobile Menu Icon */}
                {isMobile && (
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            variant="temporary"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Box>
                )}

                {/* Logo */}
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: { xs: 1, md: 0 }, mr: 2, display: 'flex', fontWeight: 'bold', color: 'primary.main', cursor: 'pointer' }}
                    onClick={() => handleNavigation('/')}
                >
                    {t('nav.title')}
                </Typography>

                {/* Desktop Menu */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', mr: 2 }}>
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Button
                                key={item.label}
                                onClick={() => handleNavigation(item.path)}
                                sx={{
                                    my: 2,
                                    mx: 1, // Increased horizontal margin between buttons
                                    px: 2, // Increased horizontal padding inside buttons
                                    color: isActive ? 'primary.main' : 'text.primary',
                                    display: 'block',
                                    fontWeight: isActive ? 700 : 500,
                                    borderBottom: isActive ? '2px solid' : '2px solid transparent',
                                    borderColor: isActive ? 'primary.main' : 'transparent',
                                    borderRadius: 0,
                                    '&:hover': { color: 'primary.main' }
                                }}
                            >
                                {item.label}
                            </Button>
                        );
                    })}
                </Box>

                {/* Language Switcher */}
                <Box sx={{ flexGrow: 0 }}>
                    <IconButton onClick={handleOpenLangMenu} color="inherit">
                        <TranslateIcon />
                    </IconButton>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElLang}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElLang)}
                        onClose={() => handleCloseLangMenu(null)}
                    >
                        <MenuItem
                            onClick={() => handleCloseLangMenu('zh-TW')}
                            selected={i18n.language === 'zh-TW'}
                            sx={{ '&.Mui-selected': { bgcolor: 'primary.light', color: 'white', '&:hover': { bgcolor: 'primary.main' } } }}
                        >
                            <Typography textAlign="center" fontWeight={i18n.language === 'zh-TW' ? 'bold' : 'normal'}>
                                繁體中文
                            </Typography>
                        </MenuItem>
                        <MenuItem
                            onClick={() => handleCloseLangMenu('en')}
                            selected={i18n.language === 'en'}
                            sx={{ '&.Mui-selected': { bgcolor: 'primary.light', color: 'white', '&:hover': { bgcolor: 'primary.main' } } }}
                        >
                            <Typography textAlign="center" fontWeight={i18n.language === 'en' ? 'bold' : 'normal'}>
                                English
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
