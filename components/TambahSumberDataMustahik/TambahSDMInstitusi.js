import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import TextField from '../Inputs/TextField';
import Button from '..//Buttons/Button';
import Success from "../Popups/Success";
import Failed from "../Popups/Failed";
import { useRouter } from 'next/router';
import { TambahSDMContainer } from './TambahSDMStyle';

const ADD_SDM=gql`
    mutation dataSourceMutation($input: DataSourceMutationInput!){
        dataSourceMutation(input: $input){
            dataSource{
                id
                category
            }
            errors { field, messages }
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
            errors { field, messages }
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

    const router = useRouter();
    const [success, setSuccess] = useState(false);
    const [failed, setFailed] = useState(false);

    const [createSDM, 
        { data: createData, error: errorCreate, loading: loading }  
    ] = useMutation(ADD_SDM, {
        onCompleted: (createData) => {
          console.log(createData);
          if (createData.dataSourceMutation.errors.length !== 0) {
              setFailed(true);
            console.log(createData.dataSourceMutation.errors[0].messages[0]);
          } else {
            createSDMInstitusi({
                variables: {
                  input: {
                    ...dataSourceInstitusi,
                    dataSource: createData.dataSourceMutation.dataSource.id,
                  },
                },
              });
              console.log(createData.dataSourceMutation.dataSource);
            }
          },
        });
    const [createSDMInstitusi, 
        { data: createDataInstitusi, error: errorCreateInstitusi, loading: loadingInstitusi }  
    ] = useMutation(ADD_SDM_INSTITUSI, {
        onCompleted: (createDataInstitusi) => {
          console.log(createDataInstitusi);
          if (createDataInstitusi.dataSourceInstitusiMutation.errors.length !== 0) {
            setFailed(true);
            console.log(createDataInstitusi.dataSourceInstitusiMutation.errors[0].messages[0]);
          } else {
            setSuccess(true);
            console.log(createDataInstitusi.dataSourceInstitusiMutation.dataSourceInstitusi);
          }
        },
    });    
    
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
        } else {
          console.log(dataSourceInstitusi);
          setFailed(true);
        }
    }
    const symbol = {
        number: new RegExp(/^[0-9]+$/),
        alphabet: new RegExp(/[a-zA-Z]+/),
        onlySpace: new RegExp(/\s/g),
        namaLengkapValid: new RegExp(/^[a-zA-Z]+?([\s]+)/),
        stringnumberValid: new RegExp(/^[a-zA-Z0-9]+?([\s]+)/),
        numberValid: new RegExp(/^[0][0-9]+$/),
        onlySymbol: new RegExp(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]/),
        phoneNumberWithSymbol: new RegExp(/^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]?[0-9]+$/),
    };
    
    const handleSubmit = () => {
        let formIsValid = true;
        let temporaryError = {};
    
        if (dataSourceInstitusi.picName.length == 0) {
            formIsValid = false;
            temporaryError.picName='Nama penanggung jawab tidak boleh kosong';
        } if (dataSourceInstitusi.picName.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.picName='Nama penanggung jawab tidak boleh diisi spasi saja';
        } if (dataSourceInstitusi.picName.match(symbol.namaLengkapValid)) {
            formIsValid = true;
            temporaryError.picName = "";
        } 
        
        if (dataSourceInstitusi.picKtp.length < 14 || dataSourceInstitusi.picKtp.length > 14) {
            formIsValid = false;
            temporaryError.picKtp='Format KTP harus berupa 14 karakter angka';
        } if (dataSourceInstitusi.picKtp.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.picKtp='Nomor KTP tidak boleh diisi dengan spasi saja';
        } if (dataSourceInstitusi.picKtp.match(symbol.alphabet) || dataSourceInstitusi.picKtp.match(symbol.onlySymbol)) {
            formIsValid = false;
            temporaryError.picKtp='Format KTP harus berupa angka';
        } if (dataSourceInstitusi.picKtp.match(symbol.number)) {
            formIsValid = true;
            temporaryError.picKtp='';
        } 
        
        if (dataSourceInstitusi.picPhone.match(symbol.alphabet)) {
            formIsValid = false;
            temporaryError.picPhone='Format nomor telepon harus berupa angka';
        } if (dataSourceInstitusi.picPhone.length == 0 ) {
            formIsValid = false;
            temporaryError.picPhone='Nomor telepon tidak boleh kosong';
        } if (dataSourceInstitusi.picPhone.match(symbol.phoneNumberWithSymbol) || dataSourceInstitusi.picPhone.match(symbol.onlySymbol)) {
            formIsValid = false;
            temporaryError.picPhone = 'Format nomor telepon harus berupa angka yang diawali dengan 0 (Contoh: 0811111111)';
        } if (dataSourceInstitusi.picPhone.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.phone = 'No HP tidak boleh diisi dengan spasi saja';
        } if (dataSourceInstitusi.picPhone.match(symbol.number)) {
            formIsValid = true;
            temporaryError.picPhone = "";
        }

        if (dataSourceInstitusi.name.length == 0) {
            formIsValid = false;
            temporaryError.name='Nama institusi tidak boleh kosong';
        } if (dataSourceInstitusi.name.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.name='Nama institusi tidak boleh diisi spasi saja';
        } if (dataSourceInstitusi.name.match(symbol.namaLengkapValid)) {
            formIsValid = true;
            temporaryError.name = "";
        } 

        if (dataSourceInstitusi.province.length == 0) {
            formIsValid = false;
            temporaryError.province='Nama provinsi tidak boleh kosong';
        } if (dataSourceInstitusi.province.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.province='Nama provinsi tidak boleh diisi spasi saja';
        } if (dataSourceInstitusi.province.match(symbol.stringnumberValid)) {
            formIsValid = true;
            temporaryError.province = "";
        } 

        if (dataSourceInstitusi.regency.length == 0) {
            formIsValid = false;
            temporaryError.regency='Nama kota/kabupaten tidak boleh kosong';
        } if (dataSourceInstitusi.regency.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.regency='Nama kota/kabupaten tidak boleh diisi spasi saja';
        } if (dataSourceInstitusi.regency.match(symbol.stringnumberValid)) {
            formIsValid = true;
            temporaryError.regency = "";
        } 

        if (dataSourceInstitusi.subDistrict.length == 0) {
            formIsValid = false;
            temporaryError.subDistrict='Nama kecamatann tidak boleh kosong';
        } if (dataSourceInstitusi.subDistrict.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.subDistrict='Nama kecamatan tidak boleh diisi spasi saja';
        } if (dataSourceInstitusi.subDistrict.match(symbol.stringnumberValid)) {
            formIsValid = true;
            temporaryError.subDistrict = "";
        } 

        if (dataSourceInstitusi.village.length == 0) {
            formIsValid = false;
            temporaryError.village='Nama kelurahan tidak boleh kosong';
        } if (dataSourceInstitusi.village.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.village='Nama kelurahan tidak boleh diisi spasi saja';
        } if (dataSourceInstitusi.village.match(symbol.stringnumberValid)) {
            formIsValid = true;
            temporaryError.village = "";
        } 

        if (dataSourceInstitusi.rw.length == 0) {
            formIsValid = false;
            temporaryError.rw='Nomor RW tidak boleh kosong';
        } if (dataSourceInstitusi.rw.length > 3) {
            formIsValid = false;
            temporaryError.rw='Nomor RW tidak boleh lebih dari 3 digit';
        } if (dataSourceInstitusi.rw.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.rw='Nomor RW tidak boleh diisi spasi saja';
        } if (dataSourceInstitusi.rw.match(symbol.alphabet)) {
            formIsValid = false;
            temporaryError.rw = 'Format nomor RW diisi dengan angka';
        } if (dataSourceInstitusi.rw.match(symbol.numberValid)) {
            formIsValid = true;
            temporaryError.rw = "";
        } 

        if (dataSourceInstitusi.rt.length == 0) {
            formIsValid = false;
            temporaryError.rt='Nomor RT tidak boleh kosong';
        } if (dataSourceInstitusi.rt.length > 3) {
            formIsValid = false;
            temporaryError.rw='Nomor RT tidak boleh lebih dari 3 digit';
        } if (dataSourceInstitusi.rt.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.rt='Nomor RT tidak boleh diisi spasi saja';
        } if (dataSourceInstitusi.rt.match(symbol.alphabet)) {
            formIsValid = false;
            temporaryError.rt = 'Format nomor RT diisi dengan angka';
        } if (dataSourceInstitusi.rt.match(symbol.numberValid)) {
            formIsValid = true;
            temporaryError.rt = "";
        } 

        setError(temporaryError);
        return formIsValid;
      }
    
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
                    {success && (
                        <Success
                        message={`Sumber data mustahik atas nama institusi "${dataSourceInstitusi.name}" berhasil ditambahkan!`}
                        onConfirm={() => {
                            router.push({
                                pathname: '/detail/sumber-data-mustahik',
                                query: {
                                    id: createData.dataSourceMutation.dataSource.id
                                },
                            });
                            setSuccess(false);
                        }}
                        />
                    )}
                    {failed && (
                        <Failed
                        message={`Tidak berhasil menambahkan sumber data mustahik. Silahkan dicoba lagi.`}
                        onConfirm={() => {
                            setFailed(false);
                        }}
                        />
                    )}
                        <TextField
                            label={ 'Nama Kategori' }
                            defaultValue={ 'Institusi' }
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
                                if (institusi.match(symbol.stringnumberValid)){
                                    setError({ ...error, 
                                        name: ""
                                    })
                                } else if (institusi.match(symbol.onlySpace)) {
                                    setError({...error,
                                        name: 'Nama institusi tidak boleh diisi dengan spasi saja'
                                    });    
                                } else if (institusi.length < 1) {
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
                                if (provinsi.match(symbol.stringnumberValid)){
                                    setError({ ...error, 
                                        province: ""
                                    })
                                } else if (provinsi.match(symbol.onlySpace)) {
                                    setError({...error,
                                        province: 'Nama provinsi tidak boleh diisi dengan spasi saja'
                                    });    
                                } else if (provinsi.length < 1) {
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
                                        if (kota.match(symbol.stringnumberValid)){
                                            setError({ ...error, 
                                                regency: ""
                                            })
                                        } else if (kota.match(symbol.onlySpace)) {
                                            setError({...error,
                                                regency: 'Nama kota tidak boleh diisi dengan spasi saja'
                                            });    
                                        } else if (kota.length < 1) {
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
                                        if (kecamatan.match(symbol.stringnumberValid)){
                                            setError({ ...error, 
                                                subDistrict: ""
                                            })
                                        } else if (kecamatan.match(symbol.onlySpace)) {
                                            setError({...error,
                                                subDistrict: 'Nama kecamatan tidak boleh diisi dengan spasi saja'
                                            });    
                                        } else if (kecamatan.length < 1) {
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
                                        if (kelurahan.match(symbol.stringnumberValid)){
                                            setError({ ...error, 
                                                village: ""
                                            })
                                        } else if (kelurahan.match(symbol.onlySpace)) {
                                            setError({...error,
                                                village: 'Nama kelurahan tidak boleh diisi dengan spasi saja'
                                            });    
                                        } else if (kelurahan.length < 1) {
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
                                <TextField
                                    label={ 'RW' }
                                    placeholder={ 'Nomor RW' }
                                    required={ true }
                                    onChange={rw => {
                                        setDataSourceInstitusi({...dataSourceInstitusi, rw: rw});
                                        if (rw.match(symbol.numberValid)){
                                            setError({ ...error, 
                                                rw: ""
                                            })
                                        } else if (rw.match(symbol.onlySpace)) {
                                            setError({...error,
                                                rw: 'Nomor RW tidak boleh diisi dengan spasi saja'
                                            });    
                                        } else if (rw.match(symbol.alphabet)) {
                                            setError({...error,
                                                rw: 'Format nomor RW diisi dengan angka'
                                            });    
                                        } else if (rw.length < 1) {
                                            setError({...error,
                                                rw: 'Nomor RW tidak boleh kosong'
                                            });
                                        } else if (rw.length > 3) {
                                            setError({...error,
                                                rw: 'Nomor RT tidak boleh lebih dari 3 digit'
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
                                <TextField
                                    label={ 'RT' }
                                    placeholder={ 'Nomor RT' }
                                    required={ true }
                                    onChange={rt => {
                                        setDataSourceInstitusi({...dataSourceInstitusi, rt: rt});
                                        if (rt.match(symbol.numberValid)){
                                            setError({ ...error, 
                                                rt: ""
                                            })
                                        } else if (rt.match(symbol.onlySpace)) {
                                            setError({...error,
                                                rt: 'Nomor RT tidak boleh diisi dengan spasi saja'
                                            });    
                                        } else if (rt.match(symbol.alphabet)) {
                                            setError({...error,
                                                rt: 'Format nomor RT diisi dengan angka'
                                            });    
                                        } else if (rt.length < 1) {
                                            setError({...error,
                                                rt: 'Nomor RT tidak boleh kosong'
                                            });
                                        } else if (rt.length > 3) {
                                            setError({...error,
                                                rt: 'Nomor RT tidak boleh lebih dari 3 digit'
                                            });
                                        } else {
                                            setError({...error,
                                                rt:''
                                            });
                                        }                                    
                                    }}
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
                                if (nama.match(symbol.stringnumberValid)){
                                    setError({ ...error, 
                                        picName: ""
                                    })
                                } else if (nama.match(symbol.onlySpace)) {
                                    setError({...error,
                                        picName: 'Nama penanggung jawab tidak boleh diisi dengan spasi saja'
                                    });    
                                } else if (nama.length < 1) {
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
                        <TextField
                            label={ 'No. KTP' }
                            placeholder={ 'Terdiri dari 14 karakter angka' }
                            required={ true }
                            onChange={noKTP => {
                                setDataSourceInstitusi({...dataSourceInstitusi, picKtp: noKTP});
                                if (noKTP.match(symbol.numberValid)){
                                    setError({ ...error,
                                        picKtp: ""
                                    });
                                }
                                if (noKTP.match(symbol.onlySpace)) {
                                    setError({ ...error,
                                        picKtp: "Nomor KTP tidak boleh diisi dengan spasi",
                                    });
                                } else if (noKTP.length < 14 || noKTP.length > 14) {
                                    setError({ ...error,
                                        picKtp: "Format KTP harus berupa 14 karakter angka",
                                    });
                                } else if (noKTP.match(symbol.alphabet) || noKTP.match(symbol.onlySymbol)) {
                                    setError({ ...error,
                                        picKtp: "Format KTP harus diisi dengan angka",
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
                            required={ false }
                            onChange={jabatan => setDataSourceInstitusi({...dataSourceInstitusi, picPosition: jabatan})}
                        />
                    </div>
                    <div className="form" id="no-tlp">
                        <TextField
                            label={ 'No. Telepon' }
                            placeholder={ 'Terdiri dari angka' }
                            required={ true }
                            onChange={noHp => {
                                setDataSourceInstitusi({...dataSourceInstitusi, picPhone: noHp});
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
                                        picPhone: "Nomor telepon tidak boleh diisi dengan spasi",
                                    });
                                } else if (noHp.length < 1) {
                                    setError({...error,
                                        picPhone: 'Nomor telepon tidak boleh kosong'
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
