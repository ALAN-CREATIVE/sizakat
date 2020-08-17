import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import NumberField from '../Inputs/NumberField';
import TextField from '../Inputs/TextField';
import Button from '../Buttons/Button';

import { TambahSDMStyle } from './TambahSDMStyle';

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
  
export default function FormTambahSDMWarga() {   
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

    const [error, setError] = useState({
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

    const submitForm = () => {
        console.log(handleSubmit());
        if (handleSubmit()) {
            createSDM({
                variables: {
                    input: {
                        category:'WARGA'
                    }
                }
            });
          console.log(dataSourceWarga);
          alert("Submit berhasil");
        } else {
          console.log(dataSourceWarga);
          alert("Submit gagal");
        }
    }

    const handleSubmit = () => {
        let formIsValid = true;
        let temporaryError = {};
    
        if (dataSourceWarga.picName.length == 0) {
            formIsValid = false;
            temporaryError.picName='Nama penanggung jawab tidak boleh kosong';
        } if (dataSourceWarga.picKtp.length < 14 || dataSourceWarga.picKtp.length > 14) {
            formIsValid = false;
            temporaryError.picKtp='Format KTP harus berupa 14 karakter angka';
        } if (dataSourceWarga.picPhone.length == 0) {
            formIsValid = false;
            temporaryError.picPhone='Nomor telepon tidak boleh kosong';
        } if (dataSourceWarga.picPosition.length == 0) {
            formIsValid = false;
            temporaryError.picPosition='Nama jabatan tidak boleh kosong';
        } if (dataSourceWarga.province.length == 0) {
            formIsValid = false;
            temporaryError.province='Nama provinsi tidak boleh kosong';
        } if (dataSourceWarga.regency.length == 0) {
            formIsValid = false;
            temporaryError.regency='Nama kota/kabupaten tidak boleh kosong';
        } if (dataSourceWarga.subDistrict.length == 0) {
            formIsValid = false;
            temporaryError.subDistrict='Nama kecamatan tidak boleh kosong';
        } if (dataSourceWarga.village.length == 0) {
            formIsValid = false;
            temporaryError.village='Nama kelurahan tidak boleh kosong';
        } if (dataSourceWarga.rw.length == 0) {
            formIsValid = false;
            temporaryError.rw='Nomor RW tidak boleh kosong';
        } if (dataSourceWarga.rt.length == 0) {
            formIsValid = false;
            temporaryError.rt='Nomor RT tidak boleh kosong';
        }

        setError(temporaryError);
        return formIsValid;
      }

    useEffect(() => {
        if (createData && createData.dataSourceMutation && createData.dataSourceMutation.dataSource) {
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
        console.log(createDataWarga.dataSourceWargaMutation.errors);
    }

    return (
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
                            onChange={provinsi => {
                                setDataSourceWarga({...dataSourceWarga, province: provinsi});
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
                                        setDataSourceWarga({...dataSourceWarga, regency: kota});
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
                                        setDataSourceWarga({...dataSourceWarga, subDistrict: kecamatan});
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
                                        setDataSourceWarga({...dataSourceWarga, village: kelurahan});
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
                                        setDataSourceWarga({...dataSourceWarga, rw: rw});
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
                                        setDataSourceWarga({...dataSourceWarga, rt: rt});
                                        setError({...error,
                                            rt: rt = rt < 1 ? 'Nama kelurahan tidak boleh kosong' : ''});
                                    }}
                                    error={error.rt}
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
                            onChange={penanggungjawab => {
                                setDataSourceWarga({...dataSourceWarga, picName: penanggungjawab});
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
                                setDataSourceWarga({...dataSourceWarga, picKtp: noKTP});
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
                                setDataSourceWarga({...dataSourceWarga, picPosition: jabatan});
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
                                setDataSourceWarga({...dataSourceWarga, picPhone: noHp});
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
  );
};

export async function getStaticProps() {
    return {
      props: {
        backend_uri: `http://${process.env.GRAPHQL_URL}`
      }
    }
  }
  