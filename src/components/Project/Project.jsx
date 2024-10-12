import React, { useEffect, useState } from 'react'
import { FaCircle } from "react-icons/fa";

//styles
import styles from './Project.module.css';
import 'rsuite/Modal/styles/index.css';
import defaultPfp from '../../assets/img/pfp-default.jpg';

//API
import axios from 'axios';

//components
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal, ButtonToolbar, Button } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';
import { Link } from 'react-router-dom';
import RoundedImage from '../RoundedImage/RoundedImage';

//Icons 
import { IoMdHeart } from "react-icons/io";
import { BsPinAngleFill } from "react-icons/bs";

export default function Project({project, handleDelete, handleFavorite, myProject}) {
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/user?id=${project.devId}`)
    .then((response) => {
      setUser(response.data.user);
    });
  }, []);

  async function handleOnClick() {
    await handleDelete(project);
    setOpen(false);
  }
  
  return (
    <div>
      <div className={styles.project_item}>
        <div className={styles.info}>
          <span>
            {project.favorite == true && (
              <BsPinAngleFill size={18} />
            )}
            <Link to={`/projects/${project._id}`}>
              <p>{project.title}</p>
            </Link>
            </span>
          {!project.technologies || !Array.isArray(project.technologies) || project.technologies.length === 0 ? 
          (<></>) : 
          (
          <div className={styles.technologies_container}>
            <FaCircle color='ffb300' size={7} />
            <ul>
              {Array.from(project.technologies).map((technologie) => <li key={technologie}>{technologie}</li>)}
            </ul>
          </div>
          )}
        </div>
        {!myProject ? (
          <div className={styles.pfp}>
            {user.image ? (
              <Link to={`/user/${user.username}`}>
                <RoundedImage src={`${import.meta.env.VITE_API_URL}/images/users/${user.image}`} alt="Foto de perfil" />
              </Link>
            ) : (
              <Link to={`/user/${user.username}`}>
                <RoundedImage src={defaultPfp} alt="Foto de perfil" />
              </Link>
            )}
          </div>
        ) : (
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" variant='success'>Opções</Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => handleFavorite(project)}>Favoritar</Dropdown.Item>
              <Dropdown.Item href={`/me/projects/update/${project._id}`}>Editar</Dropdown.Item>
              <Dropdown.Item onClick={handleOpen}>Excluir</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
      </div>
      {myProject && (
        <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
          <Modal.Body>
            <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />Realmente deseja excluir este projeto?
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleOnClick} appearance="primary" key={project._id}>
            Sim, excluir!
            </Button>
            <Button onClick={handleClose} appearance="subtle">
            Cancelar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  )
}
