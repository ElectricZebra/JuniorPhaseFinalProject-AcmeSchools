import React from 'react';
import { connect } from 'react-redux';

const _Students = ({ students }) => {
  return (
    <ul>
      {students.map(student => <li key={student.id}>{student.firstName} {student.lastName}</li>
      )}
    </ul>
  )
}

const mapStateToProps = ({ students }) => {
  return {
    students
  }
}

export default connect (mapStateToProps)(_Students);
