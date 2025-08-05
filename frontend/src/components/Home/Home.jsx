// src/components/Home.jsx

import React from 'react';
import { Box, Paper, Typography, Container, useTheme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import './Home.css';

const Home = () => {
    const isMobile = useMediaQuery('(max-width:768px)');
    const theme = useTheme();

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {/* Header de bienvenida */}
                <Paper 
                    elevation={3} 
                    sx={{ 
                        padding: 4, 
                        borderRadius: '12px',
                        textAlign: 'center',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        color: 'white'
                    }}
                >
                    <Typography variant="h3" gutterBottom>
                        ¡Bienvenido!
                    </Typography>
                    <Typography variant="h6">
                        Este es tu panel de control. Aquí puedes gestionar tu aplicación.
                    </Typography>
                </Paper>

                {/* Cards principales */}
                <Box sx={{ 
                    display: 'grid', 
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: 3 
                }}>
                    <Paper 
                        elevation={2} 
                        sx={{ 
                            padding: 3, 
                            borderRadius: '12px',
                            border: `1px solid ${theme.palette.divider}`,
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                transition: 'transform 0.2s ease-in-out',
                                boxShadow: 4
                            }
                        }}
                    >
                        <Typography variant="h5" gutterBottom color="primary">
                            📊 Dashboard
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Aquí puedes agregar métricas y estadísticas importantes para tu aplicación.
                        </Typography>
                    </Paper>

                    <Paper 
                        elevation={2} 
                        sx={{ 
                            padding: 3, 
                            borderRadius: '12px',
                            border: `1px solid ${theme.palette.divider}`,
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                transition: 'transform 0.2s ease-in-out',
                                boxShadow: 4
                            }
                        }}
                    >
                        <Typography variant="h5" gutterBottom color="primary">
                            ⚙️ Configuración
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Personaliza la configuración de tu aplicación según tus necesidades.
                        </Typography>
                    </Paper>

                    <Paper 
                        elevation={2} 
                        sx={{ 
                            padding: 3, 
                            borderRadius: '12px',
                            border: `1px solid ${theme.palette.divider}`,
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                transition: 'transform 0.2s ease-in-out',
                                boxShadow: 4
                            }
                        }}
                    >
                        <Typography variant="h5" gutterBottom color="primary">
                            📈 Estadísticas
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Visualiza el rendimiento y las métricas clave de tu aplicación.
                        </Typography>
                    </Paper>
                </Box>

                {/* Sección de información adicional */}
                <Paper 
                    elevation={1} 
                    sx={{ 
                        padding: 3, 
                        borderRadius: '12px',
                        backgroundColor: theme.palette.mode === 'light' ? '#f5f5f5' : theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        💡 Información del Template
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Este es un template PERN (PostgreSQL, Express, React, Node.js) que incluye:
                    </Typography>
                    <Box component="ul" sx={{ mt: 2, pl: 2 }}>
                        <Typography component="li" variant="body2">Autenticación y autorización con JWT</Typography>
                        <Typography component="li" variant="body2">Gestión de usuarios con roles</Typography>
                        <Typography component="li" variant="body2">Tema claro/oscuro</Typography>
                        <Typography component="li" variant="body2">Diseño responsive con Material-UI</Typography>
                        <Typography component="li" variant="body2">Configuración con Docker</Typography>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default Home;
