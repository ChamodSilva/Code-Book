import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.jsx';
import CreateAccount from './components/CreateAccount.jsx';
import CreatePost from './components/CreatePost.jsx';
import FeedView from './views/FeedView.jsx'; // Add this import

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/feed" element={<FeedView />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;