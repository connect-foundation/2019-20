import React from 'react';
import {bool, string} from 'prop-types';

// material ui
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import {makeStyles} from '@material-ui/core/styles';

// utils
import {getKoKRFormatDayOfWeek, getISOCurrentDate} from '../utils';

// material ui style
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflow: 'hidden',
    padding: theme.spacing(0, 3),
  },
  paper: {
    maxWidth: 400,
    margin: `${theme.spacing(1)}px`,
    padding: theme.spacing(1),
    fontWeight: 'bold',
  },
  colorPaper: {
    backgroundColor: 'grey',
    color: 'white',
  },
}));

// component
const MessageItem = ({content, isMyChat, timestamp}) => {
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
        {!isMyChat && (
          <Grid item>
            <Avatar>상대방</Avatar>
          </Grid>
        )}
        <Grid item>
          <Grid
            container
            direction={!isMyChat ? 'row' : 'row-reverse'}
            alignItems='flex-end'
          >
            <Grid item>
              <Paper
                className={`${classes.paper} ${!isMyChat &&
                  classes.colorPaper}`}
              >
                <Typography>{content}</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Typography variant='caption'>
                {getKoKRFormatDayOfWeek(timestamp)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

MessageItem.propTypes = {
  content: string,
  isMyChat: bool,
  timestamp: string,
};

MessageItem.defaultProps = {
  content: '',
  isMyChat: false,
  timestamp: getISOCurrentDate(),
};

export default MessageItem;
