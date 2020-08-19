import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

import Dropdown from '../Inputs/Dropdown';
import FileField from '../Inputs/FileField';
import NumberField from '../Inputs/NumberField';
import RadioButton from '../Inputs/RadioButton';
import TextField from '../Inputs/TextField';
import DateField from '../Inputs/DateField';
import Button from '../Buttons/Button';

const QUERY_USERS = gql`
query mustahikQuery($id: ID!) {
    mustahik(id : $id) {
      id
      name
      noKtp
      phone
      address
      birthdate
      status
      gender
      photo
      age
      dataSource{
        id
        category
        dataSourceDetail{
          ... on DataSourceWargaType{
            rt
            rw
            village
          }
          ... on DataSourceInstitusiType{
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
  }
`;

const UPDATE_MUSTAHIK = gql`
  mutation mustahikMutation($input: MustahikMutationInput!) {
    mustahikMutation(input: $input) {
      mustahik {
        id
        name
      }
    }
  }
`;

function UpdateForm({ data }) {
  const [mustahik, setMustahik] = useState(data.mustahik)
  const [updateMustahik] = useMutation(UPDATE_MUSTAHIK)
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
  
  const submitForm = () => {
    console.log(handleSubmit())
    if (handleSubmit()) {
      console.log(mustahikData)
      const { __typename, age, dataSource, ...mustahikData } = mustahik
      updateMustahik({
        variables: {
          input: {
            ...mustahikData,
            dataSource: dataSource.id
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

    if (mustahik.name.length == 0) {
        formIsValid = false;
        temporaryError.name='Nama lengkap tidak boleh kosong';
    } if (mustahik.noKtp.length < 14 || mustahik.noKtp.length > 14) {
        formIsValid = false;
        temporaryError.noKtp='Format KTP harus berupa 14 karakter angka';
    } if (mustahik.address.length == 0) {
        formIsValid = false;
        temporaryError.address='Alamat tidak boleh kosong';
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
    }

    setError(temporaryError);
    return formIsValid;
  }

  const handleOnChangeNoKtp = value => {
    console.log(mustahik)
    setMustahik({
        ...mustahik,
        noKtp: value
    })
    setError({...error,
        noKtp:value = value.length < 14 || value.length > 14 ? 'Format KTP harus berupa 14 karakter angka' : ''})
  }
  const handleOnChangeName = value => {
    console.log(mustahik)
    setMustahik({
      ...mustahik,
      name: value
    })
    setError({...error,
        name: value = value.length < 1 ? 'Nama lengkap tidak boleh kosong' : ''});
  }
  const handleOnChangeBirthdateDate = value => {
    console.log(mustahik)
    setMustahik({
      ...mustahik, 
      birthdate: mustahik.birthdate.slice(0,8) + value
    })
  }
  const handleOnChangeBirthdateMonth = value => {
    console.log(mustahik)
    setMustahik({
      ...mustahik, 
      birthdate: mustahik.birthdate.slice(0,5) + value + mustahik.birthdate.slice(7)
    })
  }
  const handleOnChangeBirthdateYear = value => {
    console.log(mustahik)
    setMustahik({
      ...mustahik, 
      birthdate: value + mustahik.birthdate.slice(4)
    })
  }
  const handleOnChangeGender = value => {
    console.log(mustahik)
    setMustahik({
      ...mustahik,
      gender: value
    })
  }
  const handleOnChangeStatus = value => {
    console.log(mustahik)
    setMustahik({
      ...mustahik,
      status: value
    })
  }
  const handleOnChangePhone = value => {
    console.log(mustahik)
    setMustahik({
      ...mustahik,
      phone: value
    })
    try {
        parseInt(value,10);
      } catch(error) {
        setError ({...error,
          phone:'Format HP harus berupa angka'});
      }
  }
  const handleOnChangeAddress = value => {
    console.log(mustahik)
    setMustahik({
      ...mustahik,
      address: value
    })
    setError ({...error,
        address:value = value.length < 1 ? 'Alamat tidak boleh kosong' : ''});
  }
  const handleOnChangePhoto = value => {
    console.log(mustahik)
    setMustahik({
      ...mustahik,
      photo: value
    })
  }

  const handleOnSubmit = e => {
    e.preventDefault()
    submitForm()
  }

  return (
    <form onSubmit={e => handleOnSubmit(e)}>
      <div className="form" id="nomor-ktp">
      <NumberField
        label={'Nomor KTP'}
        required={ true }
        onChange={ handleOnChangeNoKtp }
        defaultValue={ mustahik.noKtp }
        error={error.noKtp}
      />
      </div>   
      <div className="form" id="nama-lengkap">
      <TextField
        label={ 'Nama Lengkap' }
        required={ true }
        onChange={ handleOnChangeName }
        defaultValue={ mustahik.name }
        error={error.name}
      />
      </div>
      <div className="form" id="tanggal-lahir">
        <DateField
          label={ 'Tanggal Lahir' }
          required={true}
          onDatePicked={ handleOnChangeBirthdateDate }
          onMonthPicked={ handleOnChangeBirthdateMonth }
          onYearPicked={ handleOnChangeBirthdateYear }
          defaultValue={ mustahik.birthdate }
          errorDate={error.errorDate}
          errorMonth={error.errorMonth}
          errorYear={error.errorYear}
        />
      </div>
      <div className="form" id="jenis-kelamin">
        <RadioButton
          label={ 'Jenis Kelamin' }
          options={ [{name: 'Laki-Laki', value: 'L'},
          {name: 'Perempuan', value: 'P'}] }
          required={ true }
          onRadioClicked={ handleOnChangeGender }
          defaultChecked={ mustahik.gender }
          error={error.gender}
        />
      </div>
      <div className="form" id="status-mustahik">
        <Dropdown
          label={ 'Status Mustahik' }
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
          onChange={ handleOnChangeStatus }
          defaultValue={ mustahik.status }
          error={error.status}
        />
      </div>
      <div className="form" id="nomor-hp">
        <NumberField
          label={ 'Nomor HP' }
          onChange={ handleOnChangePhone }
          defaultValue={ mustahik.phone }
          error={error.phone}
        />
      </div>
      <div className="form" id="alamat-lengkap">
        <TextField
          label={ 'Alamat Lengkap' }
          onChange={ handleOnChangeAddress }
          defaultValue={ mustahik.address }
          error={error.address}
        />
      </div>        
      <div className="form" id="foto-mustahik">
        <FileField
          label={ 'Foto Mustahik' }
          buttonLabel={ 'Pilih Foto' }
          description={ 'Unggah foto ukuran 300 x 300 milik mustahik dengan format .jpg' }
          onFileSelected={ handleOnChangePhoto }
        />
      </div>
      <div className="form button-lanjutkan">
        <Button
            type={'primary'}
            label={'Simpan'}
        />  
        </div>
    </form>
  )
}

function UpdatePage() {
  const router = useRouter()
  const { id } = router.query

  const { data, loading, error } = useQuery(QUERY_USERS, { variables: { id } });
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    return [error].map(({ message }, id) => (
      <p key={id}>{message}</p>
    ));
  }

  return (
    <div>
      <UpdateForm data={data} />
    </div>
  )
}

export default function update() {
  return (
    <>
      <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css?family=Muli:300,400,700,800" rel="stylesheet" />
      </head>
      <main>        
        <div className="UbahMustahikPage">
          <main>
            <div className="form-section">
              <h1 id="form-title">IDENTITAS DIRI MUSTAHIK</h1>
              <UpdatePage />
            </div>
          </main>
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossOrigin="anonymous"></script>
      </main>
    </>
  )
}
