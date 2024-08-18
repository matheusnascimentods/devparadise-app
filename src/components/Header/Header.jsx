import { Link } from 'react-router-dom';
import Logo from '../../assets/img/devparadise-logo.svg';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header>
        <div className={styles.container}>
          <Link to='/'>
            <img src={Logo} alt="Devparadise" />
          </Link>
          <nav className={ styles.navbar }>
            <ul>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Cadastrar</Link>
              </li>
            </ul>
          </nav>
        </div>
    </header>
  )
}
