import React, { createContext, useState, useMemo, useEffect } from 'react';
import { createMyTheme } from '../theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import GlobalStyles from '../theme/GlobalStyles'; // Importa los estilos globales

export const ThemeModeContext = createContext();

export const ThemeModeProvider = ({ children }) => {
  // Recuperar el tema guardado o usar preferencia del sistema
  const [mode, setMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Si no hay tema guardado, usar preferencia del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'dark' ? 'light' : 'dark';
      // Guardar la preferencia en localStorage
      localStorage.setItem('theme', newMode);
      return newMode;
    });
  };

  const resetTheme = () => {
    // Eliminar preferencia guardada y usar preferencia del sistema
    localStorage.removeItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    setMode(systemPreference);
  };

  // Este useEffect actualiza el atributo 'data-theme' en el body
  useEffect(() => {
    document.body.setAttribute('data-theme', mode); // Actualiza el tema en el body
  }, [mode]);

  // Escuchar cambios en la preferencia del sistema solo si no hay tema guardado
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      // Solo cambiar si no hay preferencia guardada del usuario
      if (!localStorage.getItem('theme')) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const theme = useMemo(() => createMyTheme(mode), [mode]);

  return (
    <ThemeModeContext.Provider value={{ mode, toggleTheme, resetTheme }}>
      <ThemeProvider theme={theme}>
        <GlobalStyles theme={theme} /> 
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
