import React, { useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Switch,
    FormControlLabel,
    TextField,
    Button,
    Grid,
    IconButton,
    Stack,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Card,
    CardContent,
    CardActionArea,
    Chip,
    Divider,
    ToggleButton,
    ToggleButtonGroup
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { styled } from '@mui/material/styles';
import { toast } from 'react-hot-toast';

// --- Custom Styled Switch (iOS Style) ---
const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: theme.palette.primary.main,
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color: theme.palette.grey[100],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));

// --- Custom Styled Input Component ---
const CustomInput = ({ label, ...props }) => (
    <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1, ml: 1, fontWeight: 'bold', color: 'text.secondary' }}>
            {label}
        </Typography>
        <TextField
            fullWidth
            variant="outlined"
            {...props}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    bgcolor: 'white',
                    boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                    '& fieldset': { borderColor: '#e0e0e0' },
                    '&:hover fieldset': { borderColor: 'primary.main' },
                    '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                    ...props.sx
                }
            }}
        />
    </Box>
);

// --- Sub-Component: Plan Editor ---
const PlanEditor = ({ plan, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        ...plan,
        recommendationLevel: plan.recommendationLevel ?? (plan.isRecommended ? 1 : 0) // Migration handling
    });
    const [newFeature, setNewFeature] = useState('');

    const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

    const handleAddFeature = () => {
        if (!newFeature.trim()) return;
        const newItem = { id: Date.now(), text: newFeature.trim() };
        setFormData(prev => ({ ...prev, features: [...prev.features, newItem] }));
        setNewFeature('');
    };

    const handleRemoveFeature = (id) => {
        setFormData(prev => ({ ...prev, features: prev.features.filter(f => f.id !== id) }));
    };

    const handleRecommendationChange = (event, newLevel) => {
        if (newLevel !== null) {
            setFormData(prev => ({ ...prev, recommendationLevel: newLevel }));
        }
    };

    return (
        <Box sx={{ maxWidth: 1000, mx: 'auto' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 2 }}>
                <IconButton onClick={onCancel} size="small" sx={{ border: '1px solid #eee' }}>
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" fontWeight="bold" color="primary.main">
                    {plan.id ? '編輯產品內容' : '新增產品'}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    variant="contained"
                    startIcon={<SaveIcon />}
                    onClick={() => onSave(formData)}
                    sx={{ borderRadius: 2, px: 3 }}
                >
                    儲存產品
                </Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4, borderRadius: 4, height: '100%', bgcolor: '#FAFAFA' }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                            基本資訊
                        </Typography>
                        <Stack spacing={1}>
                            <CustomInput
                                label="所屬系列 (Series)"
                                select
                                SelectProps={{ native: true }}
                                value={formData.series}
                                onChange={(e) => handleChange('series', e.target.value)}
                            >
                                <option value="Series A: Quick Launch">Series A: Quick Launch</option>
                                <option value="Series B: Corporate Brand">Series B: Corporate Brand</option>
                            </CustomInput>

                            <CustomInput
                                label="產品名稱"
                                placeholder="例如：Basic Landing Page"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                            />

                            <Stack direction="row" spacing={2}>
                                <Box sx={{ width: '50%' }}>
                                    <CustomInput
                                        label="特價 (顯示金額)"
                                        placeholder="例如：35,000"
                                        value={formData.price}
                                        onChange={(e) => handleChange('price', e.target.value)}
                                        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                                    />
                                </Box>
                                <Box sx={{ width: '50%' }}>
                                    <CustomInput
                                        label="原價 (劃掉金額)"
                                        placeholder="例如：50,000"
                                        value={formData.originalPrice}
                                        onChange={(e) => handleChange('originalPrice', e.target.value)}
                                        InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                                    />
                                </Box>
                            </Stack>

                            <CustomInput
                                label="產品簡介"
                                placeholder="請輸入簡短的描述..."
                                multiline
                                rows={3}
                                value={formData.description}
                                onChange={(e) => handleChange('description', e.target.value)}
                            />

                            <Box sx={{ p: 3, bgcolor: 'white', borderRadius: 3, border: '1px solid #f0f0f0' }}>
                                <Typography variant="subtitle2" component="div" sx={{ mb: 2, fontWeight: 'bold', color: 'text.secondary' }}>
                                    標籤與推薦設定
                                </Typography>
                                <Stack spacing={3}>
                                    <FormControlLabel
                                        control={<IOSSwitch checked={formData.isSpecial} onChange={(e) => handleChange('isSpecial', e.target.checked)} />}
                                        label={
                                            <Typography variant="body2" fontWeight="bold">
                                                顯示「特價中」標記 (Special Offer)
                                            </Typography>
                                        }
                                        sx={{ ml: 0, width: '100%', justifyContent: 'space-between', flexDirection: 'row-reverse' }}
                                    />
                                    <Divider />

                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body2" fontWeight="bold">
                                            推薦程度 (Recommendation Level)
                                        </Typography>
                                        <ToggleButtonGroup
                                            value={formData.recommendationLevel}
                                            exclusive
                                            onChange={handleRecommendationChange}
                                            size="small"
                                            sx={{
                                                '& .MuiToggleButton-root': {
                                                    borderRadius: '8px !important',
                                                    px: 2,
                                                    border: '1px solid #eee',
                                                    mx: 0.5,
                                                    minWidth: 48
                                                },
                                                '& .Mui-selected': {
                                                    bgcolor: '#2196F3 !important',
                                                    color: 'white !important',
                                                    '&:hover': { bgcolor: '#1976D2 !important' }
                                                }
                                            }}
                                        >
                                            <ToggleButton value={0}>無</ToggleButton>
                                            <ToggleButton value={1}>
                                                <StarIcon fontSize="small" />
                                            </ToggleButton>
                                            <ToggleButton value={2}>
                                                <StarIcon fontSize="small" sx={{ mr: -0.5 }} />
                                                <StarIcon fontSize="small" />
                                            </ToggleButton>
                                        </ToggleButtonGroup>
                                    </Box>
                                </Stack>
                            </Box>
                        </Stack>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 4, borderRadius: 4, height: '100%', bgcolor: '#FAFAFA' }}>
                        <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ mb: 3 }}>
                            產品特色 (Features)
                        </Typography>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="subtitle2" sx={{ mb: 1, ml: 1, fontWeight: 'bold', color: 'text.secondary' }}>
                                新增特色項目
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                <TextField
                                    fullWidth
                                    size="medium"
                                    placeholder="輸入特色內容..."
                                    value={newFeature}
                                    variant="outlined"
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '12px',
                                            bgcolor: 'white',
                                            '& fieldset': { borderColor: '#e0e0e0' },
                                            '&:hover fieldset': { borderColor: 'primary.main' },
                                            '&.Mui-focused fieldset': { borderColor: 'primary.main' },
                                        }
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleAddFeature}
                                    sx={{ minWidth: 60, borderRadius: '12px', boxShadow: 'none' }}
                                >
                                    <AddIcon />
                                </Button>
                            </Box>
                        </Box>

                        <List sx={{ bgcolor: 'white', borderRadius: 3, maxHeight: 400, overflow: 'auto', border: '1px solid #eee' }}>
                            {formData.features.map((item, index) => (
                                <ListItem
                                    key={item.id}
                                    secondaryAction={
                                        <IconButton edge="end" onClick={() => handleRemoveFeature(item.id)}>
                                            <DeleteIcon fontSize="small" />
                                        </IconButton>
                                    }
                                    sx={{ borderBottom: '1px solid #f0f0f0' }}
                                >
                                    <ListItemIcon sx={{ minWidth: 36 }}>
                                        <CheckCircleIcon color="success" fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

// --- Main Component: Product List Manager ---
const TransparencySettings = () => {
    // Mock Data with Recommendation Levels (Synced with Frontend i18n)
    const [plans, setPlans] = useState([
        {
            id: 1,
            series: 'Series A: Quick Launch',
            name: 'AI 銷售導購版 (AI Sales Landing)',
            price: '12,000',
            originalPrice: '15,000',
            isSpecial: true,
            recommendationLevel: 1, // Popular
            description: '為了「成交」而生的頁面。一頁式網站設計，專注於產品引流與高轉換率。',
            features: [
                { id: 1, text: '一頁式網站 (One-Page)' },
                { id: 2, text: '整合社群連結 (Social Media)' },
                { id: 3, text: '3天極速上線 (Rapid Launch)' },
                { id: 4, text: 'RWD 手機完美適配' }
            ]
        },
        {
            id: 2,
            series: 'Series B: Corporate Brand',
            name: '極致靜態版 (Static Elite)',
            price: '32,000',
            originalPrice: '40,000',
            isSpecial: true,
            recommendationLevel: 2, // Premium
            description: '頂級的形象與速度。企業官網的最佳選擇，無後台設計確保最高資安等級。',
            features: [
                { id: 1, text: '5-8 頁完整形象官網' },
                { id: 2, text: '無後台架構 (駭客無法入侵)' },
                { id: 3, text: '秒開級載入速度 (Ultra Fast)' },
                { id: 4, text: '每年贈送 2 次文字微調' }
            ]
        },
        {
            id: 3,
            series: 'Series B: Corporate Brand',
            name: '動態管理版 (Dynamic CMS)',
            price: '68,000', // Update to 68,000 to match i18n
            originalPrice: '',
            isSpecial: false,
            recommendationLevel: 0,
            description: '隨時掌握品牌話語權，自主更新。適合需要經營部落格或最新消息的品牌。',
            features: [
                { id: 1, text: 'Smart AI 後台管理系統' },
                { id: 2, text: '部落格 / 最新消息功能' },
                { id: 3, text: '可自訂 SEO 標籤' },
                { id: 4, text: '可擴充系統架構' }
            ]
        }
    ]);

    const [view, setView] = useState('list'); // 'list' | 'edit'
    const [editingPlan, setEditingPlan] = useState(null);

    const handleEdit = (plan) => {
        setEditingPlan(plan);
        setView('edit');
    };

    const handleCreate = () => {
        setEditingPlan({
            id: null,
            series: 'Series A: Quick Launch', // Default
            name: '',
            price: '',
            originalPrice: '',
            isSpecial: false,
            recommendationLevel: 0,
            description: '',
            features: []
        });
        setView('edit');
    };

    const handleSavePlan = (updatedPlan) => {
        const loadingToast = toast.loading('Saving...');
        setTimeout(() => {
            if (updatedPlan.id) {
                // Update existing
                setPlans(prev => prev.map(p => p.id === updatedPlan.id ? updatedPlan : p));
            } else {
                // Create new
                const newPlan = { ...updatedPlan, id: Date.now() };
                setPlans(prev => [...prev, newPlan]);
            }
            toast.dismiss(loadingToast);
            toast.success('儲存成功！');
            setView('list');
        }, 600);
    };

    // Grouping Logic
    const seriesGroups = ['Series A: Quick Launch', 'Series B: Corporate Brand'];

    if (view === 'edit') {
        return <PlanEditor plan={editingPlan} onSave={handleSavePlan} onCancel={() => setView('list')} />;
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" fontWeight="bold" color="primary.main">
                    產品管理 (Product Inventory)
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                    sx={{ borderRadius: 2, px: 3, py: 1 }}
                >
                    新增產品
                </Button>
            </Box>

            <Stack spacing={6}>
                {seriesGroups.map(seriesName => {
                    const groupPlans = plans.filter(p => p.series === seriesName);

                    return (
                        <Box key={seriesName}>
                            <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 2 }}>
                                <Chip label={seriesName} color="primary" sx={{ fontWeight: 'bold' }} />
                                <Divider sx={{ flexGrow: 1 }} />
                            </Stack>

                            {groupPlans.length === 0 ? (
                                <Typography color="text.secondary" sx={{ py: 2 }}>此系列尚無產品</Typography>
                            ) : (
                                <Grid container spacing={3}>
                                    {groupPlans.map(plan => {
                                        const isPopular = plan.recommendationLevel === 1;
                                        const isPremium = plan.recommendationLevel === 2;
                                        const isRecommended = isPopular || isPremium;

                                        return (
                                            <Grid item xs={12} md={4} key={plan.id}>
                                                <Card sx={{
                                                    height: '100%',
                                                    borderRadius: 4,
                                                    transition: '0.3s',
                                                    position: 'relative',
                                                    // Default Border
                                                    border: '1px solid #eee',
                                                    // Popular Styles
                                                    ...(isPopular && {
                                                        border: '2px solid #2196F3',
                                                        boxShadow: '0 8px 40px rgba(33, 150, 243, 0.15)',
                                                    }),
                                                    // Premium Styles (Gradient)
                                                    ...(isPremium && {
                                                        border: '3px solid transparent',
                                                        background: 'linear-gradient(#fff, #fff) padding-box, linear-gradient(135deg, #00C6FF 0%, #0072FF 100%) border-box',
                                                        boxShadow: '0 12px 50px rgba(0, 198, 255, 0.2)',
                                                    }),
                                                    '&:hover': {
                                                        boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
                                                    }
                                                }}>
                                                    <CardActionArea onClick={() => handleEdit(plan)} sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                                        <CardContent sx={{ flexGrow: 1 }}>
                                                            <Stack direction="row" justifyContent="space-between" alignItems="start" sx={{ mb: 2 }}>
                                                                {isRecommended ? (
                                                                    <Chip
                                                                        icon={
                                                                            <Box sx={{ display: 'flex', mr: -0.5 }}>
                                                                                <StarIcon sx={{ fontSize: 16, color: 'white !important' }} />
                                                                                {isPremium && <StarIcon sx={{ fontSize: 16, color: 'white !important', ml: -0.5 }} />}
                                                                            </Box>
                                                                        }
                                                                        label="RECOMMENDED"
                                                                        sx={{
                                                                            fontWeight: 'bold',
                                                                            color: 'white',
                                                                            bgcolor: isPremium ? 'transparent' : '#2196F3',
                                                                            background: isPremium ? 'linear-gradient(135deg, #00C6FF 0%, #0072FF 100%)' : undefined
                                                                        }}
                                                                        size="small"
                                                                    />
                                                                ) : <Box />}

                                                                {plan.isSpecial && <Chip label="Special Offer" color="error" size="small" variant="outlined" />}
                                                            </Stack>

                                                            <Typography variant="h6" fontWeight="bold" gutterBottom color={isRecommended ? 'primary.main' : 'text.primary'}>
                                                                {plan.name}
                                                            </Typography>
                                                            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
                                                                {plan.description}
                                                            </Typography>

                                                            <Stack direction="row" alignItems="baseline" spacing={1}>
                                                                <Typography variant="h4" fontWeight="bold" color="primary.main">
                                                                    ${Number(plan.price.replace(/,/g, '')).toLocaleString()}
                                                                </Typography>
                                                                {plan.originalPrice && (
                                                                    <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                                                                        ${plan.originalPrice}
                                                                    </Typography>
                                                                )}
                                                            </Stack>
                                                        </CardContent>

                                                        <Box sx={{ p: 2, bgcolor: isPremium ? 'rgba(0, 198, 255, 0.05)' : 'grey.50', borderTop: '1px solid #eee' }}>
                                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                                <Typography variant="caption" color="text.secondary">
                                                                    {plan.features.length} features
                                                                </Typography>
                                                                <EditIcon fontSize="small" color="action" />
                                                            </Stack>
                                                        </Box>
                                                    </CardActionArea>
                                                </Card>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            )}
                        </Box>
                    );
                })}
            </Stack>
        </Box>
    );
};

export default TransparencySettings;
