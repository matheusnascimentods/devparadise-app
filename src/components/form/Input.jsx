import React from 'react'

//styles
import styles from './Input.module.css';

export default function Input({type , text, name , placeholder, handleOnChange, value, multiple}) {
  return (
    <div className={styles.form_control}>
        <label htmlFor={name}>{text}:</label>
        <input type={type} name={name} id={name} placeholder={placeholder} value={value} onChange={handleOnChange} {...(multiple ? {multiple} : '')} autoComplete='off'/>
    </div>
  )
}
