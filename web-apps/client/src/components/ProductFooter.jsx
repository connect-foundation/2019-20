import React from 'react';
import Grid from '@material-ui/core/Grid';
import {makeStyles} from '@material-ui/core/styles';
import Interest from './interest';
import PriceInformation from './priceInformation';
import ChatLink from './chatLink';

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.text.primary,
    position: 'relative',
    height: '100%',
  },
  footerWrapper: {
    position: 'fixed',
    height: '4rem',
    width: '100%',
    borderTop: '1px solid #aaa',
    left: '0',
    bottom: '0',
  },
}));

const ProductFooter = ({data, addInterest, minusInterest}) => {
  const classes = useStyles();
  return (
    <div className={classes.footerWrapper}>
      <Grid container className={classes.root}>
        <Grid item xs={3}>
          <Interest addInterest={addInterest} minusInterest={minusInterest} />
        </Grid>
        <Grid item xs={4}>
          <PriceInformation data={data} />
        </Grid>
        <Grid item xs={5}>
          <ChatLink />
        </Grid>
      </Grid>
    </div>
  );
};

export default ProductFooter;
