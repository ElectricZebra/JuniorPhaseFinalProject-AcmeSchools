import React from 'react';
import { connect } from 'react-redux';
import { destroy } from './store';

const _Student = ({ student, schools, deleteStudent })=> {
  console.log(student)
  return <div>
    <h4>{student.firstName} {student.lastName}</h4>
    <p>{ student.email }</p>
    <p>GPA: { student.gpa }</p>
    <div>School: </div>
    <button className={student.id} onClick={ deleteStudent }>Delete</button>
  </div>
}

const mapStateToProps = ({ schools }) => {
  return {
    schools
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (ev) => {
      dispatch(destroy(ev.target.className))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_Student);
