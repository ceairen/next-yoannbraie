import Head from 'next/head'
import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import Section from '../components/Section'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Layout titlePage="Accueil">
      <Section>
        <h1>Accueil</h1>
      </Section>
    </Layout>
  )
}
