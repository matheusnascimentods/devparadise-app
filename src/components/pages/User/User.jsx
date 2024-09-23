import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//API
import axios from 'axios';

//components
import Profile from '../../Profile/Profile';

export default function User() {
    const {username} = useParams();
    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        axios.all([
            axios.get(`${import.meta.env.VITE_API_URL}/dev/get-by-username/${username}`),
            axios.get(`${import.meta.env.VITE_API_URL}/project/get-projects/${username}`),
        ])
        .then(axios.spread((userResponse, projectsResponse) => {
            setUser(userResponse.data.data);
            setProjects(projectsResponse.data);
        }))
    }, [username]);
    
    return (<Profile user={user} projects={projects} myProfile={false} />);
}
