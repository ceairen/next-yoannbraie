import styles from '../../../styles/Cv.module.css'
import CvBlockContent from './CvBlockContent';
import CvBlockHeader from './CvBlockHeader';
import CvBlockSidebar from './CvBlockSidebar';

export default function CvBlock(props) {
    
    let data = props.cv;

    console.log('Get Props', data)

    return (
        <div className={styles.cvBlock}>
            <div className={styles.cvHeader}>
                <CvBlockHeader data={data.global} />
            </div>
            <div className={styles.cvMain}>
                <div className={styles.cvMainSidebar}>
                    <CvBlockSidebar data={data.competences} />
                </div>
                <div className={styles.cvMainContent}>
                    <CvBlockContent data={data.experiences} />
                </div>
            </div>
        </div>
    )
}
