import styles from 'styles/Cv.module.css'
import stylesBlock from 'styles/cv/CvBlockSidebar.module.css'

export default function CvBlockSidebar(props) {
    
    let data = props.data;

    return (
        <div className={`${styles.cvBlockSidebar}`}>
            <h3 className={styles.cvHeader3}>Compétences</h3>
            { data &&
                <ul>
                    {data.map((competences, i) => (
                        <li className={stylesBlock.competenceBlock} key={i}>
                            <label className={styles.cvHeader4}>{competences.title}</label>
                            <ul className={stylesBlock.competenceBlockList}>
                                {competences.competences.map((competence, i) => (
                                    <li key={i}>{competence.title}</li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            }
        </div>
    )
}
