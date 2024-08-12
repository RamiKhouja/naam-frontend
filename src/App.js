import logo from './logo.svg';
import './App.css';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Teams from './components/Teams';
import Projects from './pages/Projects';
import ProjectDetails from './components/project/Details';
import Navigation from './pages/navigation';
import Dashboard from './pages/Dashboard';

function App() {
  const accessToken = useSelector((state) => state.auth.accessToken);
  return (
    <Router>
      <Routes>
        <Route path="/" element={accessToken ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
        <Route path="/login" element={accessToken ? <Navigate to="/dashboard" /> : <Login />} />
        <Route element={accessToken ? <Navigation /> : <Navigate to="/login" />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/team" element={<Teams />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
