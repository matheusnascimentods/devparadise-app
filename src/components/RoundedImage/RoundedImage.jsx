import React from 'react'

//styles
import styles from './RoundedImage.module.css';

export default function RoundedImage({src, alt}) {
  return (
    <img className={styles.rounded_image} src={src} alt={alt} />
  )
}
