import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

//API
import axios from 'axios';

//components
import Profile from '../../Profile/Profile';

export default function UserProfile() {
    const {username} = useParams();
    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/dev?username=${username}`)
        .then((response) => {
            setUser(response.data.data);
            setProjects(response.data.projects);
        });
    }, [username]);
    
    return (<Profile user={user} projects={projects} myProfile={false} />);
}
