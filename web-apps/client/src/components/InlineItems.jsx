import React from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';

const InlineItems = ({ items }) => {
  const { length } = items;
  const list = items.map((contents) => (
    <Grid item>
      <Grid container justify='center' direction='column'>
        {contents}
      </Grid>
    </Grid>
  ));

  return (
    <Grid container cols={length} justify='space-around'>
      {list}
    </Grid>
  )
};

InlineItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.node).isRequired,
}

export default InlineItems;