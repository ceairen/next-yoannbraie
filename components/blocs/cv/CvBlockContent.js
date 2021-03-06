import styles from 'styles/Cv.module.css'
import stylesBlock from 'styles/cv/CvBlockContent.module.css'
import CvBlockContentExperiences from './CvBlockContentExperiences';
import CvBlockContentFormations from './CvBlockContentFormations';

export default function CvBlockContent(props) {
    
    let dataFormations = props.dataFormations;
    let dataExperiences = props.dataExperiences;

    return (
        <div className={styles.cvBlockContent}>
            <h3 className={styles.cvHeader3}>Formations</h3>
            <CvBlockContentFormations data={dataFormations}/>
            <h3 className={styles.cvHeader3}>Expériences</h3>
            <CvBlockContentExperiences data={dataExperiences}/>
        </div>
    )
}
