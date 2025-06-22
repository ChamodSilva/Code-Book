import { Box, Typography, Paper } from '@mui/material';

const Feed = () => (
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
    </Paper>
  </Box>
);

export default Feed;