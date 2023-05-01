import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import './Converter.css'


function Converter() {

  const [currencies, setCurrencies] = useState([])
  const [convertFrom, setConvertFrom] = useState("");
  const [convertTo, setConvertTo] = useState("");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");

  useEffect(() => {
    axios.get(`https://v6.exchangerate-api.com/v6/4fb6bd0e2e87f09d9e6dee49/pair/${fromCurrency}/${toCurrency}`)
      .then(res => {
        setConvertTo(res.data.conversion_rate * convertFrom)
      })
    // if (fromCurrency === "" && toCurrency.length) {
    //   setFromCurrency(toCurrency)
    //   setToCurrency(fromCurrency)
    // }
  }, [fromCurrency, toCurrency, convertFrom, convertTo])

  useEffect(() => {
    axios.get("https://v6.exchangerate-api.com/v6/4fb6bd0e2e87f09d9e6dee49/latest/USD")
      .then(res => {
        setCurrencies(res.data.conversion_rates ? Object.keys(res.data.conversion_rates) : Object.keys({}))
      })
  }, [])

  // useEffect(() => {
  //   if(fromCurrency === "" && toCurrency.length) {
  //     setFromCurrency(toCurrency) 
  //   }
  // }, [fromCurrency, toCurrency])


  return (
    <div className="container">
      <h1 className="top-heading">Currency Converter</h1>
      <p className="label">{convertFrom !== "" ? convertFrom : 1} {fromCurrency !== "" ? fromCurrency : 'USD'} equals to</p>
      <p className="label2">{convertTo} {toCurrency !== "" ? toCurrency : "INR"}</p>
      <div className="first-input-row">
        <input className="text-box" type="number" onChange={(e) => { setConvertFrom(e.target.value) }} value={convertTo === "" ? 1 : convertFrom}></input>
        <select className="dropdown" onChange={(e) => setFromCurrency(e.target.value)}>
          {currencies.map(cur => (
            <option value={cur}>{cur}</option>
          ))}
        </select>
      </div>
      <div className="second-input-row">
        <input className="text-box" type="number" onChange={(e) => {
          setConvertTo
            (e.target.value)
        }} value={convertFrom === "" ? "" : convertTo}></input>
        <select className="dropdown" onChange={(e) => setToCurrency(e.target.value)}>
          {currencies?.map(cur => (
            <option value={cur}>{cur}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Converter