import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from '../../form/Form.module.css';

//API
import axios from 'axios';

//Components
import Input from '../../form/Input';
import { toast } from 'react-toastify';

export default function Changepassword({}) {

    const [data, setData] = useState({});
    const apiUrl = "http://localhost:3000";
    const [token] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    function handleChange(e) {
        setData({...data, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault();

        await axios.patch(`${apiUrl}/dev/change-password`, data, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        })
        .then((response) => {
            toast.success(response.data.message, {
                position: "bottom-right",
                theme: "dark"
            });
            navigate('/');
        })
        .catch((error) => {
            toast.error(error.response.data.message, {
                position: "bottom-right",
                theme: "dark"
            });
        });

    }

    return (
        <section className={styles.form}>
            <div className={styles.form_container}>
            <form onSubmit={handleSubmit}>
                <h1>Trocar senha</h1>
                <Input text="Senha" type='password' name='password' placeholder='Informe a sua senha' handleOnChange={handleChange}/>
                <Input text="Nova senha" type='password' name='newPassword' placeholder='Informe sua nova senha' handleOnChange={handleChange}/>
                <Input text="Confirmação de senha" type='password' name='confirmPassword' placeholder='Confirme sua senha' handleOnChange={handleChange}/>
                <input type="submit" value="Trocar senha" />
            </form>
            </div>
        </section>
    )
}
