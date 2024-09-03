import React from 'react'
import styles from './SmallCard.module.css';

//components
import { Link } from 'react-router-dom';

export default function SmallCard({ data }) {
  return (
    <div className={styles.small_card}>
        <Link to={`/dev/project/${data._id}`}>
          <div className={styles.card_img}>
              <img src={`${import.meta.env.VITE_API_URL}/images/projects/${data.images[0]}`} alt="Imagem" />
          </div>
        </Link>
        <div className={styles.card_info}>
          <Link to={`/dev/project/${data._id}`}>
            <span>{data.title}</span>
          </Link>
          <p>{data.description}</p>
        </div>
    </div>
  )
}
