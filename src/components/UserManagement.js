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
    Divider,
    Drawer,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid
} from '@mui/material';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState('');
    const [userInfo, setUserInfo] = useState(null);
    const [editUser, setEditUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '', phone_no: '', password: '' });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);

    const fetchUsers = async () => {
        try {
            console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-users`);
            const sortedUsers = response.data.users.sort((a, b) => a.id - b.id);
            setUsers(sortedUsers);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleDeleteOpen = (user) => {
        setUserToDelete(user);
        setDeleteDialogOpen(true);
    };

    const handleDeleteClose = () => {
        setDeleteDialogOpen(false);
        setUserToDelete(null);
    };

    const handleDelete = async () => {
        if (userToDelete) {
            try {
                await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete-user/${userToDelete.id}`);
                setSnackbarMessage('User deleted successfully.');
                setSnackbarOpen(true);
                fetchUsers();
            } catch (error) {
                setSnackbarMessage('Error deleting user.');
                setSnackbarOpen(true);
            }
            handleDeleteClose();
        }
    };

    const handleEditOpen = (user) => {
        setEditUser(user);
        setDrawerOpen(true);
    };

    const handleEditSubmit = async (updatedUser) => {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/update-user/${updatedUser.id}`, updatedUser);
            fetchUsers();
            setDrawerOpen(false);
            setSnackbarMessage('User updated successfully.');
            setSnackbarOpen(true);
        } catch (error) {
            setSnackbarMessage(error.response?.data?.error || 'Error updating user.');
            setSnackbarOpen(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-user/${userId}`);
            setUserInfo(response.data);
            setSnackbarMessage('');
        } catch (error) {
            setSnackbarMessage('User not found.');
            setUserInfo(null);
            setSnackbarOpen(true);
        }
    };

    const handleResetSearch = () => {
        setUserId('');
        setUserInfo(null);
    };

    const handleAddUserOpen = () => {
        setNewUser({ name: '', email: '', phone_no: '', password: '' });
        setEditUser(null);
        setDrawerOpen(true);
    };

    const handleAddUserSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}/add-user`, newUser);
            fetchUsers();
            setSnackbarMessage('User added successfully.');
            setSnackbarOpen(true);
            setDrawerOpen(false);
        } catch (error) {
            setSnackbarMessage('Error adding user.');
            setSnackbarOpen(true);
        }
    };

    return (
        <Paper style={{ padding: 20, maxWidth: 800, margin: '20px auto' }}>
            <Typography variant="h4" gutterBottom>User Management</Typography>

            <Grid container spacing={2} alignItems="center" style={{ marginTop: 16 }}>
                <Grid item xs={12} md={8}>
                    <TextField
                        label="Enter User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        required
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={4} container spacing={2}>
                    <Grid item xs={6}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                            disabled={!userId} // Disable button until userId is entered
                            fullWidth
                        >
                            Search
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant="outlined"
                            color="default"
                            onClick={handleResetSearch}
                            disabled={!userId} // Enable only if there is a search
                            fullWidth
                        >
                            Reset
                        </Button>
                    </Grid>
                </Grid>
            </Grid>

            {userInfo && (
                <div style={{ marginTop: 20, padding: 10, border: '1px solid #ccc', borderRadius: 5 }}>
                    <Typography variant="h6" gutterBottom>User Info:</Typography>
                    <Typography>ID: {userInfo.id}</Typography>
                    <Typography>Name: {userInfo.name}</Typography>
                    <Typography>Email: {userInfo.email}</Typography>
                    <Typography>Phone: {userInfo.phone_no}</Typography>
                </div>
            )}

            <Divider style={{ margin: '20px 0' }} />

            <Grid container justifyContent="space-between" alignItems="center">
                <Typography variant="h6" gutterBottom>All Users:</Typography>
                <Button variant="contained" color="primary" onClick={handleAddUserOpen}>
                    Add User
                </Button>
            </Grid>

            <Box marginTop={2}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone No</TableCell>
                                <TableCell>Actions</TableCell>
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
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="primary"
                                                onClick={() => handleEditOpen(user)}
                                                style={{ marginRight: '10px' }}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => handleDeleteOpen(user)}
                                            >
                                                Delete
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">No users found.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={() => setSnackbarOpen(false)}
                message={snackbarMessage}
            />

            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                <Box padding={2} width={300}>
                    {editUser ? (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            handleEditSubmit(editUser);
                        }}>
                            <Typography variant="h5" gutterBottom>Edit User</Typography>
                            <TextField
                                label="Name"
                                value={editUser.name}
                                onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Email"
                                type="email"
                                value={editUser.email}
                                onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Phone Number"
                                value={editUser.phone_no}
                                onChange={(e) => setEditUser({ ...editUser, phone_no: e.target.value })}
                                fullWidth
                                margin="normal"
                            />
                            <Button type="submit" variant="contained" color="primary">Update User</Button>
                        </form>
                    ) : (
                        <form onSubmit={handleAddUserSubmit}>
                            <Typography variant="h5" gutterBottom>Add User</Typography>
                            <TextField
                                label="Name"
                                value={newUser.name}
                                onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Email"
                                type="email"
                                value={newUser.email}
                                onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Phone Number"
                                value={newUser.phone_no}
                                onChange={(e) => setNewUser({ ...newUser, phone_no: e.target.value })}
                                fullWidth
                                margin="normal"
                                required
                            />
                            <TextField
                                label="Password"
                                type="password"
                                value={newUser.password}
                                onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                                fullWidth
                                margin="normal"
                                required
                                inputProps={{ minLength: 8 }}
                            />
                            <Button type="submit" variant="contained" color="primary">Add User</Button>
                        </form>
                    )}
                </Box>
            </Drawer>

            <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete the user {userToDelete?.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default UserManagement;
