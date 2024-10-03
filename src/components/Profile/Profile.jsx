import React, { useEffect, useState } from 'react';

//styles
import styles from './Profile.module.css';
import defaultPfp from '../../assets/img/pfp-default.jpg';

//components
import { Link } from 'react-router-dom';
import RoundedImage from '../RoundedImage/RoundedImage';
import Badges from '../Badges/Badges';
import SmallCardContainer from '../SmallCardConstainer/SmallCardContainer';
import Divider from '../Divider/Divider';

//Icons
import { RxGithubLogo } from "react-icons/rx";
import { RiEditFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";

export default function Profile({ user, projects, myProfile, handleFollow, status }) {

    const [message, setMessage] = useState('');

    useEffect(() => {
        if (status.alreadyYouFollow) {
            setMessage('Seguindo')
        }
        if (!status.alreadyYouFollow && !status.alreadyFollowYou) {
            setMessage('Seguir')
        }
        if (!status.alreadyYouFollow && status.alreadyFollowYou) {
            setMessage('Seguir de volta')
        }
    });

    return (
        <section className={styles.card}>
        <span>
            {myProfile ? (<h1>Meu Perfil</h1>) : (<h1>Perfil de {user.username}</h1>)}
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
                    {myProfile == true && (
                        <button>
                            <Link to="/me/update">
                                <RiEditFill size={25}/>
                                Editar Perfil
                            </Link>
                        </button>
                    )}
                    {myProfile == false && (
                        <button className={styles.follow_btn} onClick={handleFollow}>
                            {message}
                        </button>
                    )}
                    <h3>Informações</h3>
                    <div className={styles.contact}>
                        <ul>
                            <li>
                                <MdEmail color='F5A904'/>
                                <p>{user.email}</p>
                            </li>
                            {user.github ? (
                                <li>
                                    <Link to={`https://github.com/${user.github}`} target='_blank'>
                                        <RxGithubLogo color='F5A904' />
                                        <p>{user.github}</p>
                                    </Link>
                                </li>
                            ) : (<></>)}
                            {user.linkedin ? (
                                <li>
                                    <Link to={user.linkedin} target='_blank'>
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
                    {user.skils && (<Badges list={user.skils} />)}
                    {projects.total > 0 && (
                        <>
                            <span className={styles.span}>
                                {myProfile === true ? (
                                    <p>Meus projetos</p>
                                ) : (
                                    <p>Todos os projetos de {user.name}</p> 
                                )}
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
