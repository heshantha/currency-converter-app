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
import Container from "react-bootstrap/Container";
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
    const allData = [
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
      { date: "2023-10-18", rate: 3.4 },
      { date: "2023-10-19", rate: 3.4 },
      { date: "2023-10-20", rate: 3.1 },
      { date: "2023-10-21", rate: 3.2 },
      { date: "2023-10-22", rate: 3.3 },
      { date: "2023-10-23", rate: 3.4 },
      { date: "2023-5-18", rate: 1.4 },
      { date: "2023-5-19", rate: 1.4 },
      { date: "2023-5-20", rate: 1.1 },
      { date: "2023-5-21", rate: 1.2 },
      { date: "2023-5-22", rate: 1.3 },
      { date: "2023-5-23", rate: 1.4 },
    ];

    let today = new Date();
    let filteredData = [];

    switch (timeFrame) {
      case "7days":
        const oneWeekAgo = today.setDate(today.getDate() - 7);
        filteredData = allData.filter(
          (d) => new Date(d.date).getTime() >= oneWeekAgo
        );
        break;
      case "1month":
        const oneMonthAgo = today.setMonth(today.getMonth() - 1);
        filteredData = allData.filter(
          (d) => new Date(d.date).getTime() >= oneMonthAgo
        );
        break;
      case "6months":
        const sixMonthsAgo = today.setMonth(today.getMonth() - 6);
        filteredData = allData.filter(
          (d) => new Date(d.date).getTime() >= sixMonthsAgo
        );
        break;
      default:
        filteredData = allData;
    }

    setHistoricalData(filteredData);
  }, [baseCurrency, targetCurrency, timeFrame]);

  const chartData = {
    labels: historicalData.map((d) => new Date(d.date)),
    datasets: [
      {
        label: `Exchange rate for ${baseCurrency} to ${targetCurrency}`,
        data: historicalData.map((d) => d.rate),
        fill: false,
        backgroundColor: "#330065",
        borderColor: "#330065",
        tension: 0.1,
      },
    ],
  };

  return (
    <div>
      <Container fluid>
        <div className="currencyHistoryContainer">
          <div className="currencyHistorySection">
            <h2 className="headerTextSecondary">Currency History Graph</h2>
            <div className="currencyHistoryBlock">
              <Row className="mb-3 ">
                <Form.Group as={Col} xs={12} md={3}>
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
      </Container>
    </div>
  );
}
