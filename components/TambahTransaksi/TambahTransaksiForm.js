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
    const [errorTrans, setErrorTrans] = useState([{jenis:"", nominal:"", satuan:""}])
    const [isTransaksiValid, setIsTransaksiValid] = useState(true);

    const addTransaksi = () => {
        setTransaksi([...transaksi, {jenis:"", nominal:0, satuan:""}])
        setErrorTrans([...errorTrans, {jenis:"", nominal:"", satuan:""}])
    }

    const setTransaksiOnIndex = (value, idx, attribute) => {
        const changeTransaksi = transaksi[idx];
        const changeErrorTransaksi = errorTrans[idx];
        if (attribute === "jenis") {
            setTransaksi([...transaksi.slice(0, idx), {...changeTransaksi, jenis:value}, ...transaksi.slice(idx+1)])
            setErrorTrans([...errorTrans.slice(0, idx), {...changeErrorTransaksi, jenis:""}, ...errorTrans.slice(idx+1)])
        }
        else if (attribute === "nominal") {
            if (value.match(symbol.alphabet)){
                setIsTransaksiValid(false);
                setErrorTrans([...errorTrans.slice(0, idx), {...changeErrorTransaksi, nominal:"Nominal harus berupa angka"}, ...errorTrans.slice(idx+1)])
            }
            else {
                setIsTransaksiValid(true);
                setErrorTrans([...errorTrans.slice(0, idx), {...changeErrorTransaksi, nominal:""}, ...errorTrans.slice(idx+1)])
                setTransaksi([...transaksi.slice(0, idx), {...changeTransaksi, nominal:value}, ...transaksi.slice(idx+1)])
            }
        }
        else if (attribute === "satuan") {
            setTransaksi([...transaksi.slice(0, idx), {...changeTransaksi, satuan:value}, ...transaksi.slice(idx+1)])
        }
    } 

    const transaksiNotEmpty = () => {
        var isValid = true;
        transaksi.map((value, index) => {
            if(value.nominal === 0){
                isValid = false;
                setErrorTrans([...errorTrans.slice(0, index), {...errorTrans[index], nominal:"Nominal tidak boleh kosong"}, ...errorTrans.slice(index+1)])
            }
            if(value.jenis == ""){
                isValid = false;
                setErrorTrans([...errorTrans.slice(0, index), {...errorTrans[index], jenis:"Pilihan zakat tidak boleh kosong"}, ...errorTrans.slice(index+1)])
            }
        })

        return isValid;
    }
    

    const deleteTransaksi = (idx) => {
        setTransaksi([...transaksi.slice(0, idx), ...transaksi.slice(idx+1)])
        setErrorTrans([...errorTrans.slice(0, idx), ...errorTrans.slice(idx+1)])
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
        if (isSubmited && isNextPage ) {
            alert("Submit berhasil");
            router.push(`/buat/transaksi?page=1&transaction=${transactionId}`, undefined, { shallow: true })
        }
    })

    const submitForm = ()=> {
        if (muzakkiCheck() && isTransaksiValid && transaksiNotEmpty()){
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
            console.log(errorTrans)
            setIsTransaksiValid(true);
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

    const symbol = {
        empty: new RegExp(/^$/),
        number: new RegExp(/^[0-9]+$/),
        alphabet: new RegExp(/[a-zA-Z]+/),
        onlySpace: new RegExp(/\s/g),
        namaLengkapValid: new RegExp(/^[a-zA-Z]+?([\s]+)/),
        alamatValid: new RegExp(/^[a-zA-Z0-9]+?([\s]+)/),
        numberValid: new RegExp(/^[0][0-9]+$/),
        onlySymbol: new RegExp(/^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]+$/),
        phoneNumberWithSymbol: new RegExp(/^[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/]?[0-9]+$/),
        plus: new RegExp(/^[\+][0-9]+$/),
        onlyPlus : new RegExp(/^[\+]+$/),
        phoneValid : new RegExp(/^[0][0-9]+$/g)
      };
    

    const muzakkiCheck = () => {
        let formIsValid = true;
        let temporaryError = {};

        if (muzakki.name.length == 0) {
            formIsValid = false;
            temporaryError.name='Nama lengkap tidak boleh kosong';
        } if (muzakki.name.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.name='Nama lengkap tidak boleh diisi dengan spasi saja';
        } if (muzakki.name.match(symbol.namaLengkapValid)) {
            formIsValid = true;
            temporaryError.name='';
        } if (muzakki.noKtp.match(symbol.alphabet)) {
            formIsValid = false;
            temporaryError.noKtp = "No KTP harus diisi dengan 14 karakter angka";
        } if (muzakki.noKtp.length < 14 || muzakki.noKtp.length > 14) {
            formIsValid = false;
            temporaryError.noKtp='Format KTP harus berupa 14 karakter angka';
        } if (muzakki.noKtp.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.noKtp='No KTP tidak boleh diisi dengan spasi';
        } if (muzakki.phone.match(symbol.onlySpace)) {
            formIsValid = false;
            temporaryError.phone='No HP tidak boleh diisi dengan spasi';
        } if (muzakki.phone.match(symbol.plus) || muzakki.phone.match(symbol.onlyPlus) || !(muzakki.phone.match(symbol.phoneValid))) {
            formIsValid = false;
            temporaryError.phone='Format HP harus berupa angka yang diawali dengan 0 (Contoh: 0811111111)';
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
                            setMuzakki({...muzakki, noKtp:ktp});
                            if(ktp.match(symbol.onlySpace)) {
                                setError({
                                    ...error,
                                    noKtp: "Nomor KTP tidak boleh diisi dengan spasi saja"
                                });
                            } else if (ktp.length < 14 || ktp.length > 14) {
                                setError({
                                    ...error,
                                    noKtp: "Format KTP harus berupa 14 karakter angka",
                                });
                            } else if (ktp.match(symbol.alphabet)) {
                                setError({
                                    ...error,
                                    noKtp: "No KTP harus diisi dengan 14 karakter angka",
                                });
                            } else {
                                setError({ ...error, noKtp: "" });
                            }
                        }}
                        error={error.noKtp} 
                    /> <br></br>
                    <TextField 
                        label="Nama Lengkap" 
                        placeholder="Nama sesuai dengan KTP" 
                        required={true} 
                        onChange={name => {
                            setMuzakki({...muzakki, name:name});
                            if (name.match(symbol.namaLengkapValid)) {
                                setError({ ...error, name: "" });
                            } else if (name.match(symbol.onlySpace)) {
                                setError({
                                    ...error,
                                    name: "Nama lengkap tidak boleh diisi dengan spasi saja",
                                });
                            } else if (name.length < 1) {
                                setError({
                                    ...error,
                                    name: "Nama lengkap tidak boleh kosong",
                                });
                            } else {
                                setError({ ...error, name: "" });
                            }
              
                        }} 
                        error={error.name}
                    /> <br></br>
                    <NumberField 
                        label="Nomor Telepon" 
                        placeholder="Terdiri dari angka" 
                        required={true} 
                        onChange={phone => {
                            setMuzakki({...muzakki, phone:phone})
                            if (phone.match(symbol.alphabet)) {
                                setError({ ...error, phone: "Format HP harus berupa angka" });
                            } else if (phone.match(symbol.numberValid)) {
                                setError({ ...error, phone: "" });
                            } else if (
                                phone.match(symbol.phoneNumberWithSymbol) ||
                                phone.match(symbol.onlySymbol)
                            ) {
                                setError({
                                    ...error,
                                    phone:
                                        "Format HP harus berupa angka yang diawali dengan 0 (Contoh: 0811111111)",
                                });
                            } else if (phone.match(symbol.onlySpace)) {
                                setError({
                                    ...error,
                                    phone: "No HP tidak boleh diisi dengan spasi saja",
                                });
                            } else {
                                setError({ ...error, phone: "" });
                            }
                        }} 
                        error = {error.phone}
                    /> <br></br>
                </div><br></br>

                <h2 className="subtitle">Transaksi Zakat</h2><br></br>
                <TransaksiInput transaksi={transaksi} onTransaksiChanges={setTransaksiOnIndex} onDeleteTransaksi={deleteTransaksi} errorTrans={errorTrans}/>
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
