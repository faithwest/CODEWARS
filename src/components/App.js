import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './Navigation';
import Layout from './Layout';
import Home from './Home';
import AboutUs from './AboutUs';

function App() {
  const [Contests, setContests] = useState([]);
  const [showContestTable, setShowContestTable] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/contests")
      .then(response => response.json())
      .then(data => setContests(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAddContest = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/contests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: e.target.name.value,
        url: e.target.url.value,
        start_time: e.target.start_time.value,
        end_time: e.target.end_time.value,
        site: e.target.site.value,
      }),
    })
      .then(response => response.json())
      .then((data) => {
        console.log('Success in adding contest', data);
        setContests([...Contests, data]);
        e.target.name.value = '';
        e.target.url.value = '';
        e.target.start_time.value = '';
        e.target.end_time.value = '';
        e.target.site.value = '';
        setShowContestTable(false);
      });
  }

  const ContestList = () => {
    return (
      <div>
        <h1>Contests</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>URL</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Site</th>
            </tr>
          </thead>
          <tbody>
            {Contests.map((contest, index) => (
              <tr key={index}>
                <td>{contest.name}</td>
                <td>
                  <a href={contest.url} target="_blank" rel="noopener noreferrer">
                    {contest.url}
                  </a>
                </td>
                <td>{new Date(contest.start_time).toLocaleString()}</td>
                <td>{new Date(contest.end_time).toLocaleString()}</td>
                <td>{contest.site}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Navigation />
        <Layout>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={AboutUs} />
          <Route exact path="/contests" component={ContestList} />
        </Layout>
      </div>
    </Router>
  );
}

export default App;
