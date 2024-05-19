import React, { useState, useEffect } from 'react';
import './App.css';
import data from './assets/data.json'; // Import JSON data

const weeks = Object.keys(data); // Extract week names from JSON keys

const CheckboxList = ({ week, onClose }) => {
  const [videos, setVideos] = useState([]);
  const [checkboxes, setCheckboxes] = useState([]);

  useEffect(() => {
    setVideos(data[week]);
    setCheckboxes(
      JSON.parse(localStorage.getItem(`${week}`)) || Array(data[week].length).fill(false)
    );
  }, [week]);

  useEffect(() => {
    localStorage.setItem(`${week}`, JSON.stringify(checkboxes));
  }, [checkboxes, week]);

  const handleCheckboxChange = (index) => {
    const newCheckboxes = [...checkboxes];
    newCheckboxes[index] = !newCheckboxes[index];
    setCheckboxes(newCheckboxes);
  };

  return (
    <div className="checkbox-list">
      <h2>{week}</h2>
      {videos.map((video, index) => (
        <div key={index}>
          <label>
            {video}
            <input
              type="checkbox"
              checked={checkboxes[index]}
              onChange={() => handleCheckboxChange(index)}
            />
          </label>
        </div>
      ))}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

const App = () => {
  const [selectedWeek, setSelectedWeek] = useState(null);

  return (
    <div className="app">
      <h1>Weeks Grid</h1>
      <div className="grid">
        {weeks.map((week) => (
          <div
            key={week}
            className="card"
            onClick={() => setSelectedWeek(week)}
          >
            {week}
          </div>
        ))}
      </div>
      {selectedWeek && (
        <CheckboxList week={selectedWeek} onClose={() => setSelectedWeek(null)} />
      )}
    </div>
  );
};

export default App;
