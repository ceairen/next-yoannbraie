import Head from 'next/head'
import { useEffect, useState } from 'react'
import Hello from '../components/blocs/Hello'
import Layout from '../components/Layout'
import Section from '../components/Section'
import BackgroundAnimated from '../components/utils/BackgroundAnimated'
import styles from '../styles/Home.module.css'

export default function Home() {

  return (
    <Layout id="main" titlePage="Accueil">
      <Section options={{display: 'flex', mode: 'full', sticky: true, observable: true}}>
        <BackgroundAnimated />
        <Hello />
      </Section>
      <Section options={{mode: 'full', dark: true, observable: true}}>
        <h1>Timeline</h1>
      </Section>
    </Layout>
  )
}
