import React from 'react';
import { connect } from 'react-redux';
import { destroy } from './store';

const _Students = ({ students, deleteStudent }) => {
  return (
    <ul>
      {students.map(student => {
        return <li key={student.id}>
          <h4>{student.firstName} {student.lastName}</h4>
          <p>{ student.email }</p>
          <p>GPA: { student.gpa }</p>
          <p>School: { student.schoolId }</p>
          <button id={student.id} onClick={ deleteStudent }>Delete</button>
          </li>
      })}
    </ul>
  )
}

const mapStateToProps = ({ students }) => {
  return {
    students
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (ev)=>{
      dispatch(destroy(ev.target.id))
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(_Students);
