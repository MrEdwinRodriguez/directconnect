import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DatePickerGroup = ({
    name,
    placeholder,
    value,
    label,
    error,
    info,
    type,
    onChange,
    disabled
}) => {
return (
    <div >
    <DatePicker
        className={classnames('form-control form-control-lg', {
            'is-invalid': error
            })}        
        placeholder={placeholder} 
        name={name}
        value={value}
        onChange={onChange} 
        disbaled={disabled}
        dateFormat="MM/yyyy"
        showMonthYearPicker
    />

        {error && <div className="invalid-feedback">{error}</div>}    
  </div>
  )
}

DatePickerGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
}

DatePickerGroup.defaultProps = {
    type: 'text'
}

export default DatePickerGroup;
