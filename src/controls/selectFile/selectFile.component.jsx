import React from 'react'
import { FontIcon, Label } from '@fluentui/react';

const SelectFile = ({
    label,
    options,
    value,
    placeholder,
    id
}) => {
  return (
    <>
                <div className="selectFile--container">
                    <div className="btm-mrg">
                {label ? <Label>{label}</Label>:''}
                    </div>

                    <select id={"select" + id} defaultValue={""} placeholder={placeholder}
                    required
                    >
                        {options.map(option=>
                            <option 
                                className={''}
                                key={option.id} value={option.id}
                                // selected={option.id === currentSelect}
                            >
                                {option.text}
                            </option>
                        )}
                    </select>
                </div>
            </>
  )
}

export default SelectFile