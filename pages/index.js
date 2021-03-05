import Hello from '../components/blocs/Hello'
import Timeline from '../components/blocs/Timeline'
import Creations from '../components/blocs/Creations'
import Layout from '../components/Layout'
import Section from '../components/Section'
import BackgroundAnimated from '../components/utils/BackgroundAnimated'

export default function Home() {

  return (
    <Layout id="main" titlePage="Accueil">
      <Section options={{display: 'flex', mode: 'full', sticky: true, observable: true}}>
        <BackgroundAnimated />
        <Hello />
      </Section>
      <Section id="sectionTimeline" options={{mode: 'full', dark: true, observable: true}}>
        <Timeline />
      </Section>
      <Section options={{mode: 'full', lightDark: true, observable: true}}>
        <Creations />
      </Section>
    </Layout>
  )
}
