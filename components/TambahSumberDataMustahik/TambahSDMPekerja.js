import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import NumberField from '../Inputs/NumberField';
import TextField from '../Inputs/TextField';
import Button from '../Buttons/Button';
import { useRouter } from 'next/router';

import { TambahSDMContainer } from './TambahSDMStyle';

const ADD_SDM = gql`
  mutation dataSourceMutation($input: DataSourceMutationInput!){
    dataSourceMutation(input: $input){
        dataSource{
            category
            id
        }
    }
}
`;

const ADD_SDM_PEKERJA = gql`
  mutation dataSourcePekerjaMutation($input: DataSourcePekerjaMutationInput!){
    dataSourcePekerjaMutation(input: $input){
        dataSourcePekerja{
            picName
            picKtp
            picPhone
            picPosition
            profession
            location
            dataSource{id}
        }
        errors { messages }
    }
}

`;

export default function FormTambahSDMPekerja({ backend_uri }) {
  const client = new ApolloClient({
    uri: backend_uri,
    cache: new InMemoryCache()
  });

  const [dataSourcePekerja, setDataSourcePekerja] = useState({
    picName: '',
    picKtp: '',
    picPhone: '',
    picPosition: '',
    profession: '',
    location: '',
  });

  const [error, setError] = useState({
    picName: '',
    picKtp: '',
    picPhone: '',
    picPosition: '',
    profession: '',
    location: '',
  });

    
  const [createSDM, { data: createData, error: errorCreate, loading: loading }  ] = useMutation(ADD_SDM);
  const [createSDMPekerja, { data: createDataPekerja, error: errorCreatePekerja, loading: loadingPekerja }  ] = useMutation(ADD_SDM_PEKERJA);

  const submitForm = () => {
    console.log(handleSubmit());
    if (handleSubmit()) {
        createSDM({
            variables: {
                input: {
                    category:'PEKERJA'
                }
            }
        });
      console.log(dataSourcePekerja);
      alert("Submit berhasil");
    } else {
      console.log(dataSourcePekerja);
      alert("Submit gagal");
    }
  }

  const handleSubmit = () => {
    let formIsValid = true;
    let temporaryError = {};

    if (dataSourcePekerja.picName.length == 0) {
        formIsValid = false;
        temporaryError.picName='Nama penanggung jawab tidak boleh kosong';
    } if (dataSourcePekerja.picKtp.length < 14 || dataSourcePekerja.picKtp.length > 14) {
        formIsValid = false;
        temporaryError.picKtp='Format KTP harus berupa 14 karakter angka';
    } if (dataSourcePekerja.picPhone.length == 0) {
        formIsValid = false;
        temporaryError.picPhone='Nomor telepon tidak boleh kosong';
    } if (dataSourcePekerja.picPosition.length == 0) {
        formIsValid = false;
        temporaryError.picPosition='Nama jabatan tidak boleh kosong';
    } if (dataSourcePekerja.profession.length == 0) {
        formIsValid = false;
        temporaryError.province='Nama pekerjaan tidak boleh kosong';
    } if (dataSourcePekerja.location.length == 0) {
        formIsValid = false;
        temporaryError.regency='Nama lokasi pekerjaan (kelurahan) tidak boleh kosong';
    }

    setError(temporaryError);
    return formIsValid;
  }

  const router = useRouter();

  useEffect(() => {
    if (createData && createData.dataSourceMutation && createData.dataSourceMutation.dataSource) {
        createSDMPekerja({ variables: { input: { ...dataSourcePekerja, dataSource: createData.dataSourceMutation.dataSource.id }}});
    } if (createDataPekerja && createDataPekerja.dataSourcePekerjaMutation && createDataPekerja.dataSourcePekerjaMutation.dataSourcePekerja) {
      router.push({
        pathname: '/detail/sumber-data-mustahik',
        query: {
          id: createData.dataSourceMutation.dataSource.id
        }
      })
    }
    }
    ,[createData, createDataPekerja]
  )

  if(errorCreatePekerja) {
    console.log(errorCreatePekerja);
    console.log(errorCreatePekerja.networkError.result.errors);
    return <p>error</p>
  }

  if (loadingPekerja) return <p>loading ...</p>

  if (createDataPekerja) {
    console.log(createDataPekerja.dataSourcePekerjaMutation.errors);
  }
  
  return (
    <TambahSDMContainer className="TambahMustahikPage">
      <main>
        <div className="form-section">
            <h1 id="form-title">KATEGORI SUMBER DATA</h1>
            <div className="form" id="sumber-data">
              <TextField
                label={ 'Nama Kategori' }
                disabled={true}
                initialValue={ 'Pekerja'}
                required={ false }
              />
            </div>
            <h1 id="form-title">DETAIL SUMBER DATA</h1>
            <div className="form" id="jenis-pekerjaan">
              <TextField
                label={ 'Jenis Pekerjaan' }
                placeholder={ 'Satpam' }
                required={ false }
                onChange={pekerjaan => {
                  setDataSourcePekerja({...dataSourcePekerja, profession: pekerjaan});
                  setError({...error,
                    profession: pekerjaan = pekerjaan.length < 1 ? 'Nama pekerjaan tidak boleh kosong' : ''});
              }}
              error={error.profession}
              />
            </div>
            <div className="form" id="lokasi-pekerjaan">
              <TextField
                label={ 'Lokasi Pekerjaan (Kelurahan)' }
                placeholder={ 'Kelurahan' }
                required={ true }
                onChange={lokasi => {
                  setDataSourcePekerja({...dataSourcePekerja, location: lokasi});
                  setError({...error,
                    location: lokasi = lokasi.length < 1 ? 'Nama lokasi pekerjaan (kelurahan) tidak boleh kosong' : ''});
              }}
              error={error.location}
              />
            </div>
            <h1 id="form-title">PENANGGUNG JAWAB</h1>
            <div className="form" id="nama">
              <TextField
                label={ 'Nama' }
                placeholder={ 'Nama Penanggung Jawab sesuai dengan KTP' }
                required={ true }
                onChange={penanggungjawab => {
                  setDataSourcePekerja({...dataSourcePekerja, picName: penanggungjawab});
                  setError({...error,
                      picName: penanggungjawab = penanggungjawab.length < 1 ? 'Nama penanggung jawab tidak boleh kosong' : ''});
              }}
              error={error.picName}
              />
            </div>
            <div className="form" id="no-ktp">
              <NumberField
                label={ 'No. KTP' }
                placeholder={ 'Terdiri dari 14 karakter angka' }
                required={ true }
                onChange={noKTP => {
                  setDataSourcePekerja({...dataSourcePekerja, picKtp: noKTP});
                  setError({...error,
                      picKtp: noKTP = noKTP.length < 14 || noKTP.length > 14 ? 'Format KTP harus berupa 14 karakter angka' : ''});
              }}
              error={error.picKtp}
              />
            </div>
            <div className="form" id="jabatan">
              <TextField
                label={ 'Jabatan' }
                placeholder={ 'Nama Jabatan Penanggung Jawab' }
                required={ true }
                onChange={jabatan => {
                  setDataSourcePekerja({...dataSourcePekerja, picPosition: jabatan});
                  setError({...error,
                      picPosition: jabatan = jabatan.length < 1 ? 'Nama jabatan tidak boleh kosong' : ''});
              }}
              error={error.picPosition}
              />
            </div>
            <div className="form" id="no-tlp">
              <NumberField
                label={ 'No. Telepon' }
                placeholder={ 'Terdiri dari angka' }
                required={ true }
                onChange={noHp => {
                  setDataSourcePekerja({...dataSourcePekerja, picPhone: noHp});
                  try {
                      parseInt(noHp,10);
                    } catch(error) {
                      setError ({...error,
                        picPhone:'Format HP harus berupa angka'});
                    }
              }} 
              error={error.picPhone}
              />
            </div>
            <div className="form button-lanjutkan">
              <Button
                  label= { 'SIMPAN DATA' }
                  type= { 'primary' }
                  onClick={() =>
                    submitForm()
                  }
              />
            </div>
        </div>
      </main>
    </TambahSDMContainer>
  );
};

export async function getStaticProps() {
  return {
    props: {
      backend_uri: `http://${process.env.GRAPHQL_URL}`
    }
  }
}
