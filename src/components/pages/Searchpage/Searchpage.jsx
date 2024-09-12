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
import Divider from '../../Divider/Divider';
import Project from '../../Project/Project';
import ProfileCard from '../../ProfileCard/ProfileCard';

export default function Searchpage() {
    const [searchParams] = useSearchParams()
    let query = searchParams.get('q');
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);

    const [users, setUsers] = useState([]);

    useEffect(() => {
        //Get projects
        axios.get(`${import.meta.env.VITE_API_URL}/project?title=${query}`)
        .then((response) => {
            setProjects(response.data.data);  
            set
        })
        .catch((error) => {
            setProjects([]);
        });   
        
        //Get users
        axios.get(`${import.meta.env.VITE_API_URL}/dev?name=${query}`)
        .then((response) => {
            setUsers(response.data.data);
        })
        .catch((error) => {
            setUsers([]);
        });
    }, []);

    async function handleKeyDown(e) {
        if (e.key === "Enter" && e.target.value !== "") {
            axios.get(`${import.meta.env.VITE_API_URL}/project?title=${e.target.value}`)
            .then((response) => {
                setProjects(response.data.data);  
            })
            .catch((error) => {
                setProjects([]);
            });   
            
            //Get users
            axios.get(`${import.meta.env.VITE_API_URL}/dev?name=${e.target.value}`)
            .then((response) => {
                setUsers(response.data.data);
            })
            .catch((error) => {
                setUsers([]);
            });
        }
    }

    Array.from(users).map((user) => {
        console.log(user)
    });
    return (
        <section className={styles.searchpage_container}>
            <h2>Resultados para {query}</h2>
            <Searchbar placeholder='Busque por um projeto ou por outro DEV' handleKeyDown={handleKeyDown} />
            <Tabs defaultActiveKey="1" appearance="pills">
                <Tabs.Tab eventKey="1" title="Projetos">
                    {projects ? (
                        Array.from(projects).map((project) => <Project project={project} key={project._id}  myProject={false}/>)
                    ) : (<p>Nada encontrado</p>)}
                </Tabs.Tab>
                <Tabs.Tab eventKey="2" title="Desenvolvedores">
                    <div className={styles.users}>
                        {users ? (
                            Array.from(users).map((user) => <ProfileCard user={user} />)
                        ) : (<p>Nada encontrado</p>)}
                    </div>
                </Tabs.Tab>
            </Tabs>
        </section>
    )
}
