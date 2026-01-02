import React from 'react';
import { Fab, Tooltip, Zoom } from '@mui/material';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { motion } from 'framer-motion';

const FloatingCTA = () => {
    // Line ID Add Link
    const lineLink = "https://line.me/ti/p/~0978966582";

    return (
        <Zoom in={true} style={{ transitionDelay: '500ms' }}>
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                style={{
                    position: 'fixed',
                    bottom: 24,
                    right: 24,
                    zIndex: 9999
                }}
            >
                <Tooltip title="加 Line 立即諮詢" arrow placement="left">
                    <Fab
                        color="primary"
                        aria-label="chat"
                        href={lineLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            bgcolor: '#06C755', // Line Brand Color
                            color: 'white',
                            width: 64,
                            height: 64,
                            boxShadow: '0 4px 20px rgba(6, 199, 85, 0.4)',
                            '&:hover': {
                                bgcolor: '#05b34c'
                            }
                        }}
                    >
                        <ChatBubbleIcon sx={{ fontSize: 32 }} />
                    </Fab>
                </Tooltip>
            </motion.div>
        </Zoom>
    );
};

export default FloatingCTA;
