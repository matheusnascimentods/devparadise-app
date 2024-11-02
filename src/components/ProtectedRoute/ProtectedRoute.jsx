import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../utils/getCurrentUser';

export default function ProtectedRoute({ children }) {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);   

    useEffect(() => {
        async function fetchUser() {
          const currentUser = await getCurrentUser();
          setUser(currentUser);

          if (user === null) {
            navigate('/login');
            toast.error('Para acessar está rota você deve estar logado!', {
              position: "bottom-right",
              theme: "dark"
            });
          }
        console.log(user);
        
        }
    
        fetchUser();
    });

    return children
}
