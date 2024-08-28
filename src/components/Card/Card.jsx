import React from 'react';

import styles from './Card.module.css'

//components
import { Link } from 'react-router-dom';

export default function Card({data}) {
  return (
    <div className={styles.card}>
      <Link to={`/dev/project/${data._id}`}>
        <div className={styles.card_img}>
          <img src={`http://localhost:3000/images/projects/${data.images[0]}`} alt="Imagem" />
        </div>
      </Link>
      <div className={styles.card_info}>
        <span>{data.title}</span>
        <p>{data.description}</p>
      </div>
    </div>
  )
}
