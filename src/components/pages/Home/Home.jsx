import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//API
import axios from 'axios';

//styles
import styles from './Home.module.css';

//components
import Searchbar from '../../Searchbar/Searchbar';
import Card from '../../Card/Card';


export default function Home() {

  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/project`).then((response) => {
      setProjects(response.data.data);      
    })
  }, []);

  async function handleKeyDown(e) {
    if (e.key === "Enter") {
      navigate(`/search?q=${e.target.value}`);
    }
  }

  return (
    <section className={styles.home}>
      <h2>Buscar</h2>
      <Searchbar placeholder='Busque por um projeto ou por outro DEV' handleKeyDown={handleKeyDown} />
      <div className={styles.cards_container}>
        {projects.map((data) => (
              <Card data={data} key={data._id} />
          ))
        }
      </div>  
    </section>
  )
}
