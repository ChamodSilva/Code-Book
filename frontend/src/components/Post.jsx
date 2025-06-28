import { Card, CardContent, Typography, Box, Chip, Avatar, Stack } from '@mui/material';

const languageColors = {
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Java: '#b07219',
  'C++': '#00599C',
  'C#': '#178600',
  Go: '#00ADD8',
  Ruby: '#701516',
  TypeScript: '#3178c6',
  Other: '#888',
};

const Post = ({ post }) => (
  <Card sx={{ mb: 3, width: '100%', bgcolor: 'background.paper', boxShadow: 4 }}>
    <CardContent>
      <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 1 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
          {post.username ? post.username[0].toUpperCase() : '?'}
        </Avatar>
        <Box>
          <Typography variant="h6" component="div">
            {post.title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {post.username} &bull; {post.email}
          </Typography>
        </Box>
        {post.language && (
          <Chip
            label={post.language}
            size="small"
            sx={{
              ml: 'auto',
              bgcolor: languageColors[post.language] || '#888',
              color: post.language === 'JavaScript' ? '#222' : '#fff',
              fontWeight: 600,
            }}
          />
        )}
      </Stack>
      <Box
        sx={{
          backgroundColor: '#23272f',
          borderRadius: 2,
          p: 2,
          fontFamily: 'monospace',
          fontSize: '1rem',
          whiteSpace: 'pre-wrap',
          mb: 2,
          color: '#e0e0e0',
        }}
      >
        {post.code_snippet}
      </Box>
      {post.description && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          {post.description}
        </Typography>
      )}
      <Typography variant="caption" color="text.secondary">
        Posted: {post.created_at ? new Date(post.created_at).toLocaleString() : ''}
      </Typography>
    </CardContent>
  </Card>
);

export default Post;