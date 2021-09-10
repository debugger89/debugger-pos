import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import icon from '../assets/icon.svg';
import './App.global.css';

import AdminLayout from './layouts/Admin.js';
import Sales from './views/Sales';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Redirect from="/" to="/admin/sales" />
      </Switch>
    </Router>
  );
}
