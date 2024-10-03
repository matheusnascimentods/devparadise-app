import { Suspense } from 'react';

//Context
import { Context } from '../../context/UserContext';
import { useContext, useEffect, useState } from 'react';

//styles
import Logo from '../../assets/img/devparadise-logo.svg';
import styles from './Header.module.css';
import defaultPfp from '../../assets/img/pfp-default.jpg';

//Components
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import RoundedImage from '../RoundedImage/RoundedImage';
import Nav from 'react-bootstrap/Nav';

//API
import axios from 'axios';
import Divider from '../Divider/Divider';

export default function Header() {

  const { authenticated, logout } = useContext(Context);
  const [token] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [src, setSrc] = useState(defaultPfp);

  useEffect(() => {  
    if (token) {     
      axios.get(`${import.meta.env.VITE_API_URL}/user/me`, {
          headers: {
              Authorization: `Bearer ${JSON.parse(token)}`,
          },
      })
      .then((response) => {
          setUser(response.data.dev);
          setSrc(`${import.meta.env.VITE_API_URL}/images/users/${response.data.dev.image}`);
      });
      
    }  
  });

  return (
    <header>
      <div className={styles.container}>
        <Link to='/'>
          <img src={Logo} alt="Devparadise" />
        </Link>
        <Button onClick={handleShow} >
          <Suspense fallback={<p>Carregando...</p>}>
            <RoundedImage src={src} alt="Foto de perfil" />
          </Suspense>
        </Button>
        <Offcanvas show={show} onHide={handleClose} placement='end'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              {authenticated && (
                <>
                  {user.image ? (
                    <RoundedImage src={`${import.meta.env.VITE_API_URL}/images/users/${user.image}`} alt="Foto de perfil" />
                    ) : (
                    <RoundedImage src={defaultPfp} alt="Foto de perfil" />
                  )}
                  <p>@{user.username}</p>
                </>
              )}
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <ul>
              {authenticated ? (
              <>
                <Nav.Link className={styles.nav_item} href="/me">Meu perfil</Nav.Link>
                <Nav.Link className={styles.nav_item} href="/me/update">Editar pefil</Nav.Link>
                <Divider />
                <Nav.Link href="/me/projects">Meus projetos</Nav.Link>
                <Nav.Link href="/me/projects/new">Adicionar projeto</Nav.Link>
                <Divider />
                <Nav.Link href="/about">Sobre</Nav.Link>
                <Nav.Link href="/login" onClick={logout}>Logout</Nav.Link>
              </>
              ) : (
                <> 
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/signup">Cadastrar</Nav.Link>
                </>
              )}
            </ul>
          </Offcanvas.Body>
        </Offcanvas>
      </div>
    </header>
  )
}
