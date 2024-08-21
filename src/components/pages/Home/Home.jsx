import React, { useEffect, useState } from 'react';

//API
import axios from 'axios';

import styles from './Home.module.css';
import CardContainer from '../../CardContainer/CardContainer';
import Searchbar from '../../Searchbar/Searchbar';

export default function Home() {

  const [projects, setProjects] = useState([]);
  const apiUrl = "http://localhost:3000";

  useEffect(() => {
    axios.get(`${apiUrl}/project`).then((response) => {
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
