import React from 'react';
import { connect } from 'react-redux';

const _Schools = ({ schools }) => {
  return (
    <ul>
      { schools.map(school => <li key={ school.id }>{school.name}</li>)}
    </ul>
  )
}

const mapStateToProps = ({ schools }) => {
  return {
    schools
  }
}

export default connect(mapStateToProps)(_Schools);
