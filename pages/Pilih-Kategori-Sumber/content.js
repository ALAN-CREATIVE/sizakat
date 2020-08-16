import React, { useState } from 'react';
import RadioButton from '../../components/Inputs/RadioButton';
import Button from '../../components/Buttons/Button';

import { PilihKategoriSumber } from './style';


export default function Content() {
  const [dataCategory, setdataCategory] = useState({
    category:'',
  });

  const [error, setError] = useState({
    category:'',
  });

  const submitForm = () => {
    console.log(handleSubmit());
    if (handleSubmit()) {
        if (dataCategory.category == 'WARGA' ) {
          window.location.href='/TambahSDM-Warga';
        } if (dataCategory.category == 'INSTITUSI' ) {
          window.location.href='/TambahSDM-Institusi';
        } if (dataCategory.category == 'PEKERJA' ) {
          window.location.href='/TambahSDM-Pekerja';
        }
      console.log(dataCategory);
      alert("Submit berhasil");
    } else {
      console.log(dataCategory);
      alert("Submit gagal");
    }
  }

  const handleSubmit = () => {
    let formIsValid = true;
    let temporaryError = {};

    if (dataCategory.category.length == 0) {
      formIsValid = false;
      temporaryError.category='Pilih salah satu dari kategori sumber data';
  }

    setError(temporaryError);
    return formIsValid;
  }

  return (
    <div className="PilihKategoriSumber">
      <main>
        <div>
          <h1>KATEGORI SUMBER DATA</h1>
          <div class="col-3">
            <RadioButton
              label=''
              options={ ['Warga', 'Institusi', 'Pekerja'] }
              required={ false }
              onRadioClicked={ kategori => {
                setdataCategory({ category: kategori.toUpperCase() });
                setError({...error, 
                    category: kategori = kategori.length < 1 ? 'Pilih salah satu dari kategori sumber data' : ''});
              }}
              error={error.category}
              
            />
          </div>
          <div class='col-9'>
            <div className="button-lanjutkan">
              <Button
                  label={'SIMPAN DATA'}
                  type={'primary'}
                  onClick={() =>
                    submitForm()
                }
              />
            </div>
          </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
        <PilihKategoriSumber />

      </main>
    </div>
  );
};

export async function getStaticProps() {
  return {
    props: {
      backend_uri: `http://${process.env.GRAPHQL_URL}`
    }
  }
}
