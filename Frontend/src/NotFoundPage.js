import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';

const NotFoundPage = () => {
  return (
    <React.Fragment>
      <Header />
      <p>Page not found. Goto <Link to="/dashboard">Home Page</Link></p>
    </React.Fragment>
  );
};

export default NotFoundPage;