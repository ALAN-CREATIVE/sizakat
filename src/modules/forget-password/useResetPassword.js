import { gql, useMutation } from '@apollo/client';

export const useResetPassword = () => {
  const [resetPassword, response] = useMutation(gql`
    mutation SendPasswordResetEmail($email: String!) {
      sendPasswordResetEmail(email: $email) {
        success
        errors
      }
    }
  `);

  return {
    resetPassword: (email) => {
      return resetPassword({ variables: { email } });
    },
    isSuccess:
      (response.data &&
        response.data.sendPasswordResetEmail &&
        response.data.sendPasswordResetEmail.success) ||
      undefined,
    errors:
      (response.data &&
        response.data.sendPasswordResetEmail &&
        response.data.sendPasswordResetEmail.errors) ||
      undefined,
  };
};
