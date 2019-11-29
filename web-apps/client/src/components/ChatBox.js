import React from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import {makeStyles} from '@material-ui/core/styles';

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

export default function ChatBox({message, isMyChat, timestamp}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container alignItems='center'>
        {!isMyChat && (
          <Grid item>
            <Avatar>W</Avatar>
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
                <Typography>{message}</Typography>
              </Paper>
            </Grid>
            <Grid item>
              <Typography variant='caption'>
                {new Date(timestamp).toLocaleDateString('ko-KR', {
                  weekday: 'long'
                })}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
