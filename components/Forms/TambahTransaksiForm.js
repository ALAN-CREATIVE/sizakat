import React, {useState} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import TextField from '../Inputs/TextField'
import NumberField from '../Inputs/NumberField'
import TransaksiInput from './TransaksiInput'
import Button from '../Buttons/Button'


const ADD_MUZAKKI = gql`
    mutation muzakkiMutation($input: MuzakkiMutationInput!){
        muzakkiMutation(input:$input) {
            muzakki {
                id
                noKtp
                name
                phone
            }
            errors {
                field
                messages
            }
        }
    }
`;
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

    const [error, setError] = useState({
        noKtp: '',
        name: '',
        phone: '',
    });

    const [muzakki, setMuzakki] = useState({
        noKtp: '',
        name: '',
        phone: '',
    });


    const [createMuzakki, {data: muzakkiData, error: errorMuzakki}] = useMutation(ADD_MUZAKKI, {
        onCompleted: (muzakkiData) => {
            console.log(muzakkiData)
            if(muzakkiData.muzakkiMutation.errors.length != 0){
                alert("Submit gagal");
                console.log(muzakkiData.muzakkiMutation.errors[0].messages[0]);
            } else{
                alert("Submit berhasil");
                console.log(muzakkiData.muzakkiMutation.muzakki);
            }   

        }
    });

    const submitForm= ()=> {
        if (submitCheck()){
            createMuzakki({
                variables: {
                    input: {
                        ...muzakki
                    }
                }
            })
        } else {
            alert("Submit gagal");
        }
        
    }

    const submitCheck = () => {
        let formIsValid = true;
        let temporaryError = {};
        var alphabet = new RegExp(/^[a-zA-Z]+$/);
        var plus = new RegExp(/^[\+][0-9]+$/);
        var onlyPlus = new RegExp(/^[\+]+$/);
        var onlySpace = new RegExp(/\s/g);
        var namaLengkapValid = new RegExp(/^[a-zA-Z]+?([\s]+)/);
        var phoneValid = new RegExp(/^[0][0-9]+$/g)


        if (muzakki.name.length == 0) {
            formIsValid = false;
            temporaryError.name='Nama lengkap tidak boleh kosong';
        } if (muzakki.name.match(onlySpace)) {
            formIsValid = false;
            temporaryError.name='Nama lengkap tidak boleh diisi dengan spasi saja';
        } if (muzakki.name.match(namaLengkapValid)) {
            formIsValid = true;
            temporaryError.name='';
        } if (muzakki.noKtp.length < 14 || muzakki.noKtp.length > 14) {
            formIsValid = false;
            temporaryError.noKtp='Format KTP harus berupa 14 karakter angka';
        } if (muzakki.noKtp.match(onlySpace)) {
            formIsValid = false;
            temporaryError.noKtp='No KTP tidak boleh diisi dengan spasi';
        } if (muzakki.phone.match(onlySpace)) {
            formIsValid = false;
            temporaryError.phone='No HP tidak boleh diisi dengan spasi';
        } if (muzakki.phone.match(plus) || muzakki.phone.match(onlyPlus) || !(muzakki.phone.match(phoneValid))) {
            formIsValid = false;
            temporaryError.phone='Format HP harus berupa angka yang diawali dengan 0 (Contoh: 0811111111)';
        } if (muzakki.phone.match(onlySpace)) {
            formIsValid = false;
            temporaryError.phone='No HP tidak boleh diisi dengan spasi';
        } 
        setError(temporaryError);
        return formIsValid;
    }
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
                <Button label="+ SIMPAN DAN TAMBAH MUZAKKI BARU" type="tertiary" onClick={submitForm}/> <br></br>
                <Button label="LANJUT KE PEMBAYARAN >>" type="primary"/> <br></br>
            </div>
        </main>
        
    );
}