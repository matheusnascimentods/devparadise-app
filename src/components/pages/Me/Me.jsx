import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

//API
import axios from 'axios';

//styles
import defaultPfp from '../../../assets/img/pfp-default.jpg';
import styles from './Me.module.css'

//Components
import { Link } from 'react-router-dom';
import RoundedImage from '../../RoundedImage/RoundedImage';
import Badges from '../../Badges/Badges';
import Divider from '../../Divider/Divider';

//Icons
import { RxGithubLogo } from "react-icons/rx";
import { RiEditFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { FaLinkedin } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import Card from '../../Card/Card';

export default function Me() {

    const [user, setUser] = useState({});
    const [projects, setProjects] = useState([]);
    const [token] = useState(localStorage.getItem('token') || undefined);
    const [following, setFollowing] = useState(0);
    const [followers, setFollowers] = useState(0);
    const navigate = useNavigate();
 
    useEffect(() => {
        if (token == undefined) {
            navigate('/login');
        }

        try {
            axios.all([
                axios.get(`${import.meta.env.VITE_API_URL}/user/me`, { headers: { Authorization: `Bearer ${JSON.parse(token)}` }}),
                axios.get(`${import.meta.env.VITE_API_URL}/project/me`, { headers: { Authorization: `Bearer ${JSON.parse(token)}` }}),
            ])
            .then(axios.spread((userResponse, projectsResponse) => {
                setUser(userResponse.data.user);
                setFollowing(userResponse.data.following);
                setFollowers(userResponse.data.followers);
                setProjects(projectsResponse.data);
            }));
        } catch (error) {
            console.error('Para acessar está rota você deve estar logado!');
        }
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
                    {projects.total > 0 ? (
                        <>
                            <span className={styles.span}>
                                <Link to={'projects'}>
                                    <p>Meus projetos</p> 
                                </Link>
                            </span>
                            <div className={styles.cards_container}>  
                                {projects.projects.map((project) => (
                                    <Card data={project} color={'#16171B'} key={project._id} size={"sm"} showUsername={false} showFixed={true}/>
                                ))}
                            </div>
                        </>
                    ) : (
                        <p className={styles.create_project}>
                            O seu perfil está vazio jovem Dev, <Link to={'projects/new'}>clique aqui</Link>  para adicionar um novo projeto!
                        </p>
                    )}
                </div>
            </div>
        </div>
    </section>
    )
}