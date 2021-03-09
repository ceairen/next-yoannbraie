import Layout from 'components/encapsulation/Layout';
import Section from 'components/encapsulation/Section'
import BackgroundAnimated from 'components/utils/BackgroundAnimated'
import globalStyles from 'styles/Globals.module.css';

export default function Custom404() {
    return (
        <Layout>
            <Section options={{mode: 'full', noPaddingFull: true}}>
                <BackgroundAnimated options={{mode:'404'}} />
                <div className={globalStyles.notfound}>
                    <h1>404</h1>
                    <h2>Page non trouvée</h2>
                </div>
            </Section>
        </Layout>
    )
}