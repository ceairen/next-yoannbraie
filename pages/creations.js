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
  const threshold = 0.2
  let observer = null
  let resizeListener = null
  let resizeTimeout = null

  const [baseUrl, setBaseUrl] = useState('')
  const [data, setData] = useState([])
  const [displayedData, setDisplayedData] = useState([])
  const [filters, setFilters] = useState([])
  const [filtersToApply, setFiltersToApply] = useState([])
  const [filtersDisplayed, setFiltersDisplayed] = useState(false)

  const reportWindowSize = () => {
    clearTimeout(resizeTimeout)
    resizeTimeout = setTimeout(() => {
      reorderChilds()
    }, (500))
  }

  const reinitChilds = () => {

  }

  const reorderChilds = () => {
    if(resizeListener == null) {
      resizeListener = window.addEventListener('resize', reportWindowSize);
    }
    let container = document.querySelector('#creaBlockUl');
    container.style.width = null;
    let elements = document.querySelectorAll('.crea-observable');
    let elementSize = {width: elements[0].offsetWidth, height: elements[0].offsetHeight};
    let contentSize = {width: container.offsetWidth, height: container.offsetHeight}
    let elementsPerRow = Math.floor(contentSize.width / elementSize.width);
    let position = {row: 0, col: 0, index: 0};
    let newCol = 0;
    let newRow = 0;
    console.log(elementsPerRow)
    for(var i = 0; i < elements.length; i++) {
      let index = i;
      let el = elements[index]
      if(!el.classList.contains('tohide')){
        if(newCol >= elementsPerRow) {
          newCol = 0;
          newRow += 1;
        }
        position = {row: newRow, col: newCol, index: index}
        newCol += 1;
        updateChildPosition(el, position, {cS: contentSize, eS: elementSize, hide: false})
      }else{
        updateChildPosition(el, position, {cS: contentSize, eS: elementSize, hide: true})
      }
    }
    container.style.height = `${elementSize.height * (position.row + 1)}px`;
    if(elementsPerRow == 1){
      container.style.width = `${elementSize.width}px`;
    }
  }

  const updateChildPosition = (element, position, options) => {
    let elementSize = options.eS;
    let x = elementSize.width * position.col;
    let y = elementSize.height * position.row;
    let z = 0;
    let scaleValue = options.hide ? 0 : 0.9;
    let op = options.hide ? 0 : 1
    element.style.transform = 'translate3d('+x+'px, '+y+'px, '+z+'px) scale('+scaleValue+')';
    element.style.opacity = op;
  }


  const initObservation = () => {
    var options = {
        root: document.querySelector('#sectionCreations'),
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
    applyFiltersDom(fta)
    //applyFilters(fta)
  }

  const applyFiltersDom = (filters) => {
    let elements = document.querySelectorAll('.crea-observable');
    for(var i = 0; i < elements.length; i ++) {
      let el = elements[i];
      let elKeywords = el.dataset.keywords.split(',');
      let shouldBeDisplay = false
      if(filters.length > 0) {
        elKeywords.forEach((e) => {
          if(filters.indexOf(e.toLowerCase()) !== -1) {
            shouldBeDisplay = true;
          }
        })
      }else{
        shouldBeDisplay = true
      }
      if(shouldBeDisplay) {
        el.classList.remove('tohide')
      }else{
        el.classList.add('tohide')
      }
    }
    reorderChilds();
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
          observer?.disconnect();
          window?.removeEventListener('resize', reportWindowSize)
          clearTimeout(resizeTimeout)
          resizeListener = null;
          resizeTimeout = null
      }
  }, [])

  return (
    <Layout titlePage="Créations">
      <Section id="sectionCreations">
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
                <ul id="creaBlockUl" className={`${styles.creationsBlocUl}`}>
                    {displayedData.reverse().map((value, index) => {
                        if(data.length -1 == index){
                            setTimeout(() => { 
                              reorderChilds() 
                              setTimeout(() => {
                                initObservation()
                              }, 500)
                            }, 300)
                        }
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
