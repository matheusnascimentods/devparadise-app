import React from 'react'
import styles from './SmallCardContainer.module.css'
import SmallCard from '../SmallCard/SmallCard'

export default function SmallCardContainer({ data }) {
    return (
        <div className={styles.small_cards_container}>
            {data.map((data) => (
                <SmallCard data={data} key={data._id} />
                ))
            }
        </div>  
    )
}
