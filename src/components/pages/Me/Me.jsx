import React, { useEffect, useState } from 'react';

//API
import axios from 'axios';
import Profile from '../../Profile/Profile';

//styles
export default function Me({data}) {

    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '');
    
    useEffect(() => {
        
        axios.get(`${import.meta.env.VITE_API_URL}/dev/get-user`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response) => {
            setUser(response.data.dev);
            setProjects(response.data.projects);
        });
    }, [token]);

    return (<Profile user={user} projects={projects} myProfile={true} />)
}