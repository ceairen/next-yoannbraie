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

    const initBackground404 = () => {
        setKeywords([
            '404',
            '404',
            '404',
            '404',
            '404',
            '404',
            '404',
            '404',
            '404'
        ])
    }

    useEffect(() => {
        let options = props.options ?? {};
        api = new ApiService();
        
        if(options.mode && options.mode.toString() == "404") {
            initBackground404();
        }else{
            initBackground();
        }
        
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
