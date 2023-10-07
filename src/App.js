import React, { useState } from 'react';
import CurrencyConverter from './components/CurrencyConverter';
import ExchangeRateChart from './components/ExchangeRateChart';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import CurrencyHistory from './components/CurrencyHistory';

function App() {
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');

  return (
    <div className="currencyConverterContainer App">
          <Container>
    <h1>Currency Converter</h1>
    <CurrencyConverter />
<CurrencyHistory />
    </Container>
  </div>
  );
}

export default App;
