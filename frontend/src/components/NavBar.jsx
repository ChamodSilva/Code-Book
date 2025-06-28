import { AppBar, Toolbar, Typography, Button, Box, Menu, MenuItem, Divider } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import UserAvatar from './UserAvatar.jsx';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState(null);

  // Update user state on mount and when localStorage changes (e.g., login/logout in another tab)
  useEffect(() => {
    const updateUser = () => {
      const userData = localStorage.getItem('user');
      setUser(userData ? JSON.parse(userData) : null);
    };
    updateUser();
    window.addEventListener('storage', updateUser);
    return () => window.removeEventListener('storage', updateUser);
  }, []);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAnchorEl(null);
    setUser(null); // Immediately update UI
    navigate('/login');
  };

  return (
    <AppBar
      position="fixed"
      color="primary"
      elevation={4}
      sx={{
        borderBottom: theme => `2px solid ${theme.palette.divider}`,
        background: theme => theme.palette.background.paper,
        boxShadow: '0 2px 8px 0 rgba(60,60,60,0.04)',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 700, cursor: 'pointer', letterSpacing: 1 }}
            onClick={() => navigate('/feed')}
          >
            <span style={{ textDecoration: 'underline' }}>code</span>Book
          </Typography>
          <Button
            color="inherit"
            onClick={() => navigate('/feed')}
            sx={{
              fontWeight: location.pathname === '/feed' ? 700 : 400,
              borderBottom: location.pathname === '/feed' ? '2px solid #1976d2' : 'none',
            }}
          >
            Feed
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/create-post')}
            sx={{
              fontWeight: location.pathname === '/create-post' ? 700 : 400,
              borderBottom: location.pathname === '/create-post' ? '2px solid #1976d2' : 'none',
            }}
          >
            Create Post
          </Button>
        </Box>
        {user && (
          <>
            <UserAvatar
              user={user}
              size={40}
              sx={{ ml: 2, cursor: 'pointer', border: theme => `2px solid ${theme.palette.divider}` }}
              onClick={handleAvatarClick}
              tooltip={false}
            />
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <MenuItem disabled>
                <Typography variant="subtitle2">{user.username}</Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;