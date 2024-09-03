import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

//API
import axios from 'axios';

//styles
import styles from './ProjectView.module.css';
import { formatDate } from '../../../utils/dateUtils';
import 'rsuite/Carousel/styles/index.css';

//components
import { Carousel } from 'rsuite';

export default function ProjectView() {

  const {id} = useParams();
  const [project, setProject] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/project?id=${id}`)
    .then((response) => {
      setProject(response.data.data);
      if (project.images) {
        setImages(response.data.data.images);
      }
    })
  }, [id]);

  

  return (
    <section className={styles.info_section}>
      <div className={styles.card}>
        <div className={styles.card_header}>
          <h1>{project.title}</h1>
          <span>Criado em {formatDate(project.createdAt)}</span>
        </div>
        <div className={styles.card_body}>
          <div>
            <Carousel autoplay className="custom-slider">
              {images.map((data) => (
                <img src={`${import.meta.env.VITE_API_URL}/images/projects/${data}`} alt="Imagem" />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  )
}
