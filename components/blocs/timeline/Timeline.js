import { useEffect, useState } from 'react'
import ApiService, {apiServiceMessages} from 'services/ApiService';
import styles from 'styles/timeline/Timeline.module.css';
import globalStyles from 'styles/Globals.module.css';
import TimelineBloc from './TimelineBloc';

export default function Timeline(props) {

    let api = null;
    let subscription = null
    const threshold = 0.2
    let observer = null

    const [data, setData] = useState([])

    const observeTimelineDatas = () => {
        subscription = apiServiceMessages.getMessage().subscribe(message => {
            if(message.timelineDatas){
                setData([...message.timelineDatas])
            }
        });
    }

    const initObservation = () => {
        var options = {
            root: document.querySelector('#sectionTimeline'),
            rootMargin: '0px',
            threshold: threshold
        }
        let elements = document.querySelectorAll('.timeline-observable');
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
                targetImg.style.opacity = 1;
                target.style.opacity = 1;
                target.style.transform = "translateX(0)";
                observer.unobserve(target);
            }
        });
    }

    useEffect(() => {
        api = new ApiService();
        observeTimelineDatas();
        api.getDatasByMethod(api.method.timeline);
        return () => {
            subscription?.unsubscribe();
            observer?.disconnect();
        }
    }, [])


    return (
        <div id="timelineBloc" className={styles.timelineBloc}>
            <h1 className={globalStyles.globalh1}>Mon parcours</h1>
            {data.length > 0 &&
                <ul className={`${styles.timelineBlocUl}`}>
                    {data.map((value, index) => {
                        if(data.length -1 == index){
                            setTimeout(() => { initObservation() }, 300)
                        }
                        return <TimelineBloc key={index} indexKey={index} data={value}/>
                    })}
                </ul>
            }
        </div>
    )
}
