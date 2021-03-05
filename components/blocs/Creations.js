import { useEffect, useState } from 'react'
import ApiService, { apiServiceMessages } from '../../services/ApiService';
import styles from '../../styles/blocs/Creations.module.css';
import globalStyles from '../../styles/Globals.module.css';
import CreationsBloc from './CreationsBlock';
import Link from "next/link";

export default function Creations(props) {

    let api = null
    let subscription = null
    let elementPerPage = 5

    const [baseUrl, setBaseUrl] = useState('')
    const [data, setData] = useState([])
    const [displayedData, setDisplayedData] = useState([])

    const observeCreationsDatas = () => {
        subscription = apiServiceMessages.getMessage().subscribe(message => {
            if(message.creationsDatas){
                setData(data => [...message.creationsDatas[1]])
                setBaseUrl(baseUrl => message.creationsDatas[0])
                displayDataPaginated(message.creationsDatas[1], 0)
            }
        });
    }

    const displayDataPaginated = (data, start) => {
        let paginatedData = data.slice(start, start + elementPerPage)
        setDisplayedData(displayedData => [...paginatedData])
        console.log(paginatedData)
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
            {data.length > 0 &&
                <ul className={`${styles.creationsBlocUl}`}>
                    {displayedData.reverse().map((value, index) => {
                        return <CreationsBloc baseUrl={baseUrl} key={index} data={value}/>
                    })}
                </ul>
            }
            <div className={globalStyles.globalCenterBlock}>
                <Link href="/creations">
                    <a className={globalStyles.globalButtonLink}>Voir tout</a>
                </Link>
            </div>
        </div>
    )
}
