import React, { useEffect, useState } from 'react';

//API
import axios from 'axios';

//styles
import styles from './Home.module.css';

//components
import Searchbar from '../../Searchbar/Searchbar';
import Card from '../../Card/Card';

export default function Home() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/project`).then((response) => {
      setProjects(response.data.data);      
    })
  }, []);

  return (
    <section className={styles.home}>
      <h2>Buscar</h2>
      <Searchbar placeholder='Busque por um projeto ou por outro DEV' />
      <div className={styles.cards_container}>
        {projects.map((data) => (
              <Card data={data} key={data._id} />
          ))
        }
      </div>  
    </section>
  )
}
