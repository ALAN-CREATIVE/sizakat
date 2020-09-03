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

  const symbol = {
    number: new RegExp(/^[0-9]+$/),
    alphabet: new RegExp(/[a-zA-Z]+/),
    onlySpace: new RegExp(/\s/g),
    namaLengkapValid: new RegExp(/^[a-zA-Z]+?([\s]+)/),
    stringnumberValid: new RegExp(/^[a-zA-Z0-9]+?([\s]+)/),
    numberValid: new RegExp(/^[0][0-9]+$/),
    onlySymbol: new RegExp(/^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+$/),
    phoneNumberWithSymbol: new RegExp(/^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]?[0-9]+$/),
  };


  const handleSubmit = () => {
    let formIsValid = true;
    let temporaryError = {};

    if (dataSourcePekerja.picName.length == 0) {
        formIsValid = false;
        temporaryError.picName='Nama penanggung jawab tidak boleh kosong';
    } if (dataSourcePekerja.picName.match(symbol.onlySpace)) {
        formIsValid = false;
        temporaryError.picName='Nama penanggung jawab tidak boleh diisi spasi saja';
    } if (dataSourcePekerja.picName.match(symbol.namaLengkapValid)) {
        formIsValid = true;
        temporaryError.picName = "";
    } 
  
    if (dataSourcePekerja.picKtp.length < 14 || dataSourcePekerja.picKtp.length > 14) {
        formIsValid = false;
        temporaryError.picKtp='Format KTP harus berupa 14 karakter angka';
    } if (dataSourcePekerja.picKtp.match(symbol.onlySpace)) {
        formIsValid = false;
        temporaryError.picKtp='Nomor KTP tidak boleh diisi dengan spasi saja';
    } if (dataSourcePekerja.picKtp.match(symbol.alphabet)) {
        formIsValid = false;
        temporaryError.picKtp='Format KTP harus berupa angka';
    } if (dataSourcePekerja.picKtp.match(symbol.number)) {
        formIsValid = true;
        temporaryError.picKtp='';
    } 

    if (dataSourcePekerja.picPhone.match(symbol.alphabet)) {
      formIsValid = false;
      temporaryError.picPhone='Format nomor telepon harus berupa angka';
    } if (dataSourcePekerja.picPhone.match(symbol.phoneNumberWithSymbol) || dataSourcePekerja.picPhone.match(symbol.onlySymbol)) {
        formIsValid = false;
        temporaryError.picPhone = 'Format nomor telepon harus berupa angka yang diawali dengan 0 (Contoh: 0811111111)';
    } if (dataSourcePekerja.picPhone.match(symbol.onlySpace)) {
        formIsValid = false;
        temporaryError.phone = 'No HP tidak boleh diisi dengan spasi saja';
    } if (dataSourcePekerja.picPhone.match(symbol.number)) {
        formIsValid = true;
        temporaryError.picPhone = "";
    }
    
    if (dataSourcePekerja.picPosition.length == 0) {
        formIsValid = false;
        temporaryError.picPosition='Nama jabatan tidak boleh kosong';
    } if (dataSourcePekerja.picPosition.match(symbol.onlySpace)) {
        formIsValid = false;
        temporaryError.picPosition='Jabatan penanggung jawab tidak boleh diisi spasi saja';
    } if (dataSourcePekerja.picPosition.match(symbol.namaLengkapValid)) {
        formIsValid = true;
        temporaryError.picPosition = "";
    } 

    if (dataSourcePekerja.profession.length == 0) {
        formIsValid = false;
        temporaryError.profession='Nama pekerjaan tidak boleh kosong';
    } if (dataSourcePekerja.profession.match(symbol.onlySpace)) {
        formIsValid = false;
        temporaryError.profession='Nama pekerjaan tidak boleh diisi spasi saja';
    } if (dataSourcePekerja.profession.match(symbol.namaLengkapValid)) {
        formIsValid = true;
        temporaryError.profession = "";
    } 

    if (dataSourcePekerja.location.length == 0) {
        formIsValid = false;
        temporaryError.location='Nama lokasi pekerjaan (kelurahan) tidak boleh kosong';
    } if (dataSourcePekerja.location.match(symbol.onlySpace)) {
        formIsValid = false;
        temporaryError.location='Nama lokasi pekerjaan (kelurahan) tidak boleh diisi spasi saja';
    } if (dataSourcePekerja.location.match(symbol.stringnumberValid)) {
        formIsValid = true;
        temporaryError.location = "";
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
                defaultValue={ 'Pekerja'}
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
                  if (pekerjaan.match(symbol.namaLengkapValid)){
                    setError({ ...error, 
                      profession: ""
                    })
                  } else if (pekerjaan.match(symbol.onlySpace)) {
                    setError({...error,
                      profession: 'Nama pekerjaan tidak boleh diisi dengan spasi saja'
                    });    
                  } else if (pekerjaan.length < 1) {
                    setError({...error,
                      profession: 'Nama pekerjaan tidak boleh kosong'
                    });
                  } else {
                      setError({...error,
                        profession:''
                    });
                  }
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
                  if (lokasi.match(symbol.stringnumberValid)){
                    setError({ ...error, 
                      location: ""
                    })
                  } else if (lokasi.match(symbol.onlySpace)) {
                      setError({...error,
                        location: 'Nama lokasi pekerjaan (kelurahan) tidak boleh diisi dengan spasi saja'
                      });    
                  } else if (lokasi.length < 1) {
                      setError({...error,
                        location: 'Nama lokasi pekerjaan (kelurahan) tidak boleh kosong'
                      });
                  } else {
                      setError({...error,
                        location:''
                      });
                  }     
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
                  if (penanggungjawab.match(symbol.numberValid)){
                    setError({ ...error, 
                        picName: ""
                    })
                  } else if (penanggungjawab.match(symbol.onlySpace)) {
                      setError({...error,
                          picName: 'Nama penanggung jawab tidak boleh diisi dengan spasi saja'
                      });    
                  } else if (penanggungjawab.length < 1) {
                      setError({...error,
                          picName: 'Nama penanggung jawab tidak boleh kosong'
                      });
                  } else {
                      setError({...error,
                          picName:''
                      });
                  }
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
                  if (noKTP.match(symbol.onlySpace)) {
                    setError({ ...error,
                        picKtp: "Nomor KTP tidak boleh diisi dengan spasi saja",
                    });
                  } else if (noKTP.length < 14 || noKTP.length > 14) {
                      setError({ ...error,
                          picKtp: "Format KTP harus berupa 14 karakter angka",
                      });
                  } else if (noKTP.match(symbol.alphabet)) {
                      setError({ ...error,
                          picKtp: "Nomor KTP harus diisi dengan 14 karakter angka",
                      });
                  } else {
                    setError({ ...error, 
                        picKtp: "" 
                    });
                  }
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
                  if (jabatan.match(symbol.numberValid)){
                    setError({ ...error, 
                        picPosition: ""
                    })
                  } else if (jabatan.match(symbol.onlySpace)) {
                      setError({...error,
                          picPosition: 'Nama jabatan tidak boleh diisi dengan spasi saja'
                      });    
                  } else if (jabatan.length < 1) {
                      setError({...error,
                          picPosition: 'Nama jabatan tidak boleh kosong'
                      });
                  } else {
                      setError({...error,
                          picPosition:''
                      });
                  }
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
                  if (noHp.match(symbol.alphabet)) {
                    setError({ ...error, 
                        picPhone: "Format nomor telepon harus berupa angka" 
                    });
                  } else if (noHp.match(symbol.numberValid)) {
                      setError({ ...error, 
                          picPhone: "" 
                      });
                  } else if (noHp.match(symbol.phoneNumberWithSymbol) || noHp.match(symbol.onlySymbol)) {
                      setError({ ...error,
                          picPhone: "Format nomor telepon harus berupa angka yang diawali dengan 0 (Contoh: 0811111111)",
                      });
                  } else if (noHp.match(symbol.onlySpace)) {
                      setError({ ...error,
                          picPhone: "Nomor telepon tidak boleh diisi dengan spasi saja",
                      });
                  } else {
                      setError({ ...error, 
                          picPhone: "" 
                      });
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
