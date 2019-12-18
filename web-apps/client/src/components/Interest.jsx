import React, {useState, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
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

const Interest = ({addInterest, minusInterest}) => {
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);
  const [heart, setHeart] = useState(null);
  const onInterest = () => {
    setClicked(!clicked);
    if (clicked) {
      minusInterest();
    } else {
      addInterest();
    }
  };

  useEffect(() => {
    if (clicked) {
      setHeart(<FavoriteIcon fontSize='large' className={classes.like} />);
    } else {
      setHeart(
        <FavoriteBorderIcon fontSize='large' className={classes.unlike} />,
      );
    }
  }, [clicked]);
  return (
    <div className={classes.interestWrapper}>
      <div className={classes.interest} onClick={onInterest}>
        {heart}
      </div>
    </div>
  );
};

export default Interest;
