import Hello from '../components/blocs/hello/Hello'
import Timeline from '../components/blocs/timeline/Timeline'
import Creations from '../components/blocs/creations/Creations'
import Layout from '../components/encapsulation/Layout'
import Section from '../components/encapsulation/Section'
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
      <Section options={{mode: 'full', noPaddingSide: true, lightDark: true, observable: true}}>
        <Creations />
      </Section>
    </Layout>
  )
}
