import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Layout.module.css"
import { useEffect, useState } from "react";

export default function Layout(props) {

  let titleSuffix = "yoannbraie.fr";

  const [titleApp, setTitleApp] = useState("");

  const updatePageTitle = (title) => {
      setTitleApp(title + " - " + titleSuffix);
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

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="icon.svg" />
        <title>{titleApp}</title>
      </Head>
      <nav className={styles.nav}>
        <Link href="/">
          <a>Accueil</a>
        </Link>
        <Link href="/cv">
          <a>CV</a>
        </Link>
      </nav>
      <main className={styles.main}>{props.children}</main>
    </>
  );
}