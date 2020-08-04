import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';


const QUERY_USERS = gql`
query{
    dataSource(id : 1){
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
    const { data, loading, error } = useQuery(QUERY_USERS);
    if (loading) return <p>Loading...</p>;
    if (error) {
        console.error(error);
        return  [error].map(({message})=>(
            <p>{message}</p>
        ));
    }

    return [data.dataSource].map(({ id, category, dataSourceDetail }) =>(
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <p><b>Detail Sumber Data</b></p>
                </div>
                <div className="col-md-9">
                    <hr></hr>
                </div>
            </div>
            <br></br>
            
            <p className="label">Nama</p>
            <div>
                {(()=>{
                    switch(category){
                        case 'WARGA':
                            return <div><p>RT {dataSourceDetail.rt} RW {dataSourceDetail.rw} {dataSourceDetail.village}</p><br></br></div>;
                        case 'INSTITUSI':
                            return <div><p>{dataSourceDetail.name} {dataSourceDetail.village}</p><br></br></div>;
                        case 'PEKERJA':
                            return <div><p>{dataSourceDetail.profession} {dataSourceDetail.location}</p><br></br></div>;
                    }
                })()}
            </div>
            <p className="label">Kategori</p>
            <p>{category}</p><br></br>
            <div>
                {(()=>{
                    switch(category){
                        case 'PEKERJA':
                            return <div><p className="label">Lokasi</p><p>{dataSourceDetail.location}</p><br></br></div>;
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
                <div className="col-md-3">
                    <p><b>Penanggung Jawab</b></p>
                </div>
                <div className="col-md-9">
                    <hr></hr>
                </div>
            </div>
            <br></br>

            <p className="label">Nama</p>
            <p>{dataSourceDetail.picName}</p><br></br>
            <p className="label">Nomor KTP</p>
            <p>{dataSourceDetail.picKtp}</p><br></br>
            <p className="label">Jabatan</p>
            <p>{dataSourceDetail.picPosition}</p><br></br>
            <p className="label">Nomor Telepon</p>
            <p>{dataSourceDetail.picPhone}</p><br></br>            
        </div>
    ));
}
