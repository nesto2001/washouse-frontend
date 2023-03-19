import React from 'react';
import { Option } from '../../types/Options';
import './Checkbox.scss';

type Props = {
    name: string;
    optionsList: Option[];
};

const Checkbox = ({ optionsList, name }: Props) => {
    return (
        <>
            {optionsList.map((option) => {
                return (
                    <label className="checkbox-container" key={`checkbox-${option.value}`}>
                        <input type="checkbox" name={name} value={option.value} />
                        <span className="checkbox-checkmark"></span>
                        <span className="checkbox-label">{option.label}</span>
                    </label>
                );
            })}
        </>
    );
};

export default Checkbox;
