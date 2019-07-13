import React from 'react';
import ReactDOM from 'react-dom';
import { Link, HashRouter, Route } from 'react-router-dom';
import { Provider, connect } from "react-redux";
import store, { setStudents, setSchools } from './store';
// const { setStudents, setSchools } = store;

const _Nav = () => {
  return (
    <div>
      <h1>Acme Schools</h1>
      <Link to='/'>Home</Link>
      <Link to='/schools'>Schools ()</Link>
      <Link to='/students'>Students ()</Link>
      <Link to='/most-popular'>Most Popular School</Link>
      <Link to='/highest-gpa'>School with Highest GPA</Link>
    </div>
  )
}

const Nav = connect((state) => {
  return {
    data: state
  };
})(_Nav);

class _App extends React.Component {

  componentDidMount(){
    this.props.loadData();
  }

  render(){
    return (
        <HashRouter>
          <Route path='/' component={ Nav } />
        </HashRouter>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: ()=> {
      dispatch(setStudents);
      dispatch(setSchools);
    }
  };
};

const App = connect(null, mapDispatchToProps)(_App);

const root = document.querySelector('#root');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
root);
