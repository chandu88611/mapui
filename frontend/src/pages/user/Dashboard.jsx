import React, { useEffect, useState } from "react";
import { Table, Input, Pagination, Skeleton } from "antd";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";
import { useFetchWeatherDataQuery } from "../../redux/services/weatherApi";
import moment from "moment";
import { io } from "socket.io-client";

const { Search } = Input;

const WeatherDashboard = () => {
  const { data: weatherResponse, isLoading, isError } = useFetchWeatherDataQuery({
    page: 1,
    limit: 15,
  });
  const [weatherData, setWeatherData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (weatherResponse && weatherResponse.data) {
      setWeatherData(weatherResponse.data);
    }
  }, [weatherResponse]);

  // Initialize Socket.IO connection
  useEffect(() => {
    const socket = io("http://3.88.187.8:5000"); // Replace with your server URL

    // Listen for new data
    socket.on("weatherDataCreated", (newData) => {
      setWeatherData((prevData) => [...prevData, newData]);
    });

    socket.on("weatherDataUpdated", (updatedData) => {
      setWeatherData((prevData) =>
        prevData.map((data) => (data._id === updatedData._id ? updatedData : data))
      );
    });

    socket.on("weatherDataDeleted", (deletedId) => {
      setWeatherData((prevData) => prevData.filter((data) => data._id !== deletedId));
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  if (isLoading) return <Skeleton active />;
  if (isError) return <div>Error loading weather data.</div>;

  const filteredData = weatherData.filter((item) =>
    item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollerItems = filteredData.map((item) => (
    <div
      key={item._id}
      style={{
        padding: "10px",
        width: "150px",
        textAlign: "center",
        border: "1px solid #ddd",
        borderRadius: "8px",
        margin: "0 10px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <h6>{item.location}</h6>
      <p>{item.temperature} °C</p>
    </div>
  ));

  const lineChartData = {
    labels: weatherData.map((item) => moment(item.timestamp).format("HH:mm")),
    datasets: [
      {
        label: "Temperature (°C)",
        data: weatherData.map((item) => item.temperature),
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const humidityByLocation = weatherData.reduce((acc, item) => {
    acc[item.location] = (acc[item.location] || 0) + item.humidity;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(humidityByLocation),
    datasets: [
      {
        data: Object.values(humidityByLocation),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  };

  const columns = [
    { title: "Timestamp", dataIndex: "timestamp", key: "timestamp", render: (text) => moment(text).format("YYYY-MM-DD HH:mm") },
    { title: "Temperature", dataIndex: "temperature", key: "temperature" },
    { title: "Humidity", dataIndex: "humidity", key: "humidity" },
    { title: "Wind Speed", dataIndex: "windSpeed", key: "windSpeed" },
    { title: "Location", dataIndex: "location", key: "location" },
  ];

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setPageSize(size);
  };

  return (
    <div style={{ maxWidth: "97vw", margin: "0 auto", padding: "20px" }}>
      <h2 style={{ textAlign: "center" }}>Weather Dashboard</h2>

      {/* Horizontal Temperature Scroller */}
      <div
        style={{
          overflow: "hidden",
          whiteSpace: "nowrap",
          padding: "20px 0",
          position: "relative",
        }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          style={{
            display: "inline-flex",
            animation: "scroll-left 15s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {scrollerItems}
          {scrollerItems}
        </div>
      </div>

      {/* Grid Layout for Charts */}
      <div className="row g-4 py-3">
        <div style={{ overflowX: "auto", whiteSpace: "nowrap", paddingBottom: "20px" }} className="col-12 col-lg-8">
          <h3>Temperature Trends Over Time</h3>
          <Line data={lineChartData} />
        </div>
        <div style={{ maxWidth: "500px", margin: "0 auto" }} className="col-12 col-lg-4">
          <h3>Humidity Distribution by Location</h3>
          <Pie data={pieChartData} />
        </div>
      </div>

      <div style={{ overflow: "auto", width: "100%" }}>
        <Search
          placeholder="Search by location"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: "300px", marginBottom: "10px" }}
        />
        <div style={{ overflowX: "auto" }}>
          <Table
            columns={columns}
            dataSource={filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            rowKey="_id"
            pagination={false}
            style={{ backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
          />
        </div>
        <Pagination
          current={currentPage}
          pageSize={pageSize}
          total={filteredData.length}
          onChange={handlePageChange}
          style={{ marginTop: "20px", textAlign: "right" }}
        />
      </div>
    </div>
  );
};

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = `
  @keyframes scroll-left {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }

  @media (max-width: 768px) {
    .ant-table-wrapper {
      overflow-x: auto;
    }
  }
`;
document.head.appendChild(styleSheet);

export default WeatherDashboard;
