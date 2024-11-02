import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//API
import axios from 'axios';

//styles
import styles from '../../form/Form.module.css'
import Input from '../../form/Input';
import InputTags from '../../form/TagInput';

export default function AddProject() {

  const [project, setProject] = useState({});
  const [token] = useState(localStorage.getItem(('token') || undefined));
  const navigate = useNavigate();

  useEffect(() => {
    if (token == undefined) {
        navigate('/login');
        console.error('Para acessar está rota você deve estar logado!');
    }
  }, [token]);

  function handleChange(e) {
    setProject({...project, [e.target.name]: e.target.value});
  }

  function onFileChange(e) {
    project.images = e.target.files;
  }

  function handleCreate(value, item) {
    project.technologies = value;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    let formData = new FormData();
    const projectFormData = await Object.keys(project).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < project[key].length; i++) {
          formData.append(`images`, project[key][i])
        }
      } else if(key === 'technologies') {
        for (let i = 0; i < project[key].length; i++) {
          formData.append(`technologies`, project[key][i]);
        }
      } else {
        formData.append(key, project[key]);
      }
    });

    formData.append('project', projectFormData);
    
    axios.post(`${import.meta.env.VITE_API_URL}/project`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    })
    .then((response) => {
      toast.success(response.data.message, {
        position: "bottom-right",
        theme: "dark"
      });
      navigate('/me/projects');
    })
    .catch((error) => {
      toast.error(error.response.data.message, {
        position: "bottom-right",
        theme: "dark"
      });
    });
  }

  return (
    <section className={styles.form}>
        <div className={styles.form_container}>
          <form onSubmit={handleSubmit}>
            <h1>Adicionar projeto</h1>
            <Input text='Projeto' type='text' name='title' placeholder='Informe nome do projeto' handleOnChange={handleChange}/>
            <Input text="Descrição" type='text' name='description' placeholder='Informe uma descrição sobre o seu projeto' handleOnChange={handleChange} />
            <Input text="Imagens do   projeto" type='file' name='images' handleOnChange={onFileChange} multiple={true}/>
            <InputTags text="Tecnologias" name='technologies' placeholder='Escolha as tecnologias usadas na projeto' handleOnChange={handleCreate} />
            <Input text="Repositório" type='url' name='repository' placeholder='Caso tenha um repositório desse projeto informe' handleOnChange={handleChange} />
            <Input text="Pagina do projeto" type='url' name='link' placeholder='Caso tenha uma pagina desse projeto informe' handleOnChange={handleChange} />
            <input type="submit" value="Adicionar projeto" />

          </form>
        </div>
    </section>
  )
}
