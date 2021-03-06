import { useEffect, useState } from 'react'
import styles from 'styles/utils/BackgroundAnimated.module.css'
import ApiService from 'services/ApiService'

export default function BackgroundAnimated(props) {

    let api = null;
    
    const [keywords, setKeywords] = useState([])

    const initBackground = () => {
        let keywords = api.getKeywords();
        setKeywords([...keywords]);
        
    }

    useEffect(() => {
        api = new ApiService();

        initBackground();
        
        return () => {
            api = null;
        }
    }, [])


    return (
        <div id="bgBloc" className={styles.backgroundBloc}>
            <ul className={styles.backgroundBlocFlex}>
                {keywords.map((value, index) => {
                    return <li key={index}><label className={styles.backgroundBlocFlexLabel}>{value}</label></li>
                })}
            </ul>
        </div>
    )
}
