import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';

const _Nav = ({ students, schools, handleSubmit }) => {
  return (
    <div>
      <h1>Acme Schools</h1>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ({schools.length})</Link>
      <Link to='/students'>Students ({students.length})</Link>
      <Link to='/most-popular'>Most Popular School</Link>
      <Link to='/highest-gpa'>School with Highest GPA</Link>
      <form onSubmit={ handleSubmit }>
        <label>
          First Name:
          <input type='text' name="firstName"/>
        </label>
        <label>
          Last Name:
          <input type='text' name="lastName"/>
        </label>
        <label>
          Email:
          <input type='email' name="email"/>
        </label>
        <label>
          GPA:
          <input type='number' min='0' max='5' step='.01' name="gpa"/>
        </label>
        <label>
          Enrolled at:
          <select name="school">
            { schools.map(school =>
              <option key={school.id} value={school.name}>{school.name}
              </option>) }
          </select>
        </label>
        <input type='submit' value='Save' />
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

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (ev)=>{
      const data = {
        firstName: ev.target.firstName,
        lastName: ev.target.lastName,
        email: ev.target.email,
        gpa: ev.target.gpa
        //school: ev.target.school //look into select form
      }
      dispatch(data)
    }
  }
}

const Nav = connect(mapStateToProps, mapDispatchToProps)(_Nav);

export default Nav;
