import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  bigAvatar: {
    width: 60,
    height: 60,
  },
}));

const ProductImage = ({uri, name}) => {
  const classes = useStyles();
  return (
    <div>
      <Avatar alt='Remy Sharp' src={uri} className={classes.bigAvatar} />
    </div>
  );
};

export default ProductImage;
