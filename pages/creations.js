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
  const [filters, setFilters] = useState([])
  const [filtersToApply, setFiltersToApply] = useState([])
  const [filtersDisplayed, setFiltersDisplayed] = useState(false)

  const observeCreationsDatas = () => {
      subscription = apiServiceMessages.getMessage().subscribe(message => {
          if(message.creationsDatas){
              setData(data => [...message.creationsDatas[1].reverse()])
              setBaseUrl(baseUrl => message.creationsDatas[0])
              extractDataFilters(message.creationsDatas[1])
              displayDataFiltered(message.creationsDatas[1])
          }
      });
  }

  const extractDataFilters = (data) => {
    let filters = data.reduce((acc, cur) => {
      cur.filters.forEach(element => {
        let indexElement = acc.map(el => el.name).indexOf(element);
        if(indexElement == -1) {
          acc.push({name: element, occ: 1 });
        }else{
          acc[indexElement].occ += 1;
        }
      });
      return acc;
    }, [])
    setFilters(filters)
  }

  const displayDataFiltered = (data) => {
      setDisplayedData(displayedData => [...data])
  }

  const handleFilter = (e) => {
    let filter = e.target.dataset.text.toLowerCase();
    let fta = filtersToApply;
    let indexOfFilter = fta.indexOf(filter);
    if(indexOfFilter == -1) {
      fta.push(filter)
    }else{
      fta.splice(indexOfFilter, 1);
    }
    setFiltersToApply(fta);
    applyFilters(fta)
  }

  const applyFilters = (filters) => {
    let dataToDisplay = data.reduce((acc, cur) => {
      cur.filters.forEach(f => {
        if(filters.indexOf(f.toLowerCase()) !== -1 && acc.indexOf(cur) === -1) {
          acc.push(cur);
        }
      });
      return acc;
    }, [])
    if(dataToDisplay.length == 0 && filters.length == 0) {
      dataToDisplay = data;
    }
    setDisplayedData(displayedData => dataToDisplay)
  }

  const handleToggleFilters = (e) => {
    e.preventDefault();
    let fd = filtersDisplayed
    setFiltersDisplayed(!fd)
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
          <div className={`${styles.creationsFilters} ${filtersDisplayed ? styles.filtersDisplayed : ''}`}>
            <h3>Filtres:</h3>
            <button onClick={handleToggleFilters} className={styles.displayFilters}>+</button>
            {filters.length > 0 &&
                <ul id="filters" className={`${styles.filtersBlocUl}`}>
                    {filters.map((value, index) => {
                        return <li key={index}><input type="checkbox" name={value.name} id={value.name} /><label onClick={(e) => handleFilter(e)} data-text={value.name} data-occ={value.occ} htmlFor={value.name}>{value.name}</label></li>
                    })}
                </ul>
            }
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
