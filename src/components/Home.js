import React from 'react';
import {
    Typography,
    Button,
    Container,
    Box,
    Paper,
    Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Upload, PersonAdd, ViewList, Preview } from '@mui/icons-material';

const HomePage = () => {
    return (
        <Container maxWidth="lg" style={{ marginTop: '40px' }}>
            <Paper elevation={3} style={{ padding: '20px' }}>
                <Typography variant="h2" align="center" gutterBottom>
                    Welcome to the Microservices App
                </Typography>
                <Typography variant="h5" align="center" paragraph>
                    This application allows you to upload files, add users, and retrieve users seamlessly.
                </Typography>

                <Box mt={4}>
                    <Typography variant="h6" align="center">
                        Key Features:
                    </Typography>
                    <Grid container spacing={3} justifyContent="center">
                        {/* Feature Box for Upload Files */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper
                                elevation={3}
                                style={{
                                    padding: '20px',
                                    textAlign: 'center',
                                    height: '250px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    background: 'linear-gradient(135deg, #a2c2e8, #f7c6c7)',
                                    borderRadius: '10px',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    border: '1px solid rgba(0, 0, 0, 0.12)',
                                    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #f7c6c7, #a2c2e0)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #a2c2e8, #f7c6c7)';
                                }}
                            >
                                <div>
                                    <Upload style={{ fontSize: '40px', color: '#3f51b5' }} />
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Upload Files</Typography>
                                    <Typography>
                                        Easily upload files of various types including images, videos, audio, and documents.
                                    </Typography>
                                </div>
                                <Link to="/upload" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary">
                                        Go to Upload
                                    </Button>
                                </Link>
                            </Paper>
                        </Grid>

                        {/* Feature Box for Add User */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper
                                elevation={3}
                                style={{
                                    padding: '20px',
                                    textAlign: 'center',
                                    height: '250px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    background: 'linear-gradient(135deg, #a2c2e8, #f7c6c7)',
                                    borderRadius: '10px',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #f7c6c7, #a2c2e0)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #a2c2e8, #f7c6c7)';
                                }}
                            >
                                <div>
                                    <PersonAdd style={{ fontSize: '40px', color: '#3f51b5' }} />
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>Add User</Typography>
                                    <Typography>
                                        Add new users to the system quickly and easily.
                                    </Typography>
                                </div>
                                <Link to="/add-user" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary">
                                        Add User
                                    </Button>
                                </Link>
                            </Paper>
                        </Grid>

                        {/* Feature Box for View All Users */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper
                                elevation={3}
                                style={{
                                    padding: '20px',
                                    textAlign: 'center',
                                    height: '250px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    background: 'linear-gradient(135deg, #a2c2e8, #f7c6c7)',
                                    borderRadius: '10px',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #f7c6c7, #a2c2e0)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #a2c2e8, #f7c6c7)';
                                }}
                            >
                                <div>
                                    <ViewList style={{ fontSize: '40px', color: '#3f51b5' }} />
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>View All Users</Typography>
                                    <Typography>
                                        Check out all registered users and their details in one place.
                                    </Typography>
                                </div>
                                <Link to="/get-users" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary">
                                        View Users
                                    </Button>
                                </Link>
                            </Paper>
                        </Grid>

                        {/* Feature Box for File Previews */}
                        <Grid item xs={12} sm={6} md={3}>
                            <Paper
                                elevation={3}
                                style={{
                                    padding: '20px',
                                    textAlign: 'center',
                                    height: '250px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    background: 'linear-gradient(135deg, #a2c2e8, #f7c6c7)',
                                    borderRadius: '10px',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #f7c6c7, #a2c2e0)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.background = 'linear-gradient(135deg, #a2c2e8, #f7c6c7)';
                                }}
                            >
                                <div>
                                    <Preview style={{ fontSize: '40px', color: '#3f51b5' }} />
                                    <Typography variant="h6" style={{ fontWeight: 'bold' }}>File Previews</Typography>
                                    <Typography>
                                        Get a live preview of your files before uploading them.
                                    </Typography>
                                </div>
                                <Link to="/upload" style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary">
                                        Upload Files
                                    </Button>
                                </Link>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>

                <Box mt={4} display="flex" justifyContent="center">
                    <Link to="/upload" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" size="large">
                            Get Started
                        </Button>
                    </Link>
                </Box>
            </Paper>
        </Container>
    );
};

export default HomePage;
