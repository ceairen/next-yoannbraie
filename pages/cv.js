import { useState, useEffect } from 'react';
import CvBlock from '../components/blocs/CvBlock';
import Layout from '../components/Layout'
import Section from '../components/Section'
import ApiService, { apiServiceMessages } from '../services/ApiService';
import globalStyles from '../styles/Globals.module.css';

export default function Cv() {

  let api = null
    let subscription = null
    let elementPerPage = 5

    const [cvDatas, setCvDatas] = useState(null)
    const [experiencesData, setExperiencesData] = useState(null)
    const [competencesData, setCompetencesData] = useState(null)

    const observeCvData = () => {
      subscription = apiServiceMessages.getMessage().subscribe(message => {
          if(message.cvDatas){
            setCvDatas(message.cvDatas[0])
          }
          if(message.competencesData){
            setCompetencesData(message.competencesData)
          }
          if(message.timelineDatas){
            setExperiencesData(message.timelineDatas)
          }
      });
    }

    useEffect(() => {
        api = new ApiService();
        observeCvData();
        api.getDatasByMethod(api.method.cv);
        api.getDatasByMethod(api.method.competences);
        api.getDatasByMethod(api.method.timeline);
        return () => {
            subscription?.unsubscribe();
        }
    }, [])

  return (
    <Layout titlePage="Mon CV">
      <Section>
        <h1 className={globalStyles.globalh1}>Mon CV</h1>
        <CvBlock cv={{global:cvDatas, experiences:experiencesData, competences:competencesData }} />
      </Section>
    </Layout>
  )
}
