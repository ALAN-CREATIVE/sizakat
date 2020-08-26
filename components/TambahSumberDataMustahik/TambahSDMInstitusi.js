import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import NumberField from '../Inputs/NumberField';
import TextField from '../Inputs/TextField';
import Button from '..//Buttons/Button';

import { TambahSDMContainer } from './TambahSDMStyle';

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
    
export default function FormTambahSDMInstitusi() {   
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
        name:'',
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
        var alphabet = new RegExp(/^[a-zA-Z]+$/);
        var plus = new RegExp(/^\+?[0-9]+$/);
        var space = new RegExp(/\s/g);
    
        if (dataSourceInstitusi.picName.length == 0 || dataSourceInstitusi.picName.match(space)) {
            formIsValid = false;
            temporaryError.picName='Nama penanggung jawab tidak boleh kosong';
        } if (dataSourceInstitusi.picKtp.length < 14 || dataSourceInstitusi.picKtp.length > 14 || dataSourceInstitusi.picKtp.match(space)) {
            formIsValid = false;
            temporaryError.picKtp='Format KTP harus berupa 14 karakter angka';
        } if (dataSourceInstitusi.picKtp.match(alphabet)) {
            formIsValid = false;
            temporaryError.picKtp='Format KTP harus berupa angka';
        } if (dataSourceInstitusi.picPhone.length == 0 || dataSourceInstitusi.picPhone.match(space)) {
            formIsValid = false;
            temporaryError.picPhone='Nomor telepon tidak boleh kosong';
        } if (dataSourceInstitusi.picPhone.match(alphabet)) {
            formIsValid = false;
            temporaryError.picPhone='Format nomor telepon harus berupa angka';
        } if (dataSourceInstitusi.picPhone.match(plus)) {
            formIsValid = false;
            temporaryError.phone='Format nomor telepon harus berupa angka yang diawali dengan 0 (Contoh: 0811111111)';
        } if (dataSourceInstitusi.name.length == 0 || dataSourceInstitusi.name.match(space)) {
            formIsValid = false;
            temporaryError.name='Nama institusi tidak boleh kosong';
        } if (dataSourceInstitusi.province.length == 0 || dataSourceInstitusi.province.match(space)) {
            formIsValid = false;
            temporaryError.province='Nama provinsi tidak boleh kosong';
        } if (dataSourceInstitusi.regency.length == 0 || dataSourceInstitusi.regency.match(space)) {
            formIsValid = false;
            temporaryError.regency='Nama kota/kabupaten tidak boleh kosong';
        } if (dataSourceInstitusi.subDistrict.length == 0 || dataSourceInstitusi.subDistrict.match(space)) {
            formIsValid = false;
            temporaryError.subDistrict='Nama kecamatan tidak boleh kosong';
        } if (dataSourceInstitusi.village.length == 0 || dataSourceInstitusi.village.match(space)) {
            formIsValid = false;
            temporaryError.village='Nama kelurahan tidak boleh kosong';
        } if (dataSourceInstitusi.rw.length == 0 || dataSourceInstitusi.rw.match(space)) {
            formIsValid = false;
            temporaryError.rw='Nomor RW tidak boleh kosong';
        } if (dataSourceInstitusi.rw.match(alphabet)) {
            formIsValid = false;
            temporaryError.rw='Format nomor RW harus berupa angka';
        } if (dataSourceInstitusi.rt.length == 0 || dataSourceInstitusi.rt.match(space)) {
            formIsValid = false;
            temporaryError.rt='Nomor RT tidak boleh kosong';
        } if (dataSourceInstitusi.rt.match(alphabet)) {
            formIsValid = false;
            temporaryError.rt='Format nomor RT harus berupa angka';
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
        <TambahSDMContainer className="TambahMustahikPage">
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
                            required={ true }
                            onChange={institusi => {
                                setDataSourceInstitusi({...dataSourceInstitusi, name: institusi});
                                var space = new RegExp(/\s/g);
                                if (institusi.length == 0  || institusi.match(space)) {
                                    setError({...error,
                                        name: 'Nama institusi tidak boleh kosong'
                                    });
                                } else {
                                    setError({...error,
                                        name:''
                                    });
                                }
                            }}
                            error={error.name}
                        />
                    </div>
                    <div className="form" id="provinsi">
                        <TextField
                            label={ 'Provinsi' }
                            placeholder={ 'Nama Provinsi' }
                            required={ true }
                            onChange={provinsi => {
                                setDataSourceInstitusi({...dataSourceInstitusi, province: provinsi});
                                var space = new RegExp(/\s/g);
                                if (provinsi.length < 1 || provinsi.match(space)){
                                    setError({...error,
                                        province: 'Nama provinsi tidak boleh kosong'
                                    });
                                } else {
                                    setError({...error,
                                        province:''
                                    });
                                }
                            }}
                            error={error.province}
                        />
                    </div>
                    <div className="form" id="alamat">
                        <div className="row">
                            <div className="col col-12 col-sm-4" id="kota">
                                <TextField
                                    label={ 'Kota/Kabupaten' }
                                    placeholder={ 'Nama Kota/Kabupaten' }
                                    required={ true }
                                    onChange={kota => {
                                        setDataSourceInstitusi({...dataSourceInstitusi, regency: kota});
                                        var space = new RegExp(/\s/g);
                                        if (kota.length < 1 || kota.match(space)){
                                            setError({...error,
                                                regency: 'Nama kota tidak boleh kosong'
                                            });
                                        } else {
                                            setError({...error,
                                                regency:''
                                            });
                                        }
                                    }}
                                    error={error.regency}
                                />
                            </div>
                            <div className="col col-12 col-sm-4" id="kecamatan">
                                <TextField
                                    label={ 'Kecamatan' }
                                    placeholder={ 'Nama Kecamatan' }
                                    required={ true }
                                    onChange={kecamatan => {
                                        setDataSourceInstitusi({...dataSourceInstitusi, subDistrict: kecamatan});
                                        var space = new RegExp(/\s/g);
                                        if (kecamatan.length < 1 || kecamatan.match(space)){
                                            setError({...error,
                                                subDistrict: 'Nama kecamatan tidak boleh kosong'
                                            });
                                        } else {
                                            setError({...error,
                                                subDistrict:''
                                            });
                                        }
                                    }}
                                    error={error.subDistrict}
                                />
                            </div>
                            <div className="col col-12 col-sm-4" id="kelurahan">
                                <TextField
                                    label={ 'Kelurahan' }
                                    placeholder={ 'Nama Kelurahan' }
                                    required={ true }
                                    onChange={kelurahan => {
                                        setDataSourceInstitusi({...dataSourceInstitusi, village: kelurahan});
                                        var space = new RegExp(/\s/g);
                                        if (kelurahan.length < 1 || kelurahan.match(space)){
                                            setError({...error,
                                                village: 'Nama kelurahan tidak boleh kosong'
                                            });
                                        } else {
                                            setError({...error,
                                                village:''
                                            });
                                        }
                                    }}
                                    error={error.village}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form" id="alamat-detail">
                        <div className="row">
                            <div className="col col-12 col-sm-4" id="rw">
                                <NumberField
                                    label={ 'RW' }
                                    placeholder={ 'Nomor RW' }
                                    required={ true }
                                    onChange={rw => {
                                        setDataSourceInstitusi({...dataSourceInstitusi, rw: rw});
                                        var alphabet = new RegExp(/^[a-zA-Z]+$/);
                                        var space = new RegExp(/\s/g);
                                        if (rw < 1 || rw.match(space)){
                                            setError({...error,
                                                rw: 'Nomor RW tidak boleh kosong'
                                            });
                                        } else if (rw.match(alphabet)){
                                            setError({...error,
                                                rw: 'Format nomor RW harus berupa angka'
                                            });
                                        } else {
                                            setError({...error,
                                                rw:''
                                            });
                                        }
                                    }}
                                    error={error.rw}
                                />
                            </div>
                            <div className="col col-12 col-sm-4" id="rt">
                                <NumberField
                                    label={ 'RT' }
                                    placeholder={ 'Nomor RT' }
                                    required={ true }
                                    onChange={rt => {
                                        setDataSourceInstitusi({...dataSourceInstitusi, rt: rt});
                                        var alphabet = new RegExp(/^[a-zA-Z]+$/);
                                        var space = new RegExp(/\s/g);
                                        if (rt < 1 || rt.match(space)){
                                            setError({...error,
                                                rt: 'Nomor RT tidak boleh kosong'
                                            });
                                        } else if (rt.match(alphabet)){
                                            setError({...error,
                                                rt: 'Format nomor RT harus berupa angka'
                                            });
                                        } else {
                                            setError({...error,
                                                rt:''
                                            });
                                        }                                    }}
                                    error={error.rt}
                                />
                            </div>
                            <div className="col"></div>
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
                                var space = new RegExp(/\s/g);
                                if (nama.length < 1 || nama.match(space)){
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
                                setDataSourceInstitusi({...dataSourceInstitusi, picKtp: noKTP});
                                var alphabet = new RegExp(/^[a-zA-Z]+$/);
                                var space = new RegExp(/\s/g);
                                if (noKTP.length < 14 || noKTP.length > 14 || picKtp.match(space)){
                                    setError({...error,
                                        picKtp: 'Format KTP harus berupa 14 karakter angka'
                                    });
                                } else if (rw.match(alphabet)){
                                    setError({...error,
                                        picKtp: 'Format KTP harus berupa angka'
                                    });
                                } else {
                                    setError({...error,
                                        picKtp:''
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
                                var pattern = new RegExp(/^[0-9]+$/);
                                var alphabet = new RegExp(/^[a-zA-Z]+$/);
                                var plus = new RegExp(/^\+?[0-9]+$/);
                                var space = new RegExp(/\s/g);
                                if (noHp.match(alphabet)) {
                                    setError ({...error,
                                        picPhone:'Format nomor telepon harus berupa angka'
                                    });
                                } else if(noHp.match(pattern)) {
                                    setError ({...error,
                                        phone:''
                                    });
                                } else if(noHp.match(plus)) {
                                    setError ({...error,
                                        picPhone:'Format nomor telepon harus berupa angka yang diawali dengan 0 (Contoh: 0811111111)'
                                    });
                                } else if (noHp.match(space)) {
                                    setError ({...error,
                                        picPhone:'Nomor telepon tidak boleh kosong'
                                    });
                                }
                                else {
                                    setError ({...error,
                                        phone:''
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
                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossOrigin="anonymous"></script>
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
