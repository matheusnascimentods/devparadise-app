import React from 'react'
import styles from './CardContainer.module.css'
import Card from '../Card/Card'

export default function CardContainer({ data }) {
  
  return (
    <div className={styles.cards_container}>
    {data.map((data) => (
          <Card data={data} key={data._id} />
      ))
    }
    </div>  
  )
}
