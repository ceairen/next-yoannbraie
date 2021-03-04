import Head from 'next/head'
import Layout from '../components/Layout'
import Section from '../components/Section'
import styles from '../styles/Cv.module.css'

export default function Cv() {
  return (
    <Layout titlePage="Mon CV">
      <Section>
        <h1>Mon CV</h1>
      </Section>
    </Layout>
  )
}
