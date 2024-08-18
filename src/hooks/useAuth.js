//API
import axios from 'axios';

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useAuth() {
    async function register(user) {
        try {
            let data = await axios.post('http://localhost:3000/dev', user)
            .then((response) => {
                return response.data
            })

            console.log(data);
            
        } catch (error) {
            console.error(error);
              
        }
    }

    return { register }
}