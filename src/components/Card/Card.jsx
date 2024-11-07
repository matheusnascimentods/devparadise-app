import React, { useEffect, useState } from 'react';

//API
import axios from 'axios';

import styles from './Card.module.css'

//components
import { Link } from 'react-router-dom';

//icons
import { BsPinAngleFill } from "react-icons/bs";

//images
import defaultPhoto from '../../assets/img/vasco.jpg'

export default function Card({data, color, size, showUsername, showFixed}) {
  return (
    <div className={`${styles.project_card} ${styles[size]}`} style={{ backgroundColor: color }}>
      <Link to={`/projects/${data._id}`}>
        <div className={styles.card_img}>
          <img src={data.images.length > 0 ? (
            `${import.meta.env.VITE_API_URL}/public/images/projects/${data.images[0]}`
          ) : (
            defaultPhoto
          )} alt="Imagem" />
        </div>
      </Link>
      <div className={styles.card_info}>
        <span id='vasco'>
            {showFixed && data.favorite === true && (
                  <BsPinAngleFill size={18} style={{ marginRight: "10px" }}/>
            )}
            <Link to={`/projects/${data._id}`}>
              <p>{data.title}</p>
            </Link>
          </span>
        <p>{data.description}</p>
      </div>
      {showUsername && (
        <span className={styles.author}>
          <Link to={`/user/${data.devUsername}`}>Feito por <span>@{data.devUsername}</span></Link>
        </span>
      )}
    </div>
  )
}
