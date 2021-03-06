import styles from '../../../styles/Cv.module.css'
import stylesBlock from '../../../styles/cv/CvBlockContent.module.css'

export default function CvBlockContent(props) {
    
    let data = props.data;

    return (
        <div className={styles.cvBlockContent}>
            <h3 className={styles.cvHeader3}>Expériences</h3>
        </div>
    )
}
