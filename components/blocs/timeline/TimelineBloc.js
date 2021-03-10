import styles from 'styles/timeline/Timeline.module.css'
import globalStyles from 'styles/Globals.module.css'

export default function TimelineBloc(props) {

    let data = props.data;

    return (
        <>
            {data !== null &&
                <li className={`${styles.timelineBlocCard} timeline-observable ${props?.indexKey % 2 !== 0 ? styles.leftTimelineBlocCard : styles.rightTimelineBlocCard}`}>
                    <div className={styles.timelineBlocCardHeader}>
                        <img alt="logo-timeline" data-src={data.contenu.logo} src={null}/>
                        <h3>{data.contenu.titre}</h3>
                    </div>
                    <hr className={globalStyles.miniSeparator} />
                    <div className={styles.timelineBlocCardContent}>
                        <label>{data.contenu.poste}</label>
                        <p>{data.contenu.description}</p>
                        {data.contenu.missions.map((elt, i) => (
                            <ul key={i}>
                                <li>{elt}</li>
                            </ul>
                        ))}
                    </div>
                    <hr className={globalStyles.miniSeparatorRight} />
                    <div className={styles.timelineBlocCardFooter}>
                        <label>{data.datezone.ville}</label>
                        <p>{data.datezone.annee}</p>
                    </div>
                </li>
            }
        </>
    )
}
