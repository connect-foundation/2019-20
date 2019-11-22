import React from 'react';
import {func} from 'prop-types';

const SyncProps = ({children, ...props}) => <>{children({...props})}</>;

export default SyncProps;

SyncProps.propTypes = {
  children: func.isRequired,
};
