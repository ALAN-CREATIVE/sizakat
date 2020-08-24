import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';
import NumberField from '../../../../components/Inputs/NumberField';
import TextField from '../../../../components/Inputs/TextField';
import Button from '../../../../components/Buttons/Button';

// import { resolveDataSourceName } from '../../Utils/ParserUtil';

import { TambahSDMStyle } from './style';

const client = new ApolloClient({
    uri: 'http://192.168.99.100:8000/graphql/',
    cache: new InMemoryCache()
  });
  

const UPDATE_SDM_INSTITUSI=gql`
    mutation dataSourceInstitusiMutation($input: DataSourceInstitusiMutationInput!){
        dataSourceInstitusiMutation(input: $input){
            dataSourceInstitusi{
                picName
                id
            }
            errors{messages}
        }
    }
`;

//TODO: Jangan lupa nambahin regency dibackend
const INITIAL_DATA_SOURCES_QUERY=gql`
query dataSourceQuery($id: ID!){
    dataSource(id:$id ) {
        id
        category
        dataSourceDetail{
          __typename
          ... on DataSourceInstitusiType{
            picName
            picKtp
            picPhone
            picPosition
            name
            province
            subDistrict
            regency
            village
            rt
            rw
            address
            dataSource{id}
            id
          }
        }
                        
    }
}
`;

function successBox() {
    alert("Success")
  }
  
export function FormUpdateSDMInstitusi({ data }) {
    const [SDM, setSDM] = useState(data.dataSource.dataSourceDetail)
    const [updateSDM, {error}] = useMutation(UPDATE_SDM_INSTITUSI)

    const handleOnChangePicName = value =>{
        console.log(SDM)
        setSDM({
            ...SDM,
            picName: value
        })
    }

    const handleOnChangePicKtp = value =>{
        console.log(SDM)
        setSDM({
            ...SDM,
            picKtp: value
        })
    }

    const handleOnChangePicPhone = value =>{
        console.log(SDM)
        setSDM({
            ...SDM,
            picPhone: value
        })
    }

    const handleOnChangePicPosition = value =>{
        console.log(SDM)
        setSDM({
            ...SDM,
            picPosition: value
        })
    }

    const handleOnChangeName= value =>{
        console.log(SDM)
        setSDM({
            ...SDM,
            name: value
        })
    }

    const handleOnChangeProvince= value =>{
        console.log(SDM)
        setSDM({
            ...SDM,
            province: value
        })
    }

    const handleOnChangeRegency= value =>{
        console.log(SDM)
        setSDM({
            ...SDM,
            regency: value
        })
    }

    const handleOnChangeSubDistrict= value =>{
        console.log(SDM)
        setSDM({
            ...SDM,
            subDistrict: value
        })
    }

    const handleOnChangeVillage= value =>{
        console.log(SDM)
        setSDM({
            ...SDM,
            village: value
        })
    }

    const handleOnChangeRt= value =>{
        console.log(SDM)
        setSDM({
            ...SDM,
            rt: value
        })
    }

    const handleOnChangeRw= value =>{
        console.log(SDM)
        setSDM({
            ...SDM,
            rw : value
        })
    }

    const handleOnChangeAddress= value =>{
        console.log(SDM)
        setSDM({
            ...SDM,
            address : value
        })
    }

    const handleOnSubmit = e => {
        e.preventDefault()
        const {__typename, dataSource, ...dataSourceDetail } = SDM
        updateSDM({
          variables: {
            input: {
              ...dataSourceDetail,
              dataSource : dataSource.id
            }
          }
        })
      }



    return (
                <form onSubmit={e => handleOnSubmit(e)}>
                    <h1 id="form-title">KATEGORI SUMBER DATA</h1>
                    <div className="form" id="sumber-data">
                        <TextField
                            label={ 'Nama Kategori' }
                            placeholder={ 'Institusi' }
                            required={ false }
                            disabled={ true }
                            defaultValue="WARGA"
                        />
                    </div>
                    <h1 id="form-title">DETAIL SUMBER DATA</h1>
                    <div className="form" id="institusi">
                        <TextField
                            label={ 'Nama Institusi' }
                            defaultValue={SDM.name}
                            required={ false }
                            onChange={handleOnChangeName}
                        />
                    </div>
                    <div className="form" id="provinsi">
                        <TextField
                            label={ 'Provinsi' }
                            defaultValue={SDM.province}
                            required={ true }
                            onChange={handleOnChangeProvince}
                        />
                    </div>
                    <div className="form" id="alamat">
                        <div class="row">
                            <div class="col" id="kota">
                                <TextField
                                    label={ 'Kota/Kabupaten' }
                                    defaultValue={SDM.regency}
                                    required={ true }
                                    onChange={handleOnChangeRegency}
                                    />
                            </div>
                            <div class="col" id="kecamatan">
                                <TextField
                                    label={ 'Kecamatan' }
                                    defaultValue={SDM.subDistrict}
                                    required={ true }
                                    onChange={handleOnChangeSubDistrict}
                                    />
                            </div>
                            <div class="col" id="kelurahan">
                                <TextField
                                    label={ 'Kelurahan' }
                                    defaultValue={SDM.village}
                                    required={ true }
                                    onChange={handleOnChangeVillage}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="form" id="alamat-detail">
                        <div class="row">
                            <div class="col" id="rw">
                                <TextField
                                    label={ 'RW' }
                                    defaultValue={SDM.rw}
                                    required={ true }
                                    onChange={handleOnChangeRw}
                                    />
                            </div>
                            <div class="col" id="rt">
                                <TextField
                                    label={ 'RT' }
                                    defaultValue={SDM.rt}
                                    required={ true }
                                    onChange={handleOnChangeRt}
                                    />
                            </div>
                            <div class="col"></div>
                        </div>
                    </div>
                    <div className="form" id="alamat-lengkap">
                        <TextField
                            label={ 'Alamat Lengkap' }
                            defaultValue={SDM.address}
                            required={ false }
                            onChange={handleOnChangeAddress}
                        />
                    </div>
                    <h1 id="form-title">PENANGGUNG JAWAB</h1>
                    <div className="form" id="nama">                        
                        <TextField
                            label={ 'Nama' }
                            defaultValue={SDM.picName}
                            required={ true }
                            onChange={ handleOnChangePicName }
                            />
                    </div>
                    <div className="form" id="no-ktp">                        
                        <NumberField
                            label={ 'No. KTP' }
                            defaultValue={SDM.picKtp}
                            
                            required={ true }
                            onChange={ handleOnChangePicKtp }   
                            />
                    </div>
                    <div className="form" id="jabatan">          
                        <TextField
                            label={ 'Jabatan' }
                            defaultValue={SDM.picPosition}
                            required={ true }
                            onChange={ handleOnChangePicPosition}
                        />
                    </div>
                    <div className="form" id="no-tlp">                        
                        <NumberField
                            label={ 'No. Telepon' }
                            defaultValue={SDM.picPhone}
                            
                            required={ true }
                            onChange={ handleOnChangePicPhone }
                        />
                    </div>
                    <div className="form button-lanjutkan">
                    <Button
                            label= { 'SIMPAN DATA' }
                            type= { 'primary' }
                            onClick={() => {
                              console.log(SDM);
                              successBox();
                              window.location.href='/';
                            
                              }}                                            
                              

                        />
                    </div>
                </form>
  )
};

function UpdatePage(){
    const router = useRouter()
    const { id } = router.query

    const {data, loading, error } = useQuery(INITIAL_DATA_SOURCES_QUERY, { variables: { id } });
    if (loading) return <p>Loading...</p>;
    if (error) {
    console.error(error);
    return [error].map(({ message }, id) => (
      <p key={id}>{message}</p>
    ));
    }
    return (
        <div>
          <FormUpdateSDMInstitusi data={data} />
        </div>
      )
}

export default function update(){
    return (
        <>
      <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css?family=Muli:300,400,700,800" rel="stylesheet" />
      </head>
      <main>
        <ApolloProvider client={client}>
          <div className="UpdateSDMInstitusi">
            <main>
              <div className="form-section">
                <h1 id="form-title">Edit SDM Institusi</h1>
                <UpdatePage />
              </div>
            </main>
          </div>
        </ApolloProvider>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossOrigin="anonymous"></script>
        <TambahSDMStyle />
      </main>
    </>
    )

}

export async function getStaticProps() {
    return {
      props: {
        backend_uri: `http://${process.env.GRAPHQL_URL}`
      }
    }
  }
  
