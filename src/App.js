import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Home from './components/Home';
import UploadFile from './components/UploadFile';
import UserManagement from './components/UserManagement';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" sx={{ flexGrow: 1 }}>
                            Microservices App
                        </Typography>
                        <Button color="inherit" component={Link} to="/">Home</Button>
                        <Button color="inherit" component={Link} to="/upload">Upload File</Button>
                        <Button color="inherit" component={Link} to="/user">User Management</Button>
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/upload" element={<UploadFile />} />
                    <Route path="/user" element={<UserManagement />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
