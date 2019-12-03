import { makeStyles } from '@material-ui/core/styles';

const color = {
  backgroundColor: '#f4690b',
  color: 'white',
};

export default makeStyles({
  root: {
    width: '100%',
    position: 'fixed',
    bottom: props => props.bottom,
    backgroundColor: color.backgroundColor,
    color: color.color,
    '& > div': {
      padding: '1rem',
    },
  },
});
