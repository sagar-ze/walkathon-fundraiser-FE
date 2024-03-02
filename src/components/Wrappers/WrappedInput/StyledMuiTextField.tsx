import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

export const blackCoral = '#5E5873';

const StyledMuiTextField = styled(TextField)({
  width: '100%',
  '& .MuiInputBase-root.Mui-disabled': {
    backgroundColor: '#f0f0f0',
  },
  '& .MuiOutlinedInput-input': {
    fontSize: '1rem',
    padding: '0.8rem',
    color: blackCoral,
    '&[type=number]': {
      '-moz-appearance': 'textfield',
    },
    '&::-webkit-outer-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
    '&::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin: 0,
    },
  },
  '& .MuiInputBase-input.Mui-disabled': {
    WebkitTextFillColor: blackCoral,
  },
  '& .MuiFormHelperText-root': {
    fontSize: '0.7rem',
    color: 'red',
    m: 0,
  },
});

export default StyledMuiTextField;
