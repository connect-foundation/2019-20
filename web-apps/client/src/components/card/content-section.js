import React from 'react';
import PropTypes from 'prop-types';
import ChatIcon from '@material-ui/icons/QuestionAnswerOutlined';
import InterestIcon from '@material-ui/icons/FavoriteBorder';
import { Grid } from '@material-ui/core';
import {
  calculateHourMinuteAndSeconds,
  takeDigitFromNumber,
} from '../../utils/time';
import useStyle from './style';

const ContentSection = ({ title, area, date, price, chat, interests }) => {
  const classes = useStyle({});
  const minutesAgoString = calculateHourMinuteAndSeconds(date, Date.now());
  const moneyWithDigitString = takeDigitFromNumber(price);
  return (
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
          <ChatIcon />{chat} &nbsp;
          <InterestIcon />{interests}
        </Grid>
      </Grid>
    </Grid>
  )
};

ContentSection.propTypes = {
  title: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  chat: PropTypes.number.isRequired,
  interests: PropTypes.number.isRequired,
};

export default ContentSection;
