import { Route, Routes } from 'react-router-dom';

import './App.css';
import { Grid } from '@mui/material';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import LoginForget from './components/LoginForget';
import LoginReset from './components/LoginReset';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Grid container>
      <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
        <Navbar />
      </Grid>
      <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
        <Routes>
          <Route path="/" Component={Dashboard} />
          <Route path="/login" Component={Login} />
          <Route path="/login" Component={LoginForget} />
          <Route path="/login" Component={LoginReset} />
          <Route path="/register" Component={Register} />
        </Routes>
      </Grid>
    </Grid>
  );
}

export default App;
