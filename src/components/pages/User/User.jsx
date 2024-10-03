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
    const [activeUser, setActiveUser] = useState({});
    const [token] = useState(localStorage.getItem('token') || undefined);   
    const [myProfile, setMyProfile] = useState(false);
    
    useEffect(() => {
        axios.all([
            axios.get(`${import.meta.env.VITE_API_URL}/user?username=${username}`),
            axios.get(`${import.meta.env.VITE_API_URL}/project?author=${username}`),
        ])
        .then(axios.spread((userResponse, projectsResponse) => {
            setUser(userResponse.data.data);
            setProjects(projectsResponse.data);
        }))
    }, [username]);
    
    useEffect(() => {
        if (token != undefined) {
            axios.get(`${import.meta.env.VITE_API_URL}/user/me`, { headers: { Authorization: `Bearer ${JSON.parse(token)}` }})
            .then((response) => {
                setActiveUser(response.data.dev);

                if (activeUser.username == username) {
                    setMyProfile(true);
                }
            })
        }
    });

    return (<Profile user={user} projects={projects} myProfile={myProfile} />);
}
