import Head from 'next/head';
import TableTopRobot from '../components/TableTopRobot';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Table Top Robot</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Table Top Robot</h1>
        <TableTopRobot />
      </main>
    </div>
  );
}
