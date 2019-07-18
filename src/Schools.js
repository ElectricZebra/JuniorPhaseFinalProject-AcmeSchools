import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

const _Schools = ({ schools, students }) => {
  return (
    <ul>
      { schools.map( school => {
        const schoolStudents = students.filter(student => student.schoolId === school.id);
        return <li key={ school.id }>
          <Link to={`/schools/${school.id}`}>
          {school.name} ({schoolStudents.length})
          </Link>
          <img src={school.imageURL} />
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
