import { InputBase } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const inputStyles = {
  root: {
    borderRadius: '0.5rem',
    border: '1px solid black',
  },
  input: {
    padding: '0.5rem',
  }
};

export default withStyles(inputStyles)(InputBase);
