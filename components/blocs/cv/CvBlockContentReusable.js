import styles from 'styles/cv/CvBlockContent.module.css'
import CvBlockContentReusableMissions from './CvBlockContentReusableMissions';

export default function CvBlockContentReusable(props) {
    
    let data = props.data;

    return (
        <ul className={styles.cvContentUl}>
            {data?.map((formation, i) => (
                <li className={styles.cvBlockContentSub} key={i}>
                    <div className={styles.cvBlockContentSubSide}>
                        {formation.datezone.annee}
                    </div>
                    <div className={styles.cvBlockContentSubContent}>
                        <div className={styles.cvBlockContentSubMain}>
                            <div className={styles.cvBlockContentSubMainImg}>
                                <img src={formation.contenu.logo} alt=""/>
                            </div>
                            <div className={styles.cvBlockContentSubMainText}>
                                <label>{formation.contenu.titre}</label>
                                <b>{formation.datezone.ville}</b>
                            </div>
                        </div>
                        <div><p>{formation.contenu.description}</p></div>
                        {formation.contenu.experiences &&
                            <CvBlockContentReusableMissions data={formation.contenu.experiences} />
                        }
                    </div>
                </li>
            ))}
        </ul>
    )
}
