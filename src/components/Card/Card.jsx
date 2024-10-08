import React, { useEffect, useState } from 'react';

//API
import axios from 'axios';

import styles from './Card.module.css'

//components
import { Link } from 'react-router-dom';

export default function Card({data}) {
  return (
    <div className={styles.card}>
      <Link to={`/projects/${data._id}`}>
        <div className={styles.card_img}>
          <img src={`${import.meta.env.VITE_API_URL}/images/projects/${data.images[0]}`} alt="Imagem" />
        </div>
      </Link>
      <div className={styles.card_info}>
        <Link to={`/projects/${data._id}`}>
          <span>{data.title}</span>
        </Link>
        <p>{data.description}</p>
      </div>
      <span className={styles.author}>
        <Link to={`/user/${data.devUsername}`}>Feito por <span>@{data.devUsername}</span></Link>
      </span>
    </div>
  )
}
