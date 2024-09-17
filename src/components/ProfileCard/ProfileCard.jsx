import React, { useEffect, useState } from 'react';

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

export default function ProfileCard({user}) {
    return (
        <div className={styles.user_card}>
            <Link to={`/dev/${user.username}`}>
                {user.image ? (
                    <RoundedImage src={`${import.meta.env.VITE_API_URL}/images/devs/${user.image}`} alt="Foto de perfil" />
                ) : (
                    <RoundedImage src={defaultPfp} alt="Foto de perfil" />
                )}
            </Link>
            <div className={styles.card_info}>
                <Link to={`/dev/${user.username}`}>
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
            
        </div>
    )
}
