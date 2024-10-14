import React from 'react'

//styles
import styles from './About.module.css';

//Icons
import { RxGithubLogo } from "react-icons/rx";

//Components
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.title_section}>
        <h2>Sobre o DEVparadise</h2>
      </div>
      <div className={styles.body_section}>
        <p>
          O projeto "DevParadise" é parte do TCC do curso técnico de Desenvolvimento de Sistemas da ETEC Professor Camargo Aranha. 
          Esta plataforma inovadora foi criada para ajudar desenvolvedores que ainda estão na escola a expor seus projetos de forma prática e eficaz. 
          O site funciona como um portfólio digital, permitindo que os usuários compartilhem suas habilidades e criações, promovendo a visibilidade e 
          o networking entre estudantes da área. Com uma interface amigável e recursos intuitivos, o DevParadise busca inspirar e apoiar a próxima geração de 
          desenvolvedores.
        </p>
        <ul>
          <li>
            <RxGithubLogo color='F5A904' size={25} />
            <Link to={"https://github.com/matheusnascimentods/devparadise-api"}>
              <p>
                Ver repositório da API
              </p>
            </Link>
          </li>
          <li>
            <RxGithubLogo color='F5A904' size={25} />
            <Link to={"https://github.com/matheusnascimentods/devparadise-app"}>
              <p>
                Ver repositório do site
              </p>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
