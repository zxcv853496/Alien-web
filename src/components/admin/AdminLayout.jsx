import React, { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, List, Typography, Divider, IconButton, ListItem, ListItemButton, ListItemIcon, ListItemText, Menu, MenuItem, CssBaseline, Avatar, Tooltip, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import TranslateIcon from '@mui/icons-material/Translate';

const drawerWidth = 240;
const collapsedWidth = 65;

// Mixins for drawer transitions
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
    backgroundColor: '#0d47a1', // Deep Admin Blue
    color: '#ffffff',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: collapsedWidth,
    backgroundColor: '#0d47a1', // Deep Admin Blue
    color: '#ffffff',
    [theme.breakpoints.up('sm')]: {
        width: collapsedWidth,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#ffffff',
    color: '#0d47a1', // Use blue for text/icons on white header
    boxShadow: '0 1px 4px 0 rgba(0,0,0,0.1)', // Slightly softer shadow
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

const AdminLayout = () => {
    const { logout, user } = useAuth();
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const theme = useTheme();
    const location = useLocation();
    const [open, setOpen] = useState(true);
    const [anchorEl, setAnchorEl] = useState(null);

    const changeLanguage = () => {
        const newLang = i18n.language === 'en' ? 'zh-TW' : 'en';
        i18n.changeLanguage(newLang);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        handleClose();
        await logout();
        navigate('/login');
    };

    const menuItems = [
        { text: t('admin.dashboard'), icon: <DashboardIcon />, path: '/admin' },
        { text: t('admin.articles'), icon: <ArticleIcon />, path: '/admin/articles' },
        { text: t('admin.products'), icon: <Inventory2Icon />, path: '/admin/transparency' },
        { text: t('admin.messages'), icon: <MessageIcon />, path: '/admin/messages' },
    ];

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        {t('admin.console_title')}
                    </Typography>
                    <div>
                        <Button
                            onClick={handleMenu}
                            color="inherit"
                            endIcon={Boolean(anchorEl) ? <KeyboardArrowUpIcon sx={{ color: '#64748b' }} /> : <KeyboardArrowDownIcon sx={{ color: '#64748b' }} />}
                            sx={{
                                textTransform: 'none',
                                border: '1px solid #e2e8f0',
                                borderRadius: '20px',
                                px: 1.5,
                                py: 0.5,
                                bgcolor: '#fff',
                                color: '#334155',
                                '&:hover': {
                                    backgroundColor: '#f8fafc',
                                    borderColor: '#cbd5e1'
                                }
                            }}
                        >
                            <AccountCircleOutlinedIcon sx={{ mr: 1, color: '#334155' }} />
                            <Typography variant="body2" sx={{ mr: 0.5, fontWeight: 500, color: '#334155' }}>
                                {user?.email || 'Admin'}
                            </Typography>
                        </Button>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            PaperProps={{
                                elevation: 0,
                                sx: {
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0px 4px 12px rgba(0,0,0,0.1))',
                                    mt: 1.5,
                                    borderRadius: 3,
                                    minWidth: 240,
                                    border: '1px solid #f1f5f9',
                                    '& .MuiMenuItem-root': {
                                        px: 2.5,
                                        py: 1.2,
                                        fontSize: '0.925rem',
                                        color: '#334155',
                                        '&:hover': {
                                            backgroundColor: '#f8fafc',
                                        },
                                    },
                                    '& .MuiListItemIcon-root': {
                                        minWidth: 36,
                                        color: '#64748b'
                                    }
                                },
                            }}
                        >
                            <MenuItem onClick={() => { handleClose(); navigate('/'); }}>
                                <ListItemIcon>
                                    <HomeIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText primary={t('admin.home')} />
                            </MenuItem>
                            <MenuItem onClick={changeLanguage}>
                                <ListItemIcon>
                                    <TranslateIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText
                                    primary={i18n.language === 'en' ? '繁體中文' : 'English'}
                                />
                            </MenuItem>
                            <Divider sx={{ my: 1, borderColor: '#f1f5f9' }} />
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <LogoutIcon fontSize="small" sx={{ color: '#64748b' }} />
                                </ListItemIcon>
                                <ListItemText primary={t('admin.logout')} />
                            </MenuItem>
                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader sx={{ justifyContent: 'space-between', pl: 2 }}>
                    <Typography variant="subtitle1" fontWeight="bold" noWrap sx={{ opacity: open ? 1 : 0 }}>
                        Alien Admin
                    </Typography>
                    <IconButton onClick={handleDrawerClose} sx={{ color: 'white' }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.12)' }} />
                <List>
                    {menuItems.map((item) => (
                        <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                selected={location.pathname === item.path}
                                onClick={() => navigate(item.path)}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    '&.Mui-selected': {
                                        bgcolor: 'rgba(255,255,255,0.2)',
                                        borderLeft: '4px solid #fff',
                                        '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' }
                                    },
                                    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: 'inherit'
                                    }}
                                >
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f8fafc', minHeight: '100vh' }}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
};

export default AdminLayout;
