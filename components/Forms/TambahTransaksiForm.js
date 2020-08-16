import React, {useState} from 'react';
import TextField from '../Inputs/TextField'
import TransaksiInput from './TransaksiInput'
import Button from '../Buttons/Button'
import styled from 'styled-components';

export default function TambahTransaksiForm() {
    const Main = styled.main`
        font-family: Muli, sans-serif;
        padding: 20px 50px;
        background: white;
        min-height: 80vh;

        .primary, .tertiary{
            width : 100%;
            font-weight: bold;
        }

        .subtitle{
            color : #00239D;
            font-size: 25px;
            font-weight: bold;
        }
        .formSection {
            margin-left: 40px;
          }
    `
    const [transaksi, setTransaksi] = useState([{jenis:"", nominal:0, satuan:""}])
    const addTransaksi = () => {
        setTransaksi(transaksi => [...transaksi, {jenis:"", nominal:0, satuan:""}])
    }
    return(
        <Main>
            <div className="formContainer">
                <h2 className="subtitle">Data Muzakki</h2><br></br>
                <div className="formSection">
                    <TextField label="Nomor KTP" placeholder="Terdiri dari 14 karakter angka" required={true} /> <br></br>
                    <TextField label="Nama Lengkap" placeholder="Nama sesuai dengan KTP" required={true} /> <br></br>
                    <TextField label="Nomor Telepon" placeholder="Terdiri dari angka" required={true} /> <br></br>
                </div><br></br>

                <h2 className="subtitle">Transaksi Zakat</h2><br></br>
                <TransaksiInput transaksi={transaksi} />
                <br></br>
                <div className="row">
                    <div className="col-11">
                        <hr></hr>
                    </div>
                    <div className="col-1">
                        <Button label='+' type="round" onClick={addTransaksi} /> 
                    </div>
                </div><br></br>
                <Button label="+ SIMPAN DAN TAMBAH MUZAKKI BARU" type="tertiary"/> <br></br>
                <Button label="LANJUT KE PEMBAYARAN >>" type="primary"/> <br></br>
            </div>
        </Main>
        
    );
}