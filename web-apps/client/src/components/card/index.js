import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import ImageSection from './image-section';
import ContentSection from './content-section';
import useStyle from './style';

const Card = ({ title, image, area, date, price, hits, interests }) => {
  const classes = useStyle({});
  return (
    <>
      <Grid container spacing={1} className={classes.root}>
        <ImageSection src={image} alt={title} />
        <ContentSection
          title={title}
          area={area}
          date={date}
          price={price}
          hits={hits}
          interests={interests}
        />
      </Grid>
    </>
  );
};

Card.propTypes = {
  ...(ContentSection.propTypes),
  image: PropTypes.string.isRequired,
};

export default Card;
