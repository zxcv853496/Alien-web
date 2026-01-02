
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { useMediaQuery, useTheme } from '@mui/material';

const CustomCursor = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const [isHovered, setIsHovered] = useState(false);

    // Mouse coordinates
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation
    const springConfig = { damping: 25, stiffness: 300 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);

    useEffect(() => {
        if (isMobile) return;

        const moveCursor = (e) => {
            mouseX.set(e.clientX - 16); // Center cursor (32px / 2)
            mouseY.set(e.clientY - 16);
        };

        const handleMouseEnter = () => setIsHovered(true);
        const handleMouseLeave = () => setIsHovered(false);

        // Track interactive elements
        const clickableElements = document.querySelectorAll('a, button, .MuiButtonBase-root, input, textarea, select, [role="button"]');

        clickableElements.forEach(el => {
            el.addEventListener('mouseenter', handleMouseEnter);
            el.addEventListener('mouseleave', handleMouseLeave);
        });

        window.addEventListener('mousemove', moveCursor);

        // Style injection to hide default cursor
        const style = document.createElement('style');
        style.innerHTML = `
            * { cursor: none !important; }
        `;
        document.head.appendChild(style);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            clickableElements.forEach(el => {
                el.removeEventListener('mouseenter', handleMouseEnter);
                el.removeEventListener('mouseleave', handleMouseLeave);
            });
            document.head.removeChild(style);
        };
    }, [isMobile, mouseX, mouseY]); // Re-run if dependencies change

    if (isMobile) return null;

    return (
        <motion.div
            style={{
                translateX: cursorX,
                translateY: cursorY,
                position: 'fixed',
                top: 0,
                left: 0,
                pointerEvents: 'none',
                zIndex: 99999,
            }}
        >
            <motion.div
                animate={{
                    scale: isHovered ? 1.5 : 1,
                    opacity: isHovered ? 0.8 : 1,
                    backgroundColor: isHovered ? 'rgba(33, 150, 243, 0.3)' : 'transparent',
                    borderColor: isHovered ? 'rgba(33, 150, 243, 0.8)' : '#2196F3',
                }}
                style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '2px solid #2196F3',
                    // Center dot
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovered ? 0 : 1
                    }}
                    style={{
                        width: 4,
                        height: 4,
                        backgroundColor: '#2196F3',
                        borderRadius: '50%'
                    }}
                />
            </motion.div>
        </motion.div>
    );
};

export default CustomCursor;
