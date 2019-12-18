import React from 'react';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {makeStyles} from '@material-ui/core/styles';

import GoBackButton from './goBackButton';

const useStyles = makeStyles(() => ({
  header: {
    position: 'fixed',
    height: '5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: '1',
    top: '0',
    width: '95%',
    margin: '0.5rem',
  },
  back: {
    width: '2rem',
    height: '2rem',
  },
  more: {
    width: '2rem',
    height: '2rem',
  },
}));
const HeaderInProduct = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <GoBackButton className={classes.back} />
      <MoreVertIcon className={classes.more} />
    </div>
  );
};

export default HeaderInProduct;
