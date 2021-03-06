import styles from '../../styles/Cv.module.css'
import stylesBlock from '../../styles/blocs/CvBlockContent.module.css'

export default function CvBlockContent(props) {
    
    let data = props.data;

    return (
        <div className={styles.cvBlockContent}>
            Content
        </div>
    )
}
