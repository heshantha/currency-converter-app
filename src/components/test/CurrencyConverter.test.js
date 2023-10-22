import React from 'react';
import { render, screen , cleanup  } from '@testing-library/react';
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





