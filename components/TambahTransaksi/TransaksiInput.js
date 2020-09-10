import React, {useState} from "react"
import Dropdown from '../Inputs/Dropdown'
import Button from '../Buttons/Button'
import NumberField from '../Inputs/NumberField'

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
                          onChange = {(option) => {
                            props.onTransaksiChanges(option, idx, "jenis")
                          }}
                        />
                    </div>
                    <div className="col-4">
                    <NumberField 
                      label="Nominal" 
                      placeholder="isi dengan angka" 
                      required={true} 
                      onChange = {(option) => {
                        props.onTransaksiChanges(option, idx, "nominal")
                      }}
                      error = {props.errorTrans[idx].nominal}
                    />
                    </div>
                    <div className="col-3">
                        <Dropdown 
                          label="Satuan" 
                          placeholder="satuan" 
                          options={["Rp", "Kg"]} 
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