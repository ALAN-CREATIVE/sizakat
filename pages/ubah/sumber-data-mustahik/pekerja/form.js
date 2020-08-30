import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import { useRouter } from 'next/router';
import NumberField from '../../../../components/Inputs/NumberField';
import TextField from '../../../../components/Inputs/TextField';
import Button from '../../../../components/Buttons/Button';
import { TambahSDMContainer } from '../../../../components/TambahSumberDataMustahik/TambahSDMStyle';

// import { resolveDataSourceName } from '../../Utils/ParserUtil';



const client = new ApolloClient({
    uri: backend_uri,
    cache: new InMemoryCache()
  });
  

const UPDATE_SDM_PEKERJA=gql`
mutation dataSourcePekerjaMutation($input: DataSourcePekerjaMutationInput!){
    dataSourcePekerjaMutation(input: $input){
        dataSourcePekerja{
        profession
        location
        picName
        picKtp
        picPhone
        picPosition
        id            
        }
        errors{messages}
    }
}
`;

const INITIAL_DATA_SOURCES_QUERY=gql`
query dataSourceQuery($id: ID!){
  dataSource(id:$id ) {
            id
            category
            dataSourceDetail{
              __typename
              ... on DataSourcePekerjaType {
                  picName
                  picKtp
                  picPhone
                  picPosition
                  profession
                  location
                  id
                  dataSource{id}
                }                    	  
            }
                            
        }
    }
`;

function successBox() {
    alert("Success")
  }
  
export function FormUpdateSDMPekerja({ data }) {
    const [SDM, setSDM] = useState(data.dataSource.dataSourceDetail)
    const [updateSDM, {error}] = useMutation(UPDATE_SDM_PEKERJA)

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

    const handleOnChangeLocation = value =>{
      console.log(SDM)
      setSDM({
          ...SDM,
          location: value
      })
    }

    const handleOnChangeProfession = value =>{
      console.log(SDM)
      setSDM({
          ...SDM,
          profession: value
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
                            required={ false }
                            disabled={ true }
                            defaultValue="PEKERJA"
                        />
                    </div>
                    <h1 id="form-title">DETAIL SUMBER DATA</h1>
                    <div className="form" id="Location">
                        <TextField
                            defaultValue={SDM.location}
                            label={ 'Lokasi' }
                            required={ true }
                            onChange={handleOnChangeLocation}
                        />
                    </div>
                    <div className="form" id="profession">
                        <TextField
                            defaultValue={SDM.profession}
                            label={ 'Professi' }
                            required={ true }
                            onChange={handleOnChangeProfession}
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
                              console.log({Error})
                              //successBox();
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
          <FormUpdateSDMPekerja data={data} />
        </div>
      )
}

export default function update(){
    return (
        <TambahSDMContainer className="EditSDMPage">
      <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous"></link>
        <link href="https://fonts.googleapis.com/css?family=Muli:300,400,700,800" rel="stylesheet" />
      </head>
      <main>
        <ApolloProvider client={client}>
          <div className="UpdateSDMPekerja">
            <main>
              <div className="form-section">
                <h1 id="form-title">Edit SDM Pekerja</h1>
                <UpdatePage />
              </div>
            </main>
          </div>
        </ApolloProvider>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossOrigin="anonymous"></script>
       
      </main>
        
    </TambahSDMContainer>
    )

}

export async function getStaticProps() {
    return {
      props: {
       backend_uri: `http://${process.env.GRAPHQL_URL}`
       
      }
    }
  }
  
