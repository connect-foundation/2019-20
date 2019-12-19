import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import HitIcon from '@material-ui/icons/Visibility';
import InterestIcon from '@material-ui/icons/FavoriteBorder';

import {
  calculateHourMinuteAndSeconds,
  takeDigitFromNumber,
} from '../utils/time';

const useStyles = makeStyles({
  root: {
    height: '9rem',
    padding: '1rem',
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
  titleSection: {
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    display: '-webkit-box',
  },
  subDescriptionSection: {
    color: '#a1a2a6',
    fontSize: '0.9rem',
  },
  chatHitsSection: {
    color: '#a1a2a6',
    fontSize: '0.9rem',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

const ProductListItem = ({ title, image, area, date, price, hits, interests }) => {
  const classes = useStyles({});
  const minutesAgoString = calculateHourMinuteAndSeconds(date, Date.now());
  const moneyWithDigitString = takeDigitFromNumber(price);
  return (
    <Card raised>
      <Grid container className={classes.root}>
        <Grid item xs={4} className={classes.imageSection}>
          <img src={image} alt={title} />
        </Grid>
        <Grid item xs={8}>
          <Grid container className={classes.contentSection}>
            <Grid container direction='column'>
              <Grid item className={classes.titleSection}>{title}</Grid>
              <Grid item className={classes.subDescriptionSection}>
                {area} · {minutesAgoString}
              </Grid>
              <Grid item>
                <strong>{moneyWithDigitString}원</strong>
              </Grid>
            </Grid>
            <Grid container className={classes.chatHitsSection}>
              <HitIcon />{hits} &nbsp;
              <InterestIcon />{interests}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

ProductListItem.propTypes = {
  title: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  hits: PropTypes.number.isRequired,
  interests: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
};

export default ProductListItem;
