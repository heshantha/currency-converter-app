// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Chart from 'react-chartjs-2';
// import 'chartjs-adapter-date-fns';

// const ExchangeRateChart = ({ baseCurrency, targetCurrency }) => {
//   const [data, setData] = useState({});
//   const [filter, setFilter] = useState('7days'); // Default filter is 7 days

//   useEffect(() => {
//     const timeRanges = {
//       '7days': '7',
//       '1month': '30',
//       '6months': '180',
//     };

//     const fetchHistoricalData = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.freecurrencyapi.com/v1/historical?apikey=fca_live_JeB5ukJurHstzeYkvQdO9Va7yihtOI7Snd6VQMif&currencies=${baseCurrency}%2C${targetCurrency}&date_from=${timeRanges[filter]}daysAgo&date_to=latest`
//         );

//         const historicalData = response.data.data;
//         const dates = Object.keys(historicalData);
//         const exchangeRates = Object.values(historicalData);

//         setData({
//           labels: dates,
//           datasets: [
//             {
//               label: `${baseCurrency} to ${targetCurrency}`,
//               data: exchangeRates,
//               fill: false,
//               borderColor: 'rgb(75, 192, 192)',
//               tension: 0.1,
//             },
//           ],
//         });
//       } catch (error) {
//         console.error('Error fetching historical data:', error);
//       }
//     };

//     fetchHistoricalData();
//   }, [baseCurrency, targetCurrency, filter]);

//   const handleFilterChange = (selectedFilter) => {
//     setFilter(selectedFilter);
//   };

//   return (
//     <div>
//       <h2>Historical Exchange Rate:</h2>
//       <div>
//         <select onChange={(e) => handleFilterChange(e.target.value)} value={filter}>
//           <option value="7days">7 Days</option>
//           <option value="1month">1 Month</option>
//           <option value="6months">6 Months</option>
//         </select>
//       </div>
//       <Chart data={data} />
//     </div>
//   );
// };

// export default ExchangeRateChart;
