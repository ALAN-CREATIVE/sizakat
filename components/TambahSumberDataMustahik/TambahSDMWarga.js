import React, { useState, useEffect } from 'react';
import { gql, useMutation } from '@apollo/client';
import TextField from '../Inputs/TextField';
import Button from '../Buttons/Button';
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
            errors { field, messages }
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
            createSDMWarga({
                variables: {
                  input: {
                    ...dataSourceWarga,
                    dataSource: createData.dataSourceMutation.dataSource.id,
                  },
                },
              });
              console.log(createData.dataSourceMutation.dataSource);
            }
          },
        });
        
    const [createSDMWarga, 
        { data: createDataWarga, error: errorCreateWarga, loading: loadingWarga }  
    ] = useMutation(ADD_SDM_WARGA, {
        onCompleted: (createDataWarga) => {
          console.log(createDataWarga);
          if (createDataWarga.dataSourceWargaMutation.errors.length !== 0) {
            setFailed(true);
            console.log(createDataWarga.dataSourceWargaMutation.errors[0].messages[0]);
          } else {
            setSuccess(true);
            console.log(createDataWarga.dataSourceWargaMutation.dataSourceWarga);
          }
        },
    });    

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
        } else {
            console.log(dataSourceWarga);
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
    
        if (dataSourceWarga.picName.length == 0) {
            formIsValid = false;
            temporaryError.picName='Nama penanggung jawab tidak boleh kosong';
        } if (dataSourceWarga.picName.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.picName='Nama penanggung jawab tidak boleh diisi spasi saja';
        } if (dataSourceWarga.picName.match(symbol.namaLengkapValid)) {
            formIsValid = true;
            temporaryError.picName = "";
        } 
        
        if (dataSourceWarga.picKtp.length < 14 || dataSourceWarga.picKtp.length > 14) {
            formIsValid = false;
            temporaryError.picKtp='Format KTP harus berupa 14 karakter angka';
        } if (dataSourceWarga.picKtp.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.picKtp='Nomor KTP tidak boleh diisi dengan spasi saja';
        } if (dataSourceWarga.picKtp.match(symbol.alphabet) || dataSourceWarga.picKtp.match(symbol.onlySymbol)) {
            formIsValid = false;
            temporaryError.picKtp='Format KTP harus berupa angka';
        } if (dataSourceWarga.picKtp.match(symbol.number)) {
            formIsValid = true;
            temporaryError.picKtp='';
        } 

        if (dataSourceWarga.picPhone.match(symbol.alphabet)) {
            formIsValid = false;
            temporaryError.picPhone='Format nomor telepon harus berupa angka';
        } if (dataSourceWarga.picPhone.length == 0 ) {
            formIsValid = false;
            temporaryError.picPhone='Nomor telepon tidak boleh kosong';
        } if (dataSourceWarga.picPhone.match(symbol.phoneNumberWithSymbol) || dataSourceWarga.picPhone.match(symbol.onlySymbol)) {
            formIsValid = false;
            temporaryError.picPhone = 'Format nomor telepon harus berupa angka yang diawali dengan 0 (Contoh: 0811111111)';
        } if (dataSourceWarga.picPhone.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.phone = 'No HP tidak boleh diisi dengan spasi saja';
        } if (dataSourceWarga.picPhone.match(symbol.number)) {
            formIsValid = true;
            temporaryError.picPhone = "";
        }

        if (dataSourceWarga.picPosition.length == 0) {
            formIsValid = false;
            temporaryError.picPosition='Jabatan penanggung jawab tidak boleh kosong';
        } if (dataSourceWarga.picPosition.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.picPosition='Jabatan penanggung jawab tidak boleh diisi spasi saja';
        } if (dataSourceWarga.picPosition.match(symbol.namaLengkapValid)) {
            formIsValid = true;
            temporaryError.picPosition = "";
        } 

        if (dataSourceWarga.province.length == 0) {
            formIsValid = false;
            temporaryError.province='Nama provinsi tidak boleh kosong';
        } if (dataSourceWarga.province.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.province='Nama provinsi tidak boleh diisi spasi saja';
        } if (dataSourceWarga.province.match(symbol.stringnumberValid)) {
            formIsValid = true;
            temporaryError.province = "";
        } 

        if (dataSourceWarga.regency.length == 0) {
            formIsValid = false;
            temporaryError.regency='Nama kota/kabupaten tidak boleh kosong';
        } if (dataSourceWarga.regency.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.regency='Nama kota/kabupaten tidak boleh diisi spasi saja';
        } if (dataSourceWarga.regency.match(symbol.stringnumberValid)) {
            formIsValid = true;
            temporaryError.regency = "";
        } 

        if (dataSourceWarga.subDistrict.length == 0) {
            formIsValid = false;
            temporaryError.subDistrict='Nama kecamatann tidak boleh kosong';
        } if (dataSourceWarga.subDistrict.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.subDistrict='Nama kecamatan tidak boleh diisi spasi saja';
        } if (dataSourceWarga.subDistrict.match(symbol.stringnumberValid)) {
            formIsValid = true;
            temporaryError.subDistrict = "";
        } 

        if (dataSourceWarga.village.length == 0) {
            formIsValid = false;
            temporaryError.village='Nama kelurahan tidak boleh kosong';
        } if (dataSourceWarga.village.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.village='Nama kelurahan tidak boleh diisi spasi saja';
        } if (dataSourceWarga.village.match(symbol.stringnumberValid)) {
            formIsValid = true;
            temporaryError.village = "";
        } 

        if (dataSourceWarga.rw.length == 0) {
            formIsValid = false;
            temporaryError.rw='Nomor RW tidak boleh kosong';
        } if (dataSourceWarga.rw.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.rw='Nomor RW tidak boleh diisi spasi saja';
        } if (dataSourceWarga.rw.match(symbol.alphabet)) {
            formIsValid = false;
            temporaryError.rw = 'Format nomor RW diisi dengan angka';
        } if (dataSourceWarga.rw.match(symbol.numberValid)) {
            formIsValid = true;
            temporaryError.rw = "";
        } 

        if (dataSourceWarga.rt.length == 0) {
            formIsValid = false;
            temporaryError.rt='Nomor RT tidak boleh kosong';
        } if (dataSourceWarga.rt.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.rt='Nomor RT tidak boleh diisi spasi saja';
        } if (dataSourceWarga.rt.match(symbol.alphabet)) {
            formIsValid = false;
            temporaryError.rt = 'Format nomor RT diisi dengan angka';
        } if (dataSourceWarga.rt.match(symbol.numberValid)) {
            formIsValid = true;
            temporaryError.rt = "";
        }     

        setError(temporaryError);
        return formIsValid;
      }
    
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
        <TambahSDMContainer className="TambahMustahikPage">
            <main>
                <div className="form-section">
                    <h1 id="form-title">KATEGORI SUMBER DATA</h1>
                    {success && (
                        <Success
                        message={`Sumber data mustahik atas nama "${dataSourceWarga.picName}" berhasil ditambahkan!`}
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
                    <div className="form" id="sumber-data">
                        <TextField
                            label={ 'Nama Kategori' }
                            defaultValue={ 'Warga' }
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
                                        setDataSourceWarga({...dataSourceWarga, regency: kota});
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
                                        setDataSourceWarga({...dataSourceWarga, subDistrict: kecamatan});
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
                                        setDataSourceWarga({...dataSourceWarga, village: kelurahan});
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
                                        setDataSourceWarga({...dataSourceWarga, rw: rw});
                                        if (rw.match(symbol.numberValid)){
                                            setError({ ...error, 
                                                rt: ""
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
                                        setDataSourceWarga({...dataSourceWarga, rt: rt});
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
                    <h1 id="form-title">PENANGGUNG JAWAB</h1>
                    <div className="form" id="nama">
                        <TextField
                            label={ 'Nama' }
                            placeholder={ 'Nama Penanggung Jawab sesuai dengan KTP' }
                            required={ true }
                            onChange={penanggungjawab => {
                                setDataSourceWarga({...dataSourceWarga, picName: penanggungjawab});
                                if (penanggungjawab.match(symbol.namaLengkapValid)){
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
                        <TextField
                            label={ 'No. KTP' }
                            placeholder={ 'Terdiri dari 14 karakter angka' }
                            required={ true }
                            onChange={noKTP => {
                                setDataSourceWarga({...dataSourceWarga, picKtp: noKTP});
                                if (noKTP.match(symbol.numberValid)){
                                    setError({ ...error, 
                                        picKtp: "",
                                    })
                                } else if (noKTP.match(symbol.onlySpace)) {
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
                            required={ true }
                            onChange={jabatan => {
                                setDataSourceWarga({...dataSourceWarga, picPosition: jabatan});
                                if (jabatan.match(symbol.stringnumberValid)){
                                    setError({ ...error, 
                                        picPosition: ""
                                    })
                                } else if (jabatan.match(symbol.onlySpace)) {
                                    setError({...error,
                                        picPosition: 'Jabatan penanggung jawab tidak boleh diisi dengan spasi saja'
                                    });    
                                } else if (jabatan.length < 1) {
                                    setError({...error,
                                        picPosition: 'Jabatan penanggung jawab tidak boleh kosong'
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
                        <TextField
                            label={ 'No. Telepon' }
                            placeholder={ 'Terdiri dari angka' }
                            required={ true }
                            onChange={noHp => {
                                setDataSourceWarga({...dataSourceWarga, picPhone: noHp});
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
  
