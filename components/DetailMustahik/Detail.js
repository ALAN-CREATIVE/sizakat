import { useRouter } from 'next/router';
import React from 'react';
import Head from 'next/head';
import { useQuery, gql } from '@apollo/client';
import Button from '../Buttons/Button';
import DetailField from '../Details/DetailField';

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

export function DetailInfo() {
  const router = useRouter()
  const {id} = router.query

  const { data, loading, error } = useQuery(QUERY_USERS, {variables: {id} });
  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    console.log(error.graphQLErrors);
    if (error.networkError && error.networkError.result) console.log(error.networkError.result.errors);
      return  [error].map(({message})=>(
        <p>{message}</p>
      ));
  }

  return [data.mustahik].map(({ name, noKtp, phone, address, gender, status, photo, age, dataSource }) =>(
    <>
      <Head>
        <title>Mustahik: {name}</title>
      </Head>
      <div className="container">
        <div className="row justify-content-between">
          <div className="col-4">
            <h4><b>Detail Mustahik</b></h4>
            <p className="sub">Mustahik // <span className="active">Detail Mustahik</span></p>
          </div>
          <div className="col-4 align-self-end">
            <div className="row">
              <div className="col-3">
              <Button label='Hapus' type='danger' />
              </div>
              <div className="col-2">
              <Button label='Edit' type='primary' />
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
          <div className="col-md-4">
            <img src="{photo}"></img>
          </div>
          <div className="col-md-8">
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
            <DetailField title='Jenis Kelamin' description={gender} /><br></br>
            <DetailField title='Status Mustahik' description={status} /><br></br>
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
  ));
}
