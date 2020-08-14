import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import NumberField from '../../components/Inputs/NumberField';
import TextField from '../../components/Inputs/TextField';
import Button from '../../components/Buttons/Button';

// import { resolveDataSourceName } from '../../Utils/ParserUtil';

import { TambahSDMStyle } from './style';

const ADD_SDM=gql`
    mutation dataSourceMutation($input: DataSourceMutationInput!){
        dataSourceMutation(input: $input){
            dataSource{
                id
                category
            }
        }
    }
`;

const ADD_SDM_WARGA=gql`
    mutation dataSourceWargaMutation($input: DataSourceWargaMutationInput!){
        dataSourceWargaMutation(input: $input){
            dataSourceWarga{
                picName
                picKtp
                picPhone
                picPosition
                province
                regency
                subDistrict
                village
                rt
                rw
                dataSource{id}
            }
            errors { messages }
        }
    }
`;

function successBox() {
    alert("Success")
  }
  
export default function FormTambahSDMWarga({ backend_uri }) {
    const client = new ApolloClient({
        uri: backend_uri,
        cache: new InMemoryCache()
      });

    // const [dataSource, setDataSource] = useState({
    //     category:'WARGA',
    // });
    
    const [dataSourceWarga, setDataSourceWarga] = useState({
        picName:'',
        picKtp: '',
        picPhone: '',
        picPosition: '',
        province: '',
        regency: '',
        subDistrict: '',
        village: '',
        rt: '',
        rw: '',
    });

    const [createSDM, { data: createData, error: errorCreate, loading: loading }  ] = useMutation(ADD_SDM);
    const [createSDMWarga, { data: createDataWarga, error: errorCreateWarga, loading: loadingWarga }  ] = useMutation(ADD_SDM_WARGA);

    useEffect(() => {
        if (createData && createData.dataSourceMutation && createData.dataSourceMutation.dataSource) {
            //   createSDMWarga({ ...dataSourceWarga, dataSource: createData.dataSourceMutation.dataSource.id });
              createSDMWarga({ variables: { input: { ...dataSourceWarga, dataSource: createData.dataSourceMutation.dataSource.id }}});

              }
            }
            ,[createData]
        )
    
    if(errorCreateWarga) {
        console.log(errorCreateWarga);
        console.log(errorCreateWarga.networkError.result.errors);
        return <p>error</p>
    }
    if (loadingWarga) return <p>loading ...</p>
    if (createDataWarga) {
        console.log(createDataWarga.dataSourceWargaMutation.errors.messages);
    }

    // const onChangeNumberField = (numberFieldValue) => {
    //     console.log(numberFieldValue);
    //     setState(numberFieldValue);
    // }

    // const onChangeTextField = (textFieldValue) => {
    //     console.log(textFieldValue);
    //     setState(textFieldValue);
    // }

    return (
        <ApolloProvider client={client}>
        <div className="TambahMustahikPage">
            <main>
                <div className="form-section">
                    <h1 id="form-title">KATEGORI SUMBER DATA</h1>
                    <div className="form" id="sumber-data">
                        <TextField
                            label={ 'Nama Kategori' }
                            placeholder={ 'Warga' }
                            required={ false }
                            disabled={ true }
                        />
                    </div>
                    <h1 id="form-title">DETAIL SUMBER DATA</h1>
                    <div className="form" id="provinsi">
                        <TextField 
                            label={ 'Provinsi' }
                            placeholder={ 'Nama Provinsi' }
                            required={ true }
                            onChange={provinsi => setDataSourceWarga({...dataSourceWarga, province: provinsi})}
                        />
                    </div>
                    <div className="form" id="alamat">
                        <div class="row">
                            <div class="col" id="kota">
                                <TextField
                                    label={ 'Kota/Kabupaten' }
                                    placeholder={ 'Nama Kota/Kabupaten' }
                                    required={ true }
                                    onChange={kota => setDataSourceWarga({...dataSourceWarga, regency: kota})}
                                />
                            </div>
                            <div class="col" id="kecamatan">
                                <TextField
                                    label={ 'Kecamatan' }
                                    placeholder={ 'Nama Kecamatan' }
                                    required={ true }
                                    onChange={kecamatan => setDataSourceWarga({...dataSourceWarga, subDistrict: kecamatan})}
                                />
                            </div>
                            <div class="col" id="kelurahan">
                                <TextField
                                    label={ 'Kelurahan' }
                                    placeholder={ 'Nama Kelurahan' }
                                    required={ true }
                                    onChange={kelurahan => setDataSourceWarga({...dataSourceWarga, village: kelurahan})}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form" id="alamat-detail">
                        <div class="row">
                            <div class="col" id="rw">
                                <TextField
                                    label={ 'RW' }
                                    placeholder={ 'Nomor RW' }
                                    required={ true }
                                    onChange={rw => setDataSourceWarga({...dataSourceWarga, rw: rw})}
                                />
                            </div>
                            <div class="col" id="rt">
                                <TextField
                                    label={ 'RT' }
                                    placeholder={ 'Nomor RT' }
                                    required={ true }
                                    onChange={rt => setDataSourceWarga({...dataSourceWarga, rt: rt})}
                                />
                            </div>
                            <div class="col"></div>
                        </div>
                    </div>
                    <h1 id="form-title">PENANGGUNG JAWAB</h1>
                    <div className="form" id="nama">
                        <TextField
                            label={ 'Nama' }
                            placeholder={ 'Nama Penanggung Jawab sesuai dengan KTP' }
                            required={ true }
                            onChange={penanggungjawab => setDataSourceWarga({...dataSourceWarga, picName: penanggungjawab})}
                            />
                    </div>
                    <div className="form" id="no-ktp">
                        <NumberField
                            label={ 'No. KTP' }
                            placeholder={ 'Terdiri dari 14 karakter angka' }
                            required={ true }
                            onChange={noKTP => setDataSourceWarga({...dataSourceWarga, picKtp: noKTP})}                        />
                    </div>
                    <div className="form" id="jabatan">
                        <TextField
                            label={ 'Jabatan' }
                            placeholder={ 'Nama Jabatan Penanggung Jawab' }
                            required={ true }
                            onChange={jabatan => setDataSourceWarga({...dataSourceWarga, picPosition: jabatan})}
                        />
                    </div>
                    <div className="form" id="no-tlp">
                        <NumberField
                            label={ 'No. Telepon' }
                            placeholder={ 'Terdiri dari angka' }
                            required={ true }
                            onChange={noHp => setDataSourceWarga({...dataSourceWarga, picPhone: noHp})}
                        />
                    </div>
                    <div className="form button-lanjutkan">
                        <Button
                            label= { 'SIMPAN DATA' }
                            type= { 'primary' }
                            onClick={() => { 
                                createSDM({
                                    variables: {
                                      input: {
                                        category:'WARGA'
                                      }
                                    }
                                  })
                            //     createSDMWarga({
                            //     variables: {
                            //       input: {
                            //         ...dataSourceWarga
                            //       }
                            //     }
                            //   })
                            //   successBox();
                            //   window.location.href='/';
                              console.log(dataSourceWarga);
                              
                            }}
                        />
                    </div>
                </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
        <TambahSDMStyle />
      </main>
    </div>
    </ApolloProvider>
  );
};

export async function getStaticProps() {
    return {
      props: {
        backend_uri: `http://${process.env.GRAPHQL_URL}`
      }
    }
  }
  
