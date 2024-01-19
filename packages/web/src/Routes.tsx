import React from 'react';

import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from 'react-router-dom';

import { Environment } from '@csnvt/environment';

import Home from './pages/Home';
import Login from './pages/Login';
import Contact from './pages/Contact';
import Locations from './pages/Locations';

import Dashboard from './pages/adm/Dashboard';

import Users from './pages/adm/Users/Users';
import UsersEdit from './pages/adm/Users/UsersEdit';
import UsersCreate from './pages/adm/Users/UsersCreate';

import Ships from './pages/adm/Ships/Ships';
import ShipsView from './pages/adm/Ships/ShipsView';
import ShipsEdit from './pages/adm/Ships/ShipsEdit';
import ShipsCreate from './pages/adm/Ships/ShipsCreate';

const AppRoutes: React.FC = () => {
  const token = localStorage.getItem(
    Environment.LOCAL_STORAGE_KEY__ACCESS_TOKEN,
  );

  const user = localStorage.getItem(
    Environment.LOCAL_STORAGE_USER,
  );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/locations" element={<Locations />} />

        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/Login" />} />

        {token && user && (
          <>
            <Route
              path="/adm/dashboard"
              element={<Dashboard data={user} />}
            />
            <Route
              path="/adm/users"
              element={<Users data={user} />}
            />
            <Route
              path="/adm/users/:id"
              element={<UsersEdit data={user} />}
            />
            <Route
              path="/adm/users/create"
              element={<UsersCreate data={user} />}
            />
            <Route
              path="/adm/ships"
              element={<Ships data={user} />}
            />
            <Route
              path="/adm/ships/edit/:imo"
              element={<ShipsEdit data={user} />}
            />
            <Route
              path="/adm/ships/create"
              element={<ShipsCreate data={user} />}
            />
            <Route
              path="/adm/ships/view/:imo"
              element={<ShipsView data={user} />}
            />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
