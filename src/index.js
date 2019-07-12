import React from 'react';
import ReactDOM from 'react-dom';
import { Link, HashRouter, Route } from 'react-router-dom'
import axios from 'axios'

// const { Link, HashRouter, Route } = ReactRouterDOM;

class Nav extends React.Component {
  constructor () {
    super();
    this.state = {
      students: [],
      schools: []
    }
  }
  async componentDidMount (){
    const response = await axios.get('/api/students');
    const students = response.data;
    const _response = await axios.get('/api/schools');
    const schools = _response.data;
    this.setState({students, schools})
  }

  render() {
    const { students, schools } = this.state;
    return (
      <div>
        <h1>Acme Schools</h1>
        <Link to='/'>Home</Link>
        <Link to='/schools'>Schools ({ schools.length })</Link>
        <Link to='/students'>Students ({ students.length })</Link>
      </div>
    )
  }
}

class App extends React.Component {
  render(){
    return (
      <HashRouter>
        <Route path='/' component={ Nav } />
      </HashRouter>
    )
  }
}

const root = document.querySelector('#root');
ReactDOM.render(<App />, root);
