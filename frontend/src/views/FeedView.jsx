import { Box } from '@mui/material';
import Quicklinks from '../components/Quicklinks.jsx';
import Social from '../components/Social.jsx';
import Feed from '../components/Feed.jsx';

const NAVBAR_HEIGHT = 0; // px

const FeedView = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'row',
      height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
      bgcolor: 'background.default',
      overflow: 'hidden',
      mt: `${NAVBAR_HEIGHT}px`,
      gap: '10px'
    }}
  >
    {/* Left Panel */}
    <Box
      sx={{
        width: { xs: '0%', md: '10%' }, // reduced from 15% to 10%
        minWidth: 80,
        maxWidth: 250,
        height: '100%',
        display: { xs: 'none', md: 'flex' },
        alignItems: 'stretch',
        justifyContent: 'center',
      }}
    >
      <Quicklinks />
    </Box>

    {/* Main Panel */}
    <Box
      sx={{
        width: { xs: '100%', md: '80%' }, // increased from 70% to 80%
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Feed />
    </Box>

    {/* Right Panel */}
    <Box
      sx={{
        width: { xs: '0%', md: '10%' }, // reduced from 15% to 10%
        minWidth: 80,
        maxWidth: 250,
        height: '100%',
        display: { xs: 'none', md: 'flex' },
        alignItems: 'stretch',
        justifyContent: 'center',
      }}
    >
      <Social />
    </Box>
  </Box>
);

export default FeedView;