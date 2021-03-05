import Head from 'next/head'
import { useEffect, useState } from 'react'
import { observable } from 'rxjs'
import styles from '../styles/Section.module.css'

export default function Section(props) {

  const [mode, setMode] = useState('')
  const [position, setPosition] = useState('')
  const [observable, setObservable] = useState('intersec-obs')
  const [display, setDisplay] = useState('')

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
    if(options.display && options.display == 'flex') {
      setDisplay(styles.sectionFlex)
    }
    if(!options.observable || options.observable == false) {
      setObservable('')
    }
  })

  return (
    <section className={`${styles.section} ${observable} ${display} ${mode} ${position}`}>{props.children}</section>
  )
}
