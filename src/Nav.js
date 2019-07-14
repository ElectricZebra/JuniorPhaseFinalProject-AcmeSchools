import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

const _Nav = ({ students, schools }) => {
  return (
    <div>
      <h1>Acme Schools</h1>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ({schools.length})</Link>
      <Link to='/students'>Students ({students.length})</Link>
      <Link to='/most-popular'>Most Popular School</Link>
      <Link to='/highest-gpa'>School with Highest GPA</Link>
    </div>
  )
}

const mapStateToProps = ({ students, schools }) => {
  return {
    students,
    schools
  }
}

const Nav = connect(mapStateToProps)(_Nav);

export default Nav;
