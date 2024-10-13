import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';

//styles
import styles from './Search.module.css';
import 'rsuite/Tabs/styles/index.css';

//API
import axios from 'axios';

//components
import Searchbar from '../../Searchbar/Searchbar';
import { Tabs, Placeholder } from 'rsuite';
import Project from '../../Project/Project';
import ProfileCard from '../../ProfileCard/ProfileCard';

export default function Search() {
    const [searchParams] = useSearchParams()
    let query = searchParams.get('q');
    const navigate = useNavigate();

    const [projects, setProjects] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.all([
            axios.get(`${import.meta.env.VITE_API_URL}/project?q=${query}`),
            axios.get(`${import.meta.env.VITE_API_URL}/user?q=${query}`),
        ])
        .then(axios.spread((projectsResponse, usersResponse) => {
            setProjects(projectsResponse.data);
            setUsers(usersResponse.data);
        }));
    }, [query]);
    
    async function handleKeyDown(e) {
        if (e.key === "Enter") {
            navigate(`/search?q=${e.target.value}`);
        }
    }

    return (
        <section className={styles.searchpage_container}>
            <h2>{query ? (`Resultados encontrados para ${query}`) : ('Todos os resultados')}</h2>
            <Searchbar placeholder='Busque por um projeto ou por outro DEV' handleKeyDown={handleKeyDown} />
                <div className={styles.results_container}>
                    <Tabs defaultActiveKey="1" appearance="pills">
                        <Tabs.Tab eventKey="1" title={`Todos (${projects.total + users.total})`}>                            
                            {users.total > 0 && (             
                                <div className={styles.users_container}>
                                    <h4>Usuarios</h4>
                                    {Array.from(users.users).map((user) => <ProfileCard user={user} key={user._id} />)}
                                    
                                </div>
                            )}
                            {projects.total > 0  && (
                                <div className={styles.projects_container}>
                                    <h4>Projetos</h4>   
                                    {Array.from(projects.projects).map((project) => <Project project={project} key={project._id}  myProject={false} showPin={false}/>)}
                                </div>
                            )}
                            {!users.total > 0 && !projects.total > 0 && (
                                <p>Nada encontrado</p>
                            )}
                        </Tabs.Tab>
                        <Tabs.Tab eventKey="2" title={`Usuários (${users.total})`}>                            
                            {users.total > 0 ? (             
                                <div className={styles.users_container}>
                                    <h4>Usuarios</h4>
                                    {Array.from(users.users).map((user) => <ProfileCard user={user} />)}
                                    
                                </div>
                            ) : (
                                <p>A sua pesquisa não bate com nenhum usuário!</p>
                            )}
                        </Tabs.Tab>
                        <Tabs.Tab eventKey="3" title={`Projetos (${projects.total})`}>                            
                            {projects.total > 0  ? (
                                <div className={styles.projects_container}>
                                    <h4>Projetos</h4>   
                                    {Array.from(projects.projects).map((project) => <Project project={project} key={project._id}  myProject={false} showPin={false}/>)}
                                </div>
                            ) : (
                                <p>A sua pesquisa não bate com nenhum projeto!</p>
                            )}
                        </Tabs.Tab>
                    </Tabs>
                </div>
        </section>
    )
}
