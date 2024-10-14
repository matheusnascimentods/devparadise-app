import React from 'react'

//Components
import { Link } from 'react-router-dom';

import styles from './NotFound.module.css';

export default function NotFound() {
  return (
    <section className={styles.not_found_container}>
      <div>
        <h3>404</h3>
        <p>Nada encontrado</p>
        <p>
          Clique <Link to='/'>aqui</Link> para voltar para o inicío
        </p>
      </div>
    </section>
  )
}
