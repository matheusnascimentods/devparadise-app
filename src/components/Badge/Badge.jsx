import React from 'react'

import styles from './Badge.module.css';

export default function Badge({data}) {
  return (
    <div className={styles.badge}>
        <p>{data}</p>
    </div>
  )
}
