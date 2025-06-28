import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setNotification({message: 'Please fill in all required fields', severity: 'error'});
      return;
    }

    setNotification(null);

    try {
      // Use VITE_API_BASE_URL from environment variables
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // if your backend uses cookies for auth
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({message: 'Login successful!', severity: 'success'});
        // Store JWT token
        if (data.token) {
          localStorage.setItem('token', data.token);
        }
        setTimeout(() => navigate('/feed'), 1000); // Redirect to feed after 1 second
      } else {
        setNotification({message: data.message || 'Invalid credentials', severity: 'error'});
      }
    } catch (err) {
      setNotification({message: 'An unexpected error occurred during login.', severity: 'error'});
    }
  };

  return (
    <Box>
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 400,
          margin: 'auto',
        }}
      >
        {/* Title and Sub Heading*/}
        <Typography component="h1" variant="h3" sx={{ mb: 1 }}>
          <u>code</u>Book
        </Typography>
        <Typography sx={{ mb: 1 }}>
          Log In
        </Typography>

        {/* Notification Alert */}
        {notification && (
          <Alert variant="outlined" severity={notification.severity} sx={{ width: '100%', mb: 1 }}>
            {notification.message}
          </Alert>
        )}

        {/* Login Form */}
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ width: '100%', mt: 1 }}>
          {/* Email/Username Input */}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email or Username"
            name="email"
            autoFocus
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
            sx={{ mb: 3 }}
          />
          {/* Remember Me Checkbox & Forgot Password Link */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4}}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="checkbox"
                id="remember"
                style={{ marginRight: 8 }}
              />
              <label htmlFor="remember" style={{ fontSize: 14 }}>
                Remember Me
              </label>
            </Box>
            <Button href="#" size="small" sx={{ textTransform: 'none', minWidth: 0, p: 0 }}>
              Forgot password?
            </Button>
          </Box>
          {/* Submit and Create Account Buttons */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ py: 1, flex: 1 }}
            >
              LOGIN
            </Button>
            <Button
              fullWidth
              variant="outlined"
              sx={{ py: 1, flex: 1 }}
              onClick={() => {
                // Basic logic to determine if email or username
                let state = {};
                if (email.includes('@')) {
                  state.email = email;
                } else if (email) {
                  state.username = email;
                }
                navigate('/create-account', { state });
              }}
            >
              Create Account
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
