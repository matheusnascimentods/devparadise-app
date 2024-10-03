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
        axios.all([
            axios.get(`${import.meta.env.VITE_API_URL}/user/me`, { headers: { Authorization: `Bearer ${JSON.parse(token)}` }}),
            axios.get(`${import.meta.env.VITE_API_URL}/project/me`, { headers: { Authorization: `Bearer ${JSON.parse(token)}` }}),
        ])
        .then(axios.spread((userResponse, projectsResponse) => {
            setUser(userResponse.data.dev);
            setProjects(projectsResponse.data);
        }));
    }, [token]);

    return (<Profile user={user} projects={projects} myProfile={true} />)
}