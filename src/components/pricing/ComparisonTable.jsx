import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const ComparisonTable = ({ title, headers, rows }) => {
    return (
        <Box sx={{ mb: 8 }}>
            <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
                {title}
            </Typography>
            <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 4, border: '1px solid #eee', overflow: 'hidden' }}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ bgcolor: 'grey.50' }}>
                            <TableCell sx={{ fontWeight: 'bold', width: '30%' }}>Feature</TableCell>
                            {headers.map((header, index) => (
                                <TableCell key={index} align="center" sx={{ fontWeight: 'bold', width: '35%', color: index === 1 ? 'primary.main' : 'inherit' }}>
                                    {header}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, rowIndex) => (
                            <TableRow key={rowIndex} hover>
                                <TableCell component="th" scope="row" sx={{ fontWeight: 500 }}>
                                    {row.feature}
                                </TableCell>
                                {row.values.map((value, valIndex) => (
                                    <TableCell key={valIndex} align="center">
                                        {value === true ? (
                                            <CheckCircleIcon color="success" fontSize="small" />
                                        ) : value === false ? (
                                            <CancelIcon color="disabled" fontSize="small" />
                                        ) : (
                                            value
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default ComparisonTable;
