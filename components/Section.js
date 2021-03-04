import Head from 'next/head'
import { useEffect, useState } from 'react'
import styles from '../styles/Layout.module.css'

export default function Section(props) {
  return (
    <section className={styles.section}>{props.children}</section>
  )
}
