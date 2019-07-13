import { createStore, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk'



//action type
const SET_DATA = 'SET_DATA';

//action creator


const reducer = (state = {}, action) => {
  switch (action.type) {
    case SET_DATA:
      state = action.data;
      break;
  default:
    return state;
  }
};



const store = createStore(reducer);

const start = async () => {
  const students = await axios.get('/api/students')
  const schools = await axios.get('api/schools')
  const dataObj = {students: students.data, schools: schools.data}
  console.log('dataObj', dataObj)
  store.dispatch({ type: SET_DATA, data: dataObj })
};

start();

console.log(store.getState())

export default store;
