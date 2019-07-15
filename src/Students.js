import React from 'react';
import { connect } from 'react-redux';
import { destroy } from './store';


//TODO figure out how to display newly created student's school
const _Students = ({ students, deleteStudent }) => {
  return (
    <ul>
      {students.map(student => {
        const school = student.school ? student.school : 'no school';
        return <li key={student.id}>
          <h4>{student.firstName} {student.lastName}</h4>
          <p>{ student.email }</p>
          <p>GPA: { student.gpa }</p>
          <p>School: { school.name }</p>
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
