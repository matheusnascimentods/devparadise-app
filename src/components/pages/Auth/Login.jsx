import { Link } from 'react-router-dom';

//Components
import Input from '../../form/Input'
import Select from '../../form/Select'

import styles from '../../form/Form.module.css';
import img from '../../../assets/img/image.png'

//Contexts
import { Context } from '../../../context/UserContext';
import { useContext, useState } from 'react';

export default function Login() {

  const [user, setUser] = useState({});
  const {login} = useContext(Context);

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value});
  }

  function handleOption(e) {

  }

  function handleSubmit(e) {
    e.preventDefault();
    login(user);
  }

  return (
    <section>
      <div className={styles.form_container}>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <Input text="E-mail" type='email' name='email' placeholder='Informe o seu e-mail' handleOnChange={handleChange}/>
          <Input text="Senha" type='password' name='password' placeholder='Informe sua senha' handleOnChange={handleChange}/>
    
          <input type="submit" value="Login" />
          <p className={styles.form_span}>
              Não tem conta? <Link to='/register'>Clique aqui.</Link>
          </p>
        </form>
      </div>
    </section>
  )
}