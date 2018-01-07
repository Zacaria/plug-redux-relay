import React from 'react';
import PropTypes from 'prop-types';
import FontAwesome from 'react-fontawesome';
import { Button as SButton } from 'semantic-ui-react';

const Button = ({ icon, children, ...props }) => (
  <SButton {...props}>
    {icon && <FontAwesome name={icon} />}
    {children}
  </SButton>
);

Button.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.node,
};

export default Button;
