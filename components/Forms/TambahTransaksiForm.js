import React, {useState} from 'react';
import TextField from '../Inputs/TextField'
import NumberField from '../Inputs/NumberField'
import TransaksiInput from './TransaksiInput'
import Button from '../Buttons/Button'
import styled from 'styled-components';

export default function TambahTransaksiForm() {
    const [transaksi, setTransaksi] = useState([{jenis:"", nominal:0, satuan:""}])

    const addTransaksi = () => {
        setTransaksi([...transaksi, {jenis:"", nominal:0, satuan:""}])
    }

    const setTransaksiOnIndex = (value, idx, attribute) => {
        const changeTransaksi = transaksi[idx];
        if (attribute === "jenis") {
            setTransaksi([...transaksi.slice(0, idx), {...changeTransaksi, jenis:value}, ...transaksi.slice(idx+1)])
        }
        else if (attribute === "nominal") {
            setTransaksi([...transaksi.slice(0, idx), {...changeTransaksi, nominal:value}, ...transaksi.slice(idx+1)])
        }
        else if (attribute === "satuan") {
            setTransaksi([...transaksi.slice(0, idx), {...changeTransaksi, satuan:value}, ...transaksi.slice(idx+1)])
        }
    } 

    const deleteTransaksi = (idx) => {
        setTransaksi([...transaksi.slice(0, idx), ...transaksi.slice(idx+1)])
    }
    const [muzakki, setMuzakki] = useState({
        noKtp: '',
        name: '',
        phone: '',
    });

    const [error, setError] = useState({
        noKtp: '',
        name: '',
        phone: '',
    });

    console.log(transaksi);
    console.log(muzakki)
    return(
        <main>
            <div className="formContainer">
                <h2 className="subtitle">Data Muzakki</h2><br></br>
                <div className="formSection">
                    <NumberField 
                        label="Nomor KTP" 
                        placeholder="Terdiri dari 14 karakter angka" 
                        required={true}
                        onChange={ktp => {
                            setMuzakki({...muzakki, noKtp:ktp})
                            setError({...error, noKtp:ktp = ktp.length < 14 || ktp.length > 14 ? 'Format KTP harus berupa 14 karakter angka' : ''})
                        }}
                        error={error.noKtp} 
                    /> <br></br>
                    <TextField 
                        label="Nama Lengkap" 
                        placeholder="Nama sesuai dengan KTP" 
                        required={true} 
                        onChange={name => {
                            setMuzakki({...muzakki, name:name})
                            setError({...error, name: name = name.length === 0 ? 'Nama lengkap tidak boleh kosong' : ''})
                        }} 
                        error={error.name}
                    /> <br></br>
                    <NumberField 
                        label="Nomor Telepon" 
                        placeholder="Terdiri dari angka" 
                        required={true} 
                        onChange={phone => {
                            setMuzakki({...muzakki, phone:phone})
                            setError({...error, phone: phone = phone.length === 0 ? 'Nomor Telepon tidak boleh kosong' : '' })
                        }} 
                        error = {error.phone}
                    /> <br></br>
                </div><br></br>

                <h2 className="subtitle">Transaksi Zakat</h2><br></br>
                <TransaksiInput transaksi={transaksi} onTransaksiChanges={setTransaksiOnIndex} onDeleteTransaksi={deleteTransaksi}/>
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
        </main>
        
    );
}