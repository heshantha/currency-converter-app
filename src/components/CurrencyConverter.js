import React, { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

const CurrencyConverter = () => {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);

  // Define a list of predefined currencies
  const predefinedCurrencies = [
    "USD",
    "EUR",
    "GBP",
    "JPY",
    "AUD",
    "BGN", // Add more currencies as needed
  ];

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_JeB5ukJurHstzeYkvQdO9Va7yihtOI7Snd6VQMif"
        );

        // Check if the response contains data and if the targetCurrency exists as a property
        if (
          response.data &&
          response.data.data &&
          response.data.data[targetCurrency]
        ) {
          setExchangeRate(response.data.data[targetCurrency]);
        } else {
          console.error("Exchange rate not found for", targetCurrency);
        }
      } catch (error) {
        console.error("Error fetching exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, [baseCurrency, targetCurrency]);

  return (
    <div>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Base Currency:</Form.Label>
       
            <Form.Select
              onChange={(e) => setBaseCurrency(e.target.value)}
              value={baseCurrency}
            >
              {predefinedCurrencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
                </Form.Select>
          </Form.Group>

          <Form.Group as={Col}>
          <Form.Label>Target Currency:</Form.Label>
          <Form.Select
              onChange={(e) => setTargetCurrency(e.target.value)}
              value={targetCurrency}
            >
              {predefinedCurrencies.map((currency) => (
                <option key={currency} value={currency}>
                  {currency}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
      <Row>
      <Col>
      {exchangeRate !== null ? (
        <p>
          1 {baseCurrency} = {exchangeRate} {targetCurrency}
        </p>
      ) : (
        <p>Loading...</p>
      )}
       </Col>
         </Row>
    </div>
  );
};

export default CurrencyConverter;
