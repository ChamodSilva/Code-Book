import { useState } from 'react';
import { Box, TextField, Button, Typography, Paper, Alert, MenuItem } from '@mui/material';

const languages =
[
  'JavaScript',
  'Python',
  'Java',
  'C++',
  'C#',
  'Go',
  'Ruby',
  'TypeScript',
  'Other'
];

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [codeSnippet, setCodeSnippet] = useState('');
  const [language, setLanguage] = useState('');
  const [description, setDescription] = useState('');
  const [notification, setNotification] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title || !codeSnippet) {
      setNotification({ message: 'Title and code snippet are required.', severity: 'error' });
      return;
    }

    setNotification(null);

    try {
      // Replace with your backend API endpoint
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, code_snippet: codeSnippet, language, description }),
        credentials: 'include',
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({ message: 'Post created successfully!', severity: 'success' });
        setTitle('');
        setCodeSnippet('');
        setLanguage('');
        setDescription('');
      } else {
        setNotification({ message: data.message || 'Failed to create post.', severity: 'error' });
      }
    } catch (err) {
      setNotification({ message: 'An unexpected error occurred.', severity: 'error' });
    }
  };

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
          maxWidth: 600,
          margin: 'auto',
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
          Create a New Post
        </Typography>

        {notification && (
          <Alert variant="outlined" severity={notification.severity} sx={{ width: '100%', mb: 2 }}>
            {notification.message}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Code Snippet"
            multiline
            minRows={6}
            value={codeSnippet}
            onChange={(e) => setCodeSnippet(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            select
            fullWidth
            label="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            sx={{ mb: 2 }}
          >
            {languages.map((lang) => (
              <MenuItem key={lang} value={lang}>
                {lang}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            margin="normal"
            fullWidth
            label="Description (optional)"
            multiline
            minRows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button type="submit" variant="contained" fullWidth sx={{ py: 1.5 }}>
            Create Post
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default CreatePost;