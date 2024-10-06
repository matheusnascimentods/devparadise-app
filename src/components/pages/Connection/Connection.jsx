import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'

//API
import axios from 'axios';

//components
import Searchbar from '../../Searchbar/Searchbar';
import { Tabs } from 'rsuite';
import ProfileCard from '../../ProfileCard/ProfileCard';

//styles
import styles from './styles.module.css'
import 'rsuite/Tabs/styles/index.css';

export default function Connection() {

  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const tab = query.get('tab');

  const { username } = useParams();
  const [following, setFollowing] = useState({});
  const [followers, setFollowers] = useState({});
  const [message, setMessage] = useState(`Todas as conexões de @${username}`);

  useEffect(() => {
    axios.all([
      axios.get(`${import.meta.env.VITE_API_URL}/connection/${username}/following`),
      axios.get(`${import.meta.env.VITE_API_URL}/connection/${username}/followers`),
    ])
    .then(axios.spread((followingResponse, followersResponse) => {
        setFollowing(followingResponse.data);
        setFollowers(followersResponse.data);
    }));
  }, [username]);

  async function handleKeyDown(e) {
    if (e.key === "Enter" && e.target.value.replace(/\s+/g, '') !== "") {
      let query = e.target.value;

      axios.all([
        axios.get(`${import.meta.env.VITE_API_URL}/connection/${username}/following?q=${query}`),
        axios.get(`${import.meta.env.VITE_API_URL}/connection/${username}/followers?q=${query}`),
      ])
      .then(axios.spread((followingResponse, followersResponse) => {
        setFollowing(followingResponse.data);
        setFollowers(followersResponse.data);
        setMessage(`Todos os resultados para ${query}`);
      }));
    }
    if (e.target.value === "") {
      axios.all([
        axios.get(`${import.meta.env.VITE_API_URL}/connection/${username}/following`),
        axios.get(`${import.meta.env.VITE_API_URL}/connection/${username}/followers`),
      ])
      .then(axios.spread((followingResponse, followersResponse) => {
          setFollowing(followingResponse.data);
          setFollowers(followersResponse.data);
          setMessage(`Todas as conexões de @${username}`);
      }));
    }
  }
  return (
    <section className={styles.connections_container}>
      <h2>{message}</h2>     
      <Searchbar placeholder="Buscar por..." handleKeyDown={handleKeyDown} />
      <div>
        <Tabs defaultActiveKey={tab} appearance='pills'>
          <Tabs.Tab eventKey="1" title={`Seguidores (${followers.total})`}>
            {followers.total > 0 ? (
              <div>
                <h4>Seguidores</h4>
                {Array.from(followers.followers).map((user) => <ProfileCard user={user} key={user._id} followIsVisible={true} />)}
              </div>
            ) : (
              <p>{username} não segue ninguem</p>)}
          </Tabs.Tab>
          <Tabs.Tab eventKey="2" title={`Seguindo (${following.total})`}>
            {following.total > 0 ? (
              <div>
                <h4>Seguindo</h4>
                {Array.from(following.following).map((user) => <ProfileCard user={user} key={user._id} followIsVisible={true} />)}
              </div>
            ) : (<p>Nada encontrado</p>)}
          </Tabs.Tab>
        </Tabs>
      </div>
    </section>
  )
}
