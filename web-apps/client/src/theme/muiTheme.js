import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0091ea',
    },
    secondary: {
      main: '#78909c',
    },
  },
  overrides: {
    MuiInput: {
      root: {
        fontSize: '1rem',
        fontWeight: 'bold',
        padding: '0.5rem 0',
      },
    },
  },
});

export default theme;
