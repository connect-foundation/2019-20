import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(() => ({
  interestWrapper: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  interest: {
    borderRight: '1px solid #aaa',
    height: '70%',
    width: '70%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  like: {
    color: '#ff4d4d',
  },
  unlike: {
    color: '#555',
  },
}));

const Interest = ({ active, clickHeart }) => {
  const classes = useStyles();
  const [heart, setHeart] = useState(active);

  useEffect(() => {
    setHeart(active);
  }, [active]);

  const clickEvent = (event) => {
    setHeart(!heart);
    clickHeart(event, !heart);
  }

  let favorteIcon;
  if (heart) {
    favorteIcon = <FavoriteIcon fontSize='large' className={classes.like} />;
  }
  if (!heart) {
    favorteIcon = <FavoriteBorderIcon fontSize='large' className={classes.unlike} />;
  }
  return (
    <div className={classes.interestWrapper}>
      <div className={classes.interest} onClick={clickEvent}>
        {favorteIcon}
      </div>
    </div>
  );
};

export default Interest;
