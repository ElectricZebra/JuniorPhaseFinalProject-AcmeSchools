import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import { createStudent } from './store';

const _Nav = ({ students, schools, handleSubmit }) => {
  return (
    <div>
      <h1>Acme Schools</h1>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ({schools.length})</Link>
      <Link to='/students'>Students ({students.length})</Link>
      <Link to='/most-popular'>Most Popular School</Link>
      <Link to='/highest-gpa'>School with Highest GPA</Link>
      <form id='createStudent' onSubmit={ handleSubmit }>
        <label>
          First Name:
          <input type='text' name="firstName" required/>
        </label>
        <label>
          Last Name:
          <input type='text' name="lastName" required/>
        </label>
        <label>
          Email:
          <input type='email' name="email" required/>
        </label>
        <label>
          GPA:
          <input type='number' min='0' max='5' step='.01' name="gpa" required defaultValue={3.5}/>
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

const clearForm = () => {
  document.getElementById('createStudent').reset();
}

//add error handling for duplicate email in DB
const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (event)=>{
      const student = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        gpa: event.target.gpa.value,
        schoolName: event.target.school.value
        //school: look into aquiring select form data
      }
      console.log(event.target.school.value)
      event.preventDefault();
      clearForm();
      dispatch(createStudent(student))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_Nav);
