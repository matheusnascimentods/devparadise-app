import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

//styles
import styles from './ProfileCard.module.css';
import defaultPfp from '../../assets/img/pfp-default.jpg';
import { FaCircle } from "react-icons/fa";

//API
import axios from 'axios';

//components
import RoundedImage from '../RoundedImage/RoundedImage';
import Badges from '../Badges/Badges';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function ProfileCard({user, followIsVisible}) {

    const [token] = useState(localStorage.getItem('token') || undefined);
    const [status, setStatus] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (token != undefined) {
            axios.get(`${import.meta.env.VITE_API_URL}/connection/${user.username}/status`, { headers: { Authorization: `Bearer ${JSON.parse(token)}` }})
            .then((response) => {
                setStatus({
                    alreadyFollowYou: response.data.alreadyFollowYou,
                    alreadyYouFollow: response.data.alreadyYouFollow,
                });
            });
        }
    }, [token]);

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
            }).catch((error) => {
                toast.error(error.response.data.message, {
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
            }).catch((error) => {
                toast.error(error.response.data.message, {
                    position: "bottom-right",
                    theme: "dark"
                });
            });
        }
    }

    async function updateStatus() {
        setStatus({
            alreadyFollowYou: status.alreadyFollowYou,
            alreadyYouFollow: !status.alreadyYouFollow,
        })
    }
    
    return (
        <div className={styles.user_card}>
            <Link to={`/user/${user.username}`}>
                {user.image ? (
                    <RoundedImage src={`${import.meta.env.VITE_API_URL}/public/images/users/${user.image}`} alt="Foto de perfil" />
                ) : (
                    <RoundedImage src={defaultPfp} alt="Foto de perfil" />
                )}
            </Link>
            <div className={styles.card_info}>
                <Link to={`/user/${user.username}`}>
                    <p>{user.name} - <span>@{user.username}</span></p>
                </Link>
                {!user.skils || !Array.isArray(user.skils) || user.skils.lenght === 0 ? 
                (<></>) : (
                    <div className={styles.skils}>
                        <FaCircle color='ffb300' size={7} />
                        <ul>
                            {Array.from(user.skils).map((skil) => <li key={skil}>{skil}</li>)}
                        </ul>
                    </div>
                )} 
            </div>
            {followIsVisible && (
                <button className={styles.follow_btn} onClick={handleFollow}>
                    {status.alreadyYouFollow && (`Seguindo`)}
                    {!status.alreadyYouFollow && !status.alreadyFollowYou && (`Seguir`)}
                    {!status.alreadyYouFollow && status.alreadyFollowYou && (`Seguir de volta`)}
                </button>
            )}
        </div>
    )
}
