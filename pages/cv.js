import Head from 'next/head'
import CvBlock from '../components/blocs/CvBlock';
import Layout from '../components/Layout'
import Section from '../components/Section'
import styles from '../styles/Cv.module.css'
import globalStyles from '../styles/Globals.module.css';

export default function Cv() {
  return (
    <Layout titlePage="Mon CV">
      <Section>
        <h1 className={globalStyles.globalh1}>Mon CV</h1>
        <CvBlock></CvBlock>
      </Section>
    </Layout>
  )
}
