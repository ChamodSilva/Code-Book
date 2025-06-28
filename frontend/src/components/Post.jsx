import { Card, CardContent, Typography, Box, Chip, Stack } from '@mui/material';
import UserAvatar from './UserAvatar.jsx';

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
        <UserAvatar user={{ id: post.userId, username: post.username }} size={36} />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" component="div">
            {post.title}
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
      {/* Username left-aligned under the avatar/title row */}
      <Box sx={{ mb: 1 }}>
        <Typography variant="subtitle2" color="text.secondary" sx={{ textAlign: 'left' }}>
          {post.username}
        </Typography>
      </Box>
      {/* Code section with border, left-aligned */}
      <Box
        sx={{
          backgroundColor: '#23272f',
          borderRadius: 2,
          border: '1.5px solid #444',
          p: 2,
          fontFamily: 'monospace',
          fontSize: '1rem',
          whiteSpace: 'pre-wrap',
          mb: 2,
          color: '#e0e0e0',
          textAlign: 'left',
          width: '100%',
        }}
      >
        {post.code_snippet}
      </Box>
      {post.description && (
        <Typography variant="body2" sx={{ mb: 1 }}>
          {post.description}
        </Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
        <Typography variant="caption" color="text.secondary">
          Posted: {post.created_at ? new Date(post.created_at).toLocaleString() : ''}
        </Typography>
      </Box>
    </CardContent>
  </Card>
);

export default Post;