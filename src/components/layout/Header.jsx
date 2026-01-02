import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElLang, setAnchorElLang] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
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
        { label: t('hero.title'), id: 'hero' }, // Usually Home
        { label: t('services.static.title').split(' ')[0], id: 'services' }, // Simplification for nav
        { label: t('why.title'), id: 'why-us' },
        { label: t('cta.title').slice(0, 4), id: 'contact' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        handleCloseNavMenu();
    };

    return (
        <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
            <Toolbar>
                {/* Mobile Menu Icon */}
                {isMobile && (
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {navItems.map((item) => (
                                <MenuItem key={item.id} onClick={() => scrollToSection(item.id)}>
                                    <Typography textAlign="center">{item.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                )}

                {/* Logo */}
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: { xs: 1, md: 0 }, mr: 2, display: 'flex', fontWeight: 'bold', color: 'primary.main', cursor: 'pointer' }}
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                    Alien's Freelance
                </Typography>

                {/* Desktop Menu */}
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end', mr: 2 }}>
                    {navItems.map((item) => (
                        <Button
                            key={item.id}
                            onClick={() => scrollToSection(item.id)}
                            sx={{ my: 2, color: 'text.primary', display: 'block' }}
                        >
                            {item.label}
                        </Button>
                    ))}
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
                        <MenuItem onClick={() => handleCloseLangMenu('zh-TW')}>
                            <Typography textAlign="center">繁體中文</Typography>
                        </MenuItem>
                        <MenuItem onClick={() => handleCloseLangMenu('en')}>
                            <Typography textAlign="center">English</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
