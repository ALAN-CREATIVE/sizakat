import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

import {useState} from 'react'
import Button from '../../../components/Buttons/Button';
import PasswordField from '../../../components/Inputs/PasswordField';
import TextField from '../../../components/Inputs/TextField';
import styles from './SignUpForm.module.css';

export const REGISTER = gql`
  mutation register($email: String!, $username: String!, $password1: String!, $password2: String!) {
    register(email: $email, username: $username, password1: $password1, password2: $password2) {
      success
      errors
      token
      refreshToken
    }
  }
`;

export default function SignUpForm({ onSignUpSuccess }) {
    const [
        register,
        { loading: mutationLoading, error: mutationError },
    ] = useMutation(REGISTER);

    const [errorMsg, setErrorMsg] = useState('')

    const usernameFieldData = {
        label: 'Username',
        placeholder: 'Username',
        required: true,
        error: null,
    };

    const emailFieldData = {
        label: 'Email',
        placeholder: 'Email',
        required: true,
        error: null,
    };

    const passwordFieldData = {
        label: 'Password',
        placeholder: 'Password',
        required: true,
        error: null,
    };

    const passwordConfirmationData = {
        label: 'Confirm Password',
        placeholder: 'Password Confirmation',
        required: true,
        error: null,
    };

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        setErrorMsg('')
        const username = e.target.elements[usernameFieldData.label].value;
        const email = e.target.elements[emailFieldData.label].value;
        const password1 = e.target.elements[passwordFieldData.label].value;
        const password2 = e.target.elements[passwordConfirmationData.label].value;

        if (password1 !== password2) {
            alert('password tidak sama')
        } else {
            try {
                const { data } = await register({ variables: { username, email, password1, password2 } });
                if(data.register.success) {
                    localStorage.setItem('token', data.register.token);
                    localStorage.setItem('refreshToken', data.register.refreshToken);
                    
                    onSignUpSuccess();
                } else {
                    setErrorMsg(JSON.stringify(data.register.errors))
                }
            } catch (error) {
                //handle ApolloError
                console.error(error);
            }
        }
    };

    return (
        <div className={styles.signUpForm}>
            <form onSubmit={handleOnSubmit}>
                <div className="user-input">
                    <div className="row" className={styles.field_form}>
                        <TextField {...usernameFieldData} onChange={() => { }} />
                    </div>
                    <div className="row" className={styles.field_form}>
                        <TextField {...emailFieldData} onChange={() => { }} />
                    </div>
                    <div className="row" className={styles.field_form}>
                        <PasswordField {...passwordFieldData} onChange={() => { }} />
                    </div>
                    <div className="row" className={styles.field_form}>
                        <PasswordField {...passwordConfirmationData} onChange={() => { }} />
                    </div>
                </div>
                <div className="row" className={styles.buttonBlock}>
                    <Button
                        label={mutationLoading ? 'Loading...' : 'Sign Up'}
                        disabled={mutationLoading}
                        type={'login'}
                        action={'submit'}
                    />
                </div>
                {(!!mutationError || !!errorMsg) && (
                    <div className={styles.errorText}>Registrasi gagal, {errorMsg}</div>
                )}
            </form>
        </div>
    );
}
