import Layout from 'components/encapsulation/Layout'
import Section from 'components/encapsulation/Section'
import { useEffect, useState } from 'react';
import styles from 'styles/Creations.module.css'
import globalStyles from 'styles/Globals.module.css';
import ApiService, {apiServiceMessages} from 'services/ApiService';
import CreationsBloc from 'components/blocs/creations/CreationsBlock';

export default function Creations() {
  
  let api = null
  let subscription = null

  const [baseUrl, setBaseUrl] = useState('')
  const [data, setData] = useState([])
  const [displayedData, setDisplayedData] = useState([])

  const observeCreationsDatas = () => {
      subscription = apiServiceMessages.getMessage().subscribe(message => {
          if(message.creationsDatas){
              setData(data => [...message.creationsDatas[1]])
              setBaseUrl(baseUrl => message.creationsDatas[0])
              displayDataFiltered(message.creationsDatas[1])
          }
      });
  }

  const extractDataFilters = (data) => {
    let filters = data.reduce((acc, cur) => {
      cur.filters.forEach(element => {
        if(acc.indexOf(element) == -1) {
          acc.push(element);
        }
      });
      return acc;
    }, [])
    console.log(filters)
  }

  const displayDataFiltered = (data) => {
      extractDataFilters(data)
      setDisplayedData(displayedData => [...data.reverse()])
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
    <Layout titlePage="Créations">
      <Section>
        <h1 className={globalStyles.globalh1}>Mes créations</h1>
        <div className={styles.creationsFlex}>
          <div className={styles.creationsFilters}>
            <h3>Filtres:</h3>
          </div>
          <div className={styles.creationsContent}>
            {displayedData.length > 0 &&
                <ul className={`${styles.creationsBlocUl}`}>
                    {displayedData.reverse().map((value, index) => {
                        return <CreationsBloc baseUrl={baseUrl} key={index} data={value}/>
                    })}
                </ul>
            }
          </div>
        </div>
      </Section>
    </Layout>
  )
}
