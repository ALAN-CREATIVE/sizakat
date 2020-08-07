import Head from 'next/head'
import React, { useState } from 'react';

import Dropdown from '../../components/inputs/Dropdown'
import FileField from '../../components/inputs/FileField'
import NumberField from '../../components/inputs/NumberField'
import RadioButton from '../../components/inputs/RadioButton'
import TextField from '../../components/inputs/TextField'
import NavigationBar from '../../components/NavigationBar/NavigationBar'
import Button from '../../components/Buttons/Button';

export default function TambahMustahik() {
    const [input, setState] = useState('');

    const onChangeNumberField = (numberFieldValue) => {
        console.log(numberFieldValue);
        setState(numberFieldValue);
    }

    const onChangeTextField = (textFieldValue) => {
        console.log(textFieldValue);
        setState(textFieldValue);
    }

    return (
        <div className="TambahMustahikPage">
            <Head>
                <title>Tambah SDM</title>
                <meta charset="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />

                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous" />
                <link href="https://fonts.googleapis.com/css?family=Muli:300,400,700,800" rel="stylesheet" />
            </Head>

            <main>
                <div class="row">
                    <div class="col">
                        <h1 id="logout">Keluar</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="col-3">
                        <div className="navigation-bar">
                           <NavigationBar
                                name= { 'Annisaa Fitri Shabrina' }
                                role= { 'Admin' }
                                menu= { 'Mustahik' }
                                submenu=  { ['Data Mustahik', 'Sumber Data Mustahik'] }
                            />
                        </div>
                    </div>
                    <div class="col-9">
                        <h1 id="page-title">Tambah Sumber Data Mustahik</h1>
                        <p id="breadcrumb">Mustahik {'//'} <span>Tambah Sumber {'//'}</span> <span style={{ color: "#00239D" }}><b>Pekerja</b></span></p>
                        <div className="form-section">
                            <h1 id="form-title">KATEGORI SUMBER DATA</h1>
                            <div className="form" id="sumber-data">
                                <TextField
                                    label={ 'Nama Kategori' }
                                    placeholder={ 'Warga' }
                                    required={ false }
                                    onChange={ onChangeTextField }
                                />
                            </div>
                            <h1 id="form-title">DETAIL SUMBER DATA</h1>
                            <div className="form" id="jenis-pekerjaan">
                                <TextField
                                    label={ 'Jenis Pekerjaan' }
                                    placeholder={ 'Satpam' }
                                    required={ false }
                                    onChange={ onChangeTextField }
                                />
                            </div>
                            <div className="form" id="lokasi-pekerjaan">
                                <TextField
                                    label={ 'Lokasi Pekerjaan (Kelurahan)' }
                                    placeholder={ 'Kelurahan' }
                                    required={ true }
                                    onChange={ onChangeTextField }
                                />
                            </div>
                            <h1 id="form-title">PENANGGUNG JAWAB</h1>
                            <div className="form" id="nama">
                                <TextField
                                    label={ 'Nama' }
                                    placeholder={ 'Nama Penanggung Jawab sesuai dengan KTP' }
                                    required={ true }
                                    onChange={ onChangeTextField }
                                />
                            </div>
                            <div className="form" id="no-ktp">
                                <NumberField
                                    label={ 'No. KTP' }
                                    placeholder={ 'Terdiri dari 14 karakter angka' }
                                    required={ true }
                                    onChange={ onChangeNumberField }
                                />
                            </div>
                            <div className="form" id="jabatan">
                                <TextField
                                    label={ 'Jabatan' }
                                    placeholder={ 'Nama Jabatan Penanggung Jawab' }
                                    required={ true }
                                    onChange={ onChangeTextField }
                                />
                            </div>
                            <div className="form" id="no-tlp">
                                <NumberField
                                    label={ 'No. Telepon' }
                                    placeholder={ 'Terdiri dari angka' }
                                    required={ true }
                                    onChange={ onChangeNumberField }
                                />
                            </div>
                            <div className="form button-lanjutkan">
                                <Button
                                    label= { 'SIMPAN DATA' }
                                    type= { 'primary' }
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
            </main>

            <style jsx>{`
                .navigation-bar {
                    background: #FFFFFF;
                    border: 1px solid #DEDEDE;
                    box-sizing: border-box;
                    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                }

                #profile-picture {
                    width: 100px;
                    height: 100px;
                    background-color: #00239D;
                    border-radius: 50%;

                    margin: 50px auto;
                }

                #user-name {
                    font-style: normal;
                    font-weight: bold;
                    font-size: 20px;
                    line-height: 25px;
                    text-align: center;

                    color: #393F50;
                }

                #user-role {
                    font-style: normal;
                    font-weight: bold;
                    font-size: 16px;
                    line-height: 20px;
                    text-align: center;

                    color: #898686;
                }

                #navbar-title {
                    font-style: normal;
                    font-weight: bold;
                    font-size: 16px;
                    line-height: 10px;

                    letter-spacing: 0.1em;

                    color: #898686;

                    margin-left: 5%;
                }

                #navbar-option {
                    font-style: normal;
                    font-weight: bold;
                    font-size: 18px;
                    line-height: 23px;

                    color: #393F50;

                    margin: 2.5% 0 2.5% 15%;
                    padding: 20px;
                }

                .navbar-clicked {
                    background: #F5F6F8;
                }

                .form-section {
                    background: #FFFFFF;
                    border: 2px solid #DEDEDE;
                    box-sizing: border-box;

                    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.04);
                    border-radius: 8px;

                    margin: 30px;
                }

                #page-title {
                    font-style: normal;
                    font-weight: bold;
                    font-size: 28px;
                    line-height: 35px;

                    color: #393F50;
                }

                #breadcrumb {
                    font-style: normal;
                    font-weight: bold;
                    font-size: 12px;
                    line-height: 15px;

                    color: #C2C2C2;
                }

                #form-title {
                    font-size: 20px;
                    font-weight: bold;
                    font-style: normal;
                    line-height: 25px;

                    color: #00239D;

                    margin: 1% 0 0 1.5%;
                }

                .form {
                    margin: 3% 10% 3% 10%;
                }

                .button-lanjutkan {
                    display: flex;
                    justify-content: flex-end;
                }

                .btn.btn-light {
                    background: #00239D;
                    color: white;

                    width: 150px;

                    border-radius: 8px;
                }

                #logout {
                    float: right;

                    font-style: normal;
                    font-weight: bold;
                    font-size: 20px;
                    line-height: 25px;

                    margin: 3% 2% 2% 0;

                    color: #EB4E2C;
                }
            `}</style>

            <style jsx global>{`
                html,
                body {
                    padding: 0;
                    margin: 0;
                    overflow-x: hidden;

                    font-family: Muli;
                }
            `}</style>
        </div>
    );
};