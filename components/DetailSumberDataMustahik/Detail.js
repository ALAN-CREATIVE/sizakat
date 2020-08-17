import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import DetailField from '../Details/DetailField';
import {resolveDataSourceName} from '../../Utils/ParserUtil';
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
                picPosition
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
                picPosition
                profession
                location
            }
            ... on DataSourceInstitusiType{
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
        console.error(error);
        console.log(error.networkError);
        console.log(error.graphQLErrors);
        return  [error].map(({message})=>(
            <p>{message}</p>
        ));
    }

    return [data.dataSource].map(({ id, category, dataSourceDetail }) =>(
        <>
        <div className="container">
            <div className="row">
                <div>
                    <p><b>Detail Sumber Data</b></p>
                </div>
            </div>
            <br></br>

            <DetailField title={'Nama'} description={resolveDataSourceName(data.dataSource)}/><br></br>
            <DetailField title={'Kategori'} description={category}/><br></br>

            <div>
                {(()=>{
                    switch(category){
                        case 'PEKERJA':
                            return <div><DetailField title={'Lokasi'} description={dataSourceDetail.location}/><br></br></div>;
                        default:
                            return [data.dataSource].map(({ dataSourceDetail }) => (
                                <div className="row">
                                    <div className="col-md-4">
                                        <p className="label">Lokasi</p>
                                        <p><b>RT / RW</b></p>
                                        <p>{dataSourceDetail.rt} / {dataSourceDetail.rw}</p><br></br>
                                        <p><b>Kota</b></p>
                                        <p>{dataSourceDetail.regency}</p><br></br>
                                    </div>
                                    <div className="col-md-8" id="lurah">
                                        <p><b>Kelurahan / Kecamatan</b></p>
                                        <p>{dataSourceDetail.village} / {dataSourceDetail.subDistrict}</p><br></br>
                                        <p><b>Provinsi</b></p>
                                        <p>{dataSourceDetail.province}</p><br></br>
                                    </div>
                                </div>
                            ));
                    }
                })()}
            </div>

            <div className="row">
                <div>
                    <p><b>Penanggung Jawab</b></p>
                </div>
            </div>
            <br></br>

            <DetailField title={'Nama'} description={dataSourceDetail.picName}/><br></br>
            <DetailField title={'Nomor KTP'} description={dataSourceDetail.picKtp}/><br></br>
            <DetailField title={'Jabatan'} description={dataSourceDetail.picPosition}/><br></br>
            <DetailField title={'Nomor Telepon'} description={dataSourceDetail.picPhone}/><br></br>
        </div>
        </>
    ));
}
