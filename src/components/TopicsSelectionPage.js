import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TopicsSelectionPage.css';

const TopicsSelectionPage = () => {
  const navigate = useNavigate();

  const topics = [
    { title: 'Yoga Conversation', image: '/images/yoga.png', path: '/tef-reading/yoga' },
    { title: 'Restaurant Conversation', image: '/images/restaurant.png', path: '/tef-reading/restaurant' },
    { title: 'Travel Conversation', image: '/images/travel.png', path: '/tef-reading/travel' },
    { title: 'Shopping Conversation', image: '/images/shopping.png', path: '/tef-reading/shopping' },
    { title: 'Job Interview', image: '/images/job.png', path: '/tef-reading/job' },
    { title: 'School Conversation', image: '/images/school.png', path: '/tef-reading/school' },
    { title: 'Hotel Reservation', image: '/images/hotel.png', path: '/tef-reading/hotel' },
    { title: 'Bank Inquiry', image: '/images/bank.png', path: '/tef-reading/bank' },
  ];

  return (
    <div className="topics-container">
      <h1>Select a Conversation Topic</h1>
      <div className="cards-container">
        {topics.map((topic, index) => (
          <div
            key={index}
            className="topic-card"
            onClick={() => navigate(topic.path)}
          >
            <div className="image-container">
              <img src={topic.image} alt={topic.title} className="topic-image" />
            </div>
            <h3>{topic.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsSelectionPage;