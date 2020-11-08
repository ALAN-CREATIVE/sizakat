import SignUpForm from 'modules/sign-up/SignUpForm';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';
import styles from '../styles/login.module.css';
import utilStyles from '../styles/utils.module.css';

export default function LoginPage() {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      Router.replace('/');
    }
  });

  const onSignUpSuccess = () => {
    Router.replace('/');
  };

  return (
    <div className="container" className={styles.loginPage}>
      <Head>
        <title>{'Sign Up Page'}</title>
      </Head>
      <main>
        <div className="row">
          <div className={`${styles.leftContainer} col`}></div>

          <div className={`${styles.rightContainer} col`}>
            <div className="row">
              <h1 className={styles.title}>Lorem Ipsum Sor Alet Damet</h1>
              <p className={styles.subtitle}>SIZAKAT 5.0</p>
            </div>

            <div className={`row`}>
              <div className={`col`}>
                <section className={utilStyles.headingMd}>
                  {/* TODO add onSignUpFailure callback */}
                  <SignUpForm onSignUpSuccess={onSignUpSuccess} />
                </section>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
