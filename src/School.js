import { connect } from 'react-redux';
import React from 'react';
import { destroy } from './store'

const _School = ({school, schoolStudents, deleteStudent }) => {
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
              <button className={student.id} onClick={deleteStudent}>Delete</button>
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (ev) => {
      console.log(ev.target.className)
      dispatch(destroy(ev.target.className))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_School);
