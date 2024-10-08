import React from 'react'

//styles
import styles from './Badges.module.css'

export default function Badges({list}) {
  return (
    <div className={styles.badges}>
        {list.map((item, index) => (
            <div className={styles.badge} key={index}>
              <p>{item}</p>
            </div>
        ))}
    </div>
  )
}
