import { ErrorMessage, Field, Form, Formik } from 'formik';
import Head from 'next/head';
import queryString from 'query-string';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';

export default function ResetPassword({ handleOnSubmit }) {
  // const x= queryString.parse(location.search).userId
  // console.log('dari komponen.js: ',x)

  const initialValues = {
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  return (
    <div className="forget-password">
      <Head>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
          integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
          crossOrigin="anonymous"
        ></link>
        <link
          href="https://fonts.googleapis.com/css?family=Muli:300,400,700,800"
          rel="stylesheet"
        />
      </Head>

      <main>
        <center>
          <h1>SIZAKAT RESET PASSWORD</h1>
        </center>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(e) => handleOnSubmit(e)}
        >
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <div className="form-group">
                <label>Password</label>
                <Field
                  name="password"
                  type="password"
                  className={
                    'form-control' +
                    (errors.password && touched.password ? ' is-invalid' : '')
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={
                    'form-control' +
                    (errors.confirmPassword && touched.confirmPassword
                      ? ' is-invalid'
                      : '')
                  }
                />
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="invalid-feedback"
                />
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary"
                  >
                    {isSubmitting && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Reset Password
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>

        <script
          src="https://code.jquery.com/jquery-3.4.1.slim.min.js"
          integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
          integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js"
          integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6"
          crossOrigin="anonymous"
        ></script>
      </main>

      <style jsx>{`
        h1 {
          font-weight: 670;
          font-size: 37px;
          line-height: 83px;
          align: center;
        }
        .forget-password {
          max-width: 36rem;
          padding: 0 1rem;
          margin: 3rem auto 6rem;
          background: #c2c2c2;
        }

        button {
          width: 100%;
        }

        html,
        body {
          padding: 0;
          margin: 0;
          overflow-x: hidden;
          overflow-y: hidden;
          font-family: Muli;
        }
      `}</style>
    </div>
  );
}
