import React, { useEffect, useState } from 'react';

//styles
import 'rsuite/TagInput/styles/index.css';
import styles from './Input.module.css'

//components
import TagInput from 'rsuite/TagInput';;

export default function InputTags({text, name , placeholder, handleOnChange}) {
  return (
    <div className={styles.form_control}>
        <label htmlFor={name}>{text}:</label>
        <TagInput trigger={['Enter', 'Space', 'Comma']} placeholder={placeholder} onChange={handleOnChange} />
    </div>
  )
}
