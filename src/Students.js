import React from 'react';
import { connect } from 'react-redux';
import Student from './Student';

const _Students = ({ students }) => {
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

export default connect (mapStateToProps)(_Students);
