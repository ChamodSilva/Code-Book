import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Paper } from '@mui/material';
import Post from '../components/Post.jsx';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
    fetch(`${apiBaseUrl}/api/posts`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status === 401) {
          navigate('/login', { replace: true });
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (data) setPosts(data);
      })
      .catch(() => {
        // Optionally handle fetch errors
      });
  }, [navigate]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          maxWidth: 600,
          margin: 'auto',
        }}
      >
        <Typography component="h1" variant="h3" sx={{ mb: 1 }}>
          Feed
        </Typography>
        <Typography>
          Welcome to your feed! (You can add posts here.)
        </Typography>
        {/* Example: Render posts */}
        {posts.map((post) => (
          <Post key={post.postID} post={post} />
        ))}
      </Paper>
    </Box>
  );
};

export default Feed;