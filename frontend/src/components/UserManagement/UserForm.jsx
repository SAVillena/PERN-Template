import React, { useState, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, Grid, TextField, Button, Select, MenuItem, FormControl, InputLabel, Box, Snackbar,
  Alert,
} from '@mui/material';

const UserForm = ({ user, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    username: '', email: '', password: '', newPassword: '', roles: ['user'],
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: '',
        newPassword: '',
        roles: [user.Role ? user.Role.name : 'user'],
      });
    } else {
      setFormData({
        username: '', email: '', password: '', newPassword: '', roles: ['user'],
      });
    }
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRoleChange = (event) => {
    setFormData({ ...formData, roles: [event.target.value] });
  };

  const handleSubmit = () => {
    if (!formData.username || !formData.email) {
      setOpenSnackbar(true);
      return;
    }

    if (!user && !formData.password) {
      setOpenSnackbar(true);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setOpenSnackbar(true);
      return;
    }

    onSubmit(formData);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Dialog open onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle>{user ? 'Edit User' : 'Create User'}</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            {!user && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
            )}
            {user && (
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="New Password (optional)"
                  name="newPassword"
                  type="password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Role</InputLabel>
                <Select
                  label="Role"
                  value={formData.roles[0]}
                  onChange={handleRoleChange}
                >
                  <MenuItem value="user">User</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button onClick={onClose} sx={{ mr: 2 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSubmit}>
              {user ? 'Update' : 'Create'}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="warning" sx={{ width: '100%' }}>
          Please fill in all required fields with valid information.
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserForm;
