//Contexts
import { Context } from '../../../context/UserContext';
import { useContext, useState } from 'react';

//styles
import styles from '../../form/Form.module.css';
import img from '../../../assets/img/image.png';

//Components
import Input from '../../form/Input';
import { Link } from 'react-router-dom';

export default function Login() {

  const [user, setUser] = useState({});
  const {login} = useContext(Context);

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value});
  }

  function handleOption(e) {
    setUser({...user, option: e.target.options[e.target.selectdIndex].text})
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
              Não tem conta? <Link to='/register'>Clique aqui.</Link>
          </p>
        </form>
      </div>
    </section>
  )
}
