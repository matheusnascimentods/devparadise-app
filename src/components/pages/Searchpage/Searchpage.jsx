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
    const [defaultActiveKey, setDefaultActiveKey] = useState("1");

    useEffect(() => {
        axios.all([
            axios.get(`${import.meta.env.VITE_API_URL}/project?title=${query}`),
            axios.get(`${import.meta.env.VITE_API_URL}/dev?name=${query}`),
        ])
        .then(axios.spread((projectsResponse, usersResponse) => {
            setProjects(projectsResponse.data);
            setUsers(usersResponse.data);

            if (projects.total > 0 && users.total == 0) {
                setDefaultActiveKey("1");
            }

            if (users.total > 0 && projects.total == 0) {
                setDefaultActiveKey("2");
            }

            if (users.total > 0 && projects.total > 0) {
                setDefaultActiveKey("1");
            }

            console.log(defaultActiveKey)
        }));
    });
    
    async function handleKeyDown(e) {
        if (e.key === "Enter" && e.target.value !== "") {
            navigate(`/search?q=${e.target.value}`);
        }
    }
    

    const c = "2";

    return (
        <section className={styles.searchpage_container}>
            {console.log(String(defaultActiveKey))}
            <h2>Resultados encontrados para {query}</h2>
            <Searchbar placeholder='Busque por um projeto ou por outro DEV' handleKeyDown={handleKeyDown} />
            <Tabs defaultActiveKey="1" appearance="pills">
                <Tabs.Tab eventKey="1" title="Todos">
                    {users.total > 0 ? (
                        <>
                            <h4>Usuarios</h4>
                            {Array.from(users.data).map((user) => <ProfileCard user={user} />)}
                        </>
                    ) : (
                        <p>Nada encontrado</p>
                    )}
                </Tabs.Tab>
                <Tabs.Tab eventKey="2" title="Projetos">
                    {projects.total > 0  ? (
                        Array.from(projects.data).map((project) => <Project project={project} key={project._id}  myProject={false}/>)
                    ) : (
                        <p>Nada encontrado</p>
                    )}
                </Tabs.Tab>
                <Tabs.Tab eventKey="3" title="Desenvolvedores">
                    {users.total > 0 ? (
                        Array.from(users.data).map((user) => <ProfileCard user={user} />)
                    ) : (
                        <p>Nada encontrado</p>
                    )}
                </Tabs.Tab>
            </Tabs>
        </section>
    )
}
