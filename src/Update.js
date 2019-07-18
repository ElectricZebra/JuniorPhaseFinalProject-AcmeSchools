import React from 'react';
import { connect } from 'react-redux';

const _Update = (props, { students }) => {
  console.log('props.name', props.name)
  console.log('students', students)
  return <p>{props.name.firstName}</p>
}

const mapStateToProps = (props, { students }) => {
  return {
    students,
    props
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleClick: (ev) => {

    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_Update);
