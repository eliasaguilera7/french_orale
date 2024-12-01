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
    { title: 'Doctor Appointment', image: '/images/doctor.png', path: '/tef-reading/doctor' },
    { title: 'Car Rental', image: '/images/car.png', path: '/tef-reading/car' },
    { title: 'Library Visit', image: '/images/library.png', path: '/tef-reading/library' },
    { title: 'Cinema Ticket', image: '/images/cinema.png', path: '/tef-reading/cinema' },
    { title: 'Flight Booking', image: '/images/flight.png', path: '/tef-reading/flight' },
    { title: 'Gym Registration', image: '/images/gym.png', path: '/tef-reading/gym' },
    { title: 'Post Office', image: '/images/post.png', path: '/tef-reading/post' },
    { title: 'Police Report', image: '/images/police.png', path: '/tef-reading/police' },
    { title: 'Apartment Rental', image: '/images/apartment.png', path: '/tef-reading/apartment' },
    { title: 'Supermarket Visit', image: '/images/supermarket.png', path: '/tef-reading/supermarket' },
    { title: 'University Admission', image: '/images/university.png', path: '/tef-reading/university' },
    { title: 'Park Visit', image: '/images/park.png', path: '/tef-reading/park' },
    { title: 'Festival Celebration', image: '/images/festival.png', path: '/tef-reading/festival' },
    { title: 'Wedding Preparation', image: '/images/wedding.png', path: '/tef-reading/wedding' },
    { title: 'Beach Outing', image: '/images/beach.png', path: '/tef-reading/beach' },
    { title: 'Concert Experience', image: '/images/concert.png', path: '/tef-reading/concert' },

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
            <img src={topic.image} alt={topic.title} className="topic-image" />
            <h3>{topic.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsSelectionPage;
