import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js";
import {
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement,
} from "chart.js";

import "chartjs-adapter-date-fns";
import FilterTable from "./filterTable";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

Chart.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  PointElement,
  LineElement
);

export default function CurrencyHistory({ baseCurrency, targetCurrency }) {
  const [timeFrame, setTimeFrame] = useState("7days");
  const [historicalData, setHistoricalData] = useState([]);

  useEffect(() => {
    setHistoricalData([
      { date: "2023-09-26", rate: 0.4 },
      { date: "2023-09-27", rate: 0.3 },
      { date: "2023-09-28", rate: 0.1 },
      { date: "2023-09-29", rate: 0.2 },
      { date: "2023-09-30", rate: 0.6 },
      { date: "2023-10-01", rate: 1.1 },
      { date: "2023-10-02", rate: 1.2 },
      { date: "2023-10-03", rate: 1.3 },
      { date: "2023-10-04", rate: 1.4 },
      { date: "2023-10-05", rate: 2.1 },
      { date: "2023-10-06", rate: 2.2 },
      { date: "2023-10-07", rate: 2.3 },
      { date: "2023-10-08", rate: 2.4 },
    ]);
  }, [baseCurrency, targetCurrency, timeFrame]);

  const chartData = {
    labels: historicalData.map((d) => new Date(d.date)),
    datasets: [
      {
        label: `Exchange rate for ${baseCurrency} to ${targetCurrency}`,
        data: historicalData.map((d) => d.rate),
        fill: false,
        backgroundColor: "blue",
        borderColor: "blue",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <div className="currencyHistoryContainer">
        <div className="currencyHistorySection">
          <h2 className="headerTextSecondary">Currency History Graph</h2>
          <div className="currencyHistoryBlock">
            <Row className="mb-3 ">
              <Form.Group as={Col} xs={12} md={3}>
                {/* filter graph */}
                <Form.Select onChange={(e) => setTimeFrame(e.target.value)}>
                  <option value="7days">7 days</option>
                  <option value="1month">1 month</option>
                  <option value="6months">6 months</option>
                </Form.Select>
              </Form.Group>
              <Col xs={12} md={9}>
                <div className="chartContainer">
                  <Line
                    data={chartData}
                    options={{
                      maintainAspectRatio: false,
                      scales: { x: { type: "time" } },
                    }}
                  />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <Row className="mb-3 ">
          <Col xs={12}>
            {/* filter table */}
            <FilterTable />
          </Col>
        </Row>
      </div>
    </div>
  );
}
