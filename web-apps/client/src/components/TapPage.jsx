import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Tabs, Tab, Typography, AppBar } from '@material-ui/core';

const TabHeader = ({ items }) => {
  const [page, setPage] = useState(0);

  const changePage = (event, value) => {
    setPage(value);
  };

  const tapMenu = items.map(({ label }, idx) => <Tab label={label} id={idx} key={label} />);

  const contents = (
    <Typography component="div" style={({ width: '100%' })}>
      {items[page].contents}
    </Typography>
  );

  return (
    <>
      <AppBar position="static" color='inherit'>
        <Tabs value={page} onChange={changePage} variant="fullWidth">
          {tapMenu}
        </Tabs>
      </AppBar>
      {contents}
    </>
  );
};

TabHeader.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string,
    contents: PropTypes.node,
  })).isRequired,
}

export default TabHeader;