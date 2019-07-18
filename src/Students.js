import React from 'react';
import { connect } from 'react-redux';
import { destroy } from './store';
import Student from './Student';

const _Students = ({ students, deleteStudent }) => {
  return (
    <ul>
      {students.map(student => {
        return <li key={student.id}>
          <Student student={student}/>
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
      dispatch(destroy(ev.target.className))
    }
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(_Students);
