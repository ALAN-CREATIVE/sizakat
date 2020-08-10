import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import RadioButton from '../../components/Inputs/RadioButton';
import Button from '../../components/Buttons/Button';

import { PilihKategoriSumber } from './style';

const SELECT_KATEGORI = gql`
  mutation dataSourceMutation($input: DataSourceMutationInput!){
    dataSourceMutation(input: $input){
        dataSource{
            category
        }
    }
}
`

export default function Content() {

  const [dataSource, setDataSource] = useState({    
    category: ''
  });
  const [selectKategori, { data: createData, error: errorSelect, loading: loading }  ] = useMutation(SELECT_KATEGORI);

  if(errorSelect) {
    console.log(errorSelect.networkError.result.errors); 
    console.log(errorSelect.GraphQLErrors);
    return <p>error</p>
  }
  if (loading) return <p>loading ...</p>
  if (createData && createData.dataSourceMutation) {
      console.log(createData.dataSourceMutation.errors)
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
              onRadioClicked={ attribut => {
                setDataSource({ ...dataSource, category: attribut.toUpperCase() });
              }}
            />
          </div>
          <div class='col-9'>
            <div className="button-lanjutkan">
              <Button
                  type={'primary'}
                  label={'SIMPAN DATA'}
                  onClick={() => {
                      selectKategori({
                      variables: {
                        input: {
                          ...dataSource
                        }
                      }
                    })
                    console.log(dataSource);
                  }}
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
