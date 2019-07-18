import React from 'react';
import { connect } from 'react-redux';
import { destroy, changeSchool } from './store';

const _Student = ({ student, schools, deleteStudent, changeSchool })=> {
  return <div>
    <h4>{student.firstName} {student.lastName}</h4>
    <p>{ student.email }</p>
    <p>GPA: { student.gpa }</p>
    <p>School: { student.school.name }</p>
    <img src={student.school.imageURL} />
    <form>
      <label>Select School:
        <select onChange={ changeSchool } value={ student.school.id}>
          {schools.map(school => (
            //need to fix default value
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
      console.log('key', ev.target.key)
      dispatch(changeSchool(ev.target.value, ownProps.student.id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_Student);
