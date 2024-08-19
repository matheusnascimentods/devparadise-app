//API
import axios from 'axios';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function useAuth() {
    const [authenticated, SetAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            axios.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
            SetAuthenticated(true);
        }

        console.log(localStorage.getItem('token'), authenticated);
        
    }, []);

    async function register(user) {
        try {
            let data = await axios.post('http://localhost:3000/dev', user)
            .then((response) => {
                return response.data
            })

            await authUser(data);

            toast.success("Bem vindo ao Paradise!", {
                position: "bottom-right",
                theme: "dark"
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-right",
                theme: "dark"
            });
        }
    }

    async function login(user) {
        try {
            let data = await axios.post("http://localhost:3000/dev/login", user)
            .then((response) => {
                return response.data;
            });

            await authUser(data);

            toast.success("Bem vindo ao Paradise!", {
                position: "bottom-right",
                theme: "dark"
            });
        } catch (error) {
            toast.error(error.response.data.message, {
                position: "bottom-right",
                theme: "dark"
            });
        }
    }

    async function authUser(data) {
        SetAuthenticated(true);
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/');
    }

    async function logout() {
        axios.defaults.headers.Authorization = undefined;
        localStorage.removeItem('token');
        SetAuthenticated(false);

        toast.info("Sessão encerrada", {
            position: "bottom-right",
            theme: "dark"
        });

        navigate('/');
    }

    return { authenticated, logout, register, login }
}