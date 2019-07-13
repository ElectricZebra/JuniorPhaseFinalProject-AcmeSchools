import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

const _Nav = () => {
  return (
    <div>
      <h1>Acme Schools</h1>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ()</Link>
      <Link to='/students'>Students ()</Link>
      <Link to='/most-popular'>Most Popular School</Link>
      <Link to='/highest-gpa'>School with Highest GPA</Link>
    </div>
  )
}

const Nav = connect((state) => {
  return {
    data: state
  };
})(_Nav);


export default Nav;
