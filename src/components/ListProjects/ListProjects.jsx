import React from 'react'

//styles
import styles from './ListProjects.module.css';

//component
import Project from '../Project/Project';

export default function ListProjects({projects}) {

    function handle(e) {
        console.log(e);
        
    }

    return (
        <>
        <div className={styles.list_projects}>
            {Array.from(projects).map((project) => <Project project={project} handle={handle} key={project._id}/>)}
        </div>
        </>
    )
}
