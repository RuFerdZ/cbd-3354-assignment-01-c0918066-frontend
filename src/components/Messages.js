import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Snackbar,
} from '@mui/material';

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [totalMessages, setTotalMessages] = useState(0);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const fetchMessages = async (pageNum = 1) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-messages`, {
                params: {
                    page: pageNum,
                    per_page: rowsPerPage,
                },
            });
            setMessages(response.data.messages);
            setTotalMessages(response.data.total);
        } catch (error) {
            setSnackbarMessage('Error fetching messages.');
            setSnackbarOpen(true);
        }
    };

    useEffect(() => {
        fetchMessages(page + 1); // page + 1 for the API (1-based index)
    }, [page, rowsPerPage]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Reset to first page
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    return (
        <Paper style={{ padding: 20, maxWidth: 800, margin: '20px auto' }}>
            <Typography variant="h4" gutterBottom>Messages</Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Message</TableCell>
                            <TableCell>Timestamp</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {messages.map((message) => (
                            <TableRow key={message.id}>
                                <TableCell>{message.id}</TableCell>
                                <TableCell>{message.message}</TableCell>
                                <TableCell>{new Date(message.timestamp).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={totalMessages}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
            />
        </Paper>
    );
};

export default Messages;
