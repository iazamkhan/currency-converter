import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Converter.css'


function Converter() {

  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    axios.get("https://v6.exchangerate-api.com/v6/4fb6bd0e2e87f09d9e6dee49/latest/USD")
      .then(res => {
        setCurrencies(res.data.conversion_rates ? Object.keys(res.data.conversion_rates) : Object.keys({}))
      })
  }, [])

  const [convertFrom, setConvertFrom] = useState("");
  const [convertTo, setConvertTo] = useState("");
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setTocurrency] = useState("");

  return (
    <div className="container">
      <h1 className="top-heading">Currency Converter</h1>
      <p className="label">{convertFrom !=="" ? convertFrom : 1} {fromCurrency !== "" ? fromCurrency : 'INR'} equals to</p>
      <p className="label2">{convertTo} USD</p>
      <div className="first-input-row">
        <input className="text-box" type="text" onChange={(e) => {setConvertFrom(e.target.value)}}></input>
        <select className="dropdown" onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map(cur => (
            <option value={fromCurrency}>{cur}</option>
          ))}
        </select>
      </div>
      <div className="second-input-row">
        <input className="text-box" type="text" onChange={(e) => {
          setConvertTo
            (e.target.value)
        }}></input>
        <select className="dropdown" onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies?.map(cur => (
            <option value={fromCurrency}>{cur}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Converter