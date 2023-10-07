import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'chartjs-adapter-date-fns';
import { Chart } from 'chart.js';

const ExchangeRateChart = ({ baseCurrency, targetCurrency }) => {
  const [data, setData] = useState({
    labels: [], // Array of labels (dates)
    datasets: [
      {
        label: `${baseCurrency} to ${targetCurrency}`,
        data: [], // Array of data points
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  const [filter, setFilter] = useState('7days'); // Default filter is 7 days
  const [chartInstance, setChartInstance] = useState(null); // Store chart instance

  useEffect(() => {
    // Define the time range for the selected filter
    const timeRanges = {
      '7days': '7',
      '1month': '30',
      '6months': '180',
    };

    // Destroy the previous chart instance, if it exists
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Fetch historical exchange rate data based on the selected filter
    axios
      .get(`https://api.currencyapi.com/v3/latest?apikey=cur_live_00eeUbZqHWFk1APyodtoCym3Vz57HUD1p6Qea2Ba`)
      .then(response => {
        // Assuming the API response contains an array of data points with dates and exchange rates
        const historicalData = response.data;

        // Extract dates and exchange rates from the historical data
        const dates = historicalData.map(item => item.date);
        const exchangeRates = historicalData.map(item => item.rate);

        // Update the state with the retrieved data
        setData({
          ...data,
          labels: dates,
          datasets: [
            {
              ...data.datasets[0],
              data: exchangeRates,
            },
          ],
        });

        // Create a new chart instance and store it
        const ctx = document.getElementById('chart').getContext('2d');
        const newChartInstance = new Chart(ctx, {
          type: 'line',
          data: data,
          options: {
            scales: {
              x: {
                type: 'time',
                time: {
                  unit: 'day',
                },
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });
        setChartInstance(newChartInstance);
      })
      .catch(error => {
        console.error('Error fetching historical data:', error);
      });
  }, [baseCurrency, targetCurrency, filter]);

  // Rest of your component code

  return (
    <div>
      <h2>Historical Exchange Rate:</h2>
      <div>
        <select onChange={e => setFilter(e.target.value)} value={filter}>
          <option value="7days">7 Days</option>
          <option value="1month">1 Month</option>
          <option value="6months">6 Months</option>
        </select>
      </div>
      <canvas id="chart" width={400} height={200}></canvas>
    </div>
  );
};

export default ExchangeRateChart;
