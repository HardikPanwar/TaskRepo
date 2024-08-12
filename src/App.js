import Main from './components/main';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavComponent from './components/navComponent';
import Dashboard from './components/dashboard';

function App() {
  return (
    <Router>
      <NavComponent />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/updateBanner' element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
