import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import Dropdown from '../Inputs/Dropdown';
import FileField from '../Inputs/FileField';
import NumberField from '../Inputs/NumberField';
import RadioButton from '../Inputs/RadioButton';
import TextField from '../Inputs/TextField';
import DateField from '../Inputs/DateField';
import Button from '../Buttons/Button';

import { resolveDataSourceName } from '../../Utils/ParserUtil';

import { TambahMustahikStyle } from './TambahMustahikStyle';

const ADD_MUSTAHIK = gql`
  mutation mustahikMutation($input: MustahikMutationInput!) {
    mustahikMutation(input: $input) {
      mustahik {
        id
        name
        noKtp
      }
      errors {
        messages
      }
    }
  }
`;

const GET_DATA_SOURCE = gql`
  query {
    dataSources {
      id
      category
      dataSourceDetail {
        ... on DataSourceWargaType {
          rt
          rw
          village
        }
        ... on DataSourceInstitusiType {
          name
          village
        }
        ... on DataSourcePekerjaType {
          profession
          location
        }
      }
    }
  }
`

export default function FormTambahMustahik() {
  const [mustahik, setMustahik] = useState({
    name: '',
    noKtp: '',
    phone: '',
    address: '',
    birthdate: 'xxxx-xx-xx',
    status: '',
    gender: '',
    dataSource: null,
    photo: '',
  });

  const [error, setError] = useState({
    name: '',
    noKtp: '',
    phone: '',
    address: '',
    errorDate: '',
    errorMonth: '',
    errorYear: '',
    status: '',
    gender: '',
    dataSource: '',
    photo: ''
  });

  const [createMustahik, { data: createData, error: errorCreate }  ] = useMutation(ADD_MUSTAHIK);
  const { data: dataSource, error: errorDataSource, loading: loadingDataSource } = useQuery(GET_DATA_SOURCE);

  const submitForm = () => {
    console.log(handleSubmit());
    if (handleSubmit()) {
      createMustahik({
        variables: {
          input: {
            ...mustahik
          }
        }});
      console.log(mustahik);
      alert("Submit berhasil");
    } else {
      console.log(mustahik);
      alert("Submit gagal");
    }
  }

  const handleSubmit = () => {
    let formIsValid = true;
    let temporaryError = {};
    var alphabet = new RegExp(/^[a-zA-Z]+$/);
    var plus = new RegExp(/^\+?[0-9]+$/);
    var onlyPlus = new RegExp(/^[\+]+$/);
    var onlySpace = new RegExp(/\s/g);
    var namaLengkapValid = new RegExp(/^[a-zA-Z]+?([\s]+)/);
    var alamatValid = new RegExp(/^[a-zA-Z0-9]+?([\s]+)/);

    if (mustahik.name.length == 0) {
        formIsValid = false;
        temporaryError.name='Nama lengkap tidak boleh kosong';
    } if (mustahik.name.match(onlySpace)) {
        formIsValid = false;
        temporaryError.name='Nama lengkap tidak boleh diisi dengan spasi saja';
    } if (mustahik.name.match(namaLengkapValid)) {
        formIsValid = true;
        temporaryError.name='';
    } if (mustahik.noKtp.length < 14 || mustahik.noKtp.length > 14) {
        formIsValid = false;
        temporaryError.noKtp='Format KTP harus berupa 14 karakter angka';
    } if (mustahik.noKtp.match(onlySpace)) {
        formIsValid = false;
        temporaryError.noKtp='No KTP tidak boleh diisi dengan spasi';
    } if (mustahik.address.length == 0) {
        formIsValid = false;
        temporaryError.address='Alamat tidak boleh kosong';
    } if (mustahik.address.match(onlySpace)) {
        formIsValid = false;
        temporaryError.address='Alamat tidak boleh diisi dengan spasi saja';
    } if (mustahik.address.match(alamatValid)) {
        formIsValid = false;
        temporaryError.address='';
    } if (mustahik.birthdate.slice(8) == "xx") {
        formIsValid = false;
        temporaryError.errorDate= 'Tanggal lahir tidak boleh kosong';
    } if (mustahik.birthdate.slice(5,7) == "xx") {
        formIsValid = false;
        temporaryError.errorMonth= 'Bulan lahir tidak boleh kosong';
    } if (mustahik.birthdate.slice(0,4) == "xxxx") {
        formIsValid = false;
        temporaryError.errorYear= 'Tahun lahir tidak boleh kosong';
    } if (mustahik.status.length == 0) {
        formIsValid = false;
        temporaryError.status='Pilihan mustahik tidak boleh kosong';
    } if (mustahik.gender.length == 0) {
        formIsValid = false;
        temporaryError.gender='Pilih salah satu dari jenis kelamin';
    } if (mustahik.dataSource === null || mustahik.dataSource === undefined) {
        formIsValid = false;
        temporaryError.dataSource='Pilihan sumber data tidak boleh kosong';
    } if (mustahik.phone.match(alphabet)) {
        formIsValid = false;
        temporaryError.phone='Format HP harus berupa angka';
    } if (mustahik.phone.match(plus) || mustahik.phone.match(onlyPlus)) {
        formIsValid = false;
        temporaryError.phone='Format HP harus berupa angka yang diawali dengan 0 (Contoh: 0811111111)';
    } if (mustahik.phone.match(onlySpace)) {
        formIsValid = false;
        temporaryError.phone='No HP tidak boleh diisi dengan spasi';
    }

    setError(temporaryError);
    return formIsValid;
  }

  if(errorCreate || errorDataSource) {
    console.log(errorDataSource);
    console.log(errorCreate.networkError.result.errors);
    return <p>error</p>
  }

  if (loadingDataSource) return <p>loading ...</p>

  if (createData) {
    console.log(createData.mustahikMutation.errors.messages);
  }

  return (
    <div className="TambahMustahikPage">
      <main>
        <div className="form-section">
          <h1 id="form-title">IDENTITAS DIRI MUSTAHIK</h1>
          <div className="form" id="sumber-data">
            <Dropdown
              label={ 'Sumber Data' }
              placeholder={ 'Pilih Sumber Data ex: Ketua RT, Pekerja, Pondok' }
              options={
                dataSource.dataSources.map(dataSource => ({
                  display: resolveDataSourceName(dataSource),
                  value: dataSource.id
                }))
              }
              required={ true }
              onChange={id => {
                setMustahik ( {...mustahik, dataSource: new Number(id)});
              }}
              error={error.dataSource}
            />
          </div>
          <div className="form" id="nomor-ktp">
            <NumberField
              label={'Nomor KTP'}
              placeholder={'Terdiri dari 14 karakter angka'}
              required={true}
              onChange={ktp => {
                setMustahik({...mustahik, noKtp: ktp});
                var space = new RegExp(/\s/g);
                if (ktp.match(space)) {
                  setError({...error,
                    noKtp: 'Nomor KTP tidak boleh diisi dengan spasi'
                  });
                }
                else if (ktp.length < 14 || ktp.length > 14) {
                  setError({...error,
                    noKtp: 'Format KTP harus berupa 14 karakter angka'
                  });
                } else {
                  setError({...error,
                    noKtp:''});
                }
              }}
              error={error.noKtp}
            />
          </div>
          <div className="form" id="nama-lengkap">
            <TextField
              label={ 'Nama Lengkap' }
              placeholder={ 'Nama sesuai dengan KTP' }
              required={ true }
              onChange={name => {
                setMustahik({...mustahik, name: name});
                var onlySpace = new RegExp(/\s/g);
                var namaLengkapValid = new RegExp(/^[a-zA-Z]+?([\s]+)/);
                if (name.match(namaLengkapValid)) {
                  setError({...error,
                    name: ''
                  });
                } else if (name.match(onlySpace)) {
                  setError({...error,
                    name: 'Nama lengkap tidak boleh diisi dengan spasi saja'
                  })
                } else if (name.length < 1) {
                  setError({...error,
                    name: 'Nama lengkap tidak boleh kosong'
                  });
                } else {
                  setError({...error,
                    name:''});
                }
              }}
              error={error.name}
            />
          </div>
          <div className="form" id="tanggal-lahir">
            <DateField
              label={'Tanggal Lahir'}
              required={true}
              onDatePicked={date => {
                setMustahik({...mustahik, birthdate: mustahik.birthdate.slice(0,8) + date});
              }}
              errorDate={error.errorDate}
              onMonthPicked={month => {
                setMustahik({...mustahik, birthdate: mustahik.birthdate.slice(0,5) + month + mustahik.birthdate.slice(7)});
              }}
              errorMonth={error.errorMonth}
              onYearPicked={year => {
                setMustahik({...mustahik, birthdate: year + mustahik.birthdate.slice(4)});
              }}
              errorYear={error.errorYear}
            />
          </div>
          <div className="form" id="jenis-kelamin">
            <RadioButton
              label={ 'Jenis Kelamin' }
              options={ ['Laki-Laki', 'Perempuan'] }
              required={ true }
              onRadioClicked={ gender => {
                setMustahik (
                {...mustahik,
                gender: gender == 'Laki-Laki' ? 'L' : 'P'});
              }}
              error={error.gender}
            />
          </div>
          <div className="form" id="status-mustahik">
            <Dropdown
              label={ 'Status Mustahik' }
              placeholder={ 'Pilih Status Mustahik' }
              options={[
                {display: 'Al-Fuqara (Fakir)', value: 'FAKIR'},
                {display: 'Al-Masakin (Miskin)', value: 'MISKIN'},
                {display: 'Al-Amilin (Panitia Zakat)', value: 'AMIL'},
                {display: 'Mualaf', value: 'MUALAF'},
                {display: 'Dzur Riqb (Budak)', value: 'BUDAK'},
                {display: 'Al-Gharim (Berhutang)', value: 'GHARIM'},
                {display: 'Fisabilillah Al-Muhajidin', value: 'FISABILILLAH'},
                {display: 'Ibnu Sabil', value: 'MUSAFIR'}
              ]}
              required
              onChange={status => {
                setMustahik({...mustahik, status: status});
            }}
              error={error.status}
            />
          </div>
          <div className="form" id="nomor-hp">
            <NumberField
              label={'Nomor HP'}
              placeholder={'Diisi dengan angka (Contoh: 0811111111)'}
              onChange={noHp => {
                setMustahik({...mustahik, phone: noHp});
                var number = new RegExp(/^[0-9]+$/);
                var alphabet = new RegExp(/^[a-zA-Z]+$/);
                var onlyPlus = new RegExp(/^[\+]+$/);
                var plus = new RegExp(/^\+?[0-9]+$/);
                var space = new RegExp(/\s/g);
                if (noHp.match(alphabet)) {
                  setError ({...error,
                    phone:'Format HP harus berupa angka'});
                }
                else if(noHp.match(number)) {
                  setError ({...error,
                    phone:''});
                }
                else if(noHp.match(plus) || noHp.match(onlyPlus)) {
                  setError ({...error,
                    phone:'Format HP harus berupa angka yang diawali dengan 0 (Contoh: 0811111111)'});
                }
                else if (noHp.match(space)) {
                  setError ({...error,
                    phone:'No HP tidak boleh diisi dengan spasi'});
                }
                else {
                  setError ({...error,
                    phone:''});
                }
              }}
              error={error.phone}
            />
          </div>
          <div className="form" id="alamat-lengkap">
            <TextField
              label={'Alamat Lengkap'}
              placeholder={'Diisi dengan alamat'}
              required
              onChange={alamatLengkap => {
                setMustahik ({...mustahik, address: alamatLengkap});
                var onlySpace = new RegExp(/\s/g);
                var alamatValid = new RegExp(/^[a-zA-Z0-9]+?([\s]+)/);
                if (alamatLengkap.match(alamatValid)) {
                  setError({...error,
                    address: ''
                  });
                } else if (alamatLengkap.match(onlySpace)) {
                  setError({...error,
                    address: 'Alamat tidak boleh diisi dengan spasi saja'
                  });
                } else if (alamatLengkap.length < 1) {
                  setError({...error,
                    address: 'Alamat tidak boleh kosong'
                  });
                } else {
                  setError({...error,
                    address:''});
                }
              }}
              error={error.address}
            />
          </div>
          <div className="form" id="foto-mustahik">
            <FileField
              label={ 'Foto Mustahik' }
              buttonLabel={ 'Pilih Foto' }
              description={ 'Unggah foto ukuran 300 x 300 milik mustahik dengan format .jpg atau .png' }
              onFileSelected={ foto => setMustahik (
                {...mustahik,
                photo: foto })
              }
            />
          </div>
          <div className="form button-lanjutkan">
            <Button
                type={'primary'}
                label={'Simpan'}
                onClick={() =>
                  submitForm()
                }
            />
          </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
        <TambahMustahikStyle />
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
