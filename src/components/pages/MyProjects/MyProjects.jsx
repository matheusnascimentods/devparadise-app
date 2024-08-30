import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//API
import axios from 'axios';

//styles
import styles from './MyProjects.module.css';

//componets
import Searchbar from '../../Searchbar/Searchbar';
import Divider from '../../Divider/Divider';
import Project from '../../Project/Project';

//icons
import { MdCreateNewFolder } from "react-icons/md";

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

    async function handleDelete(project) {
        await axios.delete(`${import.meta.env.VITE_API_URL}/project/${project._id}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response) => {
            toast.success(response.data.message, {
                position: "bottom-right",
                theme: "dark"
            });
            window.location.reload();
        })
        .catch((error) => {
            toast.error(error.data.message, {
                position: "bottom-right",
                theme: "dark"
            });
        });
    }

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
            <div className={styles.list_projects}>
                {Array.from(projects).map((project) => <Project project={project} handleDelete={handleDelete} key={project._id}/>)}
            </div>
        </section>
    )
}
