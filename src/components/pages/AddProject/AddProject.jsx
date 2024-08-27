import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//API
import axios from 'axios';

//styles
import styles from '../../form/Form.module.css'
import Input from '../../Form/Input';

export default function AddProject() {

  const [project, setProject] = useState({});
  const [token] = useState(localStorage.getItem(('token') || ''));
  const navigate = useNavigate();

  function handleChange(e) {
    setProject({...project, [e.target.name]: e.target.value});
  }

  function onFileChange(e) {
    project.images = e.target.files;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    
    let formData = new FormData();
    const projectFormData = await Object.keys(project).forEach((key) => {
      if (key === 'images') {
        for (let i = 0; i < project[key].length; i++) {
          formData.append(`images`, project[key][i])
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
      navigate('/dev/my-projects');
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
            <Input text="Imagens do projeto" type='file' name='images' handleOnChange={onFileChange} multiple={true}/>
            <Input text="Repositório" type='url' name='repository' placeholder='Caso tenha um repositório desse projeto informe' handleOnChange={handleChange} />
            <input type="submit" value="Adicionar projeto" />

          </form>
        </div>
    </section>
  )
}