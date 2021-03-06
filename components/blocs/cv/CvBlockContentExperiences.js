import styles from 'styles/Cv.module.css'
import stylesBlock from 'styles/cv/CvBlockContent.module.css'

export default function CvBlockContentExperiences(props) {
    
    let data = props.data;

    return (
        <div className={styles.cvBlockContentSub}>
            <pre>{JSON.stringify(data)}</pre>
        </div>
    )
}
