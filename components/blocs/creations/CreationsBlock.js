import Link from 'next/link';
import stylesBlock from 'styles/creations/CreationsBlock.module.css'

export default function CreationsBloc(props) {

    let data = props.data;
    data.view = props.baseUrl.base_url.replace('{penId}', data.id);

    return (
        <>
            {data !== null &&
                <li className={`${stylesBlock.creaBlock} ${props.prezMode ? stylesBlock.creaBlockPrez : ''}`}>
                    <Link href={`https://codepen.io/yoann-b/pen/${data.id}`}>
                        <a target="__blank">
                            <h2>{data.title}</h2>
                            <div className={stylesBlock.lineSeparator}></div>
                            <div className={stylesBlock.blocImg}>
                                <img alt="preview" data-src={data.view} src={null} />
                            </div>
                        </a>
                    </Link>
                </li>
            }
        </>
    )
}
