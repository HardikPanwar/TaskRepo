import Main from './components/main';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NavComponent from './components/navComponent';
import Dashboard from './components/dashboard';
import Footer from './components/footer';

function App() {
  return (
    <Router>
      <NavComponent />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/updateBanner' element={<Dashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
