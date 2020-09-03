import React, {useState, useEffect} from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import TextField from '../Inputs/TextField'
import NumberField from '../Inputs/NumberField'
import TransaksiInput from './TransaksiInput'
import Button from '../Buttons/Button'
import { useRouter } from 'next/router';
import Review from './Review';


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

const ADD_TRANSAKSI = gql`
    mutation transactionMutation($input: TransactionMutationInput!){
        transactionMutation(input:$input) {
            transaction {
                id
                paymentType
                goodsDeliveryType
                pickUpAddress
                transferReceipt
                paymentConfirmation
                goodsConfirmation
            }
            errors {
                field
                messages
            }
        }
    }
  
`

const ADD_TRANSAKSI_ZAKAT = gql`
    mutation zakatTransactionMutation($input: ZakatTransactionMutationInput!){
        zakatTransactionMutation(input:$input) {
            zakatTransaction {
                id
                value
                muzakki{
                    id
                }
                transaction{
                    id
                }
                zakatType{
                    id
                }
            }
            errors {
                field
                messages
            }
        }
    }
  
  
`

export default function TambahTransaksiForm() {
    const router = useRouter();
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

    function zakatTypeId(jenis)
    {
        switch(jenis){
            case "Zakat Fitrah-Uang": return 1;
            case "Zakat Mal": return 2;
            case "Zakat Fitrah-Beras": return 3;
        }
    };

    const [isSubmited, setIsSubmited] = useState(false);
    const [createMuzakki, {data: muzakkiData, error: errorMuzakki}] = useMutation(ADD_MUZAKKI, {
        onCompleted: (muzakkiData) => {
            console.log(muzakkiData)
            if(muzakkiData.muzakkiMutation.errors.length != 0){
                alert("Submit gagal");
                console.log(muzakkiData.muzakkiMutation.errors[0].messages[0]);
            }  
        }
    });

    const [createTransaksi, {data: transaksiData, error: errorTransaksi}] = useMutation(ADD_TRANSAKSI, {
        onCompleted: (transaksiData) => {
            console.log(transaksiData)
        }
    });

    const [createZakat, {data: zakatData, error: errorZakat}] = useMutation(ADD_TRANSAKSI_ZAKAT, {
        onCompleted: (zakatData) => {
            console.log(zakatData)
            if(zakatData.zakatTransactionMutation.errors.length != 0){
                alert("Submit gagal");
                console.log(errorTransaksi);
            }  
            else{
                setIsSubmited(true);
            }
        }
    });
    const [transactionId, setTransactionId] = useState()

    const [isAddMuzakki, setIsAddMuzakki] = useState(false)
    const addMuzakki = () => {
        submitForm()
        setIsAddMuzakki(true)
    }

    useEffect(() => {
        if (isSubmited && isAddMuzakki ) {
            alert("Submit berhasil");
            router.push(`/buat/transaksi?page=0&transaction=${transactionId}`, undefined)
        }
    })

    const [isNextPage, setIsNextPage] = useState(false)
    const nextPage= () => {
        submitForm()
        setIsNextPage(true);
    }

    useEffect(() => {
        console.log(isSubmited)
        if (isSubmited && isNextPage ) {
            alert("Submit berhasil");
            router.push(`/buat/transaksi?page=1&transaction=${transactionId}`, undefined, { shallow: true })
        }
    })

    const submitForm= ()=> {
        if (submitCheck()){
            createMuzakki({
                variables: {
                    input: {
                        ...muzakki
                    }
                }
            })
            createTransaksi({
                variables:{
                    input: { 

                    }
                }
            })
        } else {
            alert("Submit gagal");
        }
    }
    const [isExecuted, setIsExecuted] = useState(true)
    useEffect(() => {
        if (isExecuted && muzakkiData && 
            muzakkiData.muzakkiMutation && 
            muzakkiData.muzakkiMutation.muzakki && 
            transaksiData && 
            transaksiData.transactionMutation && 
            transaksiData.transactionMutation.transaction){
                console.log ("MASUK")
                setTransactionId(transaksiData.transactionMutation.transaction.id)
                console.log(transaksi);
                transaksi.map((trans) => 
                    createZakat({
                        variables : {
                            input : {
                                value : trans.nominal,
                                zakatType : zakatTypeId(trans.jenis),
                                muzakki : muzakkiData.muzakkiMutation.muzakki.id,
                                transaction : transaksiData.transactionMutation.transaction.id
                            }
                        }
                    })
                )
            setIsExecuted(false);
        }
    })

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


    console.log(transaksi)
    console.log(muzakkiData)
    //console.log(zakatData)
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
                <Button label="+ SIMPAN DAN TAMBAH MUZAKKI BARU" type="tertiary" onClick={addMuzakki}/> <br></br>
                <Button label="LANJUT KE PEMBAYARAN >>" type="primary" onClick={nextPage}/> <br></br>
            </div>
        </main>
        
    );
}
