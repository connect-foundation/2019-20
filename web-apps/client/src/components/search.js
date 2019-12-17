import React, { useRef, forwardRef, useImperativeHandle } from 'react';
import PropTypes from 'prop-types';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import ClearIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'rgb(244,244,244)',
    padding: '0.2rem',
    borderRadius: '0.5rem',
  },
  input: {
    backgroundColor: 'rgb(244,244,244)',
    border: 0,
    flex: 1,
    padding: 0,
    height: '1.5rem',
  },
  icon: {
    color: '#bebebe'
  }
});

const Search = ({ onChange, onKeyDown }, ref) => {
  const inputRef = useRef(null);
  const classes = useStyles({});

  useImperativeHandle(ref, () => ({
    set: (input) => {
      inputRef.current.value = input;
    },
    get: () => {
      return inputRef.current.value;
    },
  }));

  const onClearInput = () => {
    inputRef.current.value = '';
  };

  return (
    <Grid
      container
      justify='space-around'
      alignItems='center'
      className={classes.root}
    >
      <input
        ref={inputRef}
        placeholder='검색어를 입력하세요.'
        className={classes.input}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <ClearIcon onClick={onClearInput} className={classes.icon} />
    </Grid>
  );
};

Search.propTypes = {
  onChange: PropTypes.func,
  onKeyDown: PropTypes.func,
};

Search.defaultProps = {
  onChange: () => { },
  onKeyDown: () => { },
}

export default forwardRef(Search);