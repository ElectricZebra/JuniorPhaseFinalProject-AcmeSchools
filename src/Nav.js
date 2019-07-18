import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import React from 'react';
import  CreateStudent  from './CreateStudent';

const _Nav = ({ students, schools, popName, popVal, popId, topId, topGPA, topName }) => {
  return (
    <div>
      <h1>Acme Schools</h1>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ({schools.length})</Link>
      <Link to='/students'>Students ({students.length})</Link>
      <Link to={`/schools/${popId}`}>Most Popular { popName } ({ popVal })</Link>
      <Link to={`/schools/${topId}`}>Top School { topName } ({ topGPA })</Link>
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
        acc[sId] = {
          count: 1,
          av: students[i].gpa
        };
      }
      else {
        acc[sId] = {
          av: (acc[sId].av + students[i].gpa) / (acc[sId].count + 1),
          count: acc[sId].count +1
        };
      }
    };
    return acc
  }
console.log(tally())
  let popName;
  let popVal;
  let popId = '';
  let topId = '';
  let topGPA;
  let topName;

  //following statement sets popName/Val/Id and topName/Val/Id
  if (Object.keys(tally()).length) {
    const tallyObj = tally();
    const _popId = Object.keys(tallyObj).reduce((a, val)=> tallyObj[a].count > tallyObj[val].count ? a : val);
    const _topId = Object.keys(tallyObj).reduce((a, val)=> tallyObj[a].av > tallyObj[val].av ? a : val);
    topId = _topId
    topGPA = tallyObj[_topId].av;
    popId = _popId;
    popVal = tallyObj[_popId].count;
    schools.map(school => {
      for (let key in school) {
        if (school.id === _popId) {
          popName = school.name;
        } else if (school.id === _topId) {
          topName = school.name;
        }
      }
    })
  }

  return {
    popName,
    popVal,
    popId,
    topId,
    topGPA,
    topName,
    students,
    schools
  }
}

export default connect(mapStateToProps)(_Nav);
