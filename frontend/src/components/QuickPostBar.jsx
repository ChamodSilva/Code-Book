import { Paper, Typography, Box, Divider } from '@mui/material';
import UserAvatar from './UserAvatar.jsx';

const QuickPostBar = ({ onClick, user }) => (
  <Box sx={{ width: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Divider sx={{ width: '100%', maxWidth: 600, mb: 2, opacity: 0.4 }} />
    <Paper
      elevation={2}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 1.5,
        mb: 3,
        cursor: 'pointer',
        bgcolor: 'background.paper',
        border: theme => `1.5px solid ${theme.palette.divider}`,
        borderRadius: 3,
        transition: 'box-shadow 0.2s, border-color 0.2s',
        width: '100%',
        maxWidth: 600,
        boxShadow: '0 2px 8px 0 rgba(60,60,60,0.04)',
        '&:hover': {
          boxShadow: '0 4px 16px 0 rgba(60,60,60,0.10)',
          borderColor: theme => theme.palette.primary.light,
        },
      }}
      onClick={onClick}
    >
      <UserAvatar user={user} size={36} sx={{ mr: 3 }} />
      <Typography color="text.secondary" sx={{ ml: 1 }}>
        Make a post!
      </Typography>
    </Paper>
  </Box>
);

export default QuickPostBar;