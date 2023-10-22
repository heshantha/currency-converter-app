import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";
import Table from "react-bootstrap/Table";
import SortingArrow from "./SortingArrow";

// Default dummy data
const DUMMY_DATA = [
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
];

export default function FilterTable({ historicalData = DUMMY_DATA }) {
  const [sortedData, setSortedData] = useState([...historicalData]);
  const [sortOrder, setSortOrder] = useState("asc");

  const handleSort = () => {
    let sorted = [...sortedData].sort((a, b) => (a.rate > b.rate ? 1 : -1));
    if (sortOrder === "asc") {
      setSortOrder("desc");
      sorted.reverse();
    } else {
      setSortOrder("asc");
    }
    setSortedData(sorted);
  };

  return (
    <div className="filterTableSection">
      <h2 className="headerTextSecondary">Currency History Table</h2>
      <div className="filterTableBlock">
        <Table responsive striped>
          <thead>
            <tr>
              <th onClick={handleSort} className="sortTableHeader">
                Date
                <SortingArrow sortOrder={sortOrder} />
              </th>
              <th onClick={handleSort} className="sortTableHeader">
                Rate
                <SortingArrow sortOrder={sortOrder} />
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((entry) => (
              <tr key={entry.date}>
                <td>{entry.date}</td>
                <td>{entry.rate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
