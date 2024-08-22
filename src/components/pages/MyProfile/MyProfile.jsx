import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

//API
import axios from 'axios';

import styles from './MyProfile.module.css';
import defaultPfp from '../../../assets/img/pfp-default.jpg';

//Icons
import { RxGithubLogo } from "react-icons/rx";
import { RiEditFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";

//Components
import Badges from '../../Badges/Badges';
import SmallCardContainer from '../../SmallCardConstainer/SmallCardContainer';

export default function MyProfile({data}) {

    const apiUrl = "http://localhost:3000";

    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '');
    
    useEffect(() => {
        
        axios.get(`${apiUrl}/dev/get-user`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
            },
        })
        .then((response) => {
            setUser(response.data.dev);
            setProjects(response.data.projects)
        });
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
                        <img src={`${apiUrl}/images/devs/${user.image}`} alt="Foto de perfil" />
                    ) : (
                        <img src={defaultPfp} alt="Foto de perfil" />
                    )}
                </div>
                <div className={styles.info}>
                    <button>
                    <Link to="/dev/edit-profile">
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
                            {user.github ? (
                                <li>
                                    <Link to={`https://github.com/${user.github}`}>
                                        <RxGithubLogo color='F5A904' />
                                        <p>{user.github}</p>
                                    </Link>
                                </li>
                            ) : (<></>)}
                            {user.linkedin ? (
                                <li>
                                    <Link to={user.linkedin}>
                                        <FaLinkedin color='F5A904' />
                                        <p>Linkedin</p>
                                    </Link>
                                </li>
                            ) : (<></>)}
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
                    <div className={styles.divider}></div>
                    <div className={styles.description}>
                        {user.description ? (
                            <p>{user.description}</p>
                        ) : (
                            <>
                            </>
                        )}
                    </div>
                    {user.skils ? (<Badges list={user.skils} />) : (<></>)}
                    {projects ? (<SmallCardContainer data={projects} />) : (<></>)}
                </div>
            </div>
        </div>
    </section>
    )
}