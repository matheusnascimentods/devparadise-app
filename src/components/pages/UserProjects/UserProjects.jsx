import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

//API
import axios from 'axios';

//components
import Searchbar from '../../Searchbar/Searchbar'
import Divider from '../../Divider/Divider';
import Project from '../../Project/Project';

//styles
import styles from '../MyProjects/MyProjects.module.css'

export default function UserProjects() {
    const {username} = useParams();

    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const [results, setResults] = useState('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/user?username=${username}`)
        .then((response) => {
            setUser(response.data.user);
            setProjects(response.data.projects);
        })
        .catch((error) => console.error(error));
    }, [username]);

    async function handleKeyDown(e) {
        if (e.key === "Enter" && e.target.value !== "") {
            let query = e.target.value;

            await axios.get(`${import.meta.env.VITE_API_URL}/project?q=${query}&author=${username}`)
            .then((response) => {
                setProjects(response.data.projects);
                response.data.total > 1 ? setResults(`${response.data.total} Resultados encontrados`) : setResults(`${response.data.total} Resultado encontrado`);
            });
        }
        if (e.target.value === "") {
            await axios.get(`${import.meta.env.VITE_API_URL}/user?username=${username}`)
            .then((response) => {
                setProjects(response.data.projects);
                setResults('');
            });
        }
    }
    return (
        <section className={styles.user_projects_section}>
            <h2>Todos</h2>
            <div className={styles.search}> 
                <Searchbar id='searchbar' handleKeyDown={handleKeyDown} placeholder='Encontre um projeto'/>
            </div>
            <Divider />
            <span className={styles.results}>{results}</span>
            <div className={styles.list_projects}>
                {Array.from(projects).map((project) => <Project project={project} key={project._id} />)}
            </div>
        </section>
    )
}
