import React from 'react'

import styles from './Badges.module.css'
import Badge from '../Badge/Badge'

export default function Badges({list}) {
  return (
    <div className={styles.badges}>
        {list.map((item, index) => (
            <Badge key={index} data={item} />
        ))}
    </div>
  )
}
