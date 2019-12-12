import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import useStyle from './style';

const ImageSection = ({ src, alt }) => {
  const classes = useStyle({});
  return (
    <Grid item xs={4} className={classes.imageSection}>
      <img src={src} alt={alt} />
    </Grid>
  )
};

ImageSection.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default ImageSection;
