import React from "react"
import Dropdown from '../Inputs/Dropdown'
import TextField from '../Inputs/TextField'

const TransaksiInput = (props) => {
  return (
    props.transaksi.map((idx)=> {
      return (
        <div key={idx}>
          <div className="formSection">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Dropdown 
                          label="Pilih Jenis Zakat" 
                          placeholder="Jenis zakat" 
                          options={["Zakat Mal", "Zakat Fitrah-Uang", "Zakat Fitrah-Beras"]} 
                          required={true} 
                        />
                    </div>
                    <div className="col">
                    <TextField 
                      label="Nominal" 
                      placeholder="isi dengan angka" 
                      required={true} 
                    />
                    </div>
                    <div className="col">
                        <Dropdown 
                          label="Satuan" 
                          placeholder="satuan" 
                          options={["Rp", "Kg", "Liter"]} 
                          required={true} 
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