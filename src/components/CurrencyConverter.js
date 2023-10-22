import React, { useState, useEffect } from "react";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";
import Container from "react-bootstrap/Container";
import Card from 'react-bootstrap/Card';
export default function CurrencyConverter() {
  const [baseCurrency, setBaseCurrency] = useState("USD");
  const [targetCurrency, setTargetCurrency] = useState("EUR");
  const [exchangeRate, setExchangeRate] = useState(null);
  const [availableCurrencies, setAvailableCurrencies] = useState([]);
// currencies api
  useEffect(() => {
    const fetchAvailableCurrencies = async () => {
      try {
        const response = await axios.get(
          "https://api.freecurrencyapi.com/v1/currencies?apikey=fca_live_JeB5ukJurHstzeYkvQdO9Va7yihtOI7Snd6VQMif"
        );

        if (response.data && response.data.data) {
          const currencies = Object.keys(response.data.data);
          setAvailableCurrencies(currencies);
        }
      } catch (error) {
        console.error("Error fetching available currencies:", error);
      }
    };

    fetchAvailableCurrencies();
  }, []);
// base currency and target currency api
  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await axios.get(
          `https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_JeB5ukJurHstzeYkvQdO9Va7yihtOI7Snd6VQMif&base_currency=${baseCurrency}&currencies=${targetCurrency}`
        );

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
    <>
<Container>
        <div
          className="currencyConverterBlock"
          data-testid="CurrencyConverterMain1"
        >
          <Row className="mb-3">
            <Form.Group as={Col} xs={12} md={6}>
              <Form.Label>Base Currency:</Form.Label>
              {/* base currency selctor */}
              {Array.isArray(availableCurrencies) && (
                <Form.Select
                  onChange={(e) => setBaseCurrency(e.target.value)}
                  value={baseCurrency}
                  data-testid="BaseCurrencyDrop"
                >
                  {availableCurrencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Form.Group>

            <Form.Group as={Col} xs={12} md={6}>
              <Form.Label>Target Currency:</Form.Label>
              {/* target currency selctor */}
              {Array.isArray(availableCurrencies) && (
                <Form.Select
                  onChange={(e) => setTargetCurrency(e.target.value)}
                  value={targetCurrency}
                  data-testid="TargetCurrencyDrop"
                >
                  {availableCurrencies.map((currency) => (
                    <option key={currency} value={currency}>
                      {currency}
                    </option>
                  ))}
                </Form.Select>
              )}
            </Form.Group>
          </Row>
          <Row className="lgBtMargin">
            <Col>
              {/* currency exhcnage rate showing block */}
              {exchangeRate !== null ? (
                <Card body>
                  <h3 className="textCenter">
                    1 {baseCurrency} =
                    <span data-testid="ExchangeRateSpan"> {exchangeRate} </span>{" "}
                    {targetCurrency}
                  </h3>
                </Card>
              ) : (
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              )}
            </Col>
          </Row>
        </div>
      </Container>
    </>
  );
}
