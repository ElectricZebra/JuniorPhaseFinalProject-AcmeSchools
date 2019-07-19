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
      <Link to={`/schools/${popId}`}>Most Popular: {popName} ({popVal})</Link>
      <Link to={`/schools/${topId}`}>Top School: {topName} (Average GPA: {topGPA})</Link>
      <CreateStudent />
    </div>
  )
}

//TODO fix top school on update
const mapStateToProps = ({ students, schools }) => {
  let popName;
  let popVal;
  let popId = '';
  let topId = '';
  let topGPA;
  let topName;

  if (Object.keys(students).length) {
    const tally = ()=> {
      const acc = {};
      for (let i=0; i < students.length; i++) {
        const sId = students[i].schoolId;
        if (!acc[sId]) {
          acc[sId] = {
            count: 1, sum: students[i].gpa };
        }
        else {
          acc[sId] = {
            count: acc[sId].count +1,
            sum: acc[sId].sum + students[i].gpa };
        }
      };
      return acc
    }
    const tallyObj = tally();

    const _topId = () =>
      Object.keys(tallyObj).reduce((a, val) =>
      tallyObj[a].sum/tallyObj[a].count >
      tallyObj[val].count/tallyObj[val].count ?
      a : val);

    const _popId = ()=>
      Object.keys(tallyObj).reduce((a, val)=>
      tallyObj[a].count >
      tallyObj[val].count ? a : val);

    popId = _popId();
    topId = _topId();
    popVal = tallyObj[popId].count;
    topGPA = tallyObj[topId].sum/tallyObj[topId].count;

    schools.map(school => {
      for (let key in school) {
        if (school.id === popId) {
          popName = school.name;
        } else if (school.id === topId) {
          topName = school.name;
        }
      }
    });
  }

  return {
    popName, popId, popVal,
    topName, topId, topGPA,
    students,
    schools
  };
};

export default connect(mapStateToProps)(_Nav);
