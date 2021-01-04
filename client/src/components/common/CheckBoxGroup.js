import React, {Fragment}  from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CheckBoxGroup = ({
    name,
    value, 
    error,
    info,
    onChange,
    options,
    current
}) => {

const checkboxes = options.map(option => (
    <li>
        <input type="checkbox" id={option.value} name={option.value} checked={current.includes(option.value) ? true : false}/> {"\n"}
        <label for={option.value}>{option.label}</label>{"\n"}
    </li>
));
return (

    <ul>
        {checkboxes}
    </ul>
  )
}

CheckBoxGroup.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    current: PropTypes.array.isRequired,
}

export default CheckBoxGroup;
