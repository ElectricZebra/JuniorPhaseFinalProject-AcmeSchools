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
      <form>
        <label>
          First Name:
          <input type='text' />
        </label>
        <label>
          Last Name:
          <input type='text' />
        </label>
        <label>
          Email:
          <input type='email' />
        </label>
        <label>
          GPA:
          <input type='number' min='0' max='5' step='.01' />
        </label>
        <label>
          Enrolled at:
          <select>
            <option value='hi'>hi</option>
            { schools.map(school => <option key={school.id} value={school.name}>{school.name}</option>)}
          </select>
        </label>
        <input type='submit' value='Submit' />
      </form>
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
