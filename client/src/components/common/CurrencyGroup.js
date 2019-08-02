import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const CurrencyGroup = ({
    name,
    nameTwo,
    placeholder,
    value,
    valueTwo,
    error,
    info,
    type,
    onChange,
    onChangeTwo,
    disabled
}) => {
    var options = [{frequency: "Yearly", value: "yearly"}, {frequency: "Hourly", value: "hourly"}, {frequency: "One Time", value: "once"}, {frequency: "Internship/No Pay", value: "internship"}]
    // this.onChangeFrequency = this.onChangeFrequency.bind(this);
    const selectOptions = options.map(option => (
        <option key={option.frequency} value={option.value}>
            {option.frequency}
        </option>
    ));

    return (
        <div className="form-group">
            <div className='cointainer'>
                <div className='row'>
                    <div className='col-sm-8'>
                        <input type={type}                     
                            className={classnames('form-control form-control-lg', {
                            'is-invalid': error
                            })}
                            placeholder={placeholder} 
                            name={name}
                            value={value} 
                            onChange={onChange} 
                            disbaled={disabled}
                            />
                            {info && <small className="form-text text-muted">{info}</small>}
                            {error && <div className="invalid-feedback">{error}</div>}   
                    </div>
                    <div className='col-sm-4'>
                    <select                    
                        className={classnames('form-control form-control-lg', {
                        'is-invalid': error
                        })}
                        name={nameTwo}
                        value={valueTwo} 
                        onChange={onChangeTwo}>
                        {selectOptions}
                        </select>
                            {info && <small className="form-text text-muted">{info}</small>}
                            {error && <div className="invalid-feedback">{error}</div>}   
                    </div>         
                </div>
            </div>
      </div>
      )
}

CurrencyGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    info: PropTypes.string,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string
}

CurrencyGroup.defaultProps = {
    type: 'text'
}

export default CurrencyGroup;
