import LoginForm from 'modules/login/LoginForm';
import Head from 'next/head';
import Router from 'next/router';
import { useEffect } from 'react';

import ButtonFacebook from '../components/Buttons/Button-Facebook';
import ButtonGoogle from '../components/Buttons/Button-Google';
import styles from '../styles/login.module.css';
import utilStyles from '../styles/utils.module.css';

export default function LoginPage() {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      Router.replace('/');
    }
  });

  const onLoginSuccess = () => {
    Router.replace('/');
  };

  return (
    <div className="container" className={styles.loginPage}>
      <Head>
        <title>{'Login Page'}</title>
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
                  {/* TODO add onLoginFailure callback */}
                  <LoginForm onLoginSuccess={onLoginSuccess} />
                </section>
              </div>
            </div>
            <div className={`row ${styles.sectionSpace}`}>
              <div className="col-5">
                <hr />
              </div>
              <div className={`${styles.centerText} col-2`}>
                <b>OR</b>
              </div>
              <div className="col-5">
                <hr />
              </div>
            </div>

            <div className={`row ${styles.sectionSpace}`}>
              <div className="col">
                <ButtonGoogle />
              </div>
              <div className="col">
                <ButtonFacebook />
              </div>
            </div>

            <div className={`row ${styles.signUp} ${styles.sectionSpace}`}>
              <b>
                Don't have an account?{' '}
                <span>
                  <a href="#">Sign Up</a>
                </span>
              </b>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
