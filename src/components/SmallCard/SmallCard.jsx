import React from 'react'
import styles from './SmallCard.module.css'

export default function SmallCard({ data }) {
  console.log(data);
  
  return (
    <div className={styles.small_card}>
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
