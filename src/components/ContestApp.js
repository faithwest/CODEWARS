import React, { useState } from "react";

function ContestApp() {
  const [newContest, setNewContest] = useState({
    name: "",
    url: "",
    start_time: "",
    end_time: "",
    site: "",
  });

  const [contests, setContests] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewContest({
      ...newContest,
      [name]: value,
    });
  };

  const addNewContest = () => {
    setContests([...contests, newContest]);
    setNewContest({
      name: "",
      url: "",
      start_time: "",
      end_time: "",
      site: "",
    });
  };

  const tableStyle = {
    width: "100%",
    border: "1px solid #ccc",
    borderCollapse: "collapse",
    marginTop: "20px",
  };

  const headerCellStyle = {
    background: "#333",
    color: "white",
    padding: "10px",
    textAlign: "left",
    borderBottom: "1px solid #fff",
  };

  const cellStyle = {
    border: "1px solid #ccc",
    padding: "8px",
  };

  return (
    <div>
      <h2>Add New Contest</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newContest.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>URL:</label>
        <input
          type="url"
          name="url"
          value={newContest.url}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Start Time:</label>
        <input
          type="datetime-local"
          name="start_time"
          value={newContest.start_time}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>End Time:</label>
        <input
          type="datetime-local"
          name="end_time"
          value={newContest.end_time}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Site:</label>
        <input
          type="text"
          name="site"
          value={newContest.site}
          onChange={handleChange}
          required
        />
      </div>
      <button onClick={addNewContest}>Add Contest</button>
      <h1>Contests</h1>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={headerCellStyle}>Name</th>
            <th style={headerCellStyle}>URL</th>
            <th style={headerCellStyle}>Start Time</th>
            <th style={headerCellStyle}>End Time</th>
            <th style={headerCellStyle}>Site</th>
          </tr>
        </thead>
        <tbody>
          {contests.map((contest, index) => (
            <tr key={index}>
              <td style={cellStyle}>{contest.name}</td>
              <td style={cellStyle}>
                <a href={contest.url} target="_blank" rel="noopener noreferrer">
                  {contest.url}
                </a>
              </td>
              <td style={cellStyle}>
                {new Date(contest.start_time).toLocaleString()}
              </td>
              <td style={cellStyle}>
                {new Date(contest.end_time).toLocaleString()}
              </td>
              <td style={cellStyle}>{contest.site}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ContestApp;
