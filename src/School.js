import { connect } from 'react-redux';
import React from 'react';
import Student from './Student';

const _School = ({school, schoolStudents }) => {
  if (!school) {
    return null
  }
  return (
    <div>
      <h2>{ school.name } (students enrolled { schoolStudents.length })</h2>
        <ul>
          { schoolStudents.map(student => {
            return <li key={student.id}>
              <Student student={ student } />
            </li>
          }) }
        </ul>
    </div>
  )
}

const mapStateToProps = ({ schools, students }, { match }) => {
  const school = schools.find(school => school.id === match.params.id)
  const schoolStudents = students.filter(student => student.schoolId === match.params.id);
  return {
    school,
    schoolStudents
  }
}

export default connect(mapStateToProps)(_School);
