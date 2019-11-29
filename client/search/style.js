import { makeStyles } from '@material-ui/core/styles';

const useContainerStyle = makeStyles({
  search: props => ({
    backgroundColor: props.bgColor,
    padding: '1rem',
    height: '3rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  contents: {
    padding: '0 1rem',
  }
});

export default useContainerStyle;
