import React, { useEffect, useState } from 'react';

//API
import axios from 'axios';

//styles
import styles from './Posts.module.css';
import Card from '../../Card/Card';

export default function Posts() {
    const [posts, setPosts] = useState({});
    const [token] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/connection/following/posts`, { headers: { Authorization: `Bearer ${JSON.parse(token)}` } })
        .then((response) => {
            setPosts(response.data);
        });
    }, [token]);

    return (
        <section className={styles.posts}>
            <h2>{posts.message}</h2>
            <div className={styles.cards_container}>
                {posts.total > 0 && (
                    posts.projects.map((project) => (
                        <Card data={project} key={project._id} color={'#21242A'} size={"bg"} showUsername={true} showFixed={false}/>
                    ))
                )}
            </div>
        </section>
    )
}
