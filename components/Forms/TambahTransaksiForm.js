import React from 'react';
import TextField from '../Inputs/TextField'
import Dropdown from '../Inputs/Dropdown'

export default function TambahTransaksiForm() {
    return(
        <div className="formContainer">
            <h2 className="subtitle">Data Muzakki</h2>
            <div className="formSection">
                <TextField label="Nomor KTP" placeholder="Terdiri dari 14 karakter angka" required={true} />
                <TextField label="Nama Lengkap" placeholder="Nama sesuai dengan KTP" required={true} />
                <TextField label="Nomor Telepon" placeholder="Terdiri dari angka" required={true} />
            </div>
            <h2 className="subtitle">Transaksi Zakat</h2>
            <div className="formSection">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <Dropdown label="Pilih Jenis Zakat" placeholder="Jenis zakat" options={["Zakat Mal", "Zakat Fitrah-Uang", "Zakat Fitrah-Beras"]} required={true} />
                        </div>
                        <div className="col">
                        <TextField label="Nominal" placeholder="isi dengan angka" required={true} />
                        </div>
                        <div className="col">
                            <Dropdown label="Satuan" placeholder="satuan" options={["Rp", "Kg", "Liter"]} required={true} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}