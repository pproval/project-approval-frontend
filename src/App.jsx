import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile';
import Team from './components/Team/Team'
import Project from './components/Project/Project'
import NewProject from './components/NewProject/NewProject';
import AuthProvider from './context/AuthProvider';
import './styles/App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" privateComponent={Dashboard} />
          <PrivateRoute exact path="/profile" privateComponent={Profile} />
          <PrivateRoute exact path="/team" privateComponent={Team} />
          <PrivateRoute exact path="/project" privateComponent={Project} />
          <PrivateRoute exact path="/project/new" privateComponent={NewProject} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App;
