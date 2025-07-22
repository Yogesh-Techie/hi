import React from 'react';
import './Home.css';

function Home() {
  return (
    <div className="hero">
      <div className="overlay">
        <div className="content">
          <h5 className="mb-2">DevOps Engineer</h5>
          <h1 className="mb-4">Yogesh<br />Ramadoss</h1>

          <div className="stats">
            <div><h2>3</h2><p>Years Experience</p></div>
            <div><h2>12</h2><p>Satisfied Clients</p></div>
            <div><h2>14</h2><p>Projects Completed</p></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
