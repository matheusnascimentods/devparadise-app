import { useState, useContext, React } from 'react';

//styles
import styles from '../../form/Form.module.css';

//Components
import Input from '../../Form/Input'
import InputTags from '../../Form/TagInput';
import { Link } from 'react-router-dom';


//Contexts
import { Context } from '../../../context/UserContext';

export default function Signup() {

  const [user, setUser] = useState({});
  const {register} = useContext(Context);

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value});
  }

  function handleCreate(e) {
    user.skils = e;
  }

  function handleSubmit(e) {
    e.preventDefault();
    register(user);
  }

  return (
    <>
      <section className={styles.form}>
          <div className={styles.form_container}>
            <form onSubmit={handleSubmit}>
              <h1>Criar conta como DEV</h1>
              <Input text="Nome" type='text' name='name' placeholder='Informe o seu nome' handleOnChange={handleChange}/>
              <Input text="Username" type='text' name='username' placeholder='Escolha o seu username' handleOnChange={handleChange}/>
              <InputTags text="Habilidades" name='skils' placeholder='Escolha as tecnologias que você domina' handleOnChange={handleCreate} />
              <Input text="E-mail" type='email' name='email' placeholder='Informe o seu e-mail' handleOnChange={handleChange}/>
              <Input text="CPF" type='number' name='cpf' placeholder='Informe o seu CPF' handleOnChange={handleChange}/>
              <Input text="Telefone" type='phone' name='phone' placeholder='Informe o seu Telefone' handleOnChange={handleChange}/>
              <Input text="Descrição" type='text' name='description' placeholder='Informe uma descrição sobre você' handleOnChange={handleChange} />
              <Input text="Senha" type='password' name='password' placeholder='Escolha uma senha' handleOnChange={handleChange}/>

              <input type="submit" value="Criar conta" />
              <p className={styles.form_span}>
                Já tem conta? <Link to='/login'>Clique aqui.</Link>
              </p>
            </form>
          </div>
      </section>
    </>
  )
}

