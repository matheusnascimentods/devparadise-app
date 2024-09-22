import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//API
import axios from 'axios';

//styles
import styles from '../../form/Form.module.css';
import 'react-toastify/dist/ReactToastify.css';
import 'rsuite/TagInput/styles/index.css';

//Components
import Input from '../../Form/Input';
import RoundedImage from '../../RoundedImage/RoundedImage';
import InputTags from '../../Form/TagInput';
import { Link } from 'react-router-dom';

export default function UpdateUser() {

  const [user, setUser] = useState({});
  const [preview, setPreview] = useState();
  const [token] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/dev/get-user`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    })
    .then((response) => {
      setUser(response.data.dev)
    });

  }, [token]);

  function handleChange(e) {
    setUser({...user, [e.target.name]: e.target.value});
  }

  function onFileChange(e) {
    const file = e.target.files[0];

    if(file) {
      if (file.type.startsWith('image/')) {
        setPreview(e.target.files[0]);
        setUser({...user, image: e.target.files[0]});
      } else {
        toast.error('Envie um arquivo de imagem!', {
          position: "bottom-right",
          theme: "dark"
        });
      }
    }
  }

  function handleCreate(value, item) {
    user.skils = value;
  }
  
  async function handleSubmit(e) {
    e.preventDefault();
    
    let formData = new FormData();
    Object.keys(user).forEach((key) => {
      if (key === 'skils') {
        for (let i = 0; i < user[key].length; i++) {
          formData.append(`skils`, user[key][i]);          
        }
      } else {
        formData.append(key, user[key]);
      }
    });

    await axios.patch(`${import.meta.env.VITE_API_URL}/dev`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      toast.success(response.data.message, {
        position: "bottom-right",
        theme: "dark"
      });
      navigate('/me');
    })
    .catch((error) => {
      toast.error('Preencha todos os campos!', {
        position: "bottom-right",
        theme: "dark"
      });
    })
  }

  return (
    <section className={styles.form}>
        <div className={styles.form_container}>
          <form onSubmit={handleSubmit}>
            <h1>Editar perfil</h1>
            {(user.image || preview) && (
              <RoundedImage
                src={
                  preview
                  ? URL.createObjectURL(preview)
                  : `${import.meta.env.VITE_API_URL}/images/devs/${user.image}`
                }
                alt={user.name}
              />
            )}
            <Input text="Foto de perfil" type='file' name='image' handleOnChange={onFileChange} />
            <Input text="Nome" type='text' name='name' plzaceholder='Informe o seu nome' handleOnChange={handleChange} value={user.name}/>
            <Input text="Username" type='text' name='username' placeholder='Escolha o seu username' handleOnChange={handleChange} value={user.username}/>
            <InputTags text="Habilidades" name='skils' placeholder='Escolha as tecnologias que você domina' handleOnChange={handleCreate} />
            <Input text="Descrição" type='text' name='description' placeholder='Informe uma descrição sobre você' handleOnChange={handleChange} value={user.description}/>
            <Input text="Username Github" type='text' name='github' placeholder='Informe o seu username do Github' handleOnChange={handleChange} value={user.github}/>
            <Input text="Perfil do Linkedin" type='url' name='linkedin' placeholder='Informe o link do seu perfil no linkedin' handleOnChange={handleChange} value={user.linkedin}/>
            <Input text="E-mail" type='email' name='email' placeholder='Informe o seu e-mail' handleOnChange={handleChange} value={user.email}/>
            <Input text="CPF" type='number' name='cpf' placeholder='Informe o seu CPF' handleOnChange={handleChange} value={user.cpf}/>
            <Input text="Telefone" type='phone' name='phone' placeholder='Informe o seu Telefone' handleOnChange={handleChange} value={user.phone}/>
            <input type="submit" value="Confirmar alterações" />
            <div className={styles.links}>
              <p className={styles.form_span}>
                <Link to='/me/changePassword'>Trocar senha</Link>
              </p>
              <p className={styles.form_span}>
                <Link to='/me/delete'>Excluir conta</Link>
              </p>
            </div>
          </form>
        </div>
    </section>
  )
}
