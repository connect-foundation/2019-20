/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import { List, ListItem } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  container: {
    position: 'absolute',
    top: 0,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    width: '100%',
    height: '100%',
  },
})

const AddressList = ({ list, onClick }) => {
  const classes = useStyles({});
  if (!list.length) {
    return null;
  }

  return (
    <List className={classes.container}>
      {
        list.map(({ address_name, x, y }) => (
          <ListItem
            divider
            key={address_name}
            data-x={x}
            data-y={y}
            onClick={onClick}
          >
            {address_name}
          </ListItem>
        ))
      }
    </List>
  );
};

AddressList.propTypes = {
  onClick: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.shape({
    address_name: PropTypes.string,
    x: PropTypes.string,
    y: PropTypes.string,
  })).isRequired,
};

AddressList.defaultProps = {
  onClick: () => { },
};

export default AddressList;
