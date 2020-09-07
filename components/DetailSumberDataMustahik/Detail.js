import React from 'react';
import Head from 'next/head';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import DetailField from '../Details/DetailField';
import {resolveDataSourceName} from '../../utils/parser-util';
import { useRouter } from 'next/router';

const QUERY_USERS = gql`
query dataSource($id: ID!){
  dataSource(id : $id){
    id
    category
    dataSourceDetail{
      ... on DataSourceWargaType{
        picName
        picKtp
        picPhone
        picWargaPosition: picPosition
        province
        regency
        subDistrict
        village
        rt
        rw
      }
      ... on DataSourcePekerjaType{
        picName
        picKtp
        picPhone
        picPekerjaPosition: picPosition
        profession
        location
      }
      ... on DataSourceInstitusiType{
        picName
        picKtp
        picPhone
        picInstitusiPosition: picPosition
        name
        province
        regency
        subDistrict
        village
        rt
        rw
        address
      }
    }
  }
}
`;

export function DetailInfo({setCategory}) {
  const router = useRouter()
  const {id} = router.query
  const { data, loading, error } = useQuery(QUERY_USERS, {variables: {id} });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error(error);
    console.log(error.networkError.result.errors);
    console.log(error.graphQLErrors);
    return  [error].map(({message})=>(
      <p>{message}</p>
    ));
  }

  const {category, dataSourceDetail: detail} = data.dataSource
  setCategory(category);
  return (
    <>
    <Head>
      <title>Sumber Data: {resolveDataSourceName(data.dataSource)}</title>
    </Head>
    <div className="container">
      <div className="row">
        <div>
          <p><b>Detail Sumber Data</b></p>
        </div>
      </div>
      <br></br>
      <DetailField title={'Kategori'} description={category}/><br></br>
      <div>
        {(()=>{
          switch(category){
            case 'PEKERJA':
              return <div><DetailField title={'Lokasi'} description={detail.location}/><br></br></div>;
            default:
              return (
                <div className="row">
                  <div className="col-md-4">
                    <p className="label">Lokasi</p>
                    <p><b>RT / RW</b></p>
                    <p>{detail.rt} / {detail.rw}</p><br></br>
                    <p><b>Kota</b></p>
                    <p>{detail.regency}</p><br></br>
                  </div>
                  <div className="col-md-8" id="lurah">
                    <p><b>Kelurahan / Kecamatan</b></p>
                    <p>{detail.village} / {detail.subDistrict}</p><br></br>
                    <p><b>Provinsi</b></p>
                    <p>{detail.province}</p><br></br>
                  </div>
                </div>
              );
          }
        })()}
      </div>

      <div className="row">
        <div>
          <p><b>Penanggung Jawab</b></p>
        </div>
      </div>
      <br></br>

      <DetailField title={'Nama'} description={detail.picName}/><br></br>
      <DetailField title={'Nomor KTP'} description={detail.picKtp}/><br></br>
      {(category === 'WARGA') ? (
        <>
          <DetailField title={'Jabatan'} description={detail.picWargaPosition}/><br></br>
        </>
      ) : (category === 'PEKERJA') ? (
        <>
          <DetailField title={'Jabatan'} description={detail.picPekerjaPosition}/><br></br>
        </>
      ) : (
        <>
          <DetailField title={'Jabatan'} description={detail.picInstitusiPosition}/><br></br>
        </>
      )}
      <DetailField title={'Nomor Telepon'} description={detail.picPhone}/><br></br>
    </div>
    </>
  );
}
