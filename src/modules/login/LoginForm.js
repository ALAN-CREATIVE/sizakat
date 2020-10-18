import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import Link from 'next/link';

import Button from '../../../components/Buttons/Button';
import PasswordField from '../../../components/Inputs/PasswordField';
import TextField from '../../../components/Inputs/TextField';
import styles from './LoginForm.module.css';

export const TOKEN_AUTH = gql`
  mutation tokenAuth($password: String!, $username: String) {
    tokenAuth(password: $password, username: $username) {
      success
      errors
      token
      refreshToken
    }
  }
`;

export default function LoginForm({ onLoginSuccess }) {
  const [
    tokenAuth,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(TOKEN_AUTH);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const username = e.target.elements['Username'].value;
    const password = e.target.elements['Password'].value;

    try {
      const { data } = await tokenAuth({ variables: { password, username } });
      localStorage.setItem('token', data.tokenAuth.token);
      localStorage.setItem('refreshToken', data.tokenAuth.refreshToken);

      onLoginSuccess();
    } catch (error) {
      //handle ApolloError
      console.error(error);
    }
  };

  const usernameFieldData = {
    label: 'Username',
    placeholder: 'Username atau Email',
    required: true,
    error: null,
  };

  const passwordFieldData = {
    label: 'Password',
    placeholder: 'Password',
    required: true,
  };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleOnSubmit}>
        <div className="user-input">
          <div className="row" className={styles.field_form}>
            <TextField {...usernameFieldData} onChange={() => {}} />
          </div>
          <div className="row" className={styles.field_form}>
            <PasswordField {...passwordFieldData} onChange={() => {}} />
          </div>
        </div>
        <div className="row" className={styles.lupaPassword}>
          <Link href="/forget_password">
            <a>Lupa Password ?</a>
          </Link>
        </div>
        <div className="row" className={styles.buttonBlock}>
          <Button
            label={mutationLoading ? 'Loading...' : 'Login'}
            disabled={mutationLoading}
            type={'login'}
            action={'submit'}
          />
        </div>
        {!!mutationError && (
          <div className={styles.errorText}>Akun tidak ditemukan</div>
        )}
      </form>
    </div>
  );
}
