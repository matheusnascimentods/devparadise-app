//Contexts
import { Context } from '../../../context/UserContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//styles
import styles from '../../form/Form.module.css';

//Components
import Input from '../../form/Input';
import { Link } from 'react-router-dom';

export default function Login() {

  const [user, setUser] = useState({});
  const {login} = useContext(Context);
  const [token] = useState(localStorage.getItem('token') || undefined);
  const navigate = useNavigate();

  useEffect(() => {
    if (token != undefined) {
      navigate('/');
    }
  }, [token])

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value});
  }

  function handleSubmit(e) {
    e.preventDefault();
    login(user);
  }

  let options = ['Dev', 'Recrutador'];

  return (
    <section className={styles.form}>
      <div className={styles.form_container}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Input text="E-mail ou Username" type='text' name='login' placeholder='Informe o seu e-mail ou username' handleOnChange={handleChange}/>
          <Input text="Senha" type='password' name='password' placeholder='Informe sua senha' handleOnChange={handleChange}/>
          <input type="submit" value="Login" />
          <p className={styles.form_span}>
              Não tem conta? <Link to='/signup'>Clique aqui.</Link>
          </p>
        </form>
      </div>
    </section>
  )
}
