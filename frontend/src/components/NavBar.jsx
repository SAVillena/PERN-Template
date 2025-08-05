import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, Box } from '@mui/material';
import { ThemeModeContext } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/auth.service';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

// import logoLight from '../assets/logoLight.png';
// import logoDark from '../assets/logoDark.png';

const Navbar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toggleTheme, mode } = useContext(ThemeModeContext);

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      <ListItem button onClick={() => { navigate('/home'); setMobileOpen(false); }}>
        <ListItemIcon><HomeIcon /></ListItemIcon>
        <ListItemText primary="Inicio" />
      </ListItem>
      
      {/* Opción visible solo para administradores */}
      {user?.roles === 'admin' && (
        <ListItem button onClick={() => { navigate('/users'); setMobileOpen(false); }}>
          <ListItemIcon><PeopleIcon /></ListItemIcon>
          <ListItemText primary="Usuarios" />
        </ListItem>
      )}
    </List>
  );

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Botón de menú y Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {/* Botón de menú para dispositivos móviles */}
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerToggle}
              sx={{ display: { xs: 'block', sm: 'none' } }}
            >
              <MenuIcon />
            </IconButton>

            {/* Logo o título */}
            <Typography variant="h6" component="div" sx={{ ml: 2 }}>
              PERN Template
            </Typography>
          </Box>

          {/* Menú de navegación para escritorio */}
          <Box sx={{ display: { xs: 'none', sm: 'flex' }, flexGrow: 1, justifyContent: 'center' }}>
            <Button color="inherit" startIcon={<HomeIcon />} onClick={() => navigate('/home')}>Inicio</Button>
           
            {/* Opción visible solo para administradores */}
            {user?.roles === 'admin' && (
              <Button color="inherit" startIcon={<PeopleIcon />} onClick={() => navigate('/users')}>Usuarios</Button>
            )}
          </Box>

          {/* Botón para cambiar de tema y cerrar sesión */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              color="inherit" 
              onClick={toggleTheme}
              sx={{ mr: 1 }}
              title={`Cambiar a tema ${mode === 'dark' ? 'claro' : 'oscuro'}`}
            >
              {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
            <Button
              variant="outlined"
              onClick={handleLogout}
              color="inherit"
            >
              Cerrar sesión
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer lateral para menú en dispositivos móviles */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        sx={{ display: { xs: 'block', sm: 'none' } }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
