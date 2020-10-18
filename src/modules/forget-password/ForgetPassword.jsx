import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

import ForgetForm from './ForgetForm';
import { useResetPassword } from './useResetPassword';

const Container = styled.div`
  width: 30%;
  padding: 5em 0;
  margin: 0 auto;
`;
const BackText = () => {
  return (
    <Link href={`/login`}>
      <a>{'Klik disini untuk kembali ke halaman login'}</a>
    </Link>
  );
};

const ForgetPassword = () => {
  const { resetPassword, isSuccess, errors } = useResetPassword();

  const handleOnSubmit = (email) => {
    resetPassword(email);
  };

  return (
    <Container>
      {errors && (
        <div className="alert alert-danger" role="alert">
          {errors.email &&
            errors.email.map((error) => {
              return <div>{error.message}</div>;
            })}
        </div>
      )}
      {isSuccess && (
        <div className="alert alert-primary" role="alert">
          {'Silahkan cek inbox atau kotak spam pada email anda.'} <BackText />
        </div>
      )}
      <ForgetForm handleOnSubmit={handleOnSubmit} />
    </Container>
  );
};

export default ForgetPassword;
