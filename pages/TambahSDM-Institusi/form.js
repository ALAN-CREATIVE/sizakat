import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import NumberField from '../../components/Inputs/NumberField';
import TextField from '../../components/Inputs/TextField';
import Button from '../../components/Buttons/Button';

import { TambahSDMStyle } from './style';

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

function successBox() {
    alert("Success")
    }
    
export default function FormTambahSDMInstitusi({ backend_uri }) {
    const client = new ApolloClient({
        uri: backend_uri,
        cache: new InMemoryCache()
        });
    
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
        // dataSource: '',
        // id: '',
    });

    const [createSDM, { data: createData, error: errorCreate, loading: loading }  ] = useMutation(ADD_SDM);
    const [createSDMInstitusi, { data: createDataInstitusi, error: errorCreateInstitusi, loading: loadingInstitusi }  ] = useMutation(ADD_SDM_INSTITUSI);
    
    useEffect(() => {
        if (createData && createData.dataSourceMutation && createData.dataSourceMutation.dataSource) {
            //   createSDMWarga({ ...dataSourceWarga, dataSource: createData.dataSourceMutation.dataSource.id });
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

    return (
        <ApolloProvider client={client}>
        <div className="TambahMustahikPage">
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
                            required={ false }
                            onChange={institusi => setDataSourceInstitusi({...dataSourceInstitusi, name: institusi})}
                        />
                    </div>
                    <div className="form" id="provinsi">
                        <TextField
                            label={ 'Provinsi' }
                            placeholder={ 'Nama Provinsi' }
                            required={ true }
                            onChange={provinsi => setDataSourceInstitusi({...dataSourceInstitusi, province: provinsi})}
                        />
                    </div>
                    <div className="form" id="alamat">
                        <div class="row">
                            <div class="col" id="kota">
                                <TextField
                                    label={ 'Kota/Kabupaten' }
                                    placeholder={ 'Nama Kota/Kabupaten' }
                                    required={ true }
                                    onChange={kota => setDataSourceInstitusi({...dataSourceInstitusi, regency: kota})}
                                    />
                            </div>
                            <div class="col" id="kecamatan">
                                <TextField
                                    label={ 'Kecamatan' }
                                    placeholder={ 'Nama Kecamatan' }
                                    required={ true }
                                    onChange={kecamatan => setDataSourceInstitusi({...dataSourceInstitusi, subDistrict: kecamatan})}
                                    />
                            </div>
                            <div class="col" id="kelurahan">
                                <TextField
                                    label={ 'Kelurahan' }
                                    placeholder={ 'Nama Kelurahan' }
                                    required={ true }
                                    onChange={kelurahan => setDataSourceInstitusi({...dataSourceInstitusi, village: kelurahan})}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="form" id="alamat-detail">
                        <div class="row">
                            <div class="col" id="rw">
                                <TextField
                                    label={ 'RW' }
                                    placeholder={ 'Nomor RW' }
                                    required={ true }
                                    onChange={rw => setDataSourceInstitusi({...dataSourceInstitusi, rw: rw})}
                                    />
                            </div>
                            <div class="col" id="rt">
                                <TextField
                                    label={ 'RT' }
                                    placeholder={ 'Nomor RT' }
                                    required={ true }
                                    onChange={rt => setDataSourceInstitusi({...dataSourceInstitusi, rt: rt})}
                                    />
                            </div>
                            <div class="col"></div>
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
                            onChange={nama => setDataSourceInstitusi({...dataSourceInstitusi, picName: nama})}
                        />
                    </div>
                    <div className="form" id="no-ktp">
                        <NumberField
                            label={ 'No. KTP' }
                            placeholder={ 'Terdiri dari 14 karakter angka' }
                            required={ true }
                            onChange={noKTP => setDataSourceInstitusi({...dataSourceInstitusi, picKtp: noKTP})}
                        />
                    </div>
                    <div className="form" id="jabatan">
                        <TextField
                            label={ 'Jabatan' }
                            placeholder={ 'Nama Jabatan Penanggung Jawab' }
                            required={ true }
                            onChange={jabatan => setDataSourceInstitusi({...dataSourceInstitusi, picPosition: jabatan})}
                        />
                    </div>
                    <div className="form" id="no-tlp">
                        <NumberField
                            label={ 'No. Telepon' }
                            placeholder={ 'Terdiri dari angka' }
                            required={ true }
                            onChange={noHp => setDataSourceInstitusi({...dataSourceInstitusi, picPhone: noHp})}
                        />
                    </div>
                    <div className="form button-lanjutkan">
                        <Button
                            label= { 'SIMPAN DATA' }
                            type= { 'primary' }
                            onClick={() => {
                                createSDM({
                                variables: {
                                    input: {
                                        category:'INSTITUSI'
                                    }
                                }
                            })
                            // successBox();
                            // window.location.href='/';
                            console.log(dataSourceInstitusi);
                            }}
                        />
                    </div>
                </div>

                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
                <TambahSDMStyle />
      </main>
    </div>
    </ApolloProvider>
  );
};

export async function getStaticProps() {
    return {
      props: {
        backend_uri: `http://${process.env.GRAPHQL_URL}`
      }
    }
  }