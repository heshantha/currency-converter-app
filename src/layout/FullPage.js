import React from "react";
import CurrencyConverter from "../components/CurrencyConverter";
import CurrencyHistory from "../components/CurrencyHistory";

import "../styles/app.scss";
export default function FullPage() {
  return (
    <div className="currencyConverterSection">

      <h1 className='headerText'>Currency Converter</h1>
      <div>
        <CurrencyConverter />
        <CurrencyHistory />
        </div>
  
    </div>
  );
}
