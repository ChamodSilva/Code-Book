import { Paper } from '@mui/material';

const Quicklinks = () => (
  <Paper
    elevation={2}
    sx={{
      bgcolor: '#23272f',
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
    Quicklinks (Left Panel)
  </Paper>
);

export default Quicklinks;