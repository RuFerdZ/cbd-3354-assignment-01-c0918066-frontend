import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    TextField,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Snackbar,
    Divider
} from '@mui/material';

const GetUser = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // Fetch all users on component mount
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-users`);
                setUsers(response.data.users);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setUserId(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-user/${userId}`);
            setUserInfo(response.data);
            setErrorMessage('');
        } catch (error) {
            setErrorMessage('User not found.');
            setUserInfo(null);
            setSnackbarOpen(true);
        }
    };

    return (
        <Paper style={{ padding: 20, maxWidth: 800, margin: '20px auto' }}>
            <Typography variant="h4" gutterBottom>Get User</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Enter User ID"
                    value={userId}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button variant="contained" color="primary" type="submit">Get User</Button>
            </form>

            {userInfo && (
                <div style={{ marginTop: 20, padding: 10, border: '1px solid #ccc', borderRadius: 5 }}>
                    <Typography variant="h6" gutterBottom>User Info:</Typography>
                    <Typography>ID: {userInfo.id}</Typography>
                    <Typography>Name: {userInfo.name}</Typography>
                    <Typography>Email: {userInfo.email}</Typography>
                    <Typography>Phone: {userInfo.phone_no}</Typography>
                </div>
            )}

            {errorMessage && <Typography color="error">{errorMessage}</Typography>}
            
            <Divider style={{ margin: '20px 0' }} />

            <Typography variant="h6" gutterBottom>All Users:</Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone No</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone_no}</TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={4} align="center">No users found.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={errorMessage}
            />
        </Paper>
    );
};

export default GetUser;
