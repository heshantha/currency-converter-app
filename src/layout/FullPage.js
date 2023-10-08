import React from "react";
import CurrencyConverter from "../components/CurrencyConverter";
import CurrencyHistory from "../components/CurrencyHistory";
import Container from "react-bootstrap/Container";
import "../styles/app.scss";
export default function FullPage() {
  return (
    <div className="currencyConverterContainer">
      <Container>
      <h1 className='headerText'>Currency Converter</h1>
      <div className='content'>
        <CurrencyConverter />
        <CurrencyHistory />
        </div>
      </Container>
    </div>
  );
}
