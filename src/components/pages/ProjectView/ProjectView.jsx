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
import Badges from '../../Badges/Badges';
import { Link } from 'react-router-dom';

//Icons
import { RxGithubLogo } from "react-icons/rx";
import { RiLink } from "react-icons/ri";

export default function ProjectView() {

  const {id} = useParams();
  const [project, setProject] = useState({});
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/project/get-by-id/${id}`)
    .then((response) => {
      setProject(response.data.data);
    });

    axios.get(`${import.meta.env.VITE_API_URL}/project/get-images/${id}`)
    .then((response) => {
      setImages(response.data.images);
    });
  }, [id]);

  return (
    <section className={styles.info_section}>
      <div className={styles.card}>
        <div className={styles.card_header}>
          <h1>{project.title}</h1>
          <span>Desenvolvido por <Link to={`/user/${project.devUsername}`}>@{project.devUsername}</Link> em {formatDate(project.createdAt)}</span>
        </div>
        <div className={styles.card_body}>
          <div className={styles.card_carousel}>
            {images && (
              <Carousel autoplay className="custom-slider">
                {images.map((image) => (
                  <img src={`${import.meta.env.VITE_API_URL}/images/projects/${image}`} alt='imagem' key={image}/>
                ))}
              </Carousel>
            )}
          </div>
          {project.technologies ? (<Badges list={Array.from(project.technologies)} />) : (<></>)}
          <p className={styles.description}><span>Descrição:</span> {project.description}</p>
          <ul className={styles.links}>
            {project.repository && (
              <li className={styles.github}>
                <Link to={`${project.repository}`} target='_blank'>
                    <RxGithubLogo color='FFFFFF' size={22} />
                    <p>Ir para o Github</p>
                </Link>
              </li>
            )}
            {project.link && (
              <li className={styles.link}>
                <Link to={`${project.link}`} target='_blank'> 
                  <RiLink color='FFFFFF' size={22}/>
                  <p>Ir para página do projeto</p>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}
