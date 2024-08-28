import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//API
import axios from 'axios';

//styles
import styles from './ListProjects.module.css';

//component
import Project from '../Project/Project';

export default function ListProjects({projects}) {

    let [token] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();
    
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
        <>
        <div className={styles.list_projects}>
            {Array.from(projects).map((project) => <Project project={project} handleDelete={handleDelete} key={project._id}/>)}
        </div>
        </>
    )
}
