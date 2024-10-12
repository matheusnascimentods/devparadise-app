import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

//API
import axios from 'axios';

//styles
import defaultPfp from '../../../assets/img/pfp-default.jpg';
import styles from '../Me/Me.module.css'

//Components
import { Link } from 'react-router-dom';
import RoundedImage from '../../RoundedImage/RoundedImage';
import Badges from '../../Badges/Badges';
import Divider from '../../Divider/Divider';

//Icons
import { RxGithubLogo } from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import Card from '../../Card/Card';

export default function User() {
    const {username} = useParams();
    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const [status, setStatus] = useState({});
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);
    const [token] = useState(localStorage.getItem('token'));   
    const navigate = useNavigate();

    useEffect(() => {
        axios.all([
            axios.get(`${import.meta.env.VITE_API_URL}/user?username=${username}`),
            axios.get(`${import.meta.env.VITE_API_URL}/project?author=${username}`),
        ])
        .then(axios.spread((userResponse, projectsResponse) => {
            setUser(userResponse.data.user);
            setProjects(projectsResponse.data);
            setFollowers(userResponse.data.followers);
            setFollowing(userResponse.data.following);
        }))
        .catch((err) => {})
    }, []);

    useEffect(() => {
        if (token != undefined) {
            
            axios.get(`${import.meta.env.VITE_API_URL}/user/me`, { headers: { 
                Authorization: `Bearer ${JSON.parse(token)}` }})
            .then((response) => {
                if (response.data.user.username == username) {
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
    }, [token])

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
                updateStatus();
                setFollowers(followers - 1);
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
                updateStatus();
                setFollowers(followers + 1);
            }).catch((error) => {
                toast.error(error.data.message, {
                    position: "bottom-right",
                    theme: "dark"
                });
            });
        }
    }

    async function updateStatus() {
        setStatus({ 
            alreadyYouFollow: !status.alreadyYouFollow,
            alreadyFollowYou: status.alreadyFollowYou,
        });
    }

    return (
        <section className={styles.card}>
            <span><h1>Perfil de {user.username}</h1></span>
            <div className={styles.card_info}>
                <div className={styles.info_sidebar}>
                    <div className={styles.pfp}>
                        {user.image ? (
                            <RoundedImage src={`${import.meta.env.VITE_API_URL}/images/users/${user.image}`} alt="Foto de perfil" />
                        ) : (
                            <RoundedImage src={defaultPfp} alt="Foto de perfil" />
                        )}
                    </div>
                    <div className={styles.info}>
                        <button className={styles.follow_btn} onClick={handleFollow}>
                            {status.alreadyYouFollow && (`Seguindo`)}
                            {!status.alreadyYouFollow && !status.alreadyFollowYou && (`Seguir`)}
                            {!status.alreadyYouFollow && status.alreadyFollowYou && (`Seguir de volta`)}
                        </button>
                        <h3>Informações</h3>
                        <div className={styles.contact}>
                            <ul>
                                <li>
                                    <MdEmail color='F5A904'/>
                                    <p>{user.email}</p>
                                </li>
                                {user.github && (
                                    <li>
                                        <Link to={`https://github.com/${user.github}`} target='_blank'>
                                            <RxGithubLogo color='F5A904' />
                                            <p>{user.github}</p>
                                        </Link>
                                    </li>
                                )}
                                {user.linkedin && (
                                    <li>
                                        <Link to={user.linkedin} target='_blank'>
                                            <FaLinkedin color='F5A904' />
                                            <p>Linkedin</p>
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles.info_body}>
                    <div className={styles.info_header}>
                        <div className={styles.title}>
                            <p className={styles.name}>{user.name}</p>
                            <p className={styles.username}>@{user.username}</p>
                        </div>
                        <div className={styles.connection}>
                            <Link to='connections?tab=1'>
                                <p>{followers} Seguidores</p>
                            </Link>
                            <FaCircle color='ffb300' size={7} />
                            <Link to='connections?tab=2'>
                                <p>{following} Seguindo</p>
                            </Link>
                        </div>
                        <Divider />
                        <div className={styles.description}>
                            <p>{user.description}</p>
                        </div>
                        {user.skils && (<Badges list={user.skils} />)}
                        {projects.total > 0 && (
                            <>
                                <span className={styles.span}>
                                    <Link to='projects'>
                                        <p>Todos os projetos de {user.name}</p>
                                    </Link>
                                </span>
                                <div className={styles.cards_container}>  
                                    {projects.projects.map((project) => (
                                        <Card data={project} color={'#16171B'} key={project._id} size={"sm"} showUsername={false} showFixed={true}/>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
    </section>
    );
}
