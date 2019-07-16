import React from 'react';
import { connect } from 'react-redux';
import { createStudent } from './store';

const _CreateStudent = ({ schools, handleSubmit }) => {
  return <form id="createStudent" onSubmit={handleSubmit}>
  <label>
    First Name:
    <input type="text" name="firstName" required />
  </label>
  <label>
    Last Name:
    <input type="text" name="lastName" required />
  </label>
  <label>
    Email:
    <input type="email" name="email" required />
  </label>
  <label>
    GPA:
    <input
      type="number"
      min="0"
      max="5"
      step=".01"
      name="gpa"
      required
      defaultValue={3.5}
    />
  </label>
  <label>
    Enrolled at:
    <select name="school">
      {schools.map(school => (
        <option key={school.id} value={school.name}>
          {school.name}
        </option>
      ))}
    </select>
  </label>
  <input type="submit" value="Save" />
</form>
}

const clearForm = () => {
  document.getElementById('createStudent').reset();
}

const mapStateToProps = ({ schools })=> {
  return {
    schools
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSubmit: (event)=>{
      const student = {
        firstName: event.target.firstName.value,
        lastName: event.target.lastName.value,
        email: event.target.email.value,
        gpa: event.target.gpa.value,
        schoolName: event.target.school.value
      }
      event.preventDefault();
      clearForm();
      dispatch(createStudent(student))
  }
}
}

const CreateStudent = connect(mapStateToProps, mapDispatchToProps)(_CreateStudent);

export default CreateStudent;
