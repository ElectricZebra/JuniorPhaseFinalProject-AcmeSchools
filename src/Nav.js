import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import  CreateStudent  from './CreateStudent';

const _Nav = ({ students, schools, popName, popVal }) => {
  return (
    <div>
      <h1>Acme Schools</h1>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ({schools.length})</Link>
      <Link to='/students'>Students ({students.length})</Link>
      <Link to='/most-popular'>Most Popular { popName } ({ popVal })</Link>
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

  let popName = '';
  let popVal = 0;

  if (Object.keys(tally()).length) {
    const tallyObj = tally();
    const popId = Object.keys(tallyObj).reduce((a, val)=> tallyObj[a] > tallyObj[val] ? a : val)
    popVal = tallyObj[popId];
    schools.map(school => {
      for (let key in school) {
        if (school.id === popId) {
          popName = school.name;
        }
      }
    })
  }


  return {
    popName,
    popVal,
    students,
    schools
  }
}

export default connect(mapStateToProps)(_Nav);
