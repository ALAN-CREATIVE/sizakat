import ForgetPassword from 'modules/forget-password/ForgetPassword';
import Head from 'next/head';
import React from 'react';

export default function forget_password() {
  return (
    <>
      <Head>
        <title>{'Reset Password'}</title>
      </Head>
      <ForgetPassword />
    </>
  );
}
