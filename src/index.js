import React from 'react';
import ReactDOM from 'react-dom';
import { Link, HashRouter, Route } from 'react-router-dom';
import { Provider, connect } from "react-redux";
import store, { setStudents, setSchools } from './store';
import Nav from './Nav'

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
  };
};

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
