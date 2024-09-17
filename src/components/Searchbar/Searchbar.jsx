import React, { useState } from 'react';

//styles
import styles from './Searchbar.module.css';

//components
import Input from '../form/Input';

//Icons
import { CgSearch } from "react-icons/cg";

export default function Searchbar({placeholder, handleKeyDown}) {

    return (
        <div className={styles.searchbar}>
            <div className={styles.input_container} id='input_container'>
                <CgSearch className={styles.icon} />
                <input type='search' name='search' id='search' placeholder={placeholder} onKeyDown={handleKeyDown} />
            </div>
        </div>
    )
}
