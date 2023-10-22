import React from 'react';
import { render, screen , cleanup, act  } from '@testing-library/react';
import axios from 'axios';
import CurrencyConverter from '../CurrencyConverter';

afterEach(() => {
  cleanup();
});

test('Currency converter component avilable', () => {
  render(<CurrencyConverter />); 

  const divElement = screen.getByTestId('CurrencyConverterMain'); 

  expect(divElement).toBeInTheDocument();
});


test('Currency converter base currency dropdown avilable', () => {
    render(<CurrencyConverter />); 
  
    const dropDownElement = screen.getByTestId('BaseCurrencyDrop'); 
  
    expect(dropDownElement).toBeInTheDocument();
  });

  test('Currency converter target currency dropdown avilable', () => {
    render(<CurrencyConverter />); 
  
    const dropDownElement = screen.getByTestId('TargetCurrencyDrop'); 
  
    expect(dropDownElement).toBeInTheDocument();
  });


  test('Currency converter USD to EURO value', async  () => {
    
   
    const response = await axios.get(
        "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_JeB5ukJurHstzeYkvQdO9Va7yihtOI7Snd6VQMif"
      );
  
    const rate= response.data.data['EUR'];
    act(async() => {
    render(<CurrencyConverter />); 
    const spanElement = await screen.findByTestId('ExchangeRateSpan'); 
    const textContent = spanElement.textContent;

    expect(rate.toString()).toEqual(textContent.trim());
    });
    
  });


