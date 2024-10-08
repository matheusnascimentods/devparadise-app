import React, { useEffect, useState } from 'react';

//API
import axios from 'axios';

//styles
import defaultPfp from '../../../assets/img/pfp-default.jpg';
import styles from './Me.module.css'

//Components
import { Link } from 'react-router-dom';
import RoundedImage from '../../RoundedImage/RoundedImage';
import Badges from '../../Badges/Badges';
import SmallCardContainer from '../../SmallCardConstainer/SmallCardContainer';
import Divider from '../../Divider/Divider';

//Icons
import { RxGithubLogo } from "react-icons/rx";
import { RiEditFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";

export default function Me() {

    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '');
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);
    
    useEffect(() => {
        axios.all([
            axios.get(`${import.meta.env.VITE_API_URL}/user/me`, { headers: { Authorization: `Bearer ${JSON.parse(token)}` }}),
            axios.get(`${import.meta.env.VITE_API_URL}/project/me`, { headers: { Authorization: `Bearer ${JSON.parse(token)}` }}),
        ])
        .then(axios.spread((userResponse, projectsResponse) => {
            setUser(userResponse.data.dev);
            setFollowing(userResponse.data.following);
            setFollowers(userResponse.data.followers);
            setProjects(projectsResponse.data);
        }));
    }, [token]);

    return (
        <section className={styles.card}>
            <span>
                <h1>Meu Perfil</h1>
            </span>
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
                    <button>
                        <Link to="/me/update">
                            <RiEditFill size={25}/>
                            Editar Perfil
                        </Link>
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
                        <Link to={`/user/${user.username}/connections?tab=1`}>
                            <p>{followers} Seguidores</p>
                        </Link>
                        <FaCircle color='ffb300' size={7} />
                        <Link to={`/user/${user.username}/connections?tab=2`}>
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
                                <p>Meus projetos</p> 
                            </span>
                            <SmallCardContainer data={projects.projects} />
                        </>
                    )}
                </div>
            </div>
        </div>
    </section>
    )
}