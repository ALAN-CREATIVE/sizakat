import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useQuery, useMutation, gql } from '@apollo/client';
import Button from '../Buttons/Button';
import DetailField from '../Details/DetailField';
import DeleteWarning from '../Popups/Warning';

const QUERY_USERS = gql`
query mustahikQuery($id: ID!) {
  statusEnum: __type(name: "MustahikStatus") {
    enumValues {
      name
      description
    }
  }
  genderEnum: __type(name: "MustahikGender") {
    enumValues {
      name
      description
    }
  }
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
    dataSource {
      category
      dataSourceDetail {
        ... on DataSourceWargaType {
          province
          regency
          subDistrict
          village
          rt
          rw
        }
        ... on DataSourceInstitusiType {
          name
          province
          regency
          subDistrict
          village
          rt
          rw
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

const DELETE_MUSTAHIK = gql`
mutation DeleteMustahik($id: ID!) {
  deleteMustahik(id: $id) {
    deleted
  }
}
`

export function DetailInfo() {
  const router = useRouter();
  const {id} = router.query;
  const [warning, setWarning] = useState(false);

  const { data, loading, error } = useQuery(QUERY_USERS, {variables: {id} });
  const [deleteMustahikMutation, { data: deleteData }] = useMutation(DELETE_MUSTAHIK);

  useEffect(() => {
    console.log(deleteData)
    if (deleteData && deleteData.deleteMustahik.deleted) {
      alert('Mustahik berhasil dihapus');
      router.push('/daftar/mustahik')
    }
  }, [deleteData])

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    console.log(error.graphQLErrors);
    if (error.networkError && error.networkError.result) console.log(error.networkError.result.errors);
      return  [error].map(({message})=>(
        <p>{message}</p>
      ));
  }

  const { name, noKtp, phone, address, gender, status, photo, age, dataSource } = data.mustahik;
  return (
    <>
      <Head>
        <title>Mustahik: {name}</title>
      </Head>
      {warning && (
        <DeleteWarning
          message={`Apakah anda yakin ingin menghapus ingin menghapus "${name}" dari Daftar Mustahik`}
          onConfirm={() => {
            deleteMustahikMutation({variables: {id: id}});
            setWarning(false);
          }}
          onReject={() => setWarning(false)}
        />
      )}
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-4">
            <h4><b>Detail Mustahik</b></h4>
            <p className="sub">Mustahik // <span className="active">Detail Mustahik</span></p>
          </div>
          <div className="col-4 align-self-end">
            <div className="row">
              <div className="col-3">
                <Button
                  label='Hapus'
                  type='danger'
                  onClick={() => setWarning(true)}
                />
              </div>
              <div className="col-2">
                <Button
                  label='Ubah'
                  type='primary'
                />
              </div>
            </div>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-2">
            <p><b>Detail Mustahik</b></p>
          </div>
          <div className="col-md-10">
            <hr></hr>
          </div>
        </div>
        <br></br>
        <div className="row">
          <div className="col-md-5">
            <img id="photo" src={photo}></img>
          </div>
          <div className="col-md-7">
            <DetailField title='Nama Mustahik' description={name} /><br></br>
            <DetailField title='Kategori' description={dataSource.category} /><br></br>
            <p className="label">Sumber Data</p>
            <div>
              {(()=>{
                switch(dataSource.category){
                  case 'PEKERJA':
                    return <div><p>{dataSource.dataSourceDetail.profession}, {dataSource.dataSourceDetail.location}</p><br></br></div>;
                  case 'INSTITUSI':
                    return <div><p>{dataSource.dataSourceDetail.name}, {dataSource.dataSourceDetail.village}</p><br></br></div>;
                  case 'WARGA':
                    return [dataSource.dataSourceDetail].map(({ rt, rw, village }) => (
                      <div>
                        <p>RT {rt} RW {rw}, {village}</p><br></br>
                      </div>
                    ));
                }
              })()}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-5">
            <DetailField title='Nomor KTP' description={noKtp} /><br></br>
            <DetailField title='Usia' description={age} /><br></br>
            {
              data.genderEnum.enumValues.filter(gen => gen.name === gender).map(genderMustahik => (
                <div>
                  <DetailField title='Jenis Kelamin' description={genderMustahik.description} /><br></br>
                  </div>
              ))
            }
            {
              data.statusEnum.enumValues.filter(stat => stat.name === status).map(statusMustahik => (
                <div>
                  <DetailField title='Status Mustahik' description={statusMustahik.description} /><br></br>
                </div>
              ))
            }
            <DetailField title='Nomor HP' description={phone} /><br></br>
          </div>
          <div className="col-md-7">
            <p className="label">Alamat Lengkap</p>
            <p>{address}</p><br></br>
            <div>
              {(()=>{
              switch(dataSource.category){
                case 'PEKERJA':
                return null
                case 'INSTITUSI':
                return [dataSource.dataSourceDetail].map(({ name, rt, rw, village, subDistrict, regency, province }) => (
                  <div>
                  <p className="label">Nama Institusi</p>
                  <p>{name}</p><br></br>
                  <p className="label">RT/RW</p>
                  <p>{rt}/{rw}</p><br></br>
                  <p className="label">Kelurahan/Kecamatan</p>
                  <p>{village}/{subDistrict}</p><br></br>
                  <p className="label">Kota/Provinsi</p>
                  <p>{regency}/{province}</p><br></br>
                  </div>));
                case 'WARGA':
                return [dataSource.dataSourceDetail].map(({ rt, rw, village, subDistrict, regency, province }) => (
                  <div>
                  <p className="label">RT/RW</p>
                  <p>{rt}/{rw}</p><br></br>
                  <p className="label">Kelurahan/Kecamatan</p>
                  <p>{village}/{subDistrict}</p><br></br>
                  <p className="label">Kota/Provinsi</p>
                  <p>{regency}/{province}</p><br></br>
                  </div>));
              }
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
