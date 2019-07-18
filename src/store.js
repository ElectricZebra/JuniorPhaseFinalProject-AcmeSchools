import { createStore, applyMiddleware, combineReducers } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import loggerMiddleware from 'redux-logger';

//action type
const SET_STUDENTS = 'SET_STUDENTS';
const SET_SCHOOLS = 'SET_SCHOOLS';
const CREATE_STUDENT = 'CREATE_STUDENT';
const DESTROY = 'DESTROY';
const CHANGE_SCHOOL = 'CHANGE_SCHOOL'

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
      return [...state, action.student];
    case DESTROY:
      return state.filter(student => student.id !== action.id);
    case CHANGE_SCHOOL:
      return state.map(student => {
        if (student.id !== action.student.id) {
          return student
        } else {
          return action.student
        }
      })
  }
  return state;
}

const reducer = combineReducers({
  students: studentsReducer,
  schools: schoolsReducer
});

const _destroy = (id) => ({
  type: DESTROY,
  id
})

const _changeSchool = (student) => ({
  type: CHANGE_SCHOOL,
  student
})

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
    const response = await axios.post('api/students', student);
    return dispatch(_createStudent(response.data));
  }
}

const destroy = (id) => {
  return async (dispatch) => {
    await axios.delete(`api/students/${id}`)
    return dispatch(_destroy(id))
  }
}

const changeSchool = (schoolId, studentId) => {
  return async (dispatch) => {
    const response = await axios.post(`api/students/${studentId}`, {schoolId: schoolId})
    console.log(response)
    return dispatch(_changeSchool(response.data))
  }
}

const middleWares = [thunk, loggerMiddleware];
const store = createStore(reducer, applyMiddleware(...middleWares));

export default store;

export { setStudents, setSchools, createStudent, destroy, changeSchool };
