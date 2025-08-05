import React, { useState } from 'react';
import { Box, TextField, Button, useTheme, Alert, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { login } from '../services/auth.service';
import CloseIcon from '@mui/icons-material/Close';

const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const theme = useTheme();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  // Limpiar error cuando el usuario empiece a escribir
  const watchAllFields = watch();
  React.useEffect(() => {
    if (apiError && (watchAllFields.email || watchAllFields.password)) {
      setApiError('');
    }
  }, [watchAllFields, apiError]);

  const onSubmit = async (data) => {
    setLoading(true);
    setApiError('');
    
    try {
      console.log('Enviando datos de login:', data);
      const response = await login(data);
      console.log('Login exitoso:', response);
      navigate('/');
    } catch (error) {
      console.error('Error en login:', error);
      console.error('Error response:', error.response);
      console.error('Error response data:', error.response?.data);
      
      // Manejo específico de diferentes tipos de errores
      if (error.response) {
        // El servidor respondió con un código de error
        const errorMessage = error.response.data?.message || 
                            error.response.data?.error || 
                            error.response.data;
        
        switch (error.response.status) {
          case 400:
            // Error 400 - Bad Request (credenciales incorrectas o datos inválidos)
            if (typeof errorMessage === 'string') {
              setApiError(errorMessage);
            } else {
              setApiError('Email o contraseña incorrectos. Verifica tus credenciales.');
            }
            break;
          case 401:
            setApiError('Email o contraseña incorrectos. Verifica tus credenciales.');
            break;
          case 404:
            setApiError('Usuario no encontrado. Verifica tu email.');
            break;
          case 422:
            setApiError('Datos de login inválidos. Revisa el formato del email.');
            break;
          case 429:
            setApiError('Demasiados intentos. Espera unos minutos antes de intentar nuevamente.');
            break;
          case 500:
            setApiError('Error interno del servidor. Intenta más tarde.');
            break;
          default:
            setApiError(errorMessage || 'Error desconocido del servidor.');
        }
      } else if (error.request) {
        // La petición se hizo pero no hubo respuesta
        setApiError('No se pudo conectar con el servidor. Verifica tu conexión a internet.');
      } else {
        // Algo más pasó
        setApiError('Error inesperado. Intenta nuevamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        width: '100%',
      }}
    >
      {apiError && (
        <Alert 
          severity="error" 
          sx={{ mb: 2 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setApiError('')}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {apiError}
        </Alert>
      )}
      
      <TextField
        fullWidth
        label="Email"
        type="email"
        {...register('email', { 
          required: 'El email es requerido',
          pattern: {
            value: /^\S+@\S+$/i,
            message: 'Formato de email inválido'
          }
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        margin="normal"
      />
      
      <TextField
        fullWidth
        label="Contraseña"
        type="password"
        {...register('password', { 
          required: 'La contraseña es requerida',
          minLength: {
            value: 6,
            message: 'La contraseña debe tener al menos 6 caracteres'
          }
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        margin="normal"
      />
      
      <Button
        type="submit"
        fullWidth
        variant="contained"
        disabled={loading}
        sx={{ mt: 3, mb: 2 }}
      >
        {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
      </Button>
    </Box>
  );
};

export default LoginForm;
