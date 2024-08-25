import React, { useEffect, useState } from 'react';

//API
import axios from 'axios';

//styles
import styles from './Home.module.css';

//components
import CardContainer from '../../CardContainer/CardContainer';
import Searchbar from '../../Searchbar/Searchbar';

export default function Home() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/project`).then((response) => {
      setProjects(response.data.data);      
    })
  }, []);

  return (
    <section className={styles.home}>
      <Searchbar />
      <CardContainer data={projects} />
    </section>
  )
}
