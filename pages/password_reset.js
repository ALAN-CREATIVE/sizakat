import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import ResetPassword from '../src/modules/password-reset/FormPasswordReset';

export default function reset_password() {
  const [error, setError] = useState(null);
  const router = useRouter();
  const userId = router.query.userId;
  const token = router.query.token;

  // TODO change to graphQL
  const setNewPassword = async (userId, token, newPassword) => {
    // api.post('/change-reset-password/', { 'userId': userId, 'token': token, 'newPassword':newPassword })
    //   .then(response => {
    //     router.push('/login')
    //     alert('Kata sandi berhasil diubah')
    //   })
    //   .catch((error) => {
    //     setError(error)
    //   })
  };

  const handleOnSubmit = (userId, token, pw) => {
    setNewPassword(userId, token, pw);
  };
  return (
    <div className="App">
      <ResetPassword
        handleOnSubmit={(e) => handleOnSubmit(userId, token, e.password)}
      />
      {!!error && <div>Invalid user and token</div>}
    </div>
  );
}
