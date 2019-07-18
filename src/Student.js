import React from 'react';
import { connect } from 'react-redux';
import { destroy, changeSchool } from './store';

const _Student = ({ student, schools, deleteStudent, changeSchool })=> {
  return <div>
    <h4>{student.firstName} {student.lastName}</h4>
    <p>{ student.email }</p>
    <p>GPA: { student.gpa }</p>
    <p>School: { student.school.name }</p>
    <form>
      <label>Select School:
        <select value={student.school.name} onChange={ changeSchool }>
          {schools.map(school => (
            <option key={school.id} value={school.id}>{school.name}
            </option>
          ))}
        </select>
      </label>
    </form>
    <button className={student.id} onClick={ deleteStudent }>Delete</button>
  </div>
}

const mapStateToProps = ({ schools }) => {
  return {
    schools
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    deleteStudent: (ev) => {
      dispatch(destroy(ev.target.className))
    },
    changeSchool: (ev) => {
      console.log(ownProps.student.id)
      console.log(ev.target.value)
      dispatch(changeSchool(ev.target.value, ownProps.student.id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_Student);
