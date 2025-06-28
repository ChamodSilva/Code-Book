import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Login from './components/Login.jsx';
import CreateAccount from './components/CreateAccount.jsx';
import CreatePost from './components/CreatePost.jsx';
import FeedView from './views/FeedView.jsx';
import NavBar from './components/NavBar.jsx';
import { Dialog, Box } from '@mui/material';

function ModalRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === '/login';

  return (
    <>
      <NavBar />
      <Box sx={{ pt: 8 }}>
        <Routes>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/feed" element={<FeedView />} />
          <Route path="*" element={<FeedView />} />
        </Routes>
        <Dialog
          open={isLogin}
          onClose={() => navigate('/feed')}
          PaperProps={{
            sx: { borderRadius: 4, minWidth: 400, maxWidth: 420 }
          }}
          hideBackdrop={false}
        >
          <Login />
        </Dialog>
      </Box>
    </>
  );
}

function App() {
  return (
    <Router>
      <ModalRoutes />
    </Router>
  );
}

export default App;