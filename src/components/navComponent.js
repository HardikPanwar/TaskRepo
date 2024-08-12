import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './style.css';
import { Link } from 'react-router-dom';

function NavComponent() {
  return (
    <Container>
      <Navbar expand="lg">
        <Container> 
          <Link to="/" className='logo'>TakeUForward</Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
            <Nav className="">
              <Link to="/updateBanner" className='dashboard-link'>Dashboard</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </Container>
  );
}

export default NavComponent;