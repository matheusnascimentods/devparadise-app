import { Link } from 'react-router-dom';
import Logo from '../../assets/img/devparadise-logo.svg';
import styles from './Header.module.css';

//Context
import { Context } from '../../context/UserContext';
import { useContext } from 'react';

//Components
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function Header() {

  const { authenticated, logout } = useContext(Context);

  return (
    <header>
        <div className={styles.container}>
          <Link to='/'>
            <img src={Logo} alt="Devparadise" />
          </Link>
          <Navbar key='sm' expand='sm'>
          <Container fluid>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-sm`}
              aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {authenticated ? (
                  <>
                    <Nav.Link className={styles.nav_item} href="/me">Meu perfil</Nav.Link>
                    <Nav.Link href="/my-projects">Meus projetos</Nav.Link>
                    <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link>
                  </>
                  ) : (
                    <> 
                      <Nav.Link href="/login">Login</Nav.Link>
                      <Nav.Link href="/register">Cadastrar</Nav.Link>
                    </>
                  )}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
        </div>
    </header>
  )
}
