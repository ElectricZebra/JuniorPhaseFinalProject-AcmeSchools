import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import  CreateStudent  from './CreateStudent';

const _Nav = ({ students, schools }) => {
  return (
    <div>
      <h1>Acme Schools</h1>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ({schools.length})</Link>
      <Link to='/students'>Students ({students.length})</Link>
      <Link to='/most-popular'>Most Popular School</Link>
      <Link to='/highest-gpa'>School with Highest GPA</Link>
      <CreateStudent />
    </div>
  )
}

const mapStateToProps = ({ students, schools }) => {
  // const tally = async ()=> {
  //   const acc = {}
  //   for (let i=0; i < students.length; i++) {
  //   const sId = students[i].schoolId;
  //   if (!sId){
  //   }
  //   else if (!acc[sId]) {
  //     acc[sId] = 1;
  //   }
  //   else {
  //     acc[sId] = acc[sId] + 1;
  //   }};
  //   return acc
  // }
  // console.log(tally)
  // // const mostPopId = '';
  // // if (Object.keys(acc)){
  // //   console.log('no acc')
  // // }

  // Object.keys(acc).reduce((a, val)=> acc[a] > acc[val] ? a : val)

  // console.log('mostPopId', mostPopId);
  // console.log('acc', acc)
  return {
    students,
    schools
  }
}

export default connect(mapStateToProps)(_Nav);
