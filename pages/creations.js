import Head from 'next/head'
import Layout from '../components/Layout'
import Section from '../components/Section'
import styles from '../styles/Apropos.module.css'

export default function Apropos() {
  return (
    <Layout titlePage="A Propos">
      <Section>
        <h1>Mes créations</h1>
      </Section>
    </Layout>
  )
}
