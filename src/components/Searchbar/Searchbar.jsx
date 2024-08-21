import React from 'react';
import styles from './Searchbar.module.css';
import Input from '../form/Input';

import { CgSearch } from "react-icons/cg";

export default function Searchbar() {

    function handleChange(e) {
        
    }

    return (
        <div className={styles.searchbar}>
            <h2>Buscar</h2>
            <div className={styles.input_container}>
                <CgSearch className={styles.icon} />
                <input type='search' name='search' id='search' placeholder='Busque por um projeto ou por outro DEV' onChange={handleChange} />
            </div>
        </div>
    )
}
