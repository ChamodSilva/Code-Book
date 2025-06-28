import { Paper } from '@mui/material';

const Social = () => (
  <Paper
    elevation={2}
    sx={{
      bgcolor: '#1e1e1e',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#b0b0b0',
      fontWeight: 500,
      fontSize: 18,
      borderRadius: 3,
    }}
  >
    Social Panel (Right Panel)
  </Paper>
);

export default Social;