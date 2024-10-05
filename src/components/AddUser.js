import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Typography, Paper, Snackbar } from '@mui/material';

const AddUser = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        phone_no: ''
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-user`, userData);
            setSnackbarMessage(response.data.message);
            setSnackbarOpen(true);
            clearFields();
        } catch (error) {
            const errorMessage = error.response?.data?.error || 'Error adding user.';
            setSnackbarMessage(errorMessage);
            setSnackbarOpen(true);
        }
    };

    const clearFields = () => {
        setUserData({
            name: '',
            email: '',
            password: '',
            phone_no: ''
        });
    };

    const isFormValid = () => {
        return userData.name && userData.email && userData.password && userData.phone_no;
    };

    return (
        <Paper style={{ padding: 20, maxWidth: 600, margin: '20px auto' }}>
            <Typography variant="h4" gutterBottom>Add User</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Name"
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    name="password"
                    type="password"
                    value={userData.password}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Phone Number"
                    name="phone_no"
                    value={userData.phone_no}
                    onChange={handleChange}
                    required
                    fullWidth
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={!isFormValid()}
                >
                    Add User
                </Button>
            </form>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />
        </Paper>
    );
};

export default AddUser;
