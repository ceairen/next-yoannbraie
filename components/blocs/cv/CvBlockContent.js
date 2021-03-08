import styles from 'styles/Cv.module.css'
import stylesBlock from 'styles/cv/CvBlockContent.module.css'
import CvBlockContentReusable from './CvBlockContentReusable';

export default function CvBlockContent(props) {
    
    let dataFormations = props.dataFormations;
    let dataExperiences = props.dataExperiences;

    return (
        <div className={styles.cvBlockContent}>
            <h3 className={styles.cvHeader3}>Formations</h3>
            <CvBlockContentReusable data={dataFormations}/>
            <h3 className={styles.cvHeader3}>Expériences</h3>
            <CvBlockContentReusable data={dataExperiences}/>
        </div>
    )
}
