import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Lottie from 'lottie-react';

import { Logo, LogoAnimation } from '../../assets';
import { NavLink } from 'react-router-dom';
import { Stack } from '@mui/material';
import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import Login from '../Login';
import Register from '../Register';

const Navbar = () => {
  const { currentUser } = useContext(UserContext);

  return (
    <Box sx={{ flexGrow: 1, padding: '0px', position: 'sticky' }}>
      <AppBar
        position="sticky"
        sx={{ background: '#28282B', border: 'none', padding: '0px' }}
        variant="outlined"
      >
        <Toolbar variant="regular">
          <NavLink to="/">
            <img src={Logo} alt="logo" height={50} style={{ marginLeft: 10 }} />
          </NavLink>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              letterSpacing: '1.3px',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            WALKATHON
          </Typography>
          <Stack direction="row" spacing={2}>
            {currentUser && <NavLink to="/my-events">My Events</NavLink>}
            {/* {!currentUser && <NavLink to="/login">Login</NavLink>} */}
            {!currentUser && <Login />}
            {!currentUser && <Register />}
            {/* {!currentUser && <NavLink to="/register">Register</NavLink>} */}
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
