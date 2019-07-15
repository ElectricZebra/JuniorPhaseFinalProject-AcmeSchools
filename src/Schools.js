import React from 'react';
import { connect } from 'react-redux';

const _Schools = ({ schools, students }) => {
  return (
    <ul>
      { schools.map( school => {
        const schoolStudents = students.filter(student => student.schoolId === school.id);
        return <li key={ school.id }>
          {school.name} ({schoolStudents.length})
      </li>})
      }
    </ul>
  )
}

const mapStateToProps = ({ schools, students }) => {
  return {
    schools,
    students
  }
}

export default connect(mapStateToProps)(_Schools);
