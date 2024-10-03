import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//API
import axios from 'axios';

//components
import Profile from '../../Profile/Profile';

export default function User() {
    const {username} = useParams();
    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState({});
    const [token] = useState(localStorage.getItem('token') || undefined);   
    const navigate = useNavigate();

    useEffect(() => {
        if (token != undefined) {
            axios.get(`${import.meta.env.VITE_API_URL}/user/me`, { headers: { Authorization: `Bearer ${JSON.parse(token)}` }})
            .then((response) => {
                if (response.data.dev.username == username) {
                    navigate('/me')
                }
            })

            axios.get(`${import.meta.env.VITE_API_URL}/connection/${username}/status`, { headers: { Authorization: `Bearer ${JSON.parse(token)}` }})
            .then((response) => {
                setStatus({
                    alreadyFollowYou: response.data.alreadyFollowYou,
                    alreadyYouFollow: response.data.alreadyYouFollow,
                });
            });
        }

        axios.all([
            axios.get(`${import.meta.env.VITE_API_URL}/user?username=${username}`),
            axios.get(`${import.meta.env.VITE_API_URL}/project?author=${username}`),
        ])
        .then(axios.spread((userResponse, projectsResponse) => {
            setUser(userResponse.data.data);
            setProjects(projectsResponse.data);
        }))
        .catch((err) => {})
    }, []);

    async function handleFollow() {
        if (token == undefined) {
            navigate('/login')
        }
        if(status.alreadyYouFollow) {
            await axios.delete(`${import.meta.env.VITE_API_URL}/connection/unfollow`, 
                {
                    data: { followedId: user._id }
                }, 
                {
                    headers: { Authorization: `Bearer ${JSON.parse(token)}` }
                }
            )
            .then((response) => {
                toast.success(response.data.message, {
                    position: "bottom-right",
                    theme: "dark"
                });
                setStatus({ 
                    alreadyYouFollow: !status.alreadyYouFollow,
                    alreadyFollowYou: status.alreadyFollowYou,
                });
            }).catch((error) => {
                toast.error(error.data.message, {
                    position: "bottom-right",
                    theme: "dark"
                });
            });
        }
        if(!status.alreadyYouFollow) {
            await axios.post(`${import.meta.env.VITE_API_URL}/connection/follow`, 
                {
                    followedId: user._id
                }, 
                {
                    headers: { Authorization: `Bearer ${JSON.parse(token)}` }
                }
            )
            .then((response) => {
                toast.success(response.data.message, {
                    position: "bottom-right",
                    theme: "dark"
                });
                setStatus({ 
                    alreadyYouFollow: !status.alreadyYouFollow,
                    alreadyFollowYou: status.alreadyFollowYou,
                });
            }).catch((error) => {
                toast.error(error.data.message, {
                    position: "bottom-right",
                    theme: "dark"
                });
            });
        }
    }

    return (<Profile user={user} projects={projects} myProfile={false} handleFollow={handleFollow} status={status} />);
}
