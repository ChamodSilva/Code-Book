import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="fixed" color="primary" elevation={4}>
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
              borderBottom: location.pathname === '/feed' ? '2px solid #fff' : 'none',
            }}
          >
            Feed
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate('/create-post')}
            sx={{
              fontWeight: location.pathname === '/create-post' ? 700 : 400,
              borderBottom: location.pathname === '/create-post' ? '2px solid #fff' : 'none',
            }}
          >
            Create Post
          </Button>
        </Box>
        <Button color="secondary" variant="contained" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;