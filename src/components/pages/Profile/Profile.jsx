import React, { useEffect, useState } from 'react';

//API
import axios from 'axios';

//styles
import styles from './Profile.module.css';
import defaultPfp from '../../../assets/img/pfp-default.jpg';

//Components
import { Link, useParams } from 'react-router-dom';
import Badges from '../../Badges/Badges';
import SmallCardContainer from '../../SmallCardConstainer/SmallCardContainer';
import RoundedImage from '../../RoundedImage/RoundedImage';

//Icons
import { RxGithubLogo } from "react-icons/rx";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import Divider from '../../Divider/Divider';

export default function Profile() {
    const {username} = useParams();
    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/dev?username=${username}`)
        .then((response) => {
            setUser(response.data.data);          
        });

        axios.get(`${import.meta.env.VITE_API_URL}/dev/get-projects/${user._id}`)
        .then((response) => {
            setProjects(response.data.data);          
        });
    }, [username]);
    
    return (
        <section className={styles.card}>
        <span>
            <h1>Meu Perfil</h1>
        </span>
        <div className={styles.card_info}>
            <div className={styles.info_sidebar}>
                <div className={styles.pfp}>
                    {user.image ? (
                        <RoundedImage src={`${import.meta.env.VITE_API_URL}/images/devs/${user.image}`} alt="Foto de perfil" />
                    ) : (
                        <RoundedImage src={defaultPfp} alt="Foto de perfil" />
                    )}
                </div>
                <div className={styles.info}>
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
                    <Divider />
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
