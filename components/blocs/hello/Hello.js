import { useEffect, useState } from 'react'
import styles from '../../../styles/hello/Hello.module.css'

export default function Hello(props) {

    let writeTimeout = null;
    let p1, p2, p3, p4, p5, p6;

    const [texts, setTexts] = useState({
        p1: "Bonjour visiteur.",
        p2: "Je suis développeur front-end, je fais également du back-end, j'ai effectué des projets mobile et j'ai beaucoup d'intérêt pour le design.",
        p3: "Je publie sur ce site les créations que j'effectue sur la plateforme codepen.",
        p4: "Mon CV est également disponible via le menu.",
        p5: "Je vous souhaite une excellente visite !",
        p6: "Yoann Braie",
    });

    const initWrite = (element, callback) => {
        if(element) {
            let text = element.textContent;
            element.textContent = "";
            element.classList.add('visible');
            setTimeout(() => {
                write(element, text, 0, () => {
                    callback();
                });
            }, 1200)
        }
    }

    const write = (element, text, index, callback) => {
        clearTimeout(writeTimeout);
        let ind = index + 1;
        element.textContent = element.textContent.slice(0, -1)
        element.textContent += text[index] + '|';
        if(index < text.length -1){
            writeTimeout = setTimeout(() => {
                write(element, text, ind, callback);
            }, 40)
        }else{
            element.textContent = element.textContent.slice(0, -1)
            clearTimeout(writeTimeout);
            callback();
        }
    }

    useEffect(() => {

        let helloBloc = document.querySelector('#helloBloc');
        helloBloc.style.width = helloBloc.offsetWidth + 'px';
        helloBloc.style.height = helloBloc.offsetHeight + 'px';

        p1 = document.querySelector('#aParagraph');
        p2 = document.querySelector('#bParagraph');
        p3 = document.querySelector('#cParagraph');
        p4 = document.querySelector('#dParagraph');
        p5 = document.querySelector('#eParagraph');
        p6 = document.querySelector('#fParagraph');

        initWrite(p1, () => {
            initWrite(p2, () => {
                initWrite(p3, () => {
                    initWrite(p4, () => {
                        initWrite(p5, () => {
                            p6.style.textAlign = 'right';
                            initWrite(p6, () => {});
                        });
                    });
                });
            });
        });

        return () => {
            p1?.classList.remove('visible');
            p2?.classList.remove('visible');
            p3?.classList.remove('visible');
            p4?.classList.remove('visible');
            p5?.classList.remove('visible');
            p6?.classList.remove('visible');
            p1.textContent = "Bonjour visiteur.";
            p2.textContent = "Je suis développeur front-end, je fais également du back-end, j'ai effectué des projets mobile et j'ai beaucoup d'intérêt pour le design.";
            p3.textContent = "Je publie sur ce site les créations que j'effectue sur la plateforme codepen.";
            p4.textContent = "Mon CV est également disponible via le menu.";
            p5.textContent = "Je vous souhaite une excellente visite !";
            p6.textContent = "Yoann Braie";
            clearTimeout(writeTimeout);

        }
    })


    return (
        <div id="helloBloc" className={styles.helloBloc}>
            <div className={styles.helloBlocHeader}>
                <div className={styles.helloBlocHeaderButtons}></div>
                <h1>Bonjour, je suis Yoann Braie</h1>
            </div>
            <div className={styles.helloBlocContent}>
                <p id="aParagraph" className={styles.helloP}>{texts.p1}</p>
                <p id="bParagraph" className={styles.helloP}>{texts.p2}</p>
                <p id="cParagraph" className={styles.helloP}>{texts.p3}</p>
                <p id="dParagraph" className={styles.helloP}>{texts.p4}</p>
                <p id="eParagraph" className={styles.helloP}>{texts.p5}</p>
                <p id="fParagraph" className={styles.helloP}>{texts.p6}</p>
            </div>
        </div>
    )
}
