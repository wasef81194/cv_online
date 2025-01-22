import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';

const App = () => {
  return (
    <div>
        <div>
        <h1>Hello, React!</h1>
        </div>
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
      </Router>
    </div>
  );
};

export default App;
