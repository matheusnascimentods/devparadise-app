import React, { useEffect, useState } from 'react';

//styles
import styles from './ProfileCard.module.css';
import defaultPfp from '../../assets/img/pfp-default.jpg';

//API
import axios from 'axios';

//components
import RoundedImage from '../RoundedImage/RoundedImage';
import Badges from '../Badges/Badges';

export default function ProfileCard({user}) {
    return (
        <div className={styles.user_card}>
            {user.image ? (
                <RoundedImage src={`${import.meta.env.VITE_API_URL}/images/devs/${user.image}`} alt="Foto de perfil" />
            ) : (
                <RoundedImage src={defaultPfp} alt="Foto de perfil" />
            )}
            <p>{user.name} - <span>@{user.username}</span></p>
            {user.skils ? (<Badges list={user.skils} />) : (<></>)}
        </div>
    )
}
