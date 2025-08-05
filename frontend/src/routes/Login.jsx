import React, { useContext } from 'react';
import { Button, Typography, Grid, Box, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ThemeModeContext } from '../context/ThemeContext';
import LoginForm from '../components/LoginForm';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';

function Login() {
  const navigate = useNavigate();
  const { toggleTheme, mode } = useContext(ThemeModeContext);

  if (localStorage.getItem('user')) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          ¡Ya estás logueado!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/')}
          sx={{ mr: 2 }}
        >
          Ir a Home
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative' }}>
      {/* Botón de cambio de tema en la esquina superior derecha */}
      <IconButton
        sx={{ position: 'absolute', top: 16, right: 16 }}
        onClick={toggleTheme}
        color="inherit"
      >
        {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
      </IconButton>

      <Grid container sx={{ minHeight: '100vh' }}>
        {/* Lado izquierdo - Introducción */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            p: 4,
          }}
        >
          <Box>
            <Typography variant="h3" gutterBottom>
              Bienvenido a Template
            </Typography>
            <Typography variant="h6" gutterBottom>
              Una plantilla completa con autenticación y gestión de usuarios.
            </Typography>
            <Typography variant="body1">
              Inicia sesión para acceder a la plataforma y comenzar a desarrollar tu aplicación.
            </Typography>
          </Box>
        </Grid>

        {/* Lado derecho - Formulario de inicio de sesión */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            backgroundColor: 'background.paper',
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ maxWidth: 400, mx: 'auto' }}>
            <Typography variant="h4" gutterBottom>
              Inicia Sesión
            </Typography>
            <LoginForm />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Login;
