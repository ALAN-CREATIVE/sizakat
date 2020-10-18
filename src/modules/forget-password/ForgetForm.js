import { useState } from 'react';

import Button from '../../../components/Buttons/Button';
import TextField from '../../../components/Inputs/TextField';

export default function ForgetForm({ handleOnSubmit }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    handleOnSubmit(value);
  };

  return (
    <form>
      <TextField
        label={'Email'}
        placeholder={'email@example.com'}
        required={'true'}
        onChange={(text) => {
          setValue(text);
        }}
      />

      <Button
        onClick={handleSubmit}
        label={'Ubah Password'}
        type={'primary mt-2'}
        action={'submit'}
      />
    </form>
  );
}
