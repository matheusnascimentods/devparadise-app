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
    const [results, setResults] = useState('');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/project/me`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response) => {
            setProjects(response.data.projects);
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
            setProjects(projects.filter(data => data._id !== project._id));
        })
        .catch((error) => {
            toast.error(error.response.message, {
                position: "bottom-right",
                theme: "dark"
            });
        });
    }

    async function handleFavorite(project) {
        await axios.patch(`${import.meta.env.VITE_API_URL}/project/favorite`, {
            id: project._id,
        }, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            }
        })
        .then((response) => {
            toast.success(response.data.message, {
                position: "bottom-right",
                theme: "dark"
            });

            let updatedData = response.data.project;

            setProjects(projects.map(project => 
                project._id === updatedData._id ? updatedData: project
            ));
        })
        .catch((error) => {
            toast.error(error.response.message, {
                position: "bottom-right",
                theme: "dark"
            });
        });
    }

    async function handleKeyDown(e) {
        if (e.key === "Enter" && e.target.value !== "") {
            let query = e.target.value;

            await axios.get(`${import.meta.env.VITE_API_URL}/project/me?q=${query}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                setProjects(response.data.projects);
                response.data.total > 1 ? setResults(`${response.data.total} Resultados encontrados`) : setResults(`${response.data.total} Resultado encontrado`);
            });
        }

        if (e.target.value === "") {
            await axios.get(`${import.meta.env.VITE_API_URL}/project/me`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`,
                },
            })
            .then((response) => {
                setProjects(response.data.projects);
                setResults('');
            });
        }
    }

    return (
        <section className={styles.user_projects_section}>
            <h2>Meus projetos</h2>
            <div className={styles.search}>
                <Searchbar id='searchbar' handleKeyDown={handleKeyDown} placeholder='Encontre um projeto'/>
                <button className={styles.btn} onClick={() => navigate('/me/projects/new')}>
                    <MdCreateNewFolder size={20}/>
                    Novo
                </button>
            </div>
            <Divider/>
            <span className={styles.results}>{results}</span>
            <div className={styles.list_projects}>
                {Array.from(projects).map((project) => <Project project={project} key={project._id} handleDelete={handleDelete} handleFavorite={handleFavorite} myProject={true} showPin={true}/>)}
            </div>
        </section>
    )
}
