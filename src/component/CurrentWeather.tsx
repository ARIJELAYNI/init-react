import React from "react";

export const CurrentWeather: React.FC = () => {
  const [currentTemperature, setCurrentTemperature] = React.useState({
    id: null,
    temperature: null,
    max_temperature: null,
    min_temperature: null,
  });

  const [historyTemperature, setHistoryTemperature] = React.useState([
    {
      id: null,
      temperature: null,
      max_temperature: null,
      min_temperature: null,
    },
  ]);

  React.useEffect(() => {
    requestHistoryWeather();
  }, []);

  const requestHistoryWeather = () => {
    fetch("http://localhost:8080/api/v1/history", { method: "GET" })
      .then((response) => response.json())
      .then((result) => setHistoryTemperature(result));
  };

  const requestWeatherData = () => {
    fetch("http://localhost:8080/api/v1/weather", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((result) => {
        setCurrentTemperature(result);
      });
  };
  return (
    <>
      <div>
        <button onClick={() => requestWeatherData()}>
          Get CurrentWeather{" "}
        </button>
      </div>
      <div>
        <h3>Current Data</h3>
        <span>{currentTemperature.temperature}</span>
      </div>
      <div>
        <h3>History</h3>
        {historyTemperature.map((item) => (
          <div key={item.id}>
            temperature: <span>{item.temperature}</span> ; min_temperature:{" "}
            <span>{item.min_temperature}</span> ; max_temperature:{" "}
            <span>{item.max_temperature}</span>
          </div>
        ))}
      </div>
    </>
  );
};
