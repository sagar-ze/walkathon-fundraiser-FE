import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { Logo } from '../../assets';
import { NavLink } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';

const Navbar = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ background: '#fff' }} variant="outlined">
        <Toolbar variant="regular">
          <NavLink to="/">
            <img src={Logo} alt="logo" height={50} />
          </NavLink>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          <Stack direction="row" spacing={2}>
            {currentUser && <NavLink to="/my-events">My Events</NavLink>}
            {!currentUser && <NavLink to="/login">Login</NavLink>}
            {!currentUser && <NavLink to="/register">Register</NavLink>}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
