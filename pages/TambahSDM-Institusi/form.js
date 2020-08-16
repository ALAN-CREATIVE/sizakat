import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import NumberField from '../../components/Inputs/NumberField';
import TextField from '../../components/Inputs/TextField';
import Button from '../../components/Buttons/Button';

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

const ADD_SDM_INSTITUSI=gql`
    mutation dataSourceInstitusiMutation($input: DataSourceInstitusiMutationInput!){
        dataSourceInstitusiMutation(input: $input){
            dataSourceInstitusi{
                picName
                picKtp
                picPhone
                picPosition
                name
                province
                regency
                subDistrict
                village
                rt
                rw
                address
                dataSource{id}
            }
            errors { messages }
        }
    }
`;
    
export default function FormTambahSDMInstitusi({ backend_uri }) {
    const client = new ApolloClient({
        uri: backend_uri,
        cache: new InMemoryCache()
        });
    
    const [dataSourceInstitusi, setDataSourceInstitusi] = useState({
        picName:'',
        picKtp: '',
        picPhone: '',
        picPosition: '',
        name:'',
        province: '',
        regency: '',
        subDistrict: '',
        village: '',
        rt: '',
        rw: '',
        address:'',
    });

    const [error, setError] = useState({
        picName:'',
        picKtp: '',
        picPhone: '',
        province: '',
        regency: '',
        subDistrict: '',
        village: '',
        rt: '',
        rw: '',
    }); 

    const [createSDM, { data: createData, error: errorCreate, loading: loading }  ] = useMutation(ADD_SDM);
    const [createSDMInstitusi, { data: createDataInstitusi, error: errorCreateInstitusi, loading: loadingInstitusi }  ] = useMutation(ADD_SDM_INSTITUSI);
    
    const submitForm = () => {
        console.log(handleSubmit());
        if (handleSubmit()) {
            createSDM({
                variables: {
                    input: {
                        category:'INSTITUSI'
                    }
                }
            });
          console.log(dataSourceInstitusi);
          alert("Submit berhasil");
        } else {
          console.log(dataSourceInstitusi);
          alert("Submit gagal");
        }
    }

    const handleSubmit = () => {
        let formIsValid = true;
        let temporaryError = {};
    
        if (dataSourceInstitusi.picName.length == 0) {
            formIsValid = false;
            temporaryError.picName='Nama penanggung jawab tidak boleh kosong';
        } if (dataSourceInstitusi.picKtp.length < 14 || dataSourceInstitusi.picKtp.length > 14) {
            formIsValid = false;
            temporaryError.picKtp='Format KTP harus berupa 14 karakter angka';
        } if (dataSourceInstitusi.picPhone.length == 0) {
            formIsValid = false;
            temporaryError.picPhone='Nomor telepon tidak boleh kosong';
        } if (dataSourceInstitusi.province.length == 0) {
            formIsValid = false;
            temporaryError.province='Nama provinsi tidak boleh kosong';
        } if (dataSourceInstitusi.regency.length == 0) {
            formIsValid = false;
            temporaryError.regency='Nama kota/kabupaten tidak boleh kosong';
        } if (dataSourceInstitusi.subDistrict.length == 0) {
            formIsValid = false;
            temporaryError.subDistrict='Nama kecamatan tidak boleh kosong';
        } if (dataSourceInstitusi.village.length == 0) {
            formIsValid = false;
            temporaryError.village='Nama kelurahan tidak boleh kosong';
        } if (dataSourceInstitusi.rw.length == 0) {
            formIsValid = false;
            temporaryError.rw='Nomor RW tidak boleh kosong';
        } if (dataSourceInstitusi.rt.length == 0) {
            formIsValid = false;
            temporaryError.rt='Nomor RT tidak boleh kosong';
        }
    
        setError(temporaryError);
        return formIsValid;
      }
    
    
    useEffect(() => {
        if (createData && createData.dataSourceMutation && createData.dataSourceMutation.dataSource) {
            createSDMInstitusi({ variables: { input: { ...dataSourceInstitusi, dataSource: createData.dataSourceMutation.dataSource.id }}});
            }
        }
        ,[createData]
    )

    if(errorCreateInstitusi) {
        console.log(errorCreateInstitusi);
        console.log(errorCreateInstitusi.networkError.result.errors);
        return <p>error</p>
    }
    
    if (loadingInstitusi) return <p>loading ...</p>

    if (createDataInstitusi) {
        console.log(createDataInstitusi.dataSourceInstitusiMutation.errors);
    }

    return (
        <ApolloProvider client={client}>
        <div className="TambahMustahikPage">
            <main>
                <div className="form-section">
                    <h1 id="form-title">KATEGORI SUMBER DATA</h1>
                    <div className="form" id="sumber-data">
                        <TextField
                            label={ 'Nama Kategori' }
                            placeholder={ 'Institusi' }
                            required={ false }
                            disabled={ true }
                        />
                    </div>
                    <h1 id="form-title">DETAIL SUMBER DATA</h1>
                    <div className="form" id="institusi">
                        <TextField
                            label={ 'Nama Institusi' }
                            placeholder={ 'Al-Hikmah' }
                            required={ false }
                            onChange={institusi => setDataSourceInstitusi({...dataSourceInstitusi, name: institusi})}
                        />
                    </div>
                    <div className="form" id="provinsi">
                        <TextField
                            label={ 'Provinsi' }
                            placeholder={ 'Nama Provinsi' }
                            required={ true }
                            onChange={provinsi => {
                                setDataSourceInstitusi({...dataSourceInstitusi, province: provinsi});
                                setError({...error,
                                    province: provinsi = provinsi.length < 1 ? 'Nama provinsi tidak boleh kosong' : ''});
                            }}
                            error={error.province}
                        />
                    </div>
                    <div className="form" id="alamat">
                        <div class="row">
                            <div class="col" id="kota">
                                <TextField
                                    label={ 'Kota/Kabupaten' }
                                    placeholder={ 'Nama Kota/Kabupaten' }
                                    required={ true }
                                    onChange={kota => {
                                        setDataSourceInstitusi({...dataSourceInstitusi, regency: kota});
                                        setError({...error,
                                            regency: kota = kota.length < 1 ? 'Nama kota tidak boleh kosong' : ''});
                                    }}
                                    error={error.regency}
                                />
                            </div>
                            <div class="col" id="kecamatan">
                                <TextField
                                    label={ 'Kecamatan' }
                                    placeholder={ 'Nama Kecamatan' }
                                    required={ true }
                                    onChange={kecamatan => {
                                        setDataSourceInstitusi({...dataSourceInstitusi, subDistrict: kecamatan});
                                        setError({...error,
                                            subDistrict: kecamatan = kecamatan.length < 1 ? 'Nama kecamatan tidak boleh kosong' : ''});
                                    }}
                                    error={error.subDistrict}
                                />
                            </div>
                            <div class="col" id="kelurahan">
                                <TextField
                                    label={ 'Kelurahan' }
                                    placeholder={ 'Nama Kelurahan' }
                                    required={ true }
                                    onChange={kelurahan => {
                                        setDataSourceInstitusi({...dataSourceInstitusi, village: kelurahan});
                                        setError({...error,
                                            village: kelurahan = kelurahan.length < 1 ? 'Nama kelurahan tidak boleh kosong' : ''});
                                    }}
                                    error={error.village}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form" id="alamat-detail">
                        <div class="row">
                            <div class="col" id="rw">
                                <NumberField
                                    label={ 'RW' }
                                    placeholder={ 'Nomor RW' }
                                    required={ true }
                                    onChange={rw => {
                                        setDataSourceInstitusi({...dataSourceInstitusi, rw: rw});
                                        setError({...error,
                                            rw: rw = rw < 1 ? 'Nomor RW tidak boleh kosong' : ''});
                                    }}
                                    error={error.rw}
                                />
                            </div>
                            <div class="col" id="rt">
                                <NumberField
                                    label={ 'RT' }
                                    placeholder={ 'Nomor RT' }
                                    required={ true }
                                    onChange={rt => {
                                        setDataSourceInstitusi({...dataSourceInstitusi, rt: rt});
                                        setError({...error,
                                            rt: rt = rt < 1 ? 'Nama kelurahan tidak boleh kosong' : ''});
                                    }}
                                    error={error.rt}
                                />
                            </div>
                            <div class="col"></div>
                        </div>
                    </div>
                    <div className="form" id="alamat-lengkap">
                        <TextField
                            label={ 'Alamat Lengkap' }
                            placeholder={ 'Isi dengan alamat lengkap' }
                            required={ false }
                            onChange={alamat => setDataSourceInstitusi({...dataSourceInstitusi, address: alamat})}
                        />
                    </div>
                    <h1 id="form-title">PENANGGUNG JAWAB</h1>
                    <div className="form" id="nama">
                        <TextField
                            label={ 'Nama' }
                            placeholder={ 'Nama Penanggung Jawab sesuai dengan KTP' }
                            required={ true }
                            onChange={nama => {
                                setDataSourceInstitusi({...dataSourceInstitusi, picName: nama});
                                setError({...error,
                                    picName: nama = nama.length < 1 ? 'Nama penanggung jawab tidak boleh kosong' : ''});
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
                                setDataSourceInstitusi({...dataSourceInstitusi, picKtp: noKTP});
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
                            required={ false }
                            onChange={jabatan => setDataSourceInstitusi({...dataSourceInstitusi, picPosition: jabatan})}
                        />
                    </div>
                    <div className="form" id="no-tlp">
                        <NumberField
                            label={ 'No. Telepon' }
                            placeholder={ 'Terdiri dari angka' }
                            required={ true }
                            onChange={noHp => {
                                setDataSourceInstitusi({...dataSourceInstitusi, picPhone: noHp});
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
