import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import Home from './components/Home';
import UploadFile from './components/UploadFile';
import UserManagement from './components/UserManagement';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const Logo = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ marginRight: '8px' }}
    >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="2" x2="12" y2="22" />
        <line x1="2" y1="12" x2="22" y2="12" />
    </svg>
);

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <AppBar position="static">
                    <Toolbar>
                        <Logo />
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
