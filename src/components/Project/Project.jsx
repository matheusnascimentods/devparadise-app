import React from 'react'
import { FaCircle } from "react-icons/fa";

//styles
import styles from './Project.module.css';
import 'rsuite/Modal/styles/index.css';

//components
import Dropdown from 'react-bootstrap/Dropdown';
import { Modal, ButtonToolbar, Button } from 'rsuite';
import RemindIcon from '@rsuite/icons/legacy/Remind';

export default function Project({project, handleDelete}) {
  //modal
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  async function handleOnClick() {
    await handleDelete(project);
    setOpen(false);
  }
  
  return (
    <>
    <div className={styles.project_item}>
      <div className={styles.info}>
        <span>{project.title}</span>
        {!project.technologies || !Array.isArray(project.technologies) || project.technologies.length === 0 ? 
        (<></>) : 
        (
          <div className={styles.technologies_container}>
            <FaCircle color='ffb300' size={7} />
            <ul>
              {Array.from(project.technologies).map((technologie) => <li>{technologie}</li>)}
            </ul>
          </div>
        )}
      </div>
      <Dropdown>
        <Dropdown.Toggle id="dropdown-basic" variant='success'>Opções</Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleOpen}>Excluir</Dropdown.Item>
          <Dropdown.Item href="#/action-2">Editar</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
    <Modal backdrop="static" role="alertdialog" open={open} onClose={handleClose} size="xs">
      <Modal.Body>
        <RemindIcon style={{ color: '#ffb300', fontSize: 24 }} />Realmente deseja excluir este projeto?</Modal.Body>
      <Modal.Footer>
        <Button onClick={handleOnClick} appearance="primary" key={project._id}>
          Sim, excluir!
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          Cancelar
        </Button>
      </Modal.Footer>
    </Modal>
    </>
  )
}
