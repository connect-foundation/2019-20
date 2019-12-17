import React from 'react';
import {string} from 'prop-types';

// material ui
import {makeStyles} from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';

// material ui style
const useStyles = makeStyles(() => ({
  header: {
    textAlign: 'center',
  },
}));

// component
const SectionHeader = ({content}) => {
  const classes = useStyles({});

  return <ListSubheader className={classes.header}>{content}</ListSubheader>;
};

SectionHeader.propTypes = {
  content: string,
};

SectionHeader.defaultProps = {
  content: new Date(),
};

export default SectionHeader;
