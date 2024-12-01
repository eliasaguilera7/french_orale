import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TopicsSelectionPage from './components/TopicsSelectionPage';
import TefReadingExample from './components/TefReadingExample';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TopicsSelectionPage />} />
        <Route path="/tef-reading/:topic" element={<TefReadingExample />} />
      </Routes>
    </Router>
  );
};

export default App;
