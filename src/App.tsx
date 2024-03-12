import { Route, Routes } from 'react-router-dom';

import './App.css';
import { Grid } from '@mui/material';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import LoginForget from './components/LoginForget';
import LoginReset from './components/LoginReset';
import Dashboard from './components/Dashboard';
import EventList from './components/Events/EventList';
import { Toaster } from 'react-hot-toast';
import EmailConfirmation from './components/Register/EmailConfirmation';
import { UserDetail } from './utils/common.type';
import { useEffect, useState } from 'react';
import UserContext from './context/UserContext';
import { useQuery } from '@tanstack/react-query';
import userService from './services/userService';
import MyEvents from './components/Events/MyEvents';

function App() {
  const [currentUser, setCurrentUser] = useState<null | UserDetail>(null);

  const { data } = useQuery({
    queryKey: ['me'],
    queryFn: userService.me,
  });

  useEffect(() => {
    if (data) setCurrentUser(data!);
  }, [data]);

  // const protectedRoutes = [''];

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Grid container>
        <Toaster position="top-right" reverseOrder={false} />
        <Grid item xs={12} display="flex">
          <Navbar />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid
          item
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Routes>
            <Route path="/" Component={Dashboard} />
            <Route path="/events" Component={EventList} />
            <Route path="/login" Component={Login} />
            <Route path="/forgot-password" Component={LoginForget} />
            <Route path="/reset-password" Component={LoginReset} />
            <Route path="/my-events" Component={MyEvents} />
            <Route
              path="/register/email-confirmation"
              Component={EmailConfirmation}
            />
            <Route path="/register" Component={Register} />
          </Routes>
        </Grid>
      </Grid>
    </UserContext.Provider>
  );
}

export default App;
