import { Link } from 'react-router-dom';

//Components
import Input from '../../form/Input'
import Select from '../../form/Select'

import styles from '../../form/Form.module.css';
import img from '../../../assets/img/image.png'

export default function Login() {

  function handleChange(e) {
  }

  function handleOption(e) {

  }

  return (
    <section>
      <div className={styles.form_container}>
        <form>
          <h1>Login</h1>
          <Input text="E-mail" type='email' name='email' placeholder='Informe o seu e-mail' handleOnChange={handleChange}/>
          <Input text="Senha" type='password' name='password' placeholder='Informe sua senha' handleOnChange={handleChange}/>
          <Select text='Entrar como' name='type-account' options={['DEV', 'Recrutador']} handleOnChange={handleOption}/>
          <input type="submit" value="Login" />
          <p className={styles.form_span}>
              Não tem conta? <Link to='/register'>Clique aqui.</Link>
          </p>
        </form>
      </div>
    </section>
  )
}
