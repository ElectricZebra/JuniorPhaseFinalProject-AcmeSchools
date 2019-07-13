import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk'



//action type
const SET_DATA = 'SET_DATA';

//action creator
const setData = () => {}

const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_DATA:
      return action.data;
  default:
    return state;
  }
};



const store = createStore(reducer);

const start = async () => {
  const students = await axios.get('/api/students');
  const schools = await axios.get('api/schools');
  const dataObj = {students: students.data, schools: schools.data};
  console.log('dataObj', dataObj);
  await store.dispatch({ type: SET_DATA, data: dataObj });
  console.log('store', store.getState())
};

start();

export default store;
