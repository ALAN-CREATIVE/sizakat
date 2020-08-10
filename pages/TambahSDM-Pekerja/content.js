import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

import NumberField from '../../components/Inputs/NumberField';
import TextField from '../../components/Inputs/TextField';
import Button from '../../components/Buttons/Button';

// import { resolveDataSourceName } from '../../Utils/ParserUtil';

import { TambahSDMPekerjaStyle } from './style';

const ADD_SDM_PEKERJA = gql`
  mutation dataSourcePekerjaMutation($input: DataSourcePekerjaMutationInput!){
    dataSourcePekerjaMutation(input: $input){
            dataSourcePekerja{
            picName
            picKtp
            picPhone
            picPosition
            profession
            location
            dataSource{id}
        }
    }
}


`;

// const GET_DATA_SOURCE = gql`
//   query {
//     dataSources {
//       id
//       category
//       dataSourceDetail {
//         ... on DataSourceWargaType {
//           rt
//           rw
//           village
//         }
//         ... on DataSourceInstitusiType {
//           name
//           village
//         }
//         ... on DataSourcePekerjaType {
//           profession
//           location
//         }
//       }
//     }
//   }
// `

function successBox() {
  alert("Success")
}

export default function FormTambahSDMPekerja() {

  const [dataSourcePekerja, setDataSourcePekerja] = useState({
    picName: '',
    picKtp: '',
    picPhone: '',
    picPosition: '',
    profession: '',
    location: '',
    dataSource: 3
  });
  const [createSDMPekerja, { data: createData, error: errorCreate, loading: loading }  ] = useMutation(ADD_SDM_PEKERJA);
  // const { data: dataSource, error: errorDataSource, loading: loadingDataSource } = useQuery(GET_DATA_SOURCE);

  if(errorCreate) {
    console.log(errorCreate);
    return <p>error</p>
  }
  if (loading) return <p>loading ...</p>
  return (
    <div className="TambahMustahikPage">
      <main>
        <div className="form-section">
            <h1 id="form-title">KATEGORI SUMBER DATA</h1>
            <div className="form" id="sumber-data">
              <TextField
                label={ 'Nama Kategori' }
                placeholder={ 'Pekerja' }
                required={ false }
                onChange={kategori => setDataSourcePekerja({...dataSourcePekerja, dataSource: kategori})}
              />
            </div>
            <h1 id="form-title">DETAIL SUMBER DATA</h1>
            <div className="form" id="jenis-pekerjaan">
              <TextField
                label={ 'Jenis Pekerjaan' }
                placeholder={ 'Satpam' }
                required={ false }
                onChange={pekerjaan => setDataSourcePekerja({...dataSourcePekerja, profession: pekerjaan})}
              />
            </div>
            <div className="form" id="lokasi-pekerjaan">
              <TextField
                label={ 'Lokasi Pekerjaan (Kelurahan)' }
                placeholder={ 'Kelurahan' }
                required={ true }
                onChange={lokasi => setDataSourcePekerja({...dataSourcePekerja, location: lokasi})}
              />
            </div>
            <h1 id="form-title">PENANGGUNG JAWAB</h1>
            <div className="form" id="nama">
              <TextField
                label={ 'Nama' }
                placeholder={ 'Nama Penanggung Jawab sesuai dengan KTP' }
                required={ true }
                onChange={nama => setDataSourcePekerja({...dataSourcePekerja, picName: nama})}
              />
            </div>
            <div className="form" id="no-ktp">
              <NumberField
                label={ 'No. KTP' }
                placeholder={ 'Terdiri dari 14 karakter angka' }
                required={ true }
                onChange={noktp => setDataSourcePekerja({...dataSourcePekerja, picKtp: noktp})}
              />
            </div>
            <div className="form" id="jabatan">
              <TextField
                label={ 'Jabatan' }
                placeholder={ 'Nama Jabatan Penanggung Jawab' }
                required={ true }
                onChange={jabatan => setDataSourcePekerja({...dataSourcePekerja, picPosition: jabatan})}
              />
            </div>
            <div className="form" id="no-tlp">
              <NumberField
                label={ 'No. Telepon' }
                placeholder={ 'Terdiri dari angka' }
                required={ true }
                onChange={nohp => setDataSourcePekerja({...dataSourcePekerja, picPhone: nohp})}
              />
            </div>
            <div className="form button-lanjutkan">
              <Button
                type={'primary'}
                label={'SIMPAN DATA'}
                onClick={() => {
                  createSDMPekerja({
                    variables: {
                      input: {
                        ...dataSourcePekerja
                      }
                    }
                  })
                  successBox();
                  window.location.href='/';
                  console.log(dataSourcePekerja);
                }}
              />
            </div>
        </div>
        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
        <TambahSDMPekerjaStyle />
      </main>

    </div>
  );
};
