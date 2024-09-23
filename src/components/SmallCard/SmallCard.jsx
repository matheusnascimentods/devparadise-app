import React from 'react'
import styles from './SmallCard.module.css';

//icons
import { BsPinAngleFill } from "react-icons/bs";

//components
import { Link } from 'react-router-dom';

export default function SmallCard({ data }) {
  return (
    <div className={styles.small_card}>
        <Link to={`/projects/${data._id}`}>
          <div className={styles.card_img}>
              <img src={`${import.meta.env.VITE_API_URL}/images/projects/${data.images[0]}`} alt="Imagem" />
          </div>
        </Link>
        <div className={styles.card_info}>
          <span>
            {data.favorite === true && (
                  <BsPinAngleFill size={18} />
            )}
            <Link to={`/projects/${data._id}`}>
              <p>{data.title}</p>
            </Link>
          </span>
          <p>{data.description}</p>
        </div>
    </div>
  )
}
