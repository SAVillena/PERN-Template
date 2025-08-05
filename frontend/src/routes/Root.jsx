import { Outlet } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Navbar from '../components/NavBar';
import CssBaseline from '@mui/material/CssBaseline';

function Root() {
  return (
    <>
      <CssBaseline />
      <AuthProvider>
        <Navbar />
        <PageRoot />
      </AuthProvider>
    </>
  );
}

function PageRoot() {
  return (
    <div style={{ width: '100%', minHeight: 'calc(100vh - 64px)' }}>
      <Outlet />
    </div>
  );
}

export default Root;
