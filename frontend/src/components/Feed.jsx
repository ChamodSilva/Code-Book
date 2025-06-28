import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Paper, Typography, Dialog } from '@mui/material';
import Post from './Post.jsx';
import QuickPostBar from './QuickPostBar.jsx';
import CreatePost from './CreatePost.jsx';

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));

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
    <>
      <Paper
        elevation={6}
        sx={{
          padding: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          height: 'auto',
          maxWidth: 900,
        }}
      >
        <Typography>
          Welcome to your feed!
        </Typography>
        <QuickPostBar onClick={() => setShowCreate(true)} user={user} />
        {posts.map((post) => (
          <Post key={post.postID} post={post} />
        ))}
      </Paper>
      <Dialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        PaperProps={{
          sx: { borderRadius: 4, minWidth: 400, maxWidth: 600 }
        }}
        hideBackdrop={false}
      >
        <CreatePost />
      </Dialog>
    </>
  );
};

export default Feed;