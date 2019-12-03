import { makeStyles } from '@material-ui/core/styles';

const color = {
  subDescription: '#a1a2a6',
};

export default makeStyles({
  root: {
    height: '9rem',
    padding: '1rem',
    backgroundColor: 'white',
  },
  imageSection: {
    overflow: 'hidden',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    '& img': {
      width: '100%',
      height: '100%',
      borderRadius: '0.5rem',
    }
  },
  contentSection: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '0 0 0 1rem',
  },
  subDescriptionSection: {
    color: color.subDescription,
    fontSize: '0.9rem',
  },
  chatHitsSection: {
    color: color.subDescription,
    fontSize: '0.9rem',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
