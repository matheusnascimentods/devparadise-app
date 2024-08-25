import React from 'react';

import styles from './Card.module.css'

export default function Card({data}) {
  console.log(data)
  return (
    <div className={styles.card}>
        <div className={styles.card_img}>
            <img src={`http://localhost:3000/images/projects/${data.images[0]}`} alt="Imagem" />
        </div>
        <div className={styles.card_info}>
            <span>{data.title}</span>
            <p>{data.description}</p>
        </div>
    </div>
  )
}
