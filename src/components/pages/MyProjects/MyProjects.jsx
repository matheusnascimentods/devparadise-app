import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

//API
import axios from 'axios';

//styles
import styles from './MyProjects.module.css';

//componets
import Searchbar from '../../Searchbar/Searchbar';
import Divider from '../../Divider/Divider';

//icons
import { MdCreateNewFolder } from "react-icons/md";
import ListProjects from '../../ListProjects/ListProjects';

export default function MyProjects() {

    const navigate = useNavigate();
    const [projects, setProjects] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/dev/my-projects`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response) => {
            setProjects(response.data.projects)
        });
    }, [token]);      

    return (
        <section className={styles.my_projects_section}>
            <h2>Meus projetos</h2>
            <div className={styles.search}>
                <Searchbar id='searchbar' placeholder='Encontre um projeto'/>
                <button className={styles.btn} onClick={() => navigate('/dev/create-project')}>
                    <MdCreateNewFolder size={20}/>
                    Novo
                </button>
            </div>
            <Divider/>
            <ListProjects projects={projects} />
        </section>
    )
}
