import styles from 'styles/cv/CvBlockContent.module.css'

export default function CvBlockContentFormations(props) {
    
    let data = props.data;

    console.log(props)

    return (
        <ul className={styles.cvContentUl}>
            {data?.map((formation, i) => (
                <li className={styles.cvBlockContentSub} key={i}>
                    <div className={styles.cvBlockContentSubSide}>
                        {formation.datezone.annee}
                    </div>
                    <div className={styles.cvBlockContentSubMain}>
                        <div className={styles.cvBlockContentSubMainImg}>
                            <img src={formation.contenu.logo} alt=""/>
                        </div>
                        <div className={styles.cvBlockContentSubMainText}>
                            <label>{formation.contenu.titre}</label>
                            <b>{formation.datezone.ville}</b>
                            <p>{formation.contenu.description}</p>
                        </div>
                    </div>
      
                </li>
            ))}
        </ul>
    )
}
