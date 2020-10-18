import Head from 'next/head';
import Router from 'next/router';

import Layout, { siteTitle } from '../components/Commons/BlankLayout';
import { ProtectRoute } from '../contexts/auth';
import utilStyles from '../styles/utils.module.css';

function Home() {
  const logout = () => {
    localStorage.clear();
    Router.replace('/login');
  };

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <div className={`central`}>
        <section className={utilStyles.headingMd}>
          <h1>Selamat Datang di SIZAKAT</h1>
          <p>Login berhasil</p>
        </section>
        <button onClick={logout}>logout</button>
      </div>
    </Layout>
  );
}

export default ProtectRoute(Home);
