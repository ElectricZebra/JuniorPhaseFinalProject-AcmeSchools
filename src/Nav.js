import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import  CreateStudent  from './CreateStudent';

const _Nav = ({ students, schools, popName, popVal, popId }) => {
  console.log("popId", popId)
  return (
    <div>
      <h1>Acme Schools</h1>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ({schools.length})</Link>
      <Link to='/students'>Students ({students.length})</Link>
      <Link to={`/schools/${popId}`}>Most Popular { popName } ({ popVal })</Link>
      <Link to='/highest-gpa'>School with Highest GPA</Link>
      <CreateStudent />
    </div>
  )
}

const mapStateToProps = ({ students, schools }) => {
  const tally = ()=> {
    const acc = {}
    for (let i=0; i < students.length; i++) {
    const sId = students[i].schoolId;
    if (!sId){
    }
    else if (!acc[sId]) {
      acc[sId] = 1;
    }
    else {
      acc[sId] = acc[sId] + 1;
    }};
    return acc
  }

  let popName;
  let popVal;
  let popId = '';

  if (Object.keys(tally()).length) {
    const tallyObj = tally();
    const id = Object.keys(tallyObj).reduce((a, val)=> tallyObj[a] > tallyObj[val] ? a : val)
    popId = id;
    popVal = tallyObj[id];
    schools.map(school => {
      for (let key in school) {
        if (school.id === id) {
          popName = school.name;
        }
      }
    })
  }

console.log( popId)
  return {
    popName,
    popVal,
    popId,
    students,
    schools
  }
}

export default connect(mapStateToProps)(_Nav);
