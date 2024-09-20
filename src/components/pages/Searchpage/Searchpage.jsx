import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

//styles
import styles from './Searchpage.module.css';
import 'rsuite/Tabs/styles/index.css';

//API
import axios from 'axios';

//components
import Searchbar from '../../Searchbar/Searchbar';
import { Tabs, Placeholder } from 'rsuite';
import Project from '../../Project/Project';
import ProfileCard from '../../ProfileCard/ProfileCard';

export default function Searchpage() {
    const [searchParams] = useSearchParams()
    let query = searchParams.get('q');
    const navigate = useNavigate();

    const [projects, setProjects] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.all([
            axios.get(`${import.meta.env.VITE_API_URL}/project?q=${query}`),
            axios.get(`${import.meta.env.VITE_API_URL}/dev?q=${query}`),
        ])
        .then(axios.spread((projectsResponse, usersResponse) => {
            setProjects(projectsResponse.data);
            setUsers(usersResponse.data);
        }));
    });
    
    async function handleKeyDown(e) {
        if (e.key === "Enter" && e.target.value !== "") {
            navigate(`/search?q=${e.target.value}`);
        }
    }

    return (
        <section className={styles.searchpage_container}>
            <h2>Resultados encontrados para {query}</h2>
            <Searchbar placeholder='Busque por um projeto ou por outro DEV' handleKeyDown={handleKeyDown} />
                <div className={styles.results_container}>
                    {users.total > 0 ? (             
                        <div>
                            <h4>Usuarios</h4>
                            {Array.from(users.data).map((user) => <ProfileCard user={user} />)}
                            
                        </div>
                    ) : (
                        <></>
                    )}
                    {projects.total > 0  ? (
                        <div>
                            <h4>Projetos</h4>   
                            {Array.from(projects.data).map((project) => <Project project={project} key={project._id}  myProject={false}/>)}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
        </section>
    )
}
