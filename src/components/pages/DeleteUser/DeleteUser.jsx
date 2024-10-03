import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../../context/UserContext';
import { toast } from 'react-toastify';

//API
import axios from 'axios';

//styles
import styles from './DeleteUser.module.css';

//Components
import { Link } from 'react-router-dom';
import Input from '../../Form/Input';

export default function DeleteUser() {

    const [password, setPassword] = useState('');
    const [token] = useState(localStorage.getItem('token') || '');
    const {logout} = useContext(Context)

    function handleChange(e) {
        setPassword(e.target.value);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        let body = {
            password: password
        }

        await axios.delete(`${import.meta.env.VITE_API_URL}/user`, {
            data: {
                password: password
            }
        }, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            },
        })
        .then((response) => {
            toast.success("O Paradise sentira sua falta :(", {
                position: "bottom-right",
                theme: "dark"
            });
            logout();
        })
        .catch((error) =>{
            toast.error(error.response.data.message, {
                position: "bottom-right",
                theme: "dark"
            });
        });
    }

    return (
        <section className={styles.delete_section}>
            <div className={styles.card}> 
                <div className={styles.card_header}>
                    <h1>Deseja excluir a sua conta?</h1>
                </div>
                <div className={styles.card_body}>
                    <p>
                        Ao excluir sua conta, todas as suas informações serão permanentemente removidos da nossa plataforma. 
                        Essa ação não poderá ser desfeita, e todo o conteúdo associado à sua conta será perdido. 
                        Antes de prosseguir, tenha certeza de que não há informações ou projetos que você gostaria 
                        de manter, pois não será possível recuperá-los após a exclusão.
                        Você tem certeza de que deseja excluir sua conta de forma permanente?
                    </p>
                    <div className={styles.form}>
                        <form onSubmit={handleSubmit}>
                            <Input text="Informe a sua senha para excluir a conta" type='password' name='password' placeholder='Senha' handleOnChange={handleChange}/>
                            <div className={styles.buttons}>
                                <button className={styles.cancel_btn}>
                                    <Link to='/'>
                                        Cancelar
                                    </Link>
                                </button>
                                <button className={styles.delete_btn} type='submit'>
                                    Excluir conta
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
