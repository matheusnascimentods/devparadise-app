import { Link } from 'react-router-dom';
import Logo from '../../assets/img/devparadise-logo.svg';
import styles from './Header.module.css';

//Context
import { Context } from '../../context/UserContext';
import { useContext } from 'react';

export default function Header() {

  const { authenticated, logout } = useContext(Context);

  return (
    <header>
        <div className={styles.container}>
          <Link to='/'>
            <img src={Logo} alt="Devparadise" />
          </Link>
          <nav className={ styles.navbar }>
            <ul>
              {authenticated ? (
                <>
                  <li>
                    <Link to='/me'>Perfil</Link>
                  </li>
                  <li>
                    <Link to='/me'>Meus Projetos</Link>
                  </li>
                  <li>
                    <Link onClick={logout} to='/login'>Logout</Link>
                  </li>
                </>
                ) : (
                  <> 
                  <li>
                    <Link to='/login'>Login</Link>
                  </li>
                  <li>
                    <Link to='/register'>Cadastrar</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
    </header>
  )
}
