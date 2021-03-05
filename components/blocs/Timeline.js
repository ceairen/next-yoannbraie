import { useEffect, useState } from 'react'
import ApiService, { apiServiceMessages } from '../../services/ApiService';
import styles from '../../styles/blocs/Timeline.module.css';
import globalStyles from '../../styles/Globals.module.css';
import TimelineBloc from './TimelineBloc';

export default function Timeline(props) {

    let api = null;
    let subscription = null

    const [data, setData] = useState([])

    const observeTimelineDatas = () => {
        subscription = apiServiceMessages.getMessage().subscribe(message => {
            setData([...message.timelineDatas])
        });
    }

    useEffect(() => {
        api = new ApiService();
        api.getTimeline();
        observeTimelineDatas()
        
        return () => {
            subscription.unsubscribe();
        }
    }, [])


    return (
        <div id="timelineBloc" className={styles.timelineBloc}>
            <h1 className={globalStyles.globalh1}>Mon parcours</h1>
            {data.length > 0 &&
                <ul className={styles.timelineBlocUl}>
                    {data.map((value, index) => {
                        return <TimelineBloc key={index} indexKey={index} data={value}/>
                    })}
                </ul>
            }
        </div>
    )
}
