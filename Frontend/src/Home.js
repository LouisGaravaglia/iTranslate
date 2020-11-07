import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';

const Home = (props) => {
  return (
    <div className="login">
      <Header />
      <button>Log into spotify</button>
    </div>
  );
};

export default Home;