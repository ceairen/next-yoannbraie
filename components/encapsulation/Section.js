import { useEffect, useState } from 'react'
import styles from '../../styles/encapsulation/Section.module.css'

export default function Section(props) {

  const [mode, setMode] = useState('')
  const [position, setPosition] = useState('')
  const [observable, setObservable] = useState('intersec-obs')
  const [display, setDisplay] = useState('')
  const [noPaddingSide, setNoPaddingSide] = useState('')

  useEffect(() => {
    let options = props.options ?? {};
    if(options.mode && options.mode == 'full'){
      setMode(styles.sectionFull)
    }
    if(options.sticky && options.sticky == true) {
      setPosition(styles.sectionSticky)
    }
    if(options.dark && options.dark == true) {
      setPosition(styles.sectionDark)
    }
    if(options.lightDark && options.lightDark == true) {
      setPosition(styles.sectionLightDark)
    }
    if(options.noPaddingSide && options.noPaddingSide == true) {
      setNoPaddingSide(styles.noPaddingSide)
    }
    if(options.display && options.display == 'flex') {
      setDisplay(styles.sectionFlex)
    }
    if(!options.observable || options.observable == false) {
      setObservable('')
    }
  })

  return (
    <section className={`${styles.section} ${noPaddingSide} ${observable} ${display} ${mode} ${position}`}>{props.children}</section>
  )
}
