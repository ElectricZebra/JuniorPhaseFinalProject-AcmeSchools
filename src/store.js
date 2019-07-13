import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunkMiddleware from 'redux-thunk'



//action type
const SET_STUDENTS = 'SET_STUDENTS';
const SET_SCHOOLS = 'SET_SCHOOLS';

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_STUDENTS:
      return action.students;
    case SET_SCHOOLS:
      return action.schools;
  default:
    return state;
  }
};

const _setStudents = (students) => ({
  type: SET_STUDENTS,
  students
});

const _setSchools = (schools) => ({
  type: SET_SCHOOLS,
  schools
});

const setStudents = () => {
  return async(dispatch) => {
    const response = await axios.get('api/students');
    return dispatch(_setStudents(response.data));
  };
};

const setSchools = () => {
  return async (dispatch)=> {
    const response = await axios.get('api/schools');
    return dispatch(_setSchools(response.data));
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

export default store;

export { setStudents, setSchools };
