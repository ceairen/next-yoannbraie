import styles from 'styles/cv/CvBlockHeader.module.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function CvBlockHeader(props) {
    
    let data = props.data;

    return (
        <div className={styles.cvBlockHeader}>
            <div className={styles.headerImg}>
                <LazyLoadImage alt="preview" effect="blur" src={data?.photo} />
            </div>
            <div className={styles.headerText}>
                <h1>{data?.prenom} {data?.nom}</h1>
                <h2>{data?.titre}</h2>
            </div>
        </div>
    )
}
