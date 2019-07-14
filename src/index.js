import React from 'react';
import ReactDOM from 'react-dom';
import { Link, HashRouter, Route } from 'react-router-dom';
import { Provider, connect } from "react-redux";
import store, { setStudents, setSchools } from './store';
import Nav from './Nav';
import Students from './Students';
import Schools from './Schools';


class _App extends React.Component {
  componentDidMount(){
    this.props.loadData();
  }

  render(){
    return (
        <HashRouter>
          <Route path='/' component={ Nav } />
          <Route path='/students' component={ Students } />
          <Route path='/schools' component={ Schools } />
        </HashRouter>
    )
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadData: ()=> {
      dispatch(setStudents());
      dispatch(setSchools());
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
