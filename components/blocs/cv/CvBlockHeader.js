import styles from 'styles/cv/CvBlockHeader.module.css'

export default function CvBlockHeader(props) {
    
    let data = props.data;

    return (
        <div className={styles.cvBlockHeader}>
            <div className={styles.headerImg}>
                <img alt="preview" src={data?.photo} />
            </div>
            <div className={styles.headerText}>
                <h1>{data?.prenom} {data?.nom}</h1>
                <h2>{data?.titre}</h2>
            </div>
        </div>
    )
}
