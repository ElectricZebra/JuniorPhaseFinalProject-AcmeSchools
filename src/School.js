import { connect } from 'react-redux';
import React from 'react';

const _School = ({school, schoolStudents}) => {
  if (!school) {
    return null
  }
  return (
    <div>
      <h2>{ school.name } ({ schoolStudents.length })</h2>
        <ul>
          { schoolStudents.map(student => {
            return <li key={student.id}>
              <h4>{ student.firstName } { student.lastName }</h4>
              <p>Email: { student.email }</p>
              <p>GPA: { student.gpa }</p>
              <button>Delete</button>
            </li>
          }) }
        </ul>
    </div>
  )
}

const mapStateToProps = ({ schools, students }, { match }) => {
  const school = schools.find(school => school.id === match.params.id)
  const schoolStudents = students.filter(student => student.schoolId === match.params.id);
  console.log(schoolStudents);
  return {
    school,
    schoolStudents
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_School);
