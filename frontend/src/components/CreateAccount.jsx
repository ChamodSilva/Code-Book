import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

const CreateAccount = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState(location.state?.username || '');
  const [email, setEmail] = useState(location.state?.email || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setNotification({message: 'Please fill in all fields', severity: 'error'});
      return;
    }
    if (password !== confirmPassword) {
      setNotification({message: 'Passwords do not match', severity: 'error'});
      return;
    }

    setNotification(null);

    try {
      // Use VITE_API_BASE_URL from environment variables
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({ message: 'Account created successfully!', severity: 'success' });
        // Optionally redirect to login after a delay
        setTimeout(() => navigate('/login'), 1500);
      } else {
        setNotification({ message: data.message || 'Account creation failed.', severity: 'error' });
      }
    } catch (err) {
      setNotification({message: 'An error occurred during account creation.', severity: 'error'});
    }
  };

  return (
    // Main container to center the form and apply background
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      {/* Login Card Paper Component */}
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          maxWidth: 400,
          margin: 'auto',
        }}
      >
        {/* Title and Sub Heading*/}
        <Typography component="h1" variant="h3" sx={{ mb: 1 }}>
          <u>code</u>Book
        </Typography>
        <Typography sx={{ mb: 1 }}>
          Create Account
        </Typography>

        {/* Notification Alert */}
        {notification && (
          <Alert variant="outlined" severity={notification.severity} sx={{ width: '100%', mb: 1 }}>
            {notification.message}
          </Alert>
        )}

        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 1 }}>
          {/* Username Input */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            sx={{ mb: 1 }}
          />
          {/* Email Input */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 1 }}
          />
          {/* Password Input */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 1 }}
          />
          {/* Confirm Password Input */}
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            sx={{ mb: 3 }}
          />
          {/* Button Row */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            {/* Create Account Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ py: 1.5, flex: 1 }}
            >
              Create Account
            </Button>
            {/* Back To Login Button */}
            <Button
              fullWidth
              variant="outlined"
              sx={{ py: 1.5, flex: 1 }}
              onClick={() => navigate('/login')}
            >
              Back to Login
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreateAccount;