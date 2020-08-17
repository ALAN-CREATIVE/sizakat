import React from "react"
import Dropdown from '../Inputs/Dropdown'
import TextField from '../Inputs/TextField'
import Button from '../Buttons/Button'

const TransaksiInput = (props) => {
  return (
    props.transaksi.map((value, idx)=> {
      return (
        <div key={idx}>
          <div className="formSection">
            <div className="container">
                <div className="row">
                    <div className="col-4">
                        <Dropdown 
                          label="Pilih Jenis Zakat" 
                          placeholder="Jenis zakat" 
                          options={["Zakat Mal", "Zakat Fitrah-Uang", "Zakat Fitrah-Beras"]} 
                          required={true} 
                          onChange = {(option) => props.onTransaksiChanges(option, idx, "jenis")}
                        />
                    </div>
                    <div className="col-4">
                    <TextField 
                      label="Nominal" 
                      placeholder="isi dengan angka" 
                      required={true} 
                      onChange = {(option) => props.onTransaksiChanges(option, idx, "nominal")}
                    />
                    </div>
                    <div className="col-3">
                        <Dropdown 
                          label="Satuan" 
                          placeholder="satuan" 
                          options={["Rp", "Kg", "Liter"]} 
                          required={true} 
                          onChange = {(option) => props.onTransaksiChanges(option, idx, "satuan")}
                        />
                    </div>
                    <div className="col-1">
                      <Button 
                        label="-" 
                        type="tertiary" 
                        onClick = {() => props.onDeleteTransaksi(idx)} 
                      />
                    </div>
                </div>
            </div>
          </div><br></br>
        </div>
      )
    })
  )
}
export default TransaksiInput