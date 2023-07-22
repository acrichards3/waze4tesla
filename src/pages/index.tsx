import Head from 'next/head';
import Main from '~/components/main/Main';

export default function Home() {
  return (
    <>
      <Head>
        <title>Waze4Tesla</title>
        <meta name="description" content="Waze for tesla web browser" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main />
    </>
  );
}
