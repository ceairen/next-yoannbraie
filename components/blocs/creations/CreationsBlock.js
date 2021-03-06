import stylesBlock from 'styles/creations/CreationsBlock.module.css'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

export default function CreationsBloc(props) {

    let data = props.data;
    data.view = props.baseUrl.base_url.replace('{penId}', data.id);

    return (
        <>
            {data !== null &&
                <li className={stylesBlock.creaBlock}>
                    <h2>{data.title}</h2>
                    <div className={stylesBlock.lineSeparator}></div>
                    <div className={stylesBlock.blocImg}>
                        <LazyLoadImage alt="preview" effect="blur" src={data.view} />
                    </div>
                </li>
            }
        </>
    )
}
