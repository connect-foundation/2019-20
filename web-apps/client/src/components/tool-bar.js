import React from 'react';
import PropTypes from 'prop-types';

import Actionbar from './action-bar';
import GoBackButton from './goBackButton';

const ActivityLayorToolbar = ({title, buttons = []}) => {
  return (
    <Actionbar leftArea={<GoBackButton />} title={title} buttons={buttons} />
  );
};

ActivityLayorToolbar.propTypes = {
  title: PropTypes.node.isRequired,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.node,
      onClick: PropTypes.func,
    }),
  ),
};

ActivityLayorToolbar.defaultProps = {
  buttons: [],
};

export default ActivityLayorToolbar;
