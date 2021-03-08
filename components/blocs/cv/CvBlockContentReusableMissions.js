import styles from 'styles/cv/CvBlockContent.module.css'

export default function CvBlockContentReusableMissions(props) {
    
    let data = props.data;

    return (
        <>
            <h4 className={styles.headerH4}>Missions:</h4>
            <ul className={styles.cvMissions}>
                {data?.map((formation, i) => (
                    <li className={styles.cvMission} key={i}>
                        <h5>{formation.entreprise}</h5>
                        <label>{formation.periode.debut} - {formation.periode.fin}</label>
                        <p>{formation.projet}</p>
                        { formation.realisations && 
                            <ul className={styles.formationsUl}>
                                {formation.realisations.map((elt, i) => (
                                    <li key={i}>{elt}</li>
                                ))}
                            </ul>
                        }

                        { formation.environnement_technique && 
                            <ul className={styles.evtTechUl}>
                                {formation.environnement_technique.map((elt, i) => (
                                    <li key={i}>{elt}</li>
                                ))}
                            </ul>
                        }
                    </li>
                ))}
            </ul>
        </>
    )
}
