import { useEffect, useState } from 'react'
import styles from 'styles/creations/Creations.module.css';
import globalStyles from 'styles/Globals.module.css';
import CreationsBloc from './CreationsBlock';
import Link from "next/link";
import ApiService, {apiServiceMessages} from 'services/ApiService';

export default function Creations(props) {

    let api = null
    let subscription = null
    let elementPerPage = 5
    const threshold = 0.2
    let observer = null

    const [baseUrl, setBaseUrl] = useState('')
    const [data, setData] = useState([])
    const [displayedData, setDisplayedData] = useState([])

    const initObservation = () => {
        var options = {
            root: document.querySelector('#creationsBloc'),
            rootMargin: '0px',
            threshold: threshold
        }
        let elements = document.querySelectorAll('.crea-observable');
        if(elements.length > 0) {
            observer = new IntersectionObserver(callbackObservation, options);
            for(let i = 0; i < elements.length; i ++){
                observer.observe(elements[i]);
            }
        }
    }
    
    const callbackObservation = (entries, observer) => {
        entries.forEach(entry => {
            if(entry.intersectionRatio > threshold){
              let target = entry.target;
              let targetImg = target.querySelector('img');
              let targetImgSrc = targetImg.dataset.src;
              targetImg.src = targetImgSrc;
              observer.unobserve(target);
            }
        });
    }

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
            {displayedData.length > 0 &&
                <ul className={`${styles.creationsBlocUl}`}>
                    {displayedData.reverse().map((value, index) => {
                        if(displayedData.length -1 == index){
                            setTimeout(() => { initObservation() }, 300)
                        }
                        return <CreationsBloc prezMode={true} baseUrl={baseUrl} key={index} data={value}/>
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
