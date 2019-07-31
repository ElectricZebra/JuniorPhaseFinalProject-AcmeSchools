import React from 'react';
import { connect } from 'react-redux';

const _Login = () => {
  return <form action='/api/sessions' method='post'>
    <h4>Login</h4>
    <label>User Name:<input type='text' /></label>
    <label>Password:<input type='text' /></label>
    <button type='submit'>Submit</button>
  </form>
}


export default connect ()(_Login)
