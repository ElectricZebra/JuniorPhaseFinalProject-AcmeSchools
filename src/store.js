import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

//action type
const SET_STUDENTS = 'SET_STUDENTS';
const SET_SCHOOLS = 'SET_SCHOOLS';
const CREATE_STUDENT = 'CREATE_STUDENT';

const schoolsReducer = (state = [], action) => {
  switch(action.type){
    case SET_SCHOOLS:
      return action.schools;
  }
  return state;
};

const studentsReducer = (state = [], action) => {
  switch(action.type){
    case SET_STUDENTS:
      return action.students;
    case CREATE_STUDENT:
      //fill in
      return state;
  }
  return state;
}

const reducer = combineReducers({
  students: studentsReducer,
  schools: schoolsReducer
});

const _setStudents = (students) => ({
  type: SET_STUDENTS,
  students
});

const _setSchools = (schools) => ({
  type: SET_SCHOOLS,
  schools
});

const _createStudent = (student) => ({
  type: CREATE_STUDENT,
  student
});

const setStudents = () => {
  return async(dispatch) => {
    const response = await axios.get('api/students');
    return dispatch(_setStudents(response.data));
  }
}

const setSchools = () => {
  return async (dispatch)=> {
    const response = await axios.get('api/schools');
    return dispatch(_setSchools(response.data));
  };
};

const createStudent = (student) => {
  return async (dispatch) => {
    await axios.post('api/students', student);
    return dispatch(_createStudent(student));
  }
}


const middleWares = [thunk, loggerMiddleware];
const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export { setStudents, setSchools, createStudent };
