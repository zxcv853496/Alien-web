import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem, useMediaQuery, useTheme, Drawer, List, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next';

const Header = () => {
    const { t, i18n } = useTranslation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorElLang, setAnchorElLang] = useState(null);

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
        { label: t('hero.title'), id: 'hero' },
        { label: t('services.static.title').split(' ')[0], id: 'services' },
        { label: t('why.title'), id: 'why-us' },
        { label: t('cta.title').slice(0, 4), id: 'contact' },
    ];

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setMobileOpen(false); // Close drawer on selection
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Alien's Freelance
            </Typography>
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.id} disablePadding>
                        <ListItemButton onClick={() => scrollToSection(item.id)} sx={{ textAlign: 'center' }}>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
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
