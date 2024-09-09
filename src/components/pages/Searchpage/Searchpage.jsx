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
        })
        .catch((error) => {
            setProjects([]);
        });   
        
        //Get users
        axios.get(`${import.meta.env.VITE_API_URL}/dev?username=${query}`)
        .then((response) => {
            setUsers(response.data.data);
        })
        .catch((error) => {
            setUsers([]);
        });
    }, []);

    async function handleKeyDown(e) {
        if (e.key === "Enter" && e.target.value !== "") {
          navigate(`/search?q=${e.target.value}`);
        }
    }

    async function handleDelete(e) {
        console.log('vasco')
    }   

    return (
        <section className={styles.searchpage_container}>
            <h2>Resultados para {query}</h2>
            <Searchbar placeholder='Busque por um projeto ou por outro DEV' handleKeyDown={handleKeyDown} />
            <Tabs defaultActiveKey="1" appearance="pills">
                <Tabs.Tab eventKey="1" title="Projetos">
                    {projects ? (
                        Array.from(projects).map((project) => <Project project={project} key={project._id} handleDelete={handleDelete} myProject={false}/>)
                    ) : (<p></p>)}
                </Tabs.Tab>
                <Tabs.Tab eventKey="2" title="Desenvolvedores">
                    <p>Desenvolvedores</p>
                </Tabs.Tab>
            </Tabs>
        </section>
    )
}
