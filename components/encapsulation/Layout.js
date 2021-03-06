import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/router'
import styles from "styles/encapsulation/Layout.module.css"
import { useEffect, useState } from "react";

export default function Layout(props) {

  let titleSuffix = "yoannbraie.fr";
  const router = useRouter()

  const [titleApp, setTitleApp] = useState("");
  const [navExpanded, setNavExpanded] = useState(false);

  const updatePageTitle = (title) => {
      setTitleApp(title + " - " + titleSuffix);
  }

  const handleNavExpand = () => {
    setNavExpanded(navExpanded => !navExpanded);
  }

  useEffect(() => {
    if(props.titlePage) {
        updatePageTitle(props.titlePage);
    }else{
        updatePageTitle("Yoann Braie");
    }
    return () => {
    }
  }, [])

  const handleClickLink = (e) => {
    e.preventDefault();
    let link = e.target.getAttribute('data-href');
    setNavExpanded(navExpanded => false);
    setTimeout(() => {
      router.push(link)
    }, 1000)
  }

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="logo.svg" />
        <title>{titleApp}</title>
      </Head>
      <nav className={`${styles.nav} ${navExpanded ? styles.navExpanded : ''}`}>
        <div className={styles.navComponentList}>
          <div className={styles.navComponent}>
            <Link href="/">
              <a data-href="/" onClick={handleClickLink}>Accueil</a>
            </Link>
          </div>
          <div className={styles.navComponent}>
            <Link href="/cv">
              <a data-href="/cv" onClick={handleClickLink}>Mon CV</a>
            </Link>
          </div>
          <div className={styles.navComponent}>
            <Link href="/creations">
              <a data-href="/creations" onClick={handleClickLink}>Créations</a>
            </Link>
          </div>
        </div>
        <button className={`${styles.navButtonExpand} ${navExpanded ? styles.navButtonExpanded : ''}`} onClick={handleNavExpand}><span></span></button>
      </nav>
      <main className={styles.main}>{props.children}</main>
      <footer className={styles.footer}>
        <label>2015 -</label><img src="logo_white.svg" alt="logo"/><label>{`- ${(new Date()).getFullYear()}`}</label>
      </footer>
    </>
  );
}