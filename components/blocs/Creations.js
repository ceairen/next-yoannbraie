import { useEffect, useState } from 'react'
import ApiService, { apiServiceMessages } from '../../services/ApiService';
import styles from '../../styles/blocs/Timeline.module.css';
import globalStyles from '../../styles/Globals.module.css';

export default function Creations(props) {

    let api = null;
    let subscription = null

    const [data, setData] = useState([])

    const observeCreationsDatas = () => {
        subscription = apiServiceMessages.getMessage().subscribe(message => {
            if(message.creationsDatas){
                console.log(message)
                //setData([...message.timelineDatas])
            }
        });
    }

    useEffect(() => {
        api = new ApiService();
        observeCreationsDatas();
        api.getDatasByMethod(api.method.creations);
        return () => {
            subscription?.unsubscribe();
        }
    }, [])


    return (
        <div id="creationsBloc" className={styles.creationsBloc}>
            <h1 className={globalStyles.globalh1}>Mes créations</h1>
        </div>
    )
}
