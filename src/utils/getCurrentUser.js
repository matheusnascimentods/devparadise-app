import axios from 'axios';

export async function getCurrentUser() {
  const token = localStorage.getItem('token');
  let user = null;

  if (!token) return null

  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    user = response.data.user;
  } 
  catch (error) {
    console.error(error);
    return null
  }

  return user;
}
